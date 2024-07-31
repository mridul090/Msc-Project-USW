import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/users/')
      .then(response => {
        console.log("user data", response.data)
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container">
      <div className="header">
        <h1>User Registration</h1>
      </div>
      <div className="register-button">
        <button onClick={() => window.location.href = '/users/create'}>Register new user</button>
      </div>
      <hr />
      <div className="users-container">
        {users.map(user => (
          <div key={user.id} className="user-card">
            <img src={`http://127.0.0.1:8000${user.upload_image}`} alt={user.username} className="user-photo" />
            <h2>{user.username}</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.user_role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
