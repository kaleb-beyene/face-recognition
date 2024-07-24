import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Select,
  Option,
  useSelect
} from "@material-tailwind/react";
import { PlusIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { studentData } from "@/data";
import Webcam from "react-webcam";
import { useDispatch, useSelector } from 'react-redux';
import { getAllStudents, createStudent } from '@/feature/studentSlice';
import { getAllFaculties } from '@/feature/faculySlice';
import { getAllCourses } from '@/feature/courseSlice';
import { addStudentImage } from '@/feature/recognitionSlice';

export function ManageStudents() {
  const dispatch = useDispatch();

  const { students, status } = useSelector(state => state.student);

  const { faculties } = useSelector((state) => state.faculty)

  const { courses } = useSelector((state) => state.course)

  useEffect(() => {
    dispatch(getAllCourses());
    dispatch(getAllFaculties());

    dispatch(getAllStudents())
  }, [])

  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [faculty, setFaculty] = useState('');
  const [course, setCourse] = useState('');
  const [email, setEmail] = useState('');

  const [webcamOpen, setWebcamOpen] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);

  const webcamRef = React.useRef(null);

  const handleStartWebcam = () => setWebcamOpen(true);
  const handleStopWebcam = () => setWebcamOpen(false);

  const handleCapturePhoto = () => {
    const photo = webcamRef.current.getScreenshot();
    setCapturedPhoto(photo);
    handleStopWebcam();
  };

  const handleOpen = () => {
    setOpen(!open);
    setWebcamOpen(false);
    setCapturedPhoto(null);
  };

  const handleAddStudent = async () => {
    if (name && phoneNumber && capturedPhoto && faculty && email) {
      const data = new FormData();

      const dataRecognition = new FormData();


      const response = await fetch(capturedPhoto);
      const blob = await response.blob();
      //

      dataRecognition.append('name', name);
      dataRecognition.append('image', blob, 'profile.jpg');

      const resultAction = await dispatch(addStudentImage(dataRecognition));

      if (addStudentImage.fulfilled.match(resultAction)) {

        data.append('name', name);
        data.append('phoneNumber', phoneNumber);
        data.append('email', email);
        data.append('facultyId', faculty);
        data.append('profileImg', blob, 'profile.jpg');



        dispatch(createStudent(data));

        setOpen(false);
        // Clear the form fields
        setName('');
        setFaculty('');
        setCourse('');
        setEmail('');
        // setStatus('');
        setCapturedPhoto(null);
      }
      else {
        alert('Failed to add student image.');
      }
    } else {
      alert('Please fill out all fields.');
    }
  };

  function formatDate(dateString) {
    return new Date(dateString).toISOString().split('T')[0].replace(/-/g, '.');
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <div className='flex justify-between items-center'>
          <Typography variant="h6" color="black" className='p-4'>
            Students
          </Typography>
          <Button onClick={handleOpen} className='w-40 items-center gap-2 m-2 flex'>
            <PlusIcon className="h-5 w-5 text-inherit text-rose-200" />
            <span>Add Student</span>
          </Button>
        </div>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Name", "Registration No.", "Faculty", "Email", "Date Registered", "Setting"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {
                status === "succeeded" ? <>
                  {students.map(
                    ({ img, name, email, _id, facultyId, createdAt }, key) => {
                      const className = `py-3 px-5 ${key === studentData.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                        }`;

                      return (
                        <tr key={name}>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              {/* <Avatar src={img} alt={name} size="sm" variant="rounded" /> */}
                              <div>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-semibold"
                                >
                                  {name}
                                </Typography>
                                <Typography className="text-xs font-normal text-blue-gray-500">
                                  {email}
                                </Typography>
                              </div>
                            </div>
                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {_id}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {facultyId.name}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {email}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {formatDate(createdAt)}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography
                              as="a"
                              href="#"
                              className="text-xs font-semibold text-blue-gray-600 flex gap-5"
                            >
                              <PencilSquareIcon
                                strokeWidth={2}
                                className="h-5 w-5 text-inherit text-rose-200"
                                color='red'
                              />
                              <TrashIcon
                                strokeWidth={2}
                                className="h-5 w-5 text-inherit text-rose-200"
                                color='red'
                              />
                            </Typography>
                          </td>
                        </tr>
                      );
                    }
                  )}</> : <p className='font-medium text-base text-slate-300 px-10 py-5'>Loading ...</p>
              }
            </tbody>
          </table>
        </CardBody>
      </Card>

      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Add New Student</DialogHeader>
        <DialogBody divider className="grid gap-4">
          <Input label="Name" size="lg" value={name} onChange={(e) => setName(e.target.value)} />
          <Input label="Phone No." size="lg" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          <Select label="Faculty" value={faculty} onChange={(e) => setFaculty(e)}>
            {faculties.map((faculty) => (
              <Option key={faculty._id} value={faculty._id}>{faculty.name}</Option>
            ))}
          </Select>
          {/* <Select label="Course" value={course} onChange={(e) => setCourse(e)}>
            {courses.map((course) => (
              <Option key={course._id} value={course._id}>{course.name}</Option>
            ))}
          </Select> */}
          <Input label="Email" size="lg" value={email} onChange={(e) => setEmail(e.target.value)} />
          {webcamOpen && (
  <div className="flex flex-col items-center">
    <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" className="mb-2" width={400} height={300} />
    <div className="flex justify-between w-full"> {/* Flex container for buttons */}
      <Button onClick={handleCapturePhoto} className="mt-1">
        Capture Photo
      </Button>
     
      <Button onClick={handleStopWebcam} className="mt-1">
        Close Webcam
      </Button>
    </div>
  </div>
)}
          
          {capturedPhoto && (
  <div className="flex justify-between items-center w-full"> {/* Flex container with adjustments */}
    <img src={capturedPhoto} alt="Captured" className="mt-1 rounded-md" />
    <div className="flex"> {/* Nested flex container for buttons */}
      <Button onClick={() => setCapturedPhoto(null)} className="mt-1">
        Retake Photo
      </Button>
      <Button onClick={handleAddStudent} variant="gradient" color="green" className="mt-1 ml-1">
        Add
      </Button>
    </div>
  </div>
)}
          {!webcamOpen && !capturedPhoto && (
            <Button onClick={handleStartWebcam} className="mt-2">
              Open Webcam
            </Button>
          )}
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
            Cancel
          </Button>
         
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default ManageStudents;
