from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [

    #=========================================================================================================================#
    #                                                       Working URLS                                                      #
    #=========================================================================================================================#
    path('', views.getRoutes ,name="getRoutes"),

    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'), #works & used
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), #works & used
    path('register/', views.RegisterView.as_view(), name='register'), #works & used

    path('get/statuses', views.getStatus, name='getStatuses'), # returns Array of Statuses
    path('get/priorities', views.getPriority, name='getpriorities'), # returns Array of Priorities
    path('get/projects', views.getProjects, name='getProjects'), # returns Array of Projects
    path('get/projects/<str:projectId>', views.getProject, name='getProject'), # returns Specific project
    path('change/projects/statusAndPriority/<int:project_id>', views.set_project_status, name='set_project_status'),
    path('projects/<int:pk>/', views.ProjectDetailView.as_view(), name='project-detail'),
    path('teamslist/', views.teamslist_list, name='teamlists'),
    path('teamslist/<int:pk>/', views.teamslist_detail, name='teamlists-detail'),
    path('get/accountlist', views.getAccountList,name= "getAccountList"), # returns Array of accounts
    path('create/project', views.createProject, name='createProject'), # recives data for creation of project
    path('tasks/', views.TaskCreateUpdateView.as_view(), name='task_create_update'), #recives data for creating or updating task
    path('auth-groups/', views.AuthGroupListView.as_view(), name='auth_group_list'), #returns list of permission groups
    path('user-groups/<int:user_id>/', views.GroupByUserAPIView.as_view(), name='group_by_user'),
    path('auth-user-groups/', views.AuthUserGroupsListView.as_view(), name='auth_user_groups_list'),
    path('create/project', views.createProject, name='createProject'), # recives data for creation of project
    path('change-password/', views.ChangePasswordView.as_view(), name='change_password'),
    #=========================================================================================================================#
    #                                                   Maybe Working URLS                                                    #
    #=========================================================================================================================#
    
    path('teams/', views.teams_list, name='teams-list'),
    
    # GET links  -> returns array of data or specific objects
    
    
    
    path('get/teamslists',views.getTeamList,name = 'getTeamsList'),#return Array of teams
    
    path('get/tasks/<str:projectId>', views.getTasks, name='getTasks'), # returns Tasks assigned to specific project
    path('get/task/<str:taskId>', views.getTask, name='getTask'), # returns Specific task
    
    # POST links -> recives data for creation objects

    path('create/task', views.createTask, name='createTask'), # recives data for creation of task

    # PUT links -> recives data for updating objects
    path('update/task/<str:taskId>', views.updateTask, name='updateTask'), # recives data for updating of task

]