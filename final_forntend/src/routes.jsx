import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  UserGroupIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { Home, ManageCourses, ManageLectures, ManageStudents, CreateVenue, TakeAttendace, ViewAttendace, Students, DownloadAttendace, SessionPage } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Manage Courses",
        path: "/manage-courses",
        element: <ManageCourses />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Create Venue",
        path: "/create",
        element: <CreateVenue />,
      },
      {
        icon: <UsersIcon {...icon} />,
        name: "Manage Lectures",
        path: "/manage-lectures",
        element: <ManageLectures />,
      },
      {
        icon: <UserGroupIcon {...icon} />,
        name: "Manage Students",
        path: "/manage-students",
        element: <ManageStudents />,
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "Create Session",
        path: "/session",
        element: <SessionPage />,
      },

    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export const staffRoutes = [
  {
    layout: "dashboard",
    pages: [

      {
        icon: <HomeIcon {...icon} />,
        name: "Take Attendace",
        path: "/take-attendance",
        element: <TakeAttendace />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "View Attendance",
        path: "/view-attendace",
        element: <ViewAttendace />,
      },
      {
        icon: <UserGroupIcon {...icon} />,
        name: "Students",
        path: "/students",
        element: <Students />,
      },
      // {
      //   icon: <FolderArrowDownIcon {...icon} />,
      //   name: "Download Attendace",
      //   path: "/download-attendace",
      //   element: <DownloadAttendace />,
      // },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export const studentRoutes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Take Attendace",
        path: "/take-attendance",
        element: <TakeAttendace />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "View Attendance",
        path: "/view-attendace",
        element: <ViewAttendace />,
      },
      {
        icon: <UserGroupIcon {...icon} />,
        name: "Students",
        path: "/students",
        element: <Students />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Download Attendace",
        path: "/download-attendace",
        element: <DownloadAttendace />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default { routes, staffRoutes, studentRoutes }