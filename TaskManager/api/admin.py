from django.contrib import admin
from . import models as m
# Register your models here.
admin.site.register(m.Projects)
admin.site.register(m.Tasks)
admin.site.register(m.Priorities)
admin.site.register(m.Statuses)
admin.site.register(m.Teams)
admin.site.register(m.Accountteams)