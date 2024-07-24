import { Routes, Route, Navigate } from "react-router-dom";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import { routes, studentRoutes, staffRoutes } from "@/routes";
import { useMaterialTailwindController } from "@/context";
import { useSelector } from 'react-redux';


const getToken = () => localStorage.getItem("token");

const getUserRole = () => {
  return localStorage.getItem("role");
};

const ProtectedRoute = ({ element, ...rest }) => {
  const token = getToken();
  return token ? element : <Navigate to="/auth/sign-in" />;
};

export function Dashboard() {
  const { error, status, user, loginUserSuccess, loginUserLoading } = useSelector((state) => state.auth);

  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;

  const token = getToken();
  const userRole = getUserRole();

  let roleBasedRoutes;
  if (user?.role === "staff" || userRole == "staff") {
    roleBasedRoutes = staffRoutes;
  } else if (user?.role === "faculty" || userRole == "faculty") {
    roleBasedRoutes = routes;
  } else {
    roleBasedRoutes = studentRoutes;
  }

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={roleBasedRoutes}
        brandImg={
          sidenavType === "dark" ? "Attendace" : "Attendace"
        }
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />
        <Routes>
          {roleBasedRoutes.map(
            ({ layout, pages }) =>
              layout === "dashboard" &&
              pages.map(({ path, element }) => (
                <Route
                  key={path}
                  path={path}
                  element={<ProtectedRoute element={element} />}
                />
              ))
          )}
        </Routes>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
