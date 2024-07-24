import React, { useState, useEffect } from 'react';
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
import { PlusIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { authorsTableData, statisticsCardsData, studentData } from "@/data";
import { StatisticsCard } from "@/widgets/cards";
import { useDispatch, useSelector } from 'react-redux';
import { getAllFaculties } from '@/feature/faculySlice';
import { getAllCourses } from '@/feature/courseSlice';
import { createLecture, getAllLectures } from '@/feature/lectureSlice';
import { getAllStudents, createStudent } from '@/feature/studentSlice';


export function Home() {
  const dispatch = useDispatch()
  // State management for Lecture modal
  const [openLecture, setOpenLecture] = useState(false);
  const [lectureName, setLectureName] = useState('');
  const [lectureEmail, setLectureEmail] = useState('');
  const [lecturePhone, setLecturePhone] = useState('');
  const [lectureFaculty, setLectureFaculty] = useState('');
  const [lectureCourse, setLectureCourse] = useState('');


  // State management for Student modal
  const [openStudent, setOpenStudent] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [studentRegNo, setStudentRegNo] = useState('');
  const [studentFaculty, setStudentFaculty] = useState('');
  const [studentCourse, setStudentCourse] = useState('');
  const [studentEmail, setStudentEmail] = useState('');

  const { faculties } = useSelector((state) => state.faculty)

  const { courses } = useSelector((state) => state.course)

  const { lectures, status: lectureStatus, lecture, error: lectureError } = useSelector((state) => state.lecture)


  const { students, status: studentStatus, student, error } = useSelector(state => state.student);


  useEffect(() => {
    dispatch(getAllFaculties());
    dispatch(getAllLectures())
    dispatch(getAllCourses());
    dispatch(getAllStudents())
  }, []);


  const handleOpenLecture = () => setOpenLecture(!openLecture);
  const handleOpenStudent = () => setOpenStudent(!openStudent);

  const handleAddLecture = () => {
    if (lectureName && lectureEmail && lecturePhone && lectureFaculty) {
      console.log({
        lectureName,
        lectureEmail,
        lecturePhone,
        lectureFaculty,
        lectureCourse
      });
      const formData = {
        name: lectureName,
        email: lectureEmail,
        phoneNumber: lecturePhone,
        courseId: lectureCourse,
        facultyId: lectureFaculty
      }

      console.log(formData, "formData")

      dispatch(createLecture(formData));

      setOpenLecture(false);
      setLectureName('');
      setLectureEmail('');
      setLecturePhone('');
      setLectureFaculty('');
      setLectureCourse('');
    } else {
      alert('Please fill out all fields.');
    }
  };



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

  function formatDate(dateString) {
    return new Date(dateString).toISOString().split('T')[0].replace(/-/g, '.');
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <p className="font-bold text-2xl">Overview</p>
      <div className="mb-10 grid gap-y-0 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {statisticsCardsData.map(({ icon, title, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
          />
        ))}
      </div>
      <Card>
        <Typography variant="h6" color="black" className='p-4'>
          <div className='flex justify-between items-center'>
            <Typography variant="h6" color="black" className='p-4'>
              Lectures
            </Typography>
            {/* <Button onClick={handleOpenLecture} className='w-40 items-center gap-2 m-2 flex' disabled={lectureStatus !== "succeeded"}>
              <PlusIcon className="h-5 w-5 text-inherit text-rose-200" />
              <span>Add Lecture</span>
            </Button> */}
          </div>
        </Typography>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Name", "Email", "Phone No.", "Faculty", "Date Registered", "Setting"].map((el) => (
                  <th key={el} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                    <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {
                lectureStatus === "succeeded" ?
                  <>
                    {lectures.map(
                      ({ img, name, email, phoneNumber, facultyId, createdAt }, key) => {
                        const className = `py-3 px-5 ${key === authorsTableData.length - 1 ? "" : "border-b border-blue-gray-50"}`;
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
                                {email}
                              </Typography>
                            </td>
                            <td className={className}>
                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                {phoneNumber}
                              </Typography>
                            </td>
                            <td className={className}>
                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                {facultyId?.name}
                              </Typography>
                            </td>
                            <td className={className}>
                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                {formatDate(createdAt)}
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
                    )}</> : <p className='font-medium text-base text-slate-300 px-10 py-5'>Loading ...</p>
              }
            </tbody>
          </table>
        </CardBody>
      </Card>

      <Card>
        <div className='flex justify-between items-center'>
          <Typography variant="h6" color="black" className='p-4'>
            Students
          </Typography>
          {/* <Button onClick={handleOpenStudent} className='w-40 items-center gap-2 m-2 flex'>
            <PlusIcon className="h-5 w-5 text-inherit text-rose-200" />
            <span>Add Student</span>
          </Button> */}
        </div>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Name", "Registration No.", "Faculty", "Email", "Date Registered", "Setting"].map((el) => (
                  <th key={el} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                    <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {
                studentStatus === "succeeded" ? <>
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

      {/* Add Lecture Modal */}
      <Dialog open={openLecture} handler={handleOpenLecture}>
        <DialogHeader>Add New Lecture</DialogHeader>
        <DialogBody divider>
          <div className="flex flex-col gap-4">
            <Input label="Lecture Name" value={lectureName} onChange={(e) => setLectureName(e.target.value)} />
            <Input label="Lecture Email" value={lectureEmail} onChange={(e) => setLectureEmail(e.target.value)} />
            <Input label="Lecture Phone" value={lecturePhone} onChange={(e) => setLecturePhone(e.target.value)} />
            <Select label="Select Faculty" value={lectureFaculty} onChange={(e) => setLectureFaculty(e)}>
              {faculties.map((faculty) => (
                <Option key={faculty._id} value={faculty._id}>{faculty.name}</Option>
              ))}
            </Select>
            <Select label="Select Course" value={lectureCourse} onChange={(e) => setLectureCourse(e)}>
              {courses.map((course) => (
                <Option key={course._id} value={course._id}>{course.name}</Option>
              ))}
            </Select>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={handleOpenLecture}>
            Cancel
          </Button>
          <Button variant="gradient" color="green" onClick={handleAddLecture} disabled={lectureStatus !== "succeeded"}>
            {lectureStatus === "loading" ? "Loading..." : "Add"}
          </Button>
        </DialogFooter>
      </Dialog>

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

export default Home;
