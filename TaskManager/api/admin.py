from django.contrib import admin
from . import models as m
# Register your models here.

@admin.register(m.Projects)
class ProjectsAdmin(admin.ModelAdmin):
    list_display = ('id', 'project_name', 'team', 'priority', 'status', 'date_start', 'date_end', 'description')
    search_fields = ('project_name', 'description')

admin.site.register(m.Tasks)
admin.site.register(m.Priorities)
admin.site.register(m.Statuses)
admin.site.register(m.Teams)
admin.site.register(m.Accountteams)