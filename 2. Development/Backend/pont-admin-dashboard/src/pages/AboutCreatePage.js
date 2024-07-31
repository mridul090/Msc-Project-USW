import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import AboutCreate from '../components/Abouts/AboutCreate';
// import useCheckUser from '../components/Users/checkuser'
import './styles.css';

const AboutCreatePage = () => {
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
      <AboutCreate />
      {/* {error && <p className="error-message">{error}</p>} */}
    </div>
  );
};

export default AboutCreatePage;
