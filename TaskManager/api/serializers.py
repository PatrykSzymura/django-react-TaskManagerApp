from rest_framework.serializers import ModelSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from . import models

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        print(type(user))
        # Add custom claims
        token['username'] = user.username
        # ...

        return token

class StatusSerializer(ModelSerializer):
    class Meta:
        model = models.Statuses
        fields = ['status_name', 'color_nr']

class PrioritySerializer(ModelSerializer):
    class Meta:
        model = models.Priorities
        fields = ['priority_name', 'color_number']

class ProjectsSerializer(ModelSerializer):
    #
    class Meta:
        model = models.Projekty
        fields = '__all__'
    status = StatusSerializer(read_only = True)
    priority = PrioritySerializer(read_only = True)

    