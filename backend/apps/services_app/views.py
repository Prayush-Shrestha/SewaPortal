from rest_framework import permissions, viewsets

from .models import Service
from .serializers import ServiceSerializer


class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Service.objects.filter(is_active=True).order_by("name")
    serializer_class = ServiceSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = "slug"

    def get_queryset(self):
        qs = Service.objects.all().order_by("name")
        if not self.request.user.is_staff:
            qs = qs.filter(is_active=True)
        return qs
