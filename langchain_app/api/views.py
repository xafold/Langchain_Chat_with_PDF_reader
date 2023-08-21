from rest_framework.views import APIView
from rest_framework import status
from rest_framework.parsers import MultiPartParser
from langchain_app.api.serializers import *
from rest_framework.response import Response

class FileUploadView(APIView):
    parser_classes = (MultiPartParser,)

    def post(self, request):
        file_data = []

        for key, file_obj in request.FILES.items():
            if key.startswith('file'):
                file_data.append({'files': file_obj})

        file_serializer = FileSerializer(data=file_data, many=True)

        if file_serializer.is_valid():
            file_serializer.save()
            return Response(file_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class LangchainView(APIView):
#     def get (self, request):
        