from rest_framework import serializers

from .models import Application, ApplicationStatusHistory


class ApplicationStatusHistorySerializer(serializers.ModelSerializer):
    changed_by = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = ApplicationStatusHistory
        fields = [
            "id",
            "from_status",
            "to_status",
            "changed_by",
            "comment",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]


class ApplicationSerializer(serializers.ModelSerializer):
    history = ApplicationStatusHistorySerializer(many=True, read_only=True)
    service_name = serializers.CharField(source="service.name", read_only=True)

    class Meta:
        model = Application
        fields = [
            "id",
            "application_id",
            "service",
            "service_name",
            "full_name",
            "dob",
            "address",
            "phone",
            "citizenship_no",
            "extra_data",
            "status",
            "submitted_at",
            "updated_at",
            "remarks",
            "history",
        ]
        read_only_fields = ["id", "application_id", "submitted_at", "updated_at", "history"]

    def validate_phone(self, value):
        if len(value) < 7:
            raise serializers.ValidationError("Phone number looks too short.")
        return value
