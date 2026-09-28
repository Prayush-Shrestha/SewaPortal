from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import FineViewSet, PaymentViewSet

router = DefaultRouter()
router.register(r"payments", PaymentViewSet, basename="payment")
router.register(r"fines", FineViewSet, basename="fine")

urlpatterns = [path("", include(router.urls))]
