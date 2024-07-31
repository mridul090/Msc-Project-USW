import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar';
import Progrect from '../components/Projects/project';

const ProjectPage = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <Progrect />
    </div>
  )
}

export default ProjectPage
