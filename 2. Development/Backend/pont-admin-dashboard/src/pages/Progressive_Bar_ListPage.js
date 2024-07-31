import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar';
import Progressive_Bar_List_View from '../components/Projects/progressive_bar_list_view';

const Progressive_Bar_ListPage = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <Progressive_Bar_List_View />
    </div>
  )
}

export default Progressive_Bar_ListPage
