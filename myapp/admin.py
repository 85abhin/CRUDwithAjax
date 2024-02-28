from django.contrib import admin
from .models import Studentdetails

# Register your models here.
@admin.register(Studentdetails)
class Studentadmin(admin.ModelAdmin):
    list_display=['id','name','email']
