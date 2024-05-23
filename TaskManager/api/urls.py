from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('', views.getRoutes ,name="getRoutes"),

    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'), #works & used
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), #works & used
    path('register/', views.RegisterView.as_view(), name='register'), #works & used
    path('user/groups/', views.UserGroupView, name='user-groups'), 

    path('teams/', views.teams_list, name='teams-list'),
    path('teams/<int:pk>/', views.team_detail, name='team-detail'),

    

    # GET links  -> returns array of data or specific objects
    path('get/statuses', views.getStatus, name='getStatuses'), # returns Array of Statuses
    path('get/accountlist', views.getAccountList,name= "getAccountList"), # returns Array of accounts
    
    path('get/teams',views.getWorkers,name = 'getTeams'),# return information about team and worker
    path('get/teamslists',views.getTeamList,name = 'getTeamsList'),#return Array of teams

    path('get/priorities', views.getPriority, name='getpriorities'), # returns Array of Priorities

    path('get/projects', views.getProjects, name='getProjects'), # returns Array of Projects

    path('get/projects/<str:projectId>', views.getProject, name='getProject'), # returns Specific project
    path('get/tasks/<str:projectId>', views.getTasks, name='getTasks'), # returns Tasks assigned to specific project
    path('get/task/<str:taskId>', views.getTask, name='getTask'), # returns Specific task
    
    # POST links -> recives data for creation objects
    path('create/project', views.createProject, name='createProject'), # recives data for creation of project
    path('create/task', views.createTask, name='createTask'), # recives data for creation of task

    # PUT links -> recives data for updating objects
    path('update/project/<str:projectId>', views.updateProject, name='updateProject'), # recives data for updating of project
    path('update/task/<str:taskId>', views.updateTask, name='updateTask'), # recives data for updating of task

]