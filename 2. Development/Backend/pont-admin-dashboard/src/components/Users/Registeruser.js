import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserCreateForm.css';

const RegisterUser = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();

    const onSubmit = data => {
        const formData = new FormData();
        for (let key in data) {
            if (key === 'upload_image') {
                formData.append(key, data[key][0]);
            } else {
                formData.append(key, data[key]);
            }
        }

        axios.post('http://localhost:8000/api/users/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        .then(response => {
            alert("Success");
            reset();  
            navigate(-1);
        })
        .catch(error => {
            console.error('Error creating user:', error);
            alert("Error creating user");
            console.error(error.response.data);
        });
    };

    return (
        <div className="form-container">
            <h2>Create User Account</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label>First Name</label>
                    <input {...register('first_name', { required: true })} />
                    {errors.first_name && <span>This field is required</span>}
                </div>

                <div className="form-group">
                    <label>Last Name</label>
                    <input {...register('last_name', { required: true })} />
                    {errors.last_name && <span>This field is required</span>}
                </div>

                <div className="form-group">
                    <label>Username</label>
                    <input {...register('username', { required: true })} />
                    {errors.username && <span>This field is required</span>}
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" {...register('email', { required: true })} />
                    {errors.email && <span>This field is required</span>}
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" {...register('password', { required: true, minLength: 8 })} />
                    {errors.password && <span>This field is required and must be at least 8 characters long</span>}
                </div>

                <div className="form-group">
                    <label>User Role</label>
                    <select {...register('user_role', { required: true })}>
                        <option value="superuser">SuperUser</option>
                        <option value="moderator">Moderator</option>
                        <option value="management">Management</option>
                    </select>
                    {errors.user_role && <span>This field is required</span>}
                </div>

                <div className="form-group">
                    <label>Account Status</label>
                    <select {...register('account_status', { required: true })}>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                    {errors.account_status && <span>This field is required</span>}
                </div>

                <div className="form-group">
                    <label>Upload Image</label>
                    <input type="file" {...register('upload_image')} />
                </div>

                <div className="form-group">
                    <label>Is Staff</label>
                    <input type="checkbox" {...register('is_staff')} />
                </div>

                <div className="form-group">
                    <label>Is Active</label>
                    <input type="checkbox" {...register('is_active')} />
                </div>

                <button type="submit">Create User</button>
            </form>
        </div>
    );
};

export default RegisterUser;
