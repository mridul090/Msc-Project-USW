import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import ListViewBlogPost from '../components/BlogPost/BlogPostListView.js';
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


  // if (isValidUser) {
    return (
      <div className="dashboard-container">
        <Sidebar />
        <ListViewBlogPost />
        {/* {error && <p className="error-message">{error}</p>} */}
      </div>
    );
  // }


};

export default BlogPostCreatePage;