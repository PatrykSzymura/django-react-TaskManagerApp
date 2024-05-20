from rest_framework.serializers import ModelSerializer as MS
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from . import models as m

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        print(type(user))
        # Add custom claims
        token['username'] = user.username
        # ...

        return token

class StatusSerializer(MS):
    class Meta:
        model = m.Statuses
        fields = '__all__'

class TeamSerializer(MS):
    class Meta:
        model = m.Teams
        fields = '__all__'

class Acc_to_TeamSerializer(MS):
    class Meta:
        model = m.Accountteams
        fields = '__all__'

class PrioritySerializer(MS):
    class Meta:
        model = m.Priorities
        fields = '__all__'

class ProjectsSerializer(MS):
    class Meta:
        model = m.Projects
        fields = ["id","project_name","team_id","description","status","priority","date_start","date_end"]
    status = StatusSerializer(read_only = True)
    priority = PrioritySerializer(read_only = True)

class TaskSerializer(MS):
    class Meta:
        model = m.Tasks
        fields = ['id','task_name','project','worker','status','date_start','date_end']
    status = StatusSerializer(read_only = True)