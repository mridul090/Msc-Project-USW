import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar';
import Settingdesign from '../components/Settings/Setting.js';
import './styles.css';

const SettingsPage = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <Settingdesign />
    </div>
  )
}

export default SettingsPage
