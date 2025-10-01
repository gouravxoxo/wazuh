import { Outlet } from 'react-router-dom';
import EmployeeSidebar from './EmployeeSidebar.jsx';
import Topbar from './Topbar.jsx';
import PageShell from './PageShell.jsx';

function EmployeeLayout() {
  return (
    <PageShell sidebar={<EmployeeSidebar />}>
      <Topbar />
      <div className="content-wrapper">
        <Outlet />
      </div>
    </PageShell>
  );
}

export default EmployeeLayout;
