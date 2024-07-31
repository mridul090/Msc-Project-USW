import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import About from '../components/Abouts/About';
// import useCheckUser from '../components/Users/checkuser'
import './styles.css';

const AboutPage = () => {
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
      <About />
      {/* {error && <p className="error-message">{error}</p>} */}
    </div>
  );
};

export default AboutPage;
