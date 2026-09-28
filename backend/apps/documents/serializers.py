from django.conf import settings
from rest_framework import serializers

from .models import Document

MAX_UPLOAD_BYTES = 5 * 1024 * 1024


class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = [
            "id",
            "category",
            "name",
            "document_number",
            "file",
            "uploaded_at",
            "updated_at",
            "expiry_date",
            "status",
            "notes",
        ]
        read_only_fields = ["id", "uploaded_at", "updated_at", "status"]

    def validate_file(self, value):
        limit = getattr(settings, "MAX_UPLOAD_SIZE_MB", 5) * 1024 * 1024
        if value.size > limit:
            raise serializers.ValidationError(
                f"File too large. Max {getattr(settings, 'MAX_UPLOAD_SIZE_MB', 5)}MB."
            )
        if value.size == 0:
            raise serializers.ValidationError("Empty file not allowed.")
        return value
