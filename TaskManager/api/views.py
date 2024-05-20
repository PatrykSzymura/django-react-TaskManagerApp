from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import generics
from rest_framework import status

from . import models as mod, serializers as ser

# Create your views here.

@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            "path": "api/",
            "view": "getRoutes",
            "method": "GET",
            "description": "Returns a list of all available routes"
        },
        {
            "path": "api/token/",
            "view": "TokenObtainPairView.as_view()",
            "method": "POST",
            "description": "Obtains a new token pair"
        },
        {
            "path": "api/token/refresh/",
            "view": "TokenRefreshView.as_view()",
            "method": "POST",
            "description": "Refreshes an existing token pair"
        },
        {
            "path": "api/get/statuses",
            "view": "getStatuses",
            "method": "GET",
            "description": "Returns an array of all statuses"
        },
        {
            "path": "api/get/priorities",
            "view": "getPriorities",
            "method": "GET",
            "description": "Returns an array of all priorities"
        },
        {
            "path": "api/get/projects",
            "view": "getProjects",
            "method": "GET",
            "description": "Returns an array of all projects"
        },
        {
            "path": "api/get/projects/<str:projectId>",
            "view": "getProject",
            "method": "GET",
            "description": "Returns details of a specific project"
        },
        {
            "path": "api/get/tasks/<str:projectId>",
            "view": "getTasks",
            "method": "GET",
            "description": "Returns tasks assigned to a specific project"
        },
        {
            "path": "api/get/task/<str:taskId>",
            "view": "getTask",
            "method": "GET",
            "description": "Returns details of a specific task"
        },
        {
            "path": "api/create/project",
            "view": "createProject",
            "method": "POST",
            "description": "Creates a new project with the provided data"
        },
        {
            "path": "api/create/task",
            "view": "createTask",
            "method": "POST",
            "description": "Creates a new task with the provided data"
        },
        {
            "path": "api/update/project/<str:projectId>",
            "view": "updateProject",
            "method": "PUT",
            "description": "Updates an existing project with the provided data"
        },
        {
            "path": "api/update/task/<str:taskId>",
            "view": "updateTask",
            "method": "PUT",
            "description": "Updates an existing task with the provided data"
        }
    ]

    return Response(routes)

@api_view(['GET'])
def getWorkers(request):
    model = mod.Accountteams.objects.all()
    serializer = ser.Acc_to_TeamSerializer(model, many = True)
    return Response(serializer.data)

@api_view(['GET'])
def getTeams(request):
    model = mod.Teams.objects.all()
    serializer = ser.TeamSerializer(model, many = True)
    return Response(serializer.data)

@api_view(['GET'])
def getStatus(request):
    model = mod.Statuses.objects.all()
    serializer = ser.StatusSerializer(model, many = True)
    return Response(serializer.data)

@api_view(['GET'])
def getPriority(request):
    model = mod.Priorities.objects.all()
    serializer = ser.PrioritySerializer(model, many = True)
    return Response(serializer.data)

@api_view(['GET'])
def getProjects(request):
    projects = mod.Projekty.objects.all()
    serializer = ser.ProjectsSerializer(projects, many = True)
    return Response(serializer.data)

@api_view(['GET'])
def getProject(request, projectId):
    projects = mod.Projekty.objects.get(id = projectId)
    serializer = ser.ProjectsSerializer(projects, many = False)
    return Response(serializer.data)

@api_view(['POST'])
def createProject(request):
    if request.method == 'POST':
        serializer = ser.ProjectsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def getTasks(request, projectId):
    tasks = mod.Tasks.objects.filter(project = projectId)
    serializer = ser.TaskSerializer(tasks,many = True)
    return Response(serializer.data)

@api_view(['GET'])
def getTask(request,taskId):
    tasks = mod.Tasks.objects.get(id = taskId)
    serializer = ser.TaskSerializer(tasks,many = False)
    return Response(serializer.data)

@api_view(['POST'])
def createTask(request):
    if request.method == 'POST':
        serializer = ser.TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def updateProject(request, projectId):
    try:
        project = mod.Projekty.objects.get(id = projectId)
    except mod.Projekty.DoesNotExist:
        return Response({'error': 'Project not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = ser.ProjectsSerializer(project, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def updateTask(request, taskId):
    try:
        task = mod.Tasks.objects.get(id = taskId)
    except mod.Tasks.DoesNotExist:
        return Response({'error': 'Task not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = ser.TaskSerializer(task, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)