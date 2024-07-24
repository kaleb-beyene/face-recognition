# recognition/views.py
from django.shortcuts import render
from django.http import JsonResponse
import cv2
import face_recognition
import numpy as np
from .models import Student, Attendance
from django.views.decorators.csrf import csrf_exempt
import base64

@csrf_exempt
def add_student_face(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        image_file = request.FILES['image']

        image = face_recognition.load_image_file(image_file)
        face_encodings = face_recognition.face_encodings(image)

        if face_encodings:
            face_encoding = face_encodings[0]
            student = Student(name=name, face_encoding=face_encoding.tobytes())
            student.save()
            return JsonResponse({'status': 'success', 'message': 'Student face encoding saved.'})
        else:
            return JsonResponse({'status': 'error', 'message': 'No face found in the image.'})

    return JsonResponse({'status': 'error', 'message': 'Invalid request method.'})


# recognition/views.py
@csrf_exempt
def recognize_and_mark_attendance(request):
    if request.method == 'POST':
        image_file = request.FILES['image']

        image = face_recognition.load_image_file(image_file)
        face_encodings = face_recognition.face_encodings(image)

        if not face_encodings:
            return JsonResponse({'status': 'error', 'message': 'No face found in the image.'})

        known_face_encodings = []
        known_face_names = []

        students = Student.objects.all()
        for student in students:
            known_face_encodings.append(np.frombuffer(student.face_encoding))
            known_face_names.append(student.name)

        recognized_students = []

        for face_encoding in face_encodings:
            matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
            name = "Unknown"

            face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)
            best_match_index = np.argmin(face_distances)
            if matches[best_match_index]:
                name = known_face_names[best_match_index]
                student = Student.objects.get(name=name)
                Attendance.objects.create(student=student)
                recognized_students.append(name)

        return JsonResponse({'status': 'success', 'recognized_students': recognized_students})

    return JsonResponse({'status': 'error', 'message': 'Invalid request method.'})
