import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useCheckUser = () => {
  const [isValidUser, setIsValidUser] = useState(null); 
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [users, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:8000/api/current-user/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },          
        });
        setUser(response.data);
        setIsValidUser(true);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to load user data');
        setIsValidUser(false);
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };

    fetchUser();
  }, [navigate]);

  return { isValidUser, error, users};
}

export default useCheckUser;
