from django.contrib import admin

from .models import Application, ApplicationStatusHistory


class HistoryInline(admin.TabularInline):
    model = ApplicationStatusHistory
    extra = 0
    readonly_fields = ("created_at",)


@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ("application_id", "user", "service", "status", "submitted_at")
    list_filter = ("status", "service")
    search_fields = ("application_id", "full_name", "user__username")
    inlines = [HistoryInline]


@admin.register(ApplicationStatusHistory)
class ApplicationStatusHistoryAdmin(admin.ModelAdmin):
    list_display = ("application", "from_status", "to_status", "changed_by", "created_at")
