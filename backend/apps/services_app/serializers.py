from rest_framework import serializers

from .models import Service


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = [
            "id",
            "slug",
            "name",
            "description",
            "required_documents",
            "processing_days",
            "fee",
            "is_active",
            "icon",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

    def validate_processing_days(self, value):
        if value <= 0:
            raise serializers.ValidationError("Processing days must be positive.")
        return value

    def validate_fee(self, value):
        if value < 0:
            raise serializers.ValidationError("Fee cannot be negative.")
        return value
