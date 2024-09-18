from rest_framework import serializers

from .models import Crust, Customer, Order, Payment, Pizza, Topping


class CrustSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crust
        fields = ["external_id", "name", "price", "date_created", "date_updated"]


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = [
            "external_id",
            "name",
            "email",
            "phone",
            "date_created",
            "date_updated",
        ]


class ToppingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topping
        fields = ["external_id", "name", "price", "date_created", "date_updated"]


class PizzaSerializer(serializers.ModelSerializer):
    toppings = ToppingSerializer(many=True, read_only=True)

    class Meta:
        model = Pizza
        fields = [
            "external_id",
            "toppings",
            "price",
            "date_created",
            "date_updated",
        ]


class ToppingCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topping
        fields = ["external_id"]


class PizzaCreateSerializer(serializers.ModelSerializer):
    toppings = ToppingCreateSerializer(many=True)
    crust = serializers.PrimaryKeyRelatedField(queryset=Crust.objects.all())

    class Meta:
        model = Pizza
        fields = ["name", "size", "toppings", "crust", "price"]


class OrderCreateSerializer(serializers.ModelSerializer):
    customer = serializers.PrimaryKeyRelatedField(
        queryset=Customer.objects.all(), required=False
    )
    customer_name = serializers.CharField(max_length=100, required=False)
    customer_email = serializers.EmailField(required=False)
    customer_phone = serializers.CharField(max_length=20, required=False)
    pizzas = PizzaCreateSerializer(many=True)
    total_price = serializers.DecimalField(
        max_digits=8, decimal_places=2, required=False
    )
    status = serializers.ChoiceField(choices=Order.STATUS_CHOICES, default="Pending")
    notes = serializers.CharField(required=False, allow_blank=True)
    method = serializers.ChoiceField(choices=Order.METHOD_CHOICES, default="pickup")

    class Meta:
        model = Order
        fields = [
            "customer",
            "customer_name",
            "customer_email",
            "customer_phone",
            "pizzas",
            "total_price",
            "status",
            "notes",
            "method",
        ]

    def validate(self, data):
        if "customer" not in data and (
            "customer_name" not in data or "customer_email" not in data
        ):
            raise serializers.ValidationError(
                "Either customer ID or customer details (name and email) must be provided."
            )
        return data

    def create(self, validated_data):
        customer_data = validated_data.pop("customer", None)
        customer_name = validated_data.pop("customer_name", None)
        customer_email = validated_data.pop("customer_email", None)
        customer_phone = validated_data.pop("customer_phone", None)
        pizzas_data = validated_data.pop("pizzas")

        if not customer_data:
            customer_data, _ = Customer.objects.get_or_create(
                email=customer_email,
                defaults={"name": customer_name, "phone": customer_phone or ""},
            )

        order = Order.objects.create(customer=customer_data, **validated_data)

        total_price = 0
        for pizza_data in pizzas_data:
            toppings_data = pizza_data.pop("toppings")
            pizza = Pizza.objects.create(**pizza_data)
            for topping_data in toppings_data:
                topping, _ = Topping.objects.get_or_create(**topping_data)
                pizza.toppings.add(topping)
            order.pizzas.add(pizza)
            total_price += pizza.price

        if not order.total_price:
            order.total_price = total_price
            order.save()

        return order


class OrderSerializer(serializers.ModelSerializer):
    customer = CustomerSerializer(read_only=True)
    pizzas = PizzaSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = [
            "external_id",
            "customer",
            "pizzas",
            "total_price",
            "status",
            "date_created",
            "date_updated",
        ]


class PaymentSerializer(serializers.ModelSerializer):
    order = OrderSerializer(read_only=True)

    class Meta:
        model = Payment
        fields = [
            "external_id",
            "order",
            "amount",
            "payment_method",
            "transaction_id",
            "date_created",
            "date_updated",
        ]
