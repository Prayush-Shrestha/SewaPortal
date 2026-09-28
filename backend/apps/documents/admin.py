from django.contrib import admin

from .models import Document


@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ("name", "user", "category", "status", "uploaded_at")
    list_filter = ("category", "status")
    search_fields = ("name", "document_number", "user__username")
