
import React, { useState } from 'react';
import {
  Card,
  CardHeader,
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
import { studentData } from "@/data";

export function Students() {

  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [selectedVenue, setSelectedVenue] = useState('');

  const [openStudent, setOpenStudent] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [studentRegNo, setStudentRegNo] = useState('');
  const [studentFaculty, setStudentFaculty] = useState('');
  const [studentCourse, setStudentCourse] = useState('');
  const [studentEmail, setStudentEmail] = useState('');

  const handleOpenLecture = () => setOpenLecture(!openLecture);
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

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Name", "Registration No.", "Faculty", "Course", "Email", "Date Registered", "Setting"].map((el) => (
                  <th key={el} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                    <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {studentData.map(
                ({ img, name, email, registerationNo, faculty, course, date }, key) => {
                  const className = `py-3 px-5 ${key === studentData.length - 1 ? "" : "border-b border-blue-gray-50"}`;
                  return (
                    <tr key={name}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          {/* <Avatar src={img} alt={name} size="sm" variant="rounded" /> */}
                          <div>
                            <Typography variant="small" color="blue-gray" className="font-semibold">
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
                          {registerationNo}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {faculty}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {course}
                        </Typography>
                      </td>
                      <td className={className}>

Bety, [6/2/2024 8:33 PM]
<Typography className="text-xs font-semibold text-blue-gray-600">
                          {email}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {date}
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

export default Students;