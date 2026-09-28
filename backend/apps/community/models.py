from django.conf import settings
from django.db import models


class Poll(models.Model):
    question = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    closes_at = models.DateTimeField(null=True, blank=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="polls",
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.question


class PollOption(models.Model):
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE, related_name="options")
    text = models.CharField(max_length=255)
    votes_count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.poll.question} - {self.text}"


class PollVote(models.Model):
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE, related_name="votes")
    option = models.ForeignKey(
        PollOption, on_delete=models.CASCADE, related_name="votes"
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="poll_votes"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "poll")

    def __str__(self):
        return f"{self.user.username} -> {self.option.text}"


class CommunityIssue(models.Model):
    CATEGORY_CHOICES = [
        ("road", "Road"),
        ("waste", "Waste"),
        ("electricity", "Electricity"),
        ("water", "Water"),
        ("transport", "Transport"),
        ("other", "Other"),
    ]
    STATUS_CHOICES = [
        ("reported", "Reported"),
        ("under_review", "Under Review"),
        ("in_progress", "In Progress"),
        ("resolved", "Resolved"),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="issues"
    )
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES, default="other")
    title = models.CharField(max_length=200)
    description = models.TextField()
    location = models.CharField(max_length=255, blank=True)
    image = models.ImageField(upload_to="issues/", null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="reported")
    upvotes = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
