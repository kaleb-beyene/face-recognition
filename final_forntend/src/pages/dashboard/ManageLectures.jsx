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
import { authorsTableData } from "@/data";
import { useDispatch, useSelector } from 'react-redux';
import { getAllFaculties } from '@/feature/faculySlice';
import { getAllCourses } from '@/feature/courseSlice';
import { createLecture, getAllLectures } from '@/feature/lectureSlice';

export function ManageLectures() {
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [faculty, setFaculty] = useState('');
  const [course, setCourse] = useState('');


  const { faculties } = useSelector((state) => state.faculty)

  const { courses } = useSelector((state) => state.course)

  const { lectures, status: lectureStatus, lecture, error: lectureError } = useSelector((state) => state.lecture)


  useEffect(() => {
    dispatch(getAllFaculties());
    dispatch(getAllLectures())
    dispatch(getAllCourses());
  }, []);


  const handleOpen = () => setOpen(!open);

  const handleAddLecture = () => {
    if (name && email && phone && faculty && course) {

      const formData = {
        name: name,
        email: email,
        phoneNumber: phone,
        courseId: course,
        facultyId: faculty
      }

      console.log(formData, "formData")

      dispatch(createLecture(formData));
      setOpen(false)

      setName('');
      setEmail('');
      setPhone('');
      setFaculty('');
      setCourse('');
    } else {
      alert('Please fill out all fields.');
    }
  };

  useEffect(() => {
    if (lectureStatus === "succeeded") {
      setOpen(false)
    }
  }, [])

  function formatDate(dateString) {
    return new Date(dateString).toISOString().split('T')[0].replace(/-/g, '.');
  }


  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <div className='flex justify-between items-center'>
          <Typography variant="h6" color="black" className='p-4'>
            Lectures
          </Typography>
          <Button onClick={handleOpen} className='w-40 items-center gap-2 m-2 flex'>
            <PlusIcon className="h-5 w-5 text-inherit text-rose-200" />
            <span>Add Lecture</span>
          </Button>
        </div>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Name", "Email", "Phone No.", "Faculty", "Date Registered", "Setting"].map((el) => (
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
                                {facultyId?.name && facultyId?.name}
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

      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Add New Lecture</DialogHeader>
        <DialogBody divider className="grid gap-4">
          <Input label="Name" size="lg" value={name} onChange={(e) => setName(e.target.value)} />
          <Input label="Email" size="lg" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input label="Phone No." size="lg" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <Select label="Select Faculty" value={faculty} onChange={(e) => setFaculty(e)}>
            {faculties.map((faculty) => (
              <Option key={faculty._id} value={faculty._id}>{faculty.name}</Option>
            ))}
          </Select>
          <Select label="Select Course" value={course} onChange={(e) => setCourse(e)}>
            {courses.map((course) => (
              <Option key={course._id} value={course._id}>{course.name}</Option>
            ))}
          </Select>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
            Cancel
          </Button>
          <Button variant="gradient" color="green" onClick={handleAddLecture} disabled={lectureStatus !== "succeeded"}>
            {lectureStatus === "loading" ? "Loading..." : "Add"}
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default ManageLectures;
