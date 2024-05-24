from rest_framework.serializers import ModelSerializer as MS
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.models import User,Group
from django.contrib.auth.password_validation import validate_password
from rest_framework.generics import UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth.hashers import check_password
from . import models as m


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

class ChangePasswordView(UpdateAPIView):
    serializer_class = ChangePasswordSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        old_password = serializer.validated_data.get('old_password')
        new_password = serializer.validated_data.get('new_password')
        
        if not check_password(old_password, user.password):
            return Response({'error': 'Old password is incorrect.'}, status=status.HTTP_400_BAD_REQUEST)
        
        user.set_password(new_password)
        user.save()
        return Response({'success': 'Password changed successfully.'}, status=status.HTTP_200_OK)

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
        token['id'] = user.id
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

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = m.Tasks
        fields = ['id', 'task_name', 'project', 'worker', 'status', 'date_start', 'date_end','description']

class AuthGroupSerializer(MS):
    class Meta:
        model = m.AuthGroup
        fields = ['id', 'name']


class AuthUserGroupsSerializer(serializers.ModelSerializer):
    

    class Meta:
        model = m.AuthUserGroups
        fields = ['id', 'user', 'group']