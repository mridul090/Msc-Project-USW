import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Dashboard from '../components/Dashboard/Dashboard';
import TopView from '../components/TopView/TopView';
import useCheckUser from '../components/Users/checkuser'
import './styles.css';

const DashboardPage = () => {

  const { isValidUser, error, users } = useCheckUser();

  if (isValidUser === null) {
    return <p>Loading...</p>;
  }

  if (!isValidUser) {
    return <p>Redirecting to login...</p>;
  }


  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <TopView title="Pont Mbale Administration" showButton={false}  user={users} />
        <Dashboard />
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default DashboardPage;
