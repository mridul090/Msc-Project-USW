import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './BlogPost.css';

const BlogPostForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        created_at: '',
        slug: '',
        status: 'draft',
        category: '',
        image_field_1: '',
        image_field_2: '',
        image_field_3: '',
        image_field_4: '',
        image_field_5: '',
        image_field_6: '',
        image_field_7: '',
        image_field_8: ''
    });

    const [categories, setCategories] = useState([]);
    const [images, setImages] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/category/view/')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });

        axios.get('http://127.0.0.1:8000/api/settings/images/')
            .then(response => {
                setImages(response.data);
            })
            .catch(error => {
                console.log('Error fetching images:', error);
            });

        if (id) {
            axios.get(`http://127.0.0.1:8000/api/blog/update/${id}/`)
                .then(response => {
                    const data = response.data;
                    const formattedDate = data.created_at.slice(0, 16);
                    setFormData({
                        ...data,
                        created_at: formattedDate,
                        category: data.category || '',
                        image_field_1: data.image_field_1 || '',
                        image_field_2: data.image_field_2 || '',
                        image_field_3: data.image_field_3 || '',
                        image_field_4: data.image_field_4 || '',
                        image_field_5: data.image_field_5 || '',
                        image_field_6: data.image_field_6 || '',
                        image_field_7: data.image_field_7 || '',
                        image_field_8: data.image_field_8 || ''
                    });
                })
                .catch(error => {
                    console.error('Error fetching blog post:', error);
                });
        }
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleCategoryChange = (e) => {
        setFormData({
            ...formData,
            category: e.target.value || ''
        });
    };

    const handleimageChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value || ''
        });
    };

    const handleBlogPostSave = (e) => {
        e.preventDefault();
        const postData = {
            ...formData,
            category: formData.category ? parseInt(formData.category) : null,
            image_field_1: formData.image_field_1 ? parseInt(formData.image_field_1) : null,
            image_field_2: formData.image_field_2 ? parseInt(formData.image_field_2) : null,
            image_field_3: formData.image_field_3 ? parseInt(formData.image_field_3) : null,
            image_field_4: formData.image_field_4 ? parseInt(formData.image_field_4) : null,
            image_field_5: formData.image_field_5 ? parseInt(formData.image_field_5) : null,
            image_field_6: formData.image_field_6 ? parseInt(formData.image_field_6) : null,
            image_field_7: formData.image_field_7 ? parseInt(formData.image_field_7) : null,
            image_field_8: formData.image_field_8 ? parseInt(formData.image_field_8) : null
        };

        if (id) {
            axios.put(`http://127.0.0.1:8000/api/blog/update/${id}/`, postData)
                .then(response => {
                    alert("Blog post updated successfully");
                    navigate(-1);
                })
                .catch(error => {
                    console.error('Error updating blog post:', error);
                    alert("Error updating blog post");
                });
        } else {
            axios.post('http://127.0.0.1:8000/api/blog/create/', postData)
                .then(response => {
                    alert("Blog post created successfully");
                    navigate(-1);
                })
                .catch(error => {
                    console.error('Error creating blog post:', error);
                    alert("Error creating blog post");
                });
        }
    };

    return (
        <div className="form-container">
            <h2>{id ? 'Update Blog Post' : 'Upload Blog Post'}</h2>
            <form onSubmit={handleBlogPostSave}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Content</label>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        rows="10"
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>Created At</label>
                    <input
                        type="datetime-local"
                        name="created_at"
                        value={formData.created_at}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Slug</label>
                    <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleCategoryChange}
                        required
                    >
                        <option value="">Select a category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                {[...Array(8).keys()].map(i => (
                    <div className="form-group" key={i}>
                        <label>Image Field {i + 1}</label>
                        <select
                            name={`image_field_${i + 1}`}
                            value={formData[`image_field_${i + 1}`]}
                            onChange={handleimageChange}
                        >
                            <option value="">Select an image</option>
                            {images.map(image => (
                                <option key={image.id} value={image.id}>{image.title}</option>
                            ))}
                        </select>
                    </div>
                ))}
                <button type="submit">{id ? 'Update Post' : 'Upload Post'}</button>
            </form>
        </div>
    );
};

export default BlogPostForm;
