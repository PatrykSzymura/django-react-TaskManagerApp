from django.contrib.auth.password_validation import validate_password
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
        fields = ["id", "username", "password", 'email', 'first_name', 'last_name']
        extra_kwargs = {"password": {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

    def update(self, instance, validated_data):
        if 'password' in validated_data:
            password = validated_data.pop('password', None)
            instance.set_password(password)

        return super().update(instance, validated_data)


class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name']


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


class ChangePasswordSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    old_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('old_password', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError({"old_password": "Old password is not correct"})
        return value

    def update(self, instance, validated_data):

        instance.set_password(validated_data['password'])
        print(instance)
        print(validated_data['password'])
        instance.save()

        return instance
