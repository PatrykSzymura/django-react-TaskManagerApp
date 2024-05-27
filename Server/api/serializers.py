from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer as TopSerializer
from django.contrib.auth.models import User
from api import models as m

from rest_framework_simplejwt.views import TokenObtainPairView as Top


class MyTokenObtainPairSerializer(TopSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['name'] = user.name
        token['email'] = user.email
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        token['access_Level'] = user.access_level

        return token


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "password"]
        extra_kwargs = {"password": {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.Task
        fields = "__all__"


class PrioritySerializer(serializers.ModelSerializer):
    class Meta:
        model = m.Priority
        fields = "__all__"
        extra_kwargs = {"id": {"read_only": True}}


class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.Status
        fields = "__all__"
        extra_kwargs = {"id": {"read_only": True}}


class TeamsNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.TeamsName
        fields = "__all__"
        extra_kwargs = {"id": {"read_only": True}}


class ListTeamsSerializer(serializers.ModelSerializer):
    team_id = TeamsNameSerializer(read_only=True)
    user_id = UserSerializer(read_only=True)

    class Meta:
        model = m.ListTeams
        fields = "__all__"
        extra_kwargs = {"id": {"read_only": True}}


class ProjectDetailSerializer(serializers.ModelSerializer):
    priority = PrioritySerializer(read_only=True)
    status = StatusSerializer(read_only=True)
    team = TeamsNameSerializer(read_only=True)

    class Meta:
        model = m.Project
        fields = "__all__"


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.Project
        fields = "__all__"
