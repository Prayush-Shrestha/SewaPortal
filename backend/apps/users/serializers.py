from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            "phone",
            "date_of_birth",
            "gender",
            "address",
            "citizenship_no",
            "avatar",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["created_at", "updated_at"]


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "is_staff",
            "date_joined",
            "profile",
        ]
        read_only_fields = ["id", "is_staff", "date_joined"]


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password]
    )
    phone = serializers.CharField(required=False, allow_blank=True, default="")
    address = serializers.CharField(required=False, allow_blank=True, default="")
    citizenship_no = serializers.CharField(required=False, allow_blank=True, default="")

    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "password",
            "first_name",
            "last_name",
            "phone",
            "address",
            "citizenship_no",
        ]

    def validate_email(self, value):
        if value and User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def create(self, validated_data):
        phone = validated_data.pop("phone", "")
        address = validated_data.pop("address", "")
        citizenship_no = validated_data.pop("citizenship_no", "")
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data.get("email", ""),
            password=validated_data["password"],
            first_name=validated_data.get("first_name", ""),
            last_name=validated_data.get("last_name", ""),
        )
        profile, _ = Profile.objects.get_or_create(user=user)
        profile.phone = phone
        profile.address = address
        profile.citizenship_no = citizenship_no
        profile.save()
        return user


class MeUpdateSerializer(serializers.ModelSerializer):
    phone = serializers.CharField(source="profile.phone", required=False, allow_blank=True)
    date_of_birth = serializers.DateField(
        source="profile.date_of_birth", required=False, allow_null=True
    )
    gender = serializers.CharField(source="profile.gender", required=False, allow_blank=True)
    address = serializers.CharField(source="profile.address", required=False, allow_blank=True)
    citizenship_no = serializers.CharField(
        source="profile.citizenship_no", required=False, allow_blank=True
    )

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "phone",
            "date_of_birth",
            "gender",
            "address",
            "citizenship_no",
        ]
        read_only_fields = ["id", "username"]

    def update(self, instance, validated_data):
        profile_data = validated_data.pop("profile", {})
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        profile = instance.profile
        for attr, value in profile_data.items():
            setattr(profile, attr, value)
        profile.save()
        return instance


class EmailOrUsernameTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Allow logging in with either the username or the email address."""

    def validate(self, attrs):
        login = (attrs.get(self.username_field) or "").strip()
        if login and "@" in login:
            try:
                attrs = {
                    **attrs,
                    self.username_field: User.objects.get(email__iexact=login).username,
                }
            except User.DoesNotExist:
                pass
        return super().validate(attrs)
