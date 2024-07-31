import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar';
import Project_List_View from '../components/Projects/project_list_view';

const Project_ListPage = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <Project_List_View />
    </div>
  )
}

export default Project_ListPage
