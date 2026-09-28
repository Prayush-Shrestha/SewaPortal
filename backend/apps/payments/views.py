from rest_framework import permissions, viewsets

from .models import Fine, Payment
from .serializers import FineSerializer, PaymentSerializer


class PaymentViewSet(viewsets.ModelViewSet):
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Payment.objects.all().order_by("-created_at")
        return Payment.objects.filter(user=user).order_by("-created_at")

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class FineViewSet(viewsets.ModelViewSet):
    serializer_class = FineSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Fine.objects.all().order_by("-created_at")
        return Fine.objects.filter(user=user).order_by("-created_at")

    def perform_create(self, serializer):
        # Regular users should not create fines; staff only.
        serializer.save(user=self.request.user)
