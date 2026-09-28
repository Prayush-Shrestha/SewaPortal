from django.contrib import admin

from .models import Fine, Payment


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ("reference", "user", "service_name", "amount", "status", "created_at")
    list_filter = ("status",)
    search_fields = ("reference", "service_name", "user__username")


@admin.register(Fine)
class FineAdmin(admin.ModelAdmin):
    list_display = ("reference", "user", "violation", "amount", "status", "violation_date")
    list_filter = ("status",)
    search_fields = ("reference", "violation", "user__username")
