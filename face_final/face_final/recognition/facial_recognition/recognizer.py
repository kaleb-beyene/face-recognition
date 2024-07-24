import cv2
import numpy as np
import os

# Define the path to the trainer.yml file
trainer_file_path = os.path.join(os.path.dirname(__file__), 'trainer.yml')

# Check if the trainer.yml file exists
if not os.path.isfile(trainer_file_path):
    print(f"Error: The trainer.yml file does not exist at {trainer_file_path}")
    exit()

# Load the LBPH recognizer
recognizer = cv2.face.LBPHFaceRecognizer_create()

# Attempt to read the trainer.yml file
try:
    recognizer.read(trainer_file_path)
except cv2.error as e:
    print(f"Error: Failed to read the trainer.yml file: {e}")
    exit()

# Load the cascade classifier for detecting faces
cascade_path = cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
face_cascade = cv2.CascadeClassifier(cascade_path)

# Function to recognize faces in an image
def recognize_face(image_path):
    """
    Recognizes faces in an image and returns the predicted ID and confidence score.

    Args:
        image_path (str): Path to the image file.

    Returns:
        tuple: A tuple containing the predicted face ID (if recognized) and confidence score (0-100),
               or (None, None) if no face is detected or confidence is too low.

    Raises:
        ValueError: If the image file cannot be read.
    """

    # Check if the image file exists
    if not os.path.isfile(image_path):
        raise ValueError(f"Error: Image file not found: {image_path}")

    img = cv2.imread(image_path)
    if img is None:
        raise ValueError(f"Error: Failed to read image file: {image_path}")

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.2, 5)

    for (x, y, w, h) in faces:
        id, confidence = recognizer.predict(gray[y:y+h, x:x+w])
        # Adjust confidence threshold as needed
        if confidence < 75:  # Example threshold adjustment
            return id, 100 - confidence
    return None, None