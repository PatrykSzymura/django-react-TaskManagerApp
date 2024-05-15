from rest_framework.serializers import ModelSerializer
from . import models

class ProjectsSerializer(ModelSerializer):
    class Meta:
        model = models.Projekty
        fields = '__all__'