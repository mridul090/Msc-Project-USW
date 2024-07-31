import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import AllMessages from '../components/ContractMessages/AllMessages';
// import useCheckUser from '../components/Users/checkuser'
import './styles.css';

const ContractMessagePage = () => {

  // const { isValidUser, error, users } = useCheckUser();

  // if (isValidUser === null) {
  //   return <p>Loading...</p>;
  // }

  // if (!isValidUser) {
  //   return <p>Redirecting to login...</p>;
  // }

  return (
    <div className="dashboard-container">
      <Sidebar />
      <AllMessages />
      {/* {error && <p className="error-message">{error}</p>} */}
    </div>
  );
};

export default ContractMessagePage;
