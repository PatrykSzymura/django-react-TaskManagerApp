from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes ,name="getRoutes"),
    path('projects/', views.getProjects, name='getProjects'),
    path('projects/<str:projectId>', views.getProject, name='getProject'),
]