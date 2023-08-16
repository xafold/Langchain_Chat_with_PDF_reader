from rest_framework import serializers
from langchain_app.models import *

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadedFile
        fields = ['id', 'files'] 