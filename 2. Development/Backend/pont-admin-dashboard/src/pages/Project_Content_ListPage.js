import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar';
import Project_Content_List_View from '../components/Projects/project_content_list_view';

const Project_Content_ListPage = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <Project_Content_List_View />
    </div>
  )
}

export default Project_Content_ListPage
