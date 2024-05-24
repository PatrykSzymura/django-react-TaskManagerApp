from rest_framework.serializers import ModelSerializer as MS
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import serializers
from django.contrib.auth.models import User,Group
from django.contrib.auth.password_validation import validate_password
from . import models as m

#used
class RegisterSerializer(MS):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2', 'email', 'first_name', 'last_name')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
#used
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        print(type(user))
        # Add custom claims
        token['username'] = user.username
        groups = user.groups.values_list('name', flat=True)
        token['groups'] = list(groups)
        # ...

        return token
#used
class UserGroupSerializer(MS):
    groups = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'
    )

    class Meta:
        model = m.AuthUser
        fields = ['username', 'groups']
#used
class StatusSerializer(MS):
    class Meta:
        model = m.Statuses
        fields = '__all__'
#used
class TeamSerializer(MS):
    class Meta:
        model = m.Teams
        fields = '__all__'

class UserBaseInfoSerializer(MS):
    class Meta:
        model = m.AuthUser
        fields = ['id','username', 'first_name', 'last_name']

#used
class TeamslistSerializer(MS):
    class Meta:
        model = m.Teamslist
        exclude = ['teamid']

#used
class PrioritySerializer(MS):
    class Meta:
        model = m.Priorities
        fields = '__all__'

class ProjectsSerializer(MS):
    team_id = serializers.PrimaryKeyRelatedField(queryset=m.Teams.objects.all(), source='team')
    priority = serializers.PrimaryKeyRelatedField(queryset=m.Priorities.objects.all())

    class Meta:
        model = m.Projects
        fields = ["id", "project_name", "team_id", "description", "status", "priority", "date_start", "date_end"]

class TaskSerializer(MS):
    class Meta:
        model = m.Tasks
        fields = ['id','task_name','project','worker','status','date_start','date_end']
    status = StatusSerializer(read_only = True)

class AuthGroupSerializer(MS):
    class Meta:
        model = m.AuthGroup
        fields = ['id', 'name']
