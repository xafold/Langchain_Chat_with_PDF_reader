from django.db import models

# Create your models here.
class UploadedFile(models.Model):
    files = models.FileField(upload_to="uploads")
    