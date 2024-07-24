import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import {
  Button,
  Input,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllFaculties, getAllFacultiesData } from '@/feature/faculySlice';
import { createSession } from '@/feature/sessionSlice';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export function SessionPage() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllFaculties())
  }, [dispatch])


  const [facultyOptions, setFacultyOptions] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [course, setCourse] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [venue, setVenue] = useState([]);
  const [days, selectDays] = useState([]);
  const [staffId, setStaffId] = useState('');
  const [startTimeHour, setStartTimeHour] = useState('');
  const [startTimeMinute, setStartTimeMinute] = useState('');
  const [endTimeHour, setEndTimeHour] = useState('');
  const [endTimeMinute, setEndTimeMinute] = useState('');
  const [totalHours, setTotalHours] = useState('');

  const { faculties, status, facult } = useSelector((state) => state.faculty)

  const { status: sessionStatus, session } = useSelector((state) => state.session)

  useEffect(() => {
    if (sessionStatus === 'succeeded') {
      toast.success('Session created successfully!');
      setFaculty([]);
      setCourse([]);
      setLectures([]);
      setSelectedStudents([]);
      setVenue([]);
      setStartTimeHour('');
      setStartTimeMinute('');
      setEndTimeHour('');
      setEndTimeMinute('');
      setTotalHours('');
    }
  }, [sessionStatus]);

  useEffect(() => {
    if (faculties.length > 0) {
      const transformedFaculties = faculties.map(faculty => ({
        value: faculty._id,
        label: faculty.name
      }));
      setFacultyOptions(transformedFaculties);
    }
  }, [faculties]);

  const hoursOptions = Array.from({ length: 24 }, (_, i) => ({ value: i.toString(), label: i.toString().padStart(2, '0') }));
  const minutesOptions = Array.from({ length: 60 }, (_, i) => ({ value: i.toString(), label: i.toString().padStart(2, '0') }));

  const handleAddStudent = () => {
    if (faculty && course && selectedStudents.length > 0 && venue) {
      const sessionData = {
        venueId: venue.value,
        // startTime: `${startTimeHour.label}:${startTimeMinute.label}`,
        // endTime: `${endTimeHour.label}:${endTimeMinute.label}`,
        // daysInAWeek: days,
        // totalHour: parseInt(totalHours),
        lectureId: lectures.value,
        courseId: course.value,
        facultyId: faculty.value,
        studentIds: selectedStudents.map(student => student.value),
      };

      console.log(sessionData, "sessionData")

      dispatch(createSession(sessionData));
    } else {
      alert('Please fill out all fields.');
    }
  };

  const handleFacultyChange = (selectedOptions) => {
    setFaculty(selectedOptions);
    const selectedFacultyId = selectedOptions.value;
    dispatch(getAllFacultiesData(selectedFacultyId));
  };

  const handleLectureId = (selectedOptions) => {
    setLectures(selectedOptions);
  };

  return (
    <div className="mt-12 mb-8 gap-12">
      <ToastContainer />
      <div className="flex flex-col gap-10 gap-4">
        <div>
          <Select
            value={faculty}
            onChange={handleFacultyChange}
            options={facultyOptions}
            placeholder="Select Faculty"
            isDisabled={status !== "succeeded"}
          />
        </div>
        <Select
          value={selectedStudents}
          onChange={setSelectedStudents}
          options={facult?.students?.map(student => ({ value: student._id, label: student.name })) || []}
          placeholder="Select Students"
          isMulti
          isDisabled={status !== "succeeded"}
        />
        <Select
          value={course}
          onChange={setCourse}
          options={facult?.courses?.map(course => ({ value: course._id, label: course.name })) || []}
          placeholder="Select Course"
          isDisabled={status !== "succeeded"}
        />
        <Select
          value={lectures}
          onChange={handleLectureId}
          options={facult?.lectures?.map(lecture => ({ value: lecture._id, label: lecture.name })) || []}
          placeholder="Select Lecture"
          isDisabled={status !== "succeeded"}
        />
        <Select
          value={venue}
          onChange={setVenue}
          options={facult?.venues?.map(venue => ({ value: venue._id, label: venue.location })) || []}
          placeholder="Select Venue"
          isDisabled={status !== "succeeded"}
        />
        <div className="gap-2">
          <div>Duration</div>
          <div className='flex gap-5'>
            <Select
              value={startTimeHour}
              isDisabled={status !== "succeeded"}
              onChange={(selectedOption) => setStartTimeHour(selectedOption)}
              options={hoursOptions}
              placeholder="Hour"
            />
            <Select
              value={startTimeMinute}
              isDisabled={status !== "succeeded"}
              onChange={(selectedOption) => setStartTimeMinute(selectedOption)}
              options={minutesOptions}
              placeholder="Minute"
            />
          </div>
        </div>

        <Button onClick={handleAddStudent} isDisabled={sessionStatus === "loading"}>{sessionStatus === "loading" ? "Loading" : "Add Session"}</Button>
      </div>
    </div >
  );
}

export default SessionPage;
