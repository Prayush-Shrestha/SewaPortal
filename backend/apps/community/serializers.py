from django.conf import settings
from rest_framework import serializers

from .models import CommunityIssue, Poll, PollOption, PollVote


class PollOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PollOption
        fields = ["id", "text", "votes_count"]
        read_only_fields = ["id", "votes_count"]


class PollSerializer(serializers.ModelSerializer):
    options = PollOptionSerializer(many=True, required=False)
    total_votes = serializers.SerializerMethodField()

    class Meta:
        model = Poll
        fields = [
            "id",
            "question",
            "description",
            "is_active",
            "closes_at",
            "created_at",
            "options",
            "total_votes",
        ]
        read_only_fields = ["id", "created_at", "total_votes"]

    def get_total_votes(self, obj):
        return sum(o.votes_count for o in obj.options.all())

    def create(self, validated_data):
        options_data = validated_data.pop("options", [])
        poll = Poll.objects.create(**validated_data)
        for opt in options_data:
            PollOption.objects.create(poll=poll, **opt)
        return poll


class PollVoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = PollVote
        fields = ["id", "poll", "option", "user", "created_at"]
        read_only_fields = ["id", "user", "created_at"]

    def validate(self, attrs):
        if attrs["option"].poll_id != attrs["poll"].id:
            raise serializers.ValidationError("Option does not belong to this poll.")
        return attrs


class CommunityIssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommunityIssue
        fields = [
            "id",
            "category",
            "title",
            "description",
            "location",
            "image",
            "status",
            "upvotes",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at", "upvotes"]

    def validate_image(self, value):
        if value:
            limit = getattr(settings, "MAX_UPLOAD_SIZE_MB", 5) * 1024 * 1024
            if value.size > limit:
                raise serializers.ValidationError("Image too large. Max 5MB.")
        return value

    def validate_title(self, value):
        if len(value.strip()) < 5:
            raise serializers.ValidationError("Title must be at least 5 characters.")
        return value
