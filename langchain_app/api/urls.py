from .views import *
from django.contrib import admin
from django.urls import path


urlpatterns = [
    path('home/', FileUploadView.as_view(), name="file-upload"),
]
