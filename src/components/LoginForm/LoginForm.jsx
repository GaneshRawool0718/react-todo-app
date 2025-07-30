import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import { loginUser } from '../../apiServices/loginServices';
import { saveAuthData } from '../../utils/storage';
import { PASSWORD_LENGTH_ERROR } from '../../constants/errorConstants.ts';

const LoginForm = () => {
  /*
  LoginForm component handles user login.
  It captures user credentials, validates them, and interacts with the login service.
  */
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    // Update form data state on input change
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    // Prevent default form submission behavior
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (formData.password.length < 6) {
      // Validate password length
      setError(PASSWORD_LENGTH_ERROR);
      setIsLoading(false);
      return;
    }

    try {
      const data = await loginUser(formData);
      saveAuthData(data.token, { id: data.id, role: data.role }); // Save auth data to local storage

      if (data.role === 'ADMIN') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/home', { replace: true });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>
        {error && <div className="login-error">{error}</div>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="login-input"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="login-input"
        />

        <button type="submit" disabled={isLoading} className="login-button">
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

        <p className="login-link">
          <span onClick={() => navigate('/forgot-password', { replace: true })}>
            Forgot Password?
          </span>
        </p>
      </form>

      <p className="login-link">
        Don't have an account?{' '}
        <span onClick={() => navigate('/signup', { replace: true })}>Sign Up</span>
      </p>
    </div>
  );
};

export default LoginForm;
