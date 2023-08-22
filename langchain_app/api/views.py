from rest_framework.views import APIView
from rest_framework import status
from rest_framework.parsers import MultiPartParser
from langchain_app.api.serializers import *
from rest_framework.response import Response
from dotenv import load_dotenv
from langchain_app.utils import get_pdf_text, get_text_chunks, get_vector_store, get_conversation_chain
import os

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

class SendMessageView(APIView):
    def post(self, request):
        message = request.data.get("message")
        print(message)
        if message is not None:
            return Response({"msg": "Message received"}, status=status.HTTP_201_CREATED)
        else:
            return Response({"msg": "Message is missing"}, status=status.HTTP_400_BAD_REQUEST)

class ProcessView(APIView):
    def post (self, request):
        load_dotenv()
    
        uploads_folder = "/home/xafold/projects/langchain/uploads/"
        file_paths = [os.path.join(uploads_folder, filename) for filename in os.listdir(uploads_folder) if filename.lower().endswith(".pdf")]
        #Getting the pdf
        pdf_text = get_pdf_text(file_paths)
        
        #Getting the text chunks
        text_chunk = get_text_chunks(pdf_text)
        
        #Creating the vector store 
        vectorstore = get_vector_store(text_chunk)
        
        #Creating conversation chain
        conversation = get_conversation_chain(vectorstore)