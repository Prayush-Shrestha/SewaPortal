from django.conf import settings
from django.db import models


class Document(models.Model):
    CATEGORY_CHOICES = [
        ("citizenship", "Citizenship"),
        ("national_id", "National ID"),
        ("passport", "Passport"),
        ("pan", "PAN"),
        ("driving_license", "Driving License"),
        ("bluebook", "Bluebook (Vehicle)"),
        ("other", "Other"),
    ]
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("verified", "Verified"),
        ("rejected", "Rejected"),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="documents"
    )
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES, default="other")
    name = models.CharField(max_length=200)
    document_number = models.CharField(max_length=100, blank=True)
    file = models.FileField(upload_to="documents/")
    uploaded_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    expiry_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"{self.name} ({self.user.username})"
