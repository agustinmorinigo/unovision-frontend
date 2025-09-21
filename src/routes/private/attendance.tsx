import { Navigate, type RouteObject } from "react-router"
import { lazy, Suspense } from "react"
import { RoleName } from "@/client/entities"
import RoleGuard from "@/guards/role-guard"
import getDefaultRouteByRole from "@/modules/roles/utils/get-default-route-by-role"

const AttendancesPage = lazy(() => import("@/pages/attendances-page"))

const allowedRoles = [RoleName.Admin, RoleName.Accountant];

const attendanceRoutesConfig: RouteObject = {
  path: "attendance",
  element: <RoleGuard allowedRoles={allowedRoles} />,
  children: [
    {
      index: true,
      element: <Navigate to="report" replace />,
    },
    {
      path: "report",
      element: (
        <Suspense fallback={<div>Cargando...</div>}>
          <AttendancesPage />
        </Suspense>
      ),
    },
    {
      path: "*",
      element: <Navigate to={getDefaultRouteByRole()} replace />,
    },
  ],
}

export default attendanceRoutesConfig
