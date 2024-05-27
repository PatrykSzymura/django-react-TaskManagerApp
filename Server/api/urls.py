from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenVerifyView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from api import views as v

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('auth/', include('rest_framework.urls')),

    path('user/all/', v.UserListView.as_view(), name='user_list'),
    path('user/register/', v.CreateUserView.as_view(), name='user_register'),
    path('user/delete/<int:pk>/', v.UserDeleteView.as_view(), name='user_delete'),
    path('user/update/<int:pk>/', v.UserUpdateView.as_view(), name='user_update'),

    path('status/', v.StatusList.as_view(), name='status_list'),
    path('priority/', v.PriorityList.as_view(), name='priority_list'),

    path('project/', v.ProjectListCreate.as_view(), name='project_list_create'),
    path('project/delete/<int:pk>/', v.ProjectDelete.as_view(), name='project_delete'),
    path('project/update/<int:pk>/', v.ProjectUpdate.as_view(), name='project_update'),
    path('project/members/<int:pk>/', v.ListTeamsProjects.as_view(), name='project_members'),

    path('task/<int:pk>', v.TaskListCreate.as_view(), name='task_list_create'),
    path('task/delete/<int:pk>/', v.TaskDelete.as_view(), name='task_delete'),
    path('task/update/<int:pk>/', v.TaskUpdate.as_view(), name='task_update'),


    path('team/', v.TeamsNameListCreate.as_view(), name='teams_list_create'),
    path('team/delete/<int:pk>/', v.TeamsNameDelete.as_view(), name='teams_delete'),
    path('team/update/<int:pk>/', v.TeamsNameUpdate.as_view(), name='teams_update'),

    path('team/members/<int:pk>', v.ListTeamsList.as_view(), name='list_teams_list'),
    path('team/members/update/<int:pk>/', v.ListTeamsUpdate.as_view(), name='list_teams_update'),
    path('team/memebers/delete/<int:pk>/', v.ListTeamsDelete.as_view(), name='list_teams_delete'),
]