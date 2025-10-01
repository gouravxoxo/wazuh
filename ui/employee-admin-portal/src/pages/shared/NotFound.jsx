import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="text-center">
        <div className="display-1 fw-bold text-primary">404</div>
        <p className="lead text-muted">The page you were looking for could not be found.</p>
        <Link to="/admin/auth/signin" className="btn btn-primary">
          Back to Portal
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
