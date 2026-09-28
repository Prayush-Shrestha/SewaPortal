import random
from datetime import date

from rest_framework import permissions, viewsets

from .models import Application, ApplicationStatusHistory
from .serializers import ApplicationSerializer


def generate_application_id(service_slug: str) -> str:
    prefix_map = {
        "national-id": "NID",
        "driving-license": "DL",
        "pan": "PAN",
        "voter-card": "VTR",
        "bluebook": "BLB",
    }
    prefix = prefix_map.get(service_slug, service_slug[:3].upper())
    year = date.today().year
    for _ in range(10):
        suffix = f"{random.randint(0, 9999):04d}"
        candidate = f"{prefix}-{year}-{suffix}"
        if not Application.objects.filter(application_id=candidate).exists():
            return candidate
    raise ValueError("Could not generate unique application id")


class ApplicationViewSet(viewsets.ModelViewSet):
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Application.objects.all().order_by("-submitted_at")
        return Application.objects.filter(user=user).order_by("-submitted_at")

    def perform_create(self, serializer):
        service = serializer.validated_data["service"]
        app_id = generate_application_id(service.slug)
        serializer.save(user=self.request.user, application_id=app_id, status="submitted")

    def perform_update(self, serializer):
        instance = self.get_object()
        old_status = instance.status
        new_status = serializer.validated_data.get("status", old_status)
        # Non-staff users cannot change status/remarks themselves.
        user = self.request.user
        if not user.is_staff:
            serializer.save(status=old_status)
            return
        updated = serializer.save()
        if old_status != updated.status:
            ApplicationStatusHistory.objects.create(
                application=updated,
                from_status=old_status,
                to_status=updated.status,
                changed_by=user,
                comment=updated.remarks,
            )
