import { useAuth } from '../../context/AuthContext.jsx';

function Topbar() {
  const { user } = useAuth();

  return (
    <header className="topbar d-flex align-items-center justify-content-between px-4 py-3 border-bottom bg-white">
      <div>
        <h6 className="text-uppercase text-muted mb-0">Service Desk Portal</h6>
        <h3 className="fw-bold mb-0">Welcome back, {user?.name?.split(' ')[0]}!</h3>
      </div>
      <div className="d-flex align-items-center gap-3">
        <button type="button" className="btn btn-outline-secondary btn-sm">
          <i className="bi bi-search"></i>
        </button>
        <button type="button" className="btn btn-outline-secondary btn-sm position-relative">
          <i className="bi bi-bell"></i>
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            3
          </span>
        </button>
        <div className="d-flex align-items-center">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="rounded-circle me-2"
            width="40"
            height="40"
          />
          <div className="text-end">
            <div className="fw-semibold text-dark">{user?.name}</div>
            <small className="text-muted text-capitalize">{user?.role}</small>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
