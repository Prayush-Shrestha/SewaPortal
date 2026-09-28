from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import IssueViewSet, PollViewSet

router = DefaultRouter()
router.register(r"polls", PollViewSet, basename="poll")
router.register(r"issues", IssueViewSet, basename="issue")

urlpatterns = [path("", include(router.urls))]
