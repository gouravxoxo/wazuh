import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SignInTemplate from './SignInTemplate.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

function EmployeeSignIn() {
  const { login, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const credentials = {
      email: formData.get('email'),
      password: formData.get('password')
    };

    try {
      setLoading(true);
      setError(null);
      const profile = await login(credentials);
      if (profile.role !== 'employee') {
        setError('This portal is for employees only. Please sign in using the admin portal.');
        logout();
        return;
      }
      const redirectTo = location.state?.from?.pathname || '/employee/dashboard';
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignInTemplate
      title="Employee Service Desk"
      subtitle="Track progress, raise new requests, and stay aligned with your support team."
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
    />
  );
}

export default EmployeeSignIn;
