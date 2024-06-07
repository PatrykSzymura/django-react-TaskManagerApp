from django.contrib import admin
from .models import TeamsName, Status, Priority, Project, Task, ListTeams


class TeamsNameAdmin(admin.ModelAdmin):
    list_display = ('team_id', 'team_name')
    search_fields = ('team_name',)


class StatusAdmin(admin.ModelAdmin):
    list_display = ('id', 'status_name', 'color_nr')
    search_fields = ('status_name',)


class PriorityAdmin(admin.ModelAdmin):
    list_display = ('id', 'priority_name', 'color_number')
    search_fields = ('priority_name',)


class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'project_name', 'team', 'priority', 'status', 'date_start', 'date_end')
    search_fields = ('project_name',)
    list_filter = ('team', 'priority', 'status')
    date_hierarchy = 'date_start'


class TaskAdmin(admin.ModelAdmin):
    list_display = ('id', 'project', 'task_name', 'status', 'user_id', 'date_start', 'date_end')
    search_fields = ('task_name',)
    list_filter = ('status', 'project')
    date_hierarchy = 'date_start'


class ListTeamsAdmin(admin.ModelAdmin):
    list_display = ('id', 'team_id', 'user_id')

    list_filter = ('team_id', 'user_id')

    def __str__(self):
        return str(self.team_id)


admin.site.register(TeamsName, TeamsNameAdmin)
admin.site.register(Status, StatusAdmin)
admin.site.register(Priority, PriorityAdmin)
admin.site.register(Project, ProjectAdmin)
admin.site.register(Task, TaskAdmin)
#admin.site.register(ListTeams, ListTeamsAdmin)
