import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import ListViewAllUsers from '../components/Users/Allusers';
// import useCheckUser from '../components/Users/checkuser'
import './styles.css';

const BlogPostCreatePage = () => {
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
      <ListViewAllUsers />
      {/* {error && <p className="error-message">{error}</p>} */}
    </div>
  );
};

export default BlogPostCreatePage;