from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.pagination import CursorPagination

from .models import Crust, Customer, Order, Payment, Pizza, Topping
from .serializers import (
    CrustSerializer,
    CustomerSerializer,
    OrderCreateSerializer,
    OrderSerializer,
    PaymentSerializer,
    PizzaSerializer,
    ToppingSerializer,
)


class ExternalIdCursorPagination(CursorPagination):
    ordering = "external_id"
    page_size = 10  # You can adjust this value as needed


class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all().order_by("external_id")
    serializer_class = CustomerSerializer
    pagination_class = ExternalIdCursorPagination
    lookup_field = "external_id"


class ToppingViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Topping.objects.all().order_by("external_id")
    serializer_class = ToppingSerializer
    pagination_class = ExternalIdCursorPagination
    lookup_field = "external_id"


class PizzaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Pizza.objects.all().order_by("external_id")
    serializer_class = PizzaSerializer
    pagination_class = ExternalIdCursorPagination
    lookup_field = "external_id"


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().order_by("external_id")
    serializer_class = OrderSerializer
    pagination_class = ExternalIdCursorPagination
    lookup_field = "external_id"

    def get_serializer_class(self):
        if self.action == "create":
            return OrderCreateSerializer
        return self.serializer_class


class OrderCreateViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().order_by("external_id")
    serializer_class = OrderCreateSerializer
    pagination_class = ExternalIdCursorPagination
    lookup_field = "external_id"


class PaymentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Payment.objects.all().order_by("external_id")
    serializer_class = PaymentSerializer
    pagination_class = ExternalIdCursorPagination
    lookup_field = "external_id"


class CrustViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Crust.objects.all().order_by("external_id")
    serializer_class = CrustSerializer
    pagination_class = ExternalIdCursorPagination
    lookup_field = "external_id"
