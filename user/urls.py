from django.urls import path, include
from . import views

urlpatterns = [
    path('accounts/', include('django.contrib.auth.urls')),
    path('signup/', views.signup, name="signup"),
    path('profile/', views.profile_view, name="profile"),
    path('profile/delete', views.delete_profile, name="delete-profile")
]
