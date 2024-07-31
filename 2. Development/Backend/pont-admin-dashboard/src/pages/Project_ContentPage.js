import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar';
import Project_Content from '../components/Projects/project_content';

const Project_ContentPage = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <Project_Content />
    </div>
  )
}

export default Project_ContentPage
