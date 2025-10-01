import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SignInTemplate from './SignInTemplate.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

function AdminSignIn() {
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
      if (profile.role !== 'admin') {
        setError('You do not have administrator access.');
        logout();
        return;
      }
      const redirectTo = location.state?.from?.pathname || '/admin/dashboard';
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignInTemplate
      title="Admin Control Center"
      subtitle="Monitor tickets, manage teams, and configure your service desk."
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
    />
  );
}

export default AdminSignIn;
