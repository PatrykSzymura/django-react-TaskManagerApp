from django.contrib import admin
from . import models
# Register your models here.
admin.site.register(models.Projekty)
admin.site.register(models.Tasks)
admin.site.register(models.Priorities)
admin.site.register(models.Statuses)