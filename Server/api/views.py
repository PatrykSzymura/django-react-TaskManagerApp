from django.shortcuts import render
from django.contrib.auth.models import User

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import PermissionDenied
from api import models as m

from api.serializers import UserSerializer, ProjectSerializer, TaskSerializer, StatusSerializer, ListTeamsSerializer, \
    TeamsNameSerializer, PrioritySerializer, ChangePasswordSerializer, UserUpdateSerializer


# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    #permission_classes = [AllowAny]
    #Q@wertyuiop1


class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    #permission_classes = (IsAuthenticated,)


class UserUpdateView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserUpdateSerializer
    #permission_classes = [IsAuthenticated]


class UserDeleteView(generics.DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    #permission_classes = [IsAuthenticated]

    def perform_destroy(self, instance):
        #print(instance)
        if instance.is_superuser:
            #print('Im super user or staff user')
            raise PermissionDenied("Staff members cannot delete staff users or super users.")
        else:
            #print('Im not admin user or super user')
            instance.delete()


class ProjectListCreate(generics.ListCreateAPIView):
    queryset = m.Project.objects.all()
    serializer_class = ProjectSerializer

    #permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)


class ProjectDelete(generics.DestroyAPIView):
    queryset = m.Project.objects.all()
    serializer_class = ProjectSerializer
    #permission_classes = [IsAuthenticated]


class ProjectUpdate(generics.RetrieveUpdateAPIView):
    queryset = m.Project.objects.all()
    serializer_class = ProjectSerializer
    #permission_classes = [IsAuthenticated]


class TaskListCreate(generics.ListCreateAPIView):
    serializer_class = TaskSerializer

    #permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return m.Task.objects.filter(project=self.kwargs['pk'])


class TaskDelete(generics.DestroyAPIView):
    serializer_class = TaskSerializer

    #permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return m.Task.objects.filter(project=self.kwargs['pk'])


class TaskUpdate(generics.RetrieveUpdateAPIView):
    serializer_class = TaskSerializer

    #permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return m.Task.objects.filter(id=self.kwargs['pk'])


class StatusList(generics.ListAPIView):
    serializer_class = StatusSerializer
    queryset = m.Status.objects.all()
    #permission_classes = [IsAuthenticated]


class PriorityList(generics.ListAPIView):
    serializer_class = PrioritySerializer
    queryset = m.Priority.objects.all()
    #permission_classes = [IsAuthenticated]


class TeamsNameListCreate(generics.ListCreateAPIView):
    serializer_class = TeamsNameSerializer
    queryset = m.TeamsName.objects.all()
    #permission_classes = (IsAuthenticated,)


class TeamsNameDelete(generics.DestroyAPIView):
    serializer_class = TeamsNameSerializer
    queryset = m.TeamsName.objects.all()


class TeamsNameUpdate(generics.RetrieveUpdateAPIView):
    serializer_class = TeamsNameSerializer
    queryset = m.TeamsName.objects.all()


class ListTeamsList(generics.ListAPIView):
    serializer_class = ListTeamsSerializer
    queryset = m.ListTeams.objects.all()


class ListTeamsUpdate(generics.RetrieveUpdateAPIView):
    queryset = m.ListTeams.objects.all()
    serializer_class = ListTeamsSerializer


class ListTeamsDelete(generics.DestroyAPIView):
    queryset = m.ListTeams.objects.all()
    serializer_class = ListTeamsSerializer


class ListTeamsProjects(generics.ListAPIView):
    serializer_class = ListTeamsSerializer

    def get_queryset(self):
        return m.ListTeams.objects.filter(team_id=self.kwargs['pk'])


class ChangePassword(generics.UpdateAPIView):
    queryset = User.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = ChangePasswordSerializer
