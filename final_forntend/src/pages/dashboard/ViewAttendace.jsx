
import React, { useState, useRef, useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { studentData } from "@/data";
import { getAllSessions } from '@/feature/sessionSlice';

export function ViewAttendace() {

  const dispatch = useDispatch();

  const { sessions, status: sessionStatus, error } = useSelector(state => state.session);

  const [openStudent, setOpenStudent] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [studentRegNo, setStudentRegNo] = useState('');
  const [studentFaculty, setStudentFaculty] = useState('');
  const [studentCourse, setStudentCourse] = useState('');
  const [studentEmail, setStudentEmail] = useState('');

  const handleOpenStudent = () => setOpenStudent(!openStudent);

  const handleAddStudent = () => {
    if (studentName && studentRegNo && studentFaculty && studentCourse && studentEmail) {
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


  useEffect(() => {
    dispatch(getAllSessions());
  }, [])

  const exportToCSV = () => {
    if (sessionStatus === "succeeded" && sessions.length > 0) {
      const headers = ["Registration No.", "Name", "Faculty", "Course", "Venue", "Attendance"];
      const rows = sessions.map(session => [
        SUT-`${session._id?.slice(0, 5)}`,
        session.student.name,
        session.facultyId.name,
        session.courseId.name,
        session.venueId.location,
        session.status
      ]);

      let csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].map(e => e.join(",")).join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "attendance.csv");
      document.body.appendChild(link);
      link.click();
    } else {
      alert('No data available to export.');
    }
  };


  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <div className='flex justify-between'>
        <Button className='items-center gap-2 m-2 flex' onClick={exportToCSV}>
          <span>Export Attendace as Excel</span>
        </Button>
      </div>

<Card>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Registration No.", "Name", "Faculty", "Course", "Venue", "Attendance"].map((el) => (
                  <th key={el} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                    <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            {
              sessionStatus === "succeeded" ?
                (
                  sessions.map((session, index) => (<tr key={session._id}>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        SUT-{session._id?.slice(0, 5)}
                      </Typography>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {session.student.name}
                      </Typography>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {session.facultyId.name}
                      </Typography>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {session.courseId.name}
                      </Typography>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {session.venueId.location}
                      </Typography>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {session.status}
                      </Typography>
                    </td>

                  </tr>))
                ) : ""
            }
            <tbody>

            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default ViewAttendace;

