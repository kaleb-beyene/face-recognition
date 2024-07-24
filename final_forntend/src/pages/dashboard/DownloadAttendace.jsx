import React, { useState, useRef } from 'react';
import {
  Card,
  CardBody,
  Typography,
  Avatar,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Select,
  Option
} from "@material-tailwind/react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { studentData, attendanceData } from "@/data";
import Webcam from "react-webcam";

export function DownloadAttendace() {

  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [selectedVenue, setSelectedVenue] = useState('');

  const [openStudent, setOpenStudent] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [studentRegNo, setStudentRegNo] = useState('');
  const [studentFaculty, setStudentFaculty] = useState('');
  const [studentCourse, setStudentCourse] = useState('');
  const [studentEmail, setStudentEmail] = useState('');

  const handleOpenStudent = () => setOpenStudent(!openStudent);

  const handleAddStudent = () => {
    if (studentName && studentRegNo && studentFaculty && studentCourse && studentEmail) {
      console.log({
        studentName,
        studentRegNo,
        studentFaculty,
        studentCourse,
        studentEmail
      });
      setOpenStudent(false);
      setStudentName('');
      setStudentRegNo('');
      setStudentFaculty('');
      setStudentCourse('');
      setStudentEmail('');
    } else {
      alert('Please fill out all fields.');
    }
  };

  const [webcamOpen, setWebcamOpen] = useState(false);
  const [recording, setRecording] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState(null);
  const mediaRecorderRef = useRef(null);
  const [capturedChunks, setCapturedChunks] = useState([]);

  const handleStartWebcam = () => setWebcamOpen(true);
  const handleStopWebcam = () => setWebcamOpen(false);

  const handleStartRecording = () => {
    setRecording(true);
    setCapturedChunks([]);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm"
    });

    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.addEventListener(
      "stop",
      handleSaveRecording
    );
    mediaRecorderRef.current.start();
  };

  const handleDataAvailable = ({ data }) => {
    if (data.size > 0) {
      setCapturedChunks((prev) => prev.concat(data));
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const handleSaveRecording = () => {
    if (capturedChunks.length > 0) {
      const blob = new Blob(capturedChunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      setRecordedVideo(url);
      setCapturedChunks([]); // Clear the captured chunks after saving
      handleStopWebcam();
    }
  };

  const webcamRef = useRef(null);

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">

      <div className='flex justify-between'>
        <Button className='items-center gap-2 m-2 flex'>
          <span>Export Attendace as Excel</span>
        </Button>
      </div>

      <Card>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Registration No.", "Name", "Course", "Attendace", "Setting"].map((el) => (
                  <th key={el} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                    <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {attendanceData.map(
                ({ registrationNo, name, course, attendance }, key) => {
                  const className = `py-3 px-5 ${key === studentData.length - 1 ? "" : "border-b border-blue-gray-50"}`;
                  return (
                    <tr key={name}>

                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {registrationNo}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {name}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {course}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {attendance}
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
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>

      {/* Add Student Modal */}
      <Dialog open={openStudent} handler={handleOpenStudent}>
        <DialogHeader>Add New Student</DialogHeader>
        <DialogBody divider>
          <div className="flex flex-col gap-4">
            <Input label="Student Name" value={studentName} onChange={(e) => setStudentName(e.target.value)} />
            <Input label="Registration No." value={studentRegNo} onChange={(e) => setStudentRegNo(e.target.value)} />
            <Select label="Faculty" value={studentFaculty} onChange={(e) => setStudentFaculty(e.target.value)}>
              <Option value="Science">Science</Option>
              <Option value="Arts">Arts</Option>
              <Option value="Commerce">Commerce</Option>
            </Select>
            <Select label="Course" value={studentCourse} onChange={(e) => setStudentCourse(e.target.value)}>
              <Option value="B.Sc">B.Sc</Option>
              <Option value="B.A">B.A</Option>
              <Option value="B.Com">B.Com</Option>
            </Select>

            <Input label="Student Email" value={studentEmail} onChange={(e) => setStudentEmail(e.target.value)} />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={handleOpenStudent}>
            Cancel
          </Button>
          <Button variant="gradient" color="green" onClick={handleAddStudent}>
            Add
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default DownloadAttendace;
