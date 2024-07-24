import os
import cv2
import numpy as np
from recognition.models import User

def train_recognizer(data_path):
    recognizer = cv2.face.LBPHFaceRecognizer_create()
    detector = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

    faces = []
    ids = []

    image_paths = [os.path.join('recognition./facial_recognition/dataset', f) for f in os.listdir('recognition/facial_recognition/dataset')]

    for image_path in image_paths:
        img = cv2.imread(image_path)
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        faces_detected = detector.detectMultiScale(gray)
        
        for (x, y, w, h) in faces_detected:
            faces.append(gray[y:y + h, x:x + w])
            user_id = int(os.path.split(image_path)[-1].split(".")[1])
            ids.append(user_id)
    
    if len(faces) > 0:
        recognizer.train(faces, np.array(ids))
        model_path = 'backend/recognition/facial_recognition/trainer.yml'
        recognizer.save(model_path)
        print(f'Model trained and saved at {model_path}')
    else:
        print('No training data found. Model not trained.')
