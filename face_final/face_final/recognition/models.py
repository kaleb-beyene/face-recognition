# recognition/models.py
from django.db import models
import numpy as np

class Student(models.Model):
    name = models.CharField(max_length=100)
    face_encoding = models.BinaryField()

    def save_face_encoding(self, face_encoding):
        """
        Method to save the face encoding as binary data.
        """
        self.face_encoding = face_encoding.tobytes()
        self.save()

    def get_face_encoding(self):
        """
        Method to retrieve the face encoding as numpy array.
        """
        return np.frombuffer(self.face_encoding)

class Attendance(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    time = models.TimeField(auto_now_add=True)
