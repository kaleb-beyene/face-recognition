// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authSlice from "./feature/authSlice"
import faculySlice from './feature/faculySlice';
import courseSlice from './feature/courseSlice';
import lectureSlice from "./feature/lectureSlice";
import studentSlice from "./feature/studentSlice";
import venueSlice from './feature/venueSlice';
import sesionSlice from "./feature/sessionSlice";
import recognitionSlice from './feature/recognitionSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    faculty: faculySlice,
    course: courseSlice,
    lecture: lectureSlice,
    student: studentSlice,
    venue: venueSlice,
    session: sesionSlice,
    recognition: recognitionSlice
  },
});

export default store;
