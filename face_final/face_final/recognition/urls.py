# recognition/urls.py
from django.urls import path
from .views import add_student_face, recognize_and_mark_attendance

urlpatterns = [
    path('add_student_face/', add_student_face, name='add_student_face'),
    path('recognize_and_mark_attendance/', recognize_and_mark_attendance, name='recognize_and_mark_attendance'),
]
