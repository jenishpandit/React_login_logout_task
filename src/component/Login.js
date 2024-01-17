import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const loggedInUser = storedUsers.find((u) => u.token === true);

    // Check if user is already logged in
    if (loggedInUser) {
      navigate('/dashboard', { replace: true, state: { user: loggedInUser } });
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const user = existingUsers.find((u) => u.username === username && u.password === password);

    if (!user) {
      setErrorMessage('Invalid username or password.');
      return;
    }

    // Set token to true for the logged-in user
    user.token = true;

    // Save the updated users array to local storage
    localStorage.setItem('users', JSON.stringify(existingUsers));

    // Navigate to dashboard
    navigate('/dashboard', { replace: true, state: { user } });
  };

  return (
    <div className="login-container">
      <h1>Login</h1>

      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <br />
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <br />
      <Link to="/signup" className="register-link">
        Register
      </Link>
    </div>
  );
};

export default Login;
