from rest_framework.serializers import ModelSerializer
from . import models

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

    