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
        fields = '__all__'

class PrioritySerializer(ModelSerializer):
    class Meta:
        model = models.Priorities
        fields = '__all__'

class ProjectsSerializer(ModelSerializer):
    class Meta:
        model = models.Projekty
        fields = ["id","project_name","team_id","description","status","priority","date_start","date_end"]
    status = StatusSerializer(read_only = True)
    priority = PrioritySerializer(read_only = True)

class TaskSerializer(ModelSerializer):
    class Meta:
        model = models.Tasks
        fields = ['id','task_name','project','worker','status','date_start','date_end']
    status = StatusSerializer(read_only = True)