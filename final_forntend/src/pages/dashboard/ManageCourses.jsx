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
import { statisticsCardsData, facultyListData, courseTableData } from "@/data";
import { StatisticsCard2 } from "@/widgets/cards";
import { createCourse, getAllCourses } from '@/feature/courseSlice';
import { useDispatch, useSelector } from 'react-redux';
import { createFaculty, getAllFaculties } from '@/feature/faculySlice';


export function ManageCourses() {
  const dispatch = useDispatch()

  // State management for Course modal
  const [openCourse, setOpenCourse] = useState(false);
  const [courseName, setCourseName] = useState('');
  const [courseFaculty, setCourseFaculty] = useState('');

  // State management for Unit modal
  const [openUnit, setOpenUnit] = useState(false);
  const [unitCode, setUnitCode] = useState('');
  const [unitName, setUnitName] = useState('');
  const [unitCourse, setUnitCourse] = useState('');

  // State management for Faculty modal
  const [openFaculty, setOpenFaculty] = useState(false);
  const [facultyCode, setFacultyCode] = useState('');
  const [facultyName, setFacultyName] = useState('');

  const handleOpenCourse = () => setOpenCourse(!openCourse);
  const handleOpenUnit = () => setOpenUnit(!openUnit);
  const handleOpenFaculty = () => setOpenFaculty(!openFaculty);


  useEffect(() => {
    dispatch(getAllFaculties());
    dispatch(getAllCourses());
  }, []);


  const { faculties, status: facultyStatus, error: facultyError } = useSelector((state) => state.faculty)

  const { courses, status: courseStatus, error: courseError } = useSelector((state) => state.course)

  const handleAddCourse = () => {
    if (courseName && courseFaculty) {
      console.log({
        courseName,
        courseFaculty
      });
      const formData = {
        name: courseName,
        facultyId: courseFaculty
      }

      dispatch(createCourse(formData));

      setOpenCourse(false);
      setCourseName('');
      setCourseFaculty('');
    } else {
      alert('Please fill out all fields.');
    }
  };

  const handleAddUnit = () => {
    if (unitCode && unitName && unitCourse) {
      console.log({
        unitCode,
        unitName,
        unitCourse
      });
      setOpenUnit(false);
      setUnitCode('');
      setUnitName('');
      setUnitCourse('');
    } else {
      alert('Please fill out all fields.');
    }
  };

  const handleAddFaculty = () => {
    if (facultyName) {
      console.log({
        facultyName
      });
      const formatDate = {
        name: facultyName
      }

      dispatch(createFaculty(formatDate))

      setOpenFaculty(false);
      setFacultyName('');
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
        {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard2
            key={title}
            {...rest}
            footer={footer}
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
              Courses
            </Typography>
            <Button onClick={handleOpenCourse} className='w-40 items-center gap-2 m-2 flex'>
              <PlusIcon className="h-5 w-5 text-inherit text-rose-200" />
              <span>Add Course</span>
            </Button>
          </div>
        </Typography>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Name", "Faculty", "Total Students", "Date Posted", "Setting"].map((el) => (
                  < th key={el} className="border-b border-blue-gray-50 py-3 px-5 text-left" >
                    <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {courseStatus === "succeeded" ? <> {courses.map(
                (course, index) => {
                  const className = `py-3 px-5 ${index === courseTableData.length - 1 ? "" : "border-b border-blue-gray-50"}`;
                  return (
                    <tr key={course._id}>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">{course.name}</Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">{course.faculty.name}</Typography>

                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">6</Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">{formatDate(course.createdAt)}</Typography>
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
              )}</> : <p className='font-medium text-base text-slate-300 px-10 py-5'>Loading ...</p>}
            </tbody>
          </table>
        </CardBody>
      </Card>

      {/* <Card>
        <Typography variant="h6" color="black" className='p-4'>
          <div className='flex justify-between items-center'>
            <Typography variant="h6" color="black" className='p-4'>
              Unit
            </Typography>
            <Button onClick={handleOpenUnit} className='w-40 items-center gap-2 m-2 flex'>
              <PlusIcon className="h-5 w-5 text-inherit text-rose-200" />
              <span>Add Unit</span>
            </Button>
          </div>
        </Typography>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Unit Code", "Name", "Course", "Total Students", "Date Created", "Setting"].map((el) => (
                  <th key={el} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                    <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {unitTableData.map(
                ({ unitCode, name, course, totalStudents, date }, key) => {
                  const className = `py-3 px-5 ${key === unitTableData.length - 1 ? "" : "border-b border-blue-gray-50"}`;
                  return (
                    <tr key={name}>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">{unitCode}</Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">{name}</Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">{course}</Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">{totalStudents}</Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">{date}</Typography>
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
      </Card> */}

      <Card>
        <Typography variant="h6" color="black" className='p-4'>
          <div className='flex justify-between items-center'>
            <Typography variant="h6" color="black" className='p-4'>
              Faculty
            </Typography>
            <Button onClick={handleOpenFaculty} className='w-40 items-center gap-2 m-2 flex'>
              <PlusIcon className="h-5 w-5 text-inherit text-rose-200" />
              <span>Add Faculty</span>
            </Button>
          </div>
        </Typography>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Code", "Name", "Total Courses", "Total Students", "Total Lectures", "Date Created", "Setting"].map((el) => (
                  <th key={el} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                    <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {facultyStatus === "succeeded" ? <> {faculties.map(
                (faculty, index) => {
                  const className = `py-3 px-5 ${index === faculties.length - 1 ? "" : "border-b border-blue-gray-50"}`;
                  return (
                    <tr key={faculty._id}>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">{faculty._id}</Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">{faculty.name}</Typography>

                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">8</Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">5</Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">4</Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">{formatDate(faculty.createdAt)}</Typography>
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
              )}</> : <p className='font-medium text-base text-slate-300 px-10 py-5'>Loading ...</p>}
            </tbody>
          </table>
        </CardBody>
      </Card>

      {/* Add Course Modal */}
      <Dialog open={openCourse} handler={handleOpenCourse}>
        <DialogHeader>Add New Course</DialogHeader>
        <DialogBody divider>
          <div className="flex flex-col gap-4">
            <Input label="Course Name" value={courseName} onChange={(e) => setCourseName(e.target.value)} />
            <Select label="Select Faculty" value={courseFaculty} onChange={(e) => setCourseFaculty(e)}>
              {faculties.map((faculty) => (
                <Option key={faculty._id} value={faculty._id}>{faculty.name}</Option>
              ))}
            </Select>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={handleOpenCourse}>
            Cancel
          </Button>
          <Button variant="gradient" color="green" onClick={handleAddCourse}>
            Add
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Add Unit Modal */}
      <Dialog open={openUnit} handler={handleOpenUnit}>
        <DialogHeader>Add New Unit</DialogHeader>
        <DialogBody divider>
          <div className="flex flex-col gap-4">
            <Input label="Unit Code" value={unitCode} onChange={(e) => setUnitCode(e.target.value)} />
            <Input label="Unit Name" value={unitName} onChange={(e) => setUnitName(e.target.value)} />
            <Input label="Course" value={unitCourse} onChange={(e) => setUnitCourse(e.target.value)} />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={handleOpenUnit}>
            Cancel
          </Button>
          <Button variant="gradient" color="green" onClick={handleAddUnit}>
            Add
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Add Faculty Modal */}
      <Dialog open={openFaculty} handler={handleOpenFaculty}>
        <DialogHeader>Add New Faculty</DialogHeader>
        <DialogBody divider>
          <div className="flex flex-col gap-4">
            <Input label="Faculty Name" value={facultyName} onChange={(e) => setFacultyName(e.target.value)} />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={handleOpenFaculty}>
            Cancel
          </Button>
          <Button variant="gradient" color="green" onClick={handleAddFaculty}>
            Add
          </Button>
        </DialogFooter>
      </Dialog>

    </div >
  );
}

export default ManageCourses;
