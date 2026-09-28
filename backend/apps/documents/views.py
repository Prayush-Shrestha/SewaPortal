from rest_framework import permissions, viewsets

from .models import Document
from .serializers import DocumentSerializer


class DocumentViewSet(viewsets.ModelViewSet):
    serializer_class = DocumentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Document.objects.all().order_by("-uploaded_at")
        return Document.objects.filter(user=user).order_by("-uploaded_at")

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
