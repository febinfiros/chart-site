from django.urls import path
from .views import ProjectListView, ChartListView, ChartDetailView
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('demo/', views.tryout, name='tryout'),
    path('projects/', ProjectListView.as_view(), name='all-projects'),
    path('projects/<int:pk>', ChartListView.as_view(), name='project-charts'),
    path('projects/chart/<int:pk>', ChartDetailView.as_view(), name='chart'),
    path('projects/control', views.control_view, name="control-project"),
    path('projects/chart/control', views.chart_control_view, name='control-chart'),
    path('projects/chart/update', views.chart_update_view, name='update-chart'),
]
