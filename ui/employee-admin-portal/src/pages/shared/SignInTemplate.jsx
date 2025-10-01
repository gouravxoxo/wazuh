import PropTypes from 'prop-types';

function SignInTemplate({ title, subtitle, onSubmit, loading, error }) {
  return (
    <div className="auth-page d-flex align-items-center justify-content-center min-vh-100 bg-gradient">
      <div className="card shadow-lg border-0 auth-card">
        <div className="row g-0">
          <div className="col-lg-6 d-none d-lg-block auth-illustration"></div>
          <div className="col-lg-6">
            <div className="p-5">
              <div className="mb-4 text-center">
                <div className="brand-circle mx-auto mb-3">
                  <i className="bi bi-lightning-charge-fill text-white"></i>
                </div>
                <h2 className="fw-bold">{title}</h2>
                <p className="text-muted">{subtitle}</p>
              </div>
              <form className="needs-validation" onSubmit={onSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-semibold">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    id="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label fw-semibold">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                    {loading ? 'Signing in…' : 'Sign In'}
                  </button>
                </div>
              </form>
              <div className="mt-4 text-muted small">
                Use demo credentials: admin@desk.com / admin123 or employee@desk.com / employee123
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

SignInTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string
};

export default SignInTemplate;
