import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import SidebarLogo from './SidebarLogo.jsx';

const navItems = [
  {
    label: 'Dashboard',
    icon: 'bi-speedometer2',
    to: '/employee/dashboard'
  },
  {
    label: 'All Tickets',
    icon: 'bi-list-check',
    to: '/employee/tickets'
  },
  {
    label: 'Create Ticket',
    icon: 'bi-plus-circle',
    to: '/employee/tickets/create'
  }
];

function EmployeeSidebar() {
  const { user, logout } = useAuth();

  return (
    <div className="h-100 d-flex flex-column">
      <SidebarLogo title="Vello Desk" subtitle="Employee" />
      <nav className="flex-grow-1 px-3">
        <ul className="nav flex-column gap-1">
          {navItems.map((item) => (
            <li key={item.label}>
              <NavLink className="nav-link sidebar-link" to={item.to}>
                <i className={`bi ${item.icon} me-2`}></i>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="px-3 py-4 border-top small text-muted">
        <div className="d-flex align-items-center mb-3">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="rounded-circle me-2"
            width="40"
            height="40"
          />
          <div>
            <div className="fw-semibold text-dark">{user?.name}</div>
            <div className="text-muted">Employee</div>
          </div>
        </div>
        <button type="button" className="btn btn-outline-secondary w-100" onClick={logout}>
          <i className="bi bi-box-arrow-right me-2"></i>
          Sign out
        </button>
      </div>
    </div>
  );
}

export default EmployeeSidebar;
