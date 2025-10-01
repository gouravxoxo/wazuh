import { Navigate, Route, Routes } from 'react-router-dom';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminTickets from './pages/admin/AdminTickets.jsx';
import AdminTeamManagement from './pages/admin/AdminTeamManagement.jsx';
import EmployeeDashboard from './pages/employee/EmployeeDashboard.jsx';
import EmployeeTickets from './pages/employee/EmployeeTickets.jsx';
import EmployeeCreateTicket from './pages/employee/EmployeeCreateTicket.jsx';
import AdminSignIn from './pages/shared/AdminSignIn.jsx';
import EmployeeSignIn from './pages/shared/EmployeeSignIn.jsx';
import AdminLayout from './components/layout/AdminLayout.jsx';
import EmployeeLayout from './components/layout/EmployeeLayout.jsx';
import ProtectedRoute from './components/navigation/ProtectedRoute.jsx';
import NotFound from './pages/shared/NotFound.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/auth/signin" replace />} />
      <Route path="/admin/auth/signin" element={<AdminSignIn />} />
      <Route path="/employee/auth/signin" element={<EmployeeSignIn />} />

      <Route
        path="/admin"
        element={(
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout />
          </ProtectedRoute>
        )}
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="tickets" element={<AdminTickets />} />
        <Route path="team/*" element={<AdminTeamManagement />} />
      </Route>

      <Route
        path="/employee"
        element={(
          <ProtectedRoute allowedRoles={["employee"]}>
            <EmployeeLayout />
          </ProtectedRoute>
        )}
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<EmployeeDashboard />} />
        <Route path="tickets" element={<EmployeeTickets />} />
        <Route path="tickets/create" element={<EmployeeCreateTicket />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
