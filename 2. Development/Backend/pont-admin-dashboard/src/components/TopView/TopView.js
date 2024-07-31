import React from 'react';
import userphoto from '../../assets/demouser.png';
import { Link, useNavigate } from 'react-router-dom';
import './topview.css';

const TopView = ({ title, buttonName, showButton, user }) => {
  const navigate = useNavigate();

  const handleSignout = (e) => {
    alert("Click Press")
    // localStorage.removeItem('token');
    // navigate('/login');
  };

  return (
    <div className="top-view">
      <div className='user-section'>
        <h3 className="page-title">{title}</h3>
        <div className='user-profile'>
          <img src={`http://127.0.0.1:8000${user.upload_image}` || userphoto} alt="User" className="user-photo" />
          <div className="user-details">
            <p className="user-name">User: {user.first_name} {user.last_name} </p>
            <p className="user-role">Role: {user.user_role}</p>
            <p className='sign-out' onClick={handleSignout}>Sign Out</p>
          </div>
        </div>
      </div>
      <div className='top-view-button'>
        {showButton && <button className="signout-btn">SignOut</button>}
      </div>
    </div>
    
  );
};

export default TopView;
