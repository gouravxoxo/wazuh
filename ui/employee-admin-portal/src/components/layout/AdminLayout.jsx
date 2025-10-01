import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar.jsx';
import Topbar from './Topbar.jsx';
import PageShell from './PageShell.jsx';

function AdminLayout() {
  return (
    <PageShell sidebar={<AdminSidebar />}>
      <Topbar />
      <div className="content-wrapper">
        <Outlet />
      </div>
    </PageShell>
  );
}

export default AdminLayout;
