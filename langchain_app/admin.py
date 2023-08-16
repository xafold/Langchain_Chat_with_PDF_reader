from django.contrib import admin
from .models import *

# Register your models here.

@admin.register(UploadedFile)
class UploadedFileAdmin(admin.ModelAdmin):
    list_display = ['files', 'id']