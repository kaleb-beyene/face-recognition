 import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import { logout } from "../../feature/authSlice";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  ArrowLeftIcon,
  Cog6ToothIcon
} from "@heroicons/react/24/solid";

export function Sidenav({ brandImg, brandName, routes }) {
  const dispatcht = useDispatch();
  const navigate = useNavigate()


  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };

  const icon = {
    className: "w-5 h-5 text-inherit",
  };

  const handleLogout = () => {
    dispatcht(logout());
    localStorage.clear();
    navigate("/auth/sign-in");

    // window.location.href = "http://localhost:5173/auth/sign-in"
  }

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${openSidenav ? "translate-x-0" : "-translate-x-80"
        } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
    >
      <div
        className={`relative`}
      >
        <Link to="/" className="py-6 px-8 text-center">
          <Typography
            variant="h6"
            color={sidenavType === "dark" ? "white" : "blue-gray"}
          >
            Attendace
          </Typography>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="m-4">
        {routes.map(({ layout, title, pages }, key) => (
          layout == "dashboard" && <ul key={key} className="mb-4 flex flex-col gap-1">
            {pages.map(({ icon, name, path }) => (
              <li key={name}>
                <NavLink to={`/${layout}${path}`}>
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "gradient" : "text"}
                      color={
                        isActive
                          ? sidenavColor
                          : sidenavType === "dark"
                            ? "white"
                            : "blue-gray"
                      }
                      className="flex items-center gap-4 px-4 capitalize"
                      fullWidth
                    >
                      {icon}
                      <Typography
                        color="inherit"
                        className="font-medium capitalize"
                      >
                        {name}
                      </Typography>
                    </Button>
                  )}
                </NavLink>
              </li>
            ))}

            <li className="pt-20">
              <NavLink to={`/`}>
                <Button
                  variant={"text"}
                  color={
                    "blue-gray"
                  }
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
                  <Cog6ToothIcon {...icon} />
                  <Typography
                    color="inherit"
                    className="font-medium capitalize"
                  >
                    Setting
                  </Typography>
                </Button>
              </NavLink>
            </li>
            <li className="pt-1">
              <NavLink to={`/auth/sign-in`}>
                <Button
                  variant={"text"}
                  color={
                    "blue-gray"
                  }
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
                  <ArrowLeftIcon {...icon} />
                  <Typography
                    color="inherit"
                    className="font-medium capitalize"
                    onClick={handleLogout}
                  >
                    Logout
                  </Typography>
                </Button>
              </NavLink>
            </li>
          </ul>
        ))}
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/logo-ct.png",
  brandName: "Material Tailwind React",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";

export default Sidenav;
