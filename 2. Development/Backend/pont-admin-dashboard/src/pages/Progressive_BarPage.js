import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar';
import Progressive_Bar from '../components/Projects/progressive_bar';

const progressive_barPage = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <Progressive_Bar />
    </div>
  )
}

export default progressive_barPage
