from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from . import models, serializers

# Create your views here.

@api_view(['GET'])
def getRoutes(request):
    routes = [
        { 
            'Endpoint' : '/projects/',
            'method' : 'GET',
            'body' : None,
            'description' : 'Returns an array of projets'
        },
        { 
            'Endpoint' : '/projects/id',
            'method' : 'GET',
            'body' : None,
            'description' : 'Returns project with specified id'
        },
        { 
            'Endpoint' : '/projects/id/tasks',
            'method' : 'GET',
            'body' : None,
            'description' : 'Returns an array of tasks from specific project'
        },
        { 
            'Endpoint' : '/projects/id/tasks/id',
            'method' : 'GET',
            'body' : None,
            'description' : 'Returns task from specific project'
        },
        { 
            'Endpoint' : '/projects/create',
            'method' : 'POST',
            'body' : {'body' : ""},
            'description' : 'Creates new project with data sent in post request'
        },
        { 
            'Endpoint' : '/projects/id/tasks/create',
            'method' : 'POST',
            'body' : {'body' : ""},
            'description' : 'Creates new task for with data sent in post request'
        },
    ]

    return Response(routes)


@api_view(['GET'])
def getProjects(request):
    projects = models.Projekty.objects.all()
    serializer = serializers.ProjectsSerializer(projects, many = True)
    return Response(serializer.data)

@api_view(['GET'])
def getProject(request, projectId):
    projects = models.Projekty.objects.get(id = projectId)
    serializer = serializers.ProjectsSerializer(projects, many = False)
    return Response(serializer.data)