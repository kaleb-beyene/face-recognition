import React, { useEffect, useState } from 'react';
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
import { PlusIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { authorsTableData, avenueTableData } from "@/data";
import { createVenue, getAllVenues } from '@/feature/venueSlice';
import { getAllFaculties } from '@/feature/faculySlice';
import { getAllCourses } from '@/feature/courseSlice';


export function CreateVenue() {
  const dispatch = useDispatch();

  const [openVenue, setOpneVenue] = useState(false);

  const [location, setLocation] = useState('');
  const [faculty, setFaculty] = useState('');


  const handleOpenVenue = () => setOpneVenue(!openVenue);

  const hanleAddVenue = () => {
    if (location && faculty) {
      console.log({
        location,
        faculty,
      });
      const formData = {
        location: location,
        facultyId: faculty,
      }

      console.log(formData, "formData")

      dispatch(createVenue(formData));

      setOpneVenue(false)

      setLocation(false);
      setFaculty('');
    } else {
      alert('Please fill out all fields.');
    }
  };


  useEffect(() => {
    dispatch(getAllVenues());
    dispatch(getAllFaculties());
    dispatch(getAllCourses());
  }, [])

  const { faculties } = useSelector((state) => state.faculty)

  const { courses } = useSelector((state) => state.course)

  const { venues, status: venueStatus, error: venueError } = useSelector(state => state.venue);

  function formatDate(dateString) {
    return new Date(dateString).toISOString().split('T')[0].replace(/-/g, '.');
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">

      <Card>
        <Typography variant="h6" color="black" className='p-4'>
          <div className='flex justify-between items-center'>
            <Typography variant="h6" color="black" className='p-4'>
              Venue
            </Typography>
            <Button className='w-40 items-center gap-2 m-2 flex' onClick={handleOpenVenue}><PlusIcon className="h-5 w-5 text-inherit text-rose-200" /><span>Add Venue</span></Button>
          </div>
        </Typography>
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
                venueStatus === "succeeded" ? <>
                  {venues.map(
                    ({ location, createdBy, facultyId, createdAt }, key) => {
                      const className = `py-3 px-5 ${key === authorsTableData.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                        }`;

                      return (
                        <tr key={key}>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {location}
                            </Typography>

                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {createdBy.email}
                            </Typography>

                          </td>

                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {createdBy.phoneNumber}
                            </Typography>

                          </td>

                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {facultyId.name}
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

      <Dialog open={openVenue} handler={handleOpenVenue}>
        <DialogHeader>Add New Lecture</DialogHeader>
        <DialogBody divider>
          <div className="flex flex-col gap-4">
            <Input label="Venue Name" value={location} onChange={(e) => setLocation(e.target.value)} />
            <Select label="Select Faculty" value={faculty} onChange={(e) => setFaculty(e)}>
              {faculties.map((faculty) => (
                <Option key={faculty._id} value={faculty._id}>{faculty.name}</Option>
              ))}
            </Select>

          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={handleOpenVenue}>
            Cancel
          </Button>
          <Button variant="gradient" color="green" onClick={hanleAddVenue} disabled={venueStatus !== "succeeded"}>
            {venueStatus === "loading" ? "Loading..." : "Add"}
          </Button>
        </DialogFooter>
      </Dialog>

    </div >
  );
}

export default CreateVenue;
