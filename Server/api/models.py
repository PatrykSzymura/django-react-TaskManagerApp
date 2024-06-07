from django.db import models
from django.contrib.auth.models import User
from django.db import models


class TeamsName(models.Model):
    team_id = models.AutoField(primary_key=True)
    team_name = models.CharField(max_length=100)

    def __str__(self):
        return self.team_name


class Status(models.Model):
    id = models.AutoField(primary_key=True)
    status_name = models.CharField(max_length=255)
    color_nr = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return self.status_name


class Priority(models.Model):
    id = models.AutoField(primary_key=True)
    priority_name = models.CharField(max_length=255)
    color_number = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return self.priority_name


class Project(models.Model):
    id = models.AutoField(primary_key=True)
    project_name = models.CharField(max_length=100)
    team = models.ForeignKey(TeamsName, on_delete=models.CASCADE)
    priority = models.ForeignKey(Priority, models.DO_NOTHING)
    status = models.ForeignKey(Status, models.DO_NOTHING)
    date_start = models.DateField(blank=True, null=True)
    date_end = models.DateField(blank=True, null=True)
    description = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.project_name


class Task(models.Model):
    id = models.AutoField(primary_key=True)
    project = models.ForeignKey(Project, models.CASCADE)
    task_name = models.CharField(max_length=255)
    status = models.ForeignKey(Status, models.DO_NOTHING, db_column='Status_ID')
    user_id = models.ForeignKey(User, models.SET_NULL, blank=True, null=True)
    date_start = models.DateField()
    date_end = models.DateField()
    description = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.task_name


class ListTeams(models.Model):
    id = models.AutoField(primary_key=True)
    team_id = models.ForeignKey(TeamsName, on_delete=models.CASCADE)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.team_id
