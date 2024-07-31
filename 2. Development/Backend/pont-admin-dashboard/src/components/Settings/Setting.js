import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SettingsStyle.css';

const Setting = () => {
    const [blogcategories, setBlogCategories] = useState([]);
    const [blogcategorydata, setBlogCategoryData] = useState({
        name: '',
    });

    const [projectnameslist, setProjectNameList] = useState([]);
    const [projectname, setProjectName] = useState({
        type_name: '',
    });

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/category/view/')
            .then(response => {
                setBlogCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching Blog categories:', error);
            });

        axios.get('http://127.0.0.1:8000/api/project-type/views/')
            .then(response => {
                console.log("project types data", response.data);
                setProjectNameList(response.data);
            })
            .catch(error => {
                console.error('Error fetching project names:', error);
            });
    }, []);

    const handleCategoryChanges = (e) => {
        setBlogCategoryData({
            ...blogcategorydata,
            name: e.target.value
        });
    }

    const handleProjectNameChanges = (e) => {
        setProjectName({
            ...projectname,
            type_name: e.target.value
        });
    }

    const handleSubmitData = (e, type) => {
        e.preventDefault();
        if (type === 'category') {
            axios.post('http://127.0.0.1:8000/api/category/create/', blogcategorydata)
                .then(response => {
                    alert("Category created successfully");
                    setBlogCategoryData({ name: '' });
                    setBlogCategories([...blogcategories, response.data]);
                })
                .catch(error => {
                    console.error('Error creating Category:', error);
                    alert("Error creating Category");
                });
        } else if (type === 'project') {
            axios.post('http://127.0.0.1:8000/api/project-type/create/', projectname)
                .then(response => {
                    alert("Project Name created successfully");
                    setProjectName({ type_name: '' });
                    setProjectNameList([...projectnameslist, response.data]);
                })
                .catch(error => {
                    console.error('Error creating Project Name:', error);
                    alert("Error creating Project Name");
                });
        }
    }

    return (
        <div className="setting-page">
            <div className="setting-header">
                <h1>Setting</h1>
            </div>
            <div className='setting-body'>
                <div className='Blog-category'>
                    <div className='Blog-category-input'>
                        <label>Insert Category name</label>
                        <input
                            type="text"
                            name="Blog_category"
                            value={blogcategorydata.name}
                            onChange={handleCategoryChanges}
                        />
                        <button
                            type="submit"
                            onClick={(e) => handleSubmitData(e, 'category')}
                            className='btn-create'
                        >
                            Create Category
                        </button>
                    </div>
                    <div className='Blog-category-view'>
                        <h5>All Categories</h5>
                        <div className='Blog-category-list'>
                            {blogcategories.length === 0 ? (
                                <div className="no-posts">No About Page created yet!!</div>
                            ) : (blogcategories.map(categories => (
                                <p key={categories.id}>{categories.name}</p>
                            )))}
                        </div>
                    </div>
                </div>

                <div className='Project-category'>
                    <div className='Project-category-input'>
                        <label>Insert Projects name</label>
                        <input
                            type="text"
                            name="Project_Name"
                            value={projectname.type_name}
                            onChange={handleProjectNameChanges}
                        />
                        <button
                            type="submit"
                            onClick={(e) => handleSubmitData(e, 'project')}
                            className='btn-create'
                        >
                            Create Project Name
                        </button>
                    </div>
                    <div className='Project-category-view'>
                        <h5>All Categories</h5>
                        <div className='Project-category-list'>
                            {projectnameslist.length === 0 ? (
                                <div className="no-posts">No Project Name created yet!!</div>
                            ) : (projectnameslist.map(p_name => (
                                <p key={p_name.id}>{p_name.type_name}</p>
                            )))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Setting;
