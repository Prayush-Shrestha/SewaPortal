from django.contrib import admin

from .models import CommunityIssue, Poll, PollOption, PollVote


class PollOptionInline(admin.TabularInline):
    model = PollOption
    extra = 1


@admin.register(Poll)
class PollAdmin(admin.ModelAdmin):
    list_display = ("question", "is_active", "closes_at", "created_at")
    inlines = [PollOptionInline]


@admin.register(CommunityIssue)
class CommunityIssueAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "status", "upvotes", "created_at")
    list_filter = ("category", "status")
    search_fields = ("title", "location")
