import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';
import logo from '../../assets/images/logo.png';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li className="menu-item">
            <Link to="/">
              <i className="fas fa-home"></i> Dashboard
            </Link>
          </li>
          <li className="menu-item">
            <i className="fas fa-hand-holding-heart"></i> Blog
            <ul className="submenu">
              <li><Link to="/blog/ListView">Blog Post</Link></li>
              {/* <li></li> */}
            </ul>
          </li>
          <li className="menu-item">
            <i className="fas fa-cog"></i> Who We Are
            <ul className="submenu">
              <li><Link to="/about">About</Link></li>
              <li><Link to="/content-history">Content History</Link></li>
              <li><Link to="/content-gallery">Content Gallery</Link></li>
            </ul>
          </li>
          <li className="menu-item">
            <i className="fas fa-users"></i> Contract Messages
            <ul className="submenu">
              <li><Link to="/all-messages">All messages</Link></li>
            </ul>
          </li>
          <li className="menu-item">
            <i className="fas fa-cog"></i> Settings
            <ul className="submenu">
              <li><Link to="/setting/imagelibrary">Image Library</Link></li>
              <li><Link to="/users">All Users</Link></li>
              <li><Link to="/setting">Setting</Link></li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
