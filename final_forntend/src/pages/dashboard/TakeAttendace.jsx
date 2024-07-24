
import React, { useState, useRef, useEffect } from 'react';
import {
  Card,
  CardBody,
  Typography,
  Button,
  Select,
  Option
} from "@material-tailwind/react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Webcam from "react-webcam";
import { useDispatch, useSelector } from 'react-redux';
import { getAllSessions } from '@/feature/sessionSlice';
import { getAllFaculties } from '@/feature/faculySlice';
import { getAllCourses } from '@/feature/courseSlice';
import { getAllVenues } from '@/feature/venueSlice';
import { getRecgnizedImageInfo } from '@/feature/recognitionSlice';
import { getSessionByStudent } from '@/feature/sessionSlice';

export function TakeAttendace() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllFaculties())
    dispatch(getAllVenues())
    dispatch(getAllCourses())
    dispatch(getAllSessions())
  }, [dispatch]);

  const { faculties } = useSelector((state) => state.faculty)

  const { courses } = useSelector((state) => state.course)

  const { venues } = useSelector(state => state.venue);

  const { recognition, statusRecognition, error: recognitionError } = useSelector(state => state.recognition);

  console.log(recognition, "recognition")

  const { sessions, status: sessionStatus, error: sessionError } = useSelector(state => state.session)

  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [selectedVenue, setSelectedVenue] = useState('');

  const [webcamOpen, setWebcamOpen] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);

  const webcamRef = React.useRef(null);

  const handleStartWebcam = () => {
    setWebcamOpen(true);
    setCapturedPhoto(null);
  };
  const handleStopWebcam = () => {
    setWebcamOpen(false);
  }


  const handleStop = () => {
    setWebcamOpen(false);
    setCapturedPhoto(null);
  }


  const handleCapturePhoto = () => {
    const photo = webcamRef.current.getScreenshot();
    setCapturedPhoto(photo);
    handleStopWebcam();

    handleAddStudent(photo);
  };


  const handleAddStudent = async (photo) => {
    const data = new FormData();

    const response = await fetch(photo);
    const blob = await response.blob();
    //

    data.append('image', blob, 'profile.jpg');

    const resultAction = await dispatch(getRecgnizedImageInfo(data));

  };

  useEffect(() => {
    if (statusRecognition === "succeeded") {
      const getSession = async () => {
        const name = recognition?.recognized_students[0];

        const formData = { name: name };

        await dispatch(getSessionByStudent(formData))
      }

      getSession()
    }
  }, [statusRecognition])


  const [filteredSessions, setFilteredSessions] = useState([]);

  useEffect(() => {
    const filterSessions = () => {
      const filtered = sessions?.filter(session => {
        const matchesCourse = selectedCourse ? session.courseId._id === selectedCourse : true;
        const matcheFaculty = selectedFaculty ? session.facultyId._id === selectedFaculty : true;
        const matchesVenue = selectedVenue ? session.venueId._id === selectedVenue : true;
        return matchesCourse && matcheFaculty && matchesVenue;
      });
      setFilteredSessions(filtered);
    };

    filterSessions();
  }, [sessions, selectedCourse, selectedFaculty, selectedVenue]);

return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <div className="flex flex gap-4">
        {
          faculties?.length > 0 && <Select label="Select Faculty" value={selectedFaculty} onChange={(e) => setSelectedFaculty(e)}>
            {faculties.map((faculty) => (
              <Option key={faculty._id} value={faculty._id}>{faculty.name}</Option>
            ))}
          </Select>
        }
        {
          courses?.length > 0 && <Select label="Select Course" value={selectedCourse} onChange={(e) => setSelectedCourse(e)}>
            {courses.map((course) => (
              <Option key={course._id} value={course._id}>{course.name}</Option>
            ))}
          </Select>
        }
        {venues?.length > 0 && <Select label="Select Venue" value={selectedVenue} onChange={(e) => setSelectedVenue(e)}>
          {venues.map((venue) => (
            <Option key={venue._id} value={venue._id}>{venue.location}</Option>
          ))}
        </Select>}
      </div>

      {webcamOpen && (
        <div className="flex flex-col items-center">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="mb-4"
            width={400}
            height={450}
          />
          <Button onClick={handleCapturePhoto}>
            Capture Photo
          </Button>
        </div>
      )}

      {capturedPhoto && (
        <div className="flex flex-col items-center">
          <img src={capturedPhoto} alt="Captured" width={"400"} height={"400"} className="mb-4" />
        </div>
      )}

      {
        capturedPhoto && (
          statusRecognition === "loading" ? (
            <p className='text-center'>Data Loading...</p>
          ) : (
            recognition?.status === "success" ?
              <div>
                <p className='text-green-500 font-medium text-[15px] text-center'>User Recognized Successfully</p>
                <div className='flex justify-center font-bold text-green-500'>
                  <p>Name:  <span>{recognition?.recognized_students[0]}</span></p>
                </div>
              </div>
              :
              <p className='text-red-500 font-medium text-[15px] text-center'>User Not Recognized, try again</p>
          )
        )
      }


      <div className='flex justify-between'>
        <Button className="items-center gap-2 m-2 flex" onClick={handleStartWebcam}>
          <span>Launch Facial Recognition</span>
        </Button>

        <Button className="items-center gap-2 m-2 flex" onClick={handleStop}>
          <span>Exit Recognition</span>
        </Button>

      </div>

<Card>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Registration No.", "Name", "Faculty", "Course", "Venue", "Attendance", "Setting"].map((el) => (
                  <th key={el} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                    <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            {sessionStatus === "succeeded" ? (
              <tbody>
                {filteredSessions.length > 0 ? filteredSessions.map((session, key) => {
                  const className = `py-3 px-5 ${key === filteredSessions.length - 1 ? "" : "border-b border-blue-gray-50"}`;
                  return (
                    <tr key={session._id}>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          SUT-{session._id?.slice(0, 5)}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {session.student.name}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {session.facultyId.name}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {session.courseId.name}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {session.venueId.location}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {session.status}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography as="a" href="#" className="text-xs font-semibold text-blue-gray-600 flex gap-5">
                          <PencilSquareIcon strokeWidth={2} className="h-5 w-5 text-inherit text-rose-200" color='red' />
                          <TrashIcon strokeWidth={2} className="h-5 w-5 text-inherit text-rose-200" color='red' />
                        </Typography>
                      </td>
                    </tr>
                  );
                }) : (
                  <tr>
                    <td colSpan="7" className="text-center py-3 px-5 text-blue-gray-600">
                      No content matching the selected filters.
                    </td>
                  </tr>
                )}
              </tbody>
            ) : (
              "Loading..."
            )}
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default TakeAttendace;