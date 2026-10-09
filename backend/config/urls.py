from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from rest_framework_simplejwt.views import TokenRefreshView

from apps.users.views import LoginView, MeView, RegisterView

urlpatterns = [
    path("admin/", admin.site.urls),
    path(
        "api/auth/",
        include(
            [
                path("register/", RegisterView.as_view(), name="auth-register"),
                path("login/", LoginView.as_view(), name="token_obtain_pair"),
                path("refresh/", TokenRefreshView.as_view(), name="token_refresh"),
                path("me/", MeView.as_view(), name="auth-me"),
            ]
        ),
    ),
    path("api/", include("apps.services_app.urls")),
    path("api/", include("apps.users.urls")),
    path("api/", include("apps.documents.urls")),
    path("api/", include("apps.applications.urls")),
    path("api/", include("apps.payments.urls")),
    path("api/", include("apps.community.urls")),
    path("api/", include("apps.notifications.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
