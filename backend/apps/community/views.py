from django.db import transaction
from django.db.models import F
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import CommunityIssue, Poll, PollOption, PollVote
from .serializers import (
    CommunityIssueSerializer,
    PollSerializer,
    PollVoteSerializer,
)


class PollViewSet(viewsets.ModelViewSet):
    queryset = Poll.objects.all().order_by("-created_at")
    serializer_class = PollSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    @action(detail=True, methods=["post"], permission_classes=[permissions.IsAuthenticated])
    def vote(self, request, pk=None):
        poll = self.get_object()
        option_id = request.data.get("option_id") or request.data.get("option")
        if not option_id:
            return Response(
                {"detail": "option_id is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            option = PollOption.objects.get(id=option_id, poll=poll)
        except PollOption.DoesNotExist:
            return Response(
                {"detail": "Invalid option for this poll."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if PollVote.objects.filter(poll=poll, user=request.user).exists():
            return Response(
                {"detail": "You have already voted on this poll."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        with transaction.atomic():
            PollVote.objects.create(poll=poll, option=option, user=request.user)
            PollOption.objects.filter(id=option.id).update(
                votes_count=F("votes_count") + 1
            )
        return Response({"detail": "Vote recorded."}, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=["post"], permission_classes=[permissions.IsAuthenticated])
    def upvote(self, request, pk=None):
        return self.vote(request, pk=pk)


class IssueViewSet(viewsets.ModelViewSet):
    serializer_class = CommunityIssueSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return CommunityIssue.objects.all().order_by("-created_at")

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=["post"], permission_classes=[permissions.IsAuthenticated])
    def upvote(self, request, pk=None):
        issue = self.get_object()
        CommunityIssue.objects.filter(id=issue.id).update(upvotes=F("upvotes") + 1)
        issue.refresh_from_db()
        return Response({"upvotes": issue.upvotes})
