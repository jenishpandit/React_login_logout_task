// import React, { useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// const Dashboard = () => {
//   const location = useLocation();
//   const { user } = location.state || {};
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
//     const loggedInUser = storedUsers.find((u) => u.username === user.username);

//     // Check if user is logged in and has a valid token
//     if (!loggedInUser || !loggedInUser.token) {
//       // If not, redirect to login page
//       navigate('/', { replace: true });
//     }
//   }, [user, navigate]);

//   const handleLogout = () => {
//     if (user) {
//       // Clear token (set to false) for the logged-out user
//       user.token = false;

//       const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
//       const updatedUsers = existingUsers.map((u) => (u.username === user.username ? user : u));
//       localStorage.setItem('users', JSON.stringify(updatedUsers));
//     }

//     // Navigate to login after logout
//     navigate('/', { replace: true });
//   };

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       {user ? (
//         <>
//           <p>Username: {user.username}</p>
//           <p>Address: {user.address}</p>
//           <p>Email: {user.email}</p>
//           <button onClick={handleLogout}>Logout</button>
//         </>
//       ) : (
//         <p>No user data available.</p>
//       )}
//     </div>
//   );
// };

// export default Dashboard;


import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const location = useLocation();
  const { user } = location.state || {};
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const loggedInUser = storedUsers.find((u) => u.token === true);

    // Check if user is not logged in
    if (!loggedInUser) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    if (user) {
      // Clear token (set to false) for the logged-out user
      user.token = false;

      const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
      const updatedUsers = existingUsers.map((u) => (u.username === user.username ? user : u));
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    }

    // Navigate to login after logout
    navigate('/', { replace: true });
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? (
        <>
          <p>Username: {user.username}</p>
          <p>Address: {user.address}</p>
          <p>Email: {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
};

export default Dashboard;

