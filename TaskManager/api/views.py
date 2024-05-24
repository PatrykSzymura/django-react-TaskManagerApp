from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny, IsAuthenticated  
from rest_framework import status, generics, viewsets

from . import models as mod, serializers as ser

# Create your views here.



class RegisterView(generics.CreateAPIView):
    serializer_class = ser.RegisterSerializer
    permission_classes = [AllowAny]

class ProjectDetailView(generics.RetrieveUpdateAPIView):
    queryset = mod.Projects.objects.all()
    serializer_class = ser.ProjectsSerializer

@api_view(['GET', 'POST'])
def teamslist_list(request):
    print(request.data)
    if request.method == 'GET':
        teamslists = mod.Teamslist.objects.all()
        serializer = ser.TeamslistSerializer(teamslists, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ser.TeamslistSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def teamslist_detail(request, pk):
    try:
        teamslist = mod.Teamslist.objects.get(pk=pk)
    except  mod.Teamslist.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ser.TeamslistSerializer(teamslist)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ser.TeamslistSerializer(teamslist, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        teamslist.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


#useless
@api_view(['POST'])
def set_project_status(request, project_id):
    project = get_object_or_404(mod.Projects, id=project_id)
    data = request.data

    # Update only the status and priority fields
    serializer = ser.ProjectsSerializer(project, data={
        'status': data.get('status'),
        'priority': data.get('priority')
    }, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
            "path": 'get/statuses', 
            "view" : "getStatus", 
            "method": "GET",
            "description" : "returns Array of Statuses"
        },
        {
            'path' : 'get/accountlist',
            'view' : "getAccountList",
            "method": "GET",
            'description' : 'returns Array of accounts',
    
        },
        {
            "path": 'get/teams',
            "views" : "getWorkers",
            "method": "GET",
            "description" : "return information about team and worker",
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
        },
    ]

    return Response(routes)

@api_view(['GET'])
def getWorkers(request):
    return Null

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
    projects = mod.Projects.objects.all()
    serializer = ser.ProjectsSerializer(projects, many = True)
    return Response(serializer.data)

@api_view(['GET'])
def getProject(request, projectId):
    projects = mod.Projects.objects.get(id = projectId)
    serializer = ser.ProjectsSerializer(projects, many = False)
    return Response(serializer.data)

@api_view(['POST'])
def createProject(request):
    if request.method == 'POST':
        print(request.data)  # Log incoming request data for debugging
        serializer = ser.ProjectsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)  # Log serializer errors for debugging
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
        project = mod.Projects.objects.get(id = projectId)
    except mod.Projects.DoesNotExist:
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

@api_view(['GET'])
def getTeamList(request):
    data = mod.Teams.objects.all()
    seri = ser.TeamSerializer(data, many = True)
    return Response(seri.data)

@api_view(['GET'])
def getTeamWorkers(request,teamId):
    data = mod.Teams.objects.filter(teamid = teamId)
    print(data)
    seri = ser.TeamSerializer(data, many = True)
    return Response(seri.data)

@api_view(['GET'])
def getAccountList(request):
    data = mod.AuthUser.objects.filter()
    #print(data)
    seri = ser.UserBaseInfoSerializer(data, many = True)
    return Response(seri.data)

@api_view(['GET', 'POST'])
def teams_list(request):
    if request.method == 'GET':
        teams = mod.Teams.objects.all()
        serializer = ser.TeamSerializer(teams, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = ser.TeamSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def team_detail(request, pk):
    try:
        team = mod.Teams.objects.get(pk=pk)
    except mod.Teams.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ser.TeamSerializer(team)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = ser.TeamSerializer(team, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        team.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])  
def UserGroupView(request):
    data = mod.AuthUser.objects.all()
    serializer = ser.UserGroupSerializer(data, many = True)
    return Response(serializer)
