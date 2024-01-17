import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [token, setToken] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !address || !email || !password || !confirmPassword) {
      setErrorMessage('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    // Save registration data to local storage
    const userData = {
      username,
      address,
      email,
      password,
      token: false,
    };

    // Get existing users from local storage or initialize an empty array
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the username or email is already taken
    const isUsernameTaken = existingUsers.some((user) => user.username === username);
    const isEmailTaken = existingUsers.some((user) => user.email === email);

    if (isUsernameTaken || isEmailTaken) {
      setErrorMessage('Username or email is already taken.');
      return;
    }

    // Add the new user to the existing users
    existingUsers.push(userData);

    // Save the updated users array to local storage
    localStorage.setItem('users', JSON.stringify(existingUsers));

    // Set token and setIsRegistered to true upon successful registration
    setToken(true);
    setIsRegistered(true);

    // Clear the form fields
    setUsername('');
    setAddress('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrorMessage('');
  };

  return (
    <div>
      <h1>Register</h1>

      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        
      {isRegistered && <p style={{ color: 'green' }}>Registration successful!</p>}
        <br />
        <button type="submit">Register</button>
      </form>

      <br />
      <Link to="/">Login</Link>
    </div>
  );
};

export default SignUp;
