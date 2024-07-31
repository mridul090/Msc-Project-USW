import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles.css';

const AllMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/admin/messages/')
      .then(response => {
        setMessages(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="all-messages">
      <h1>All Messages</h1>
      <hr className="separator-line" />
      <div className="message-cards">
        {messages.map(message => (
          <div className="message-card" key={message.id}>
            <p><strong>Name:</strong> {message.name}</p>
            <p><strong>Email:</strong> {message.email}</p>
            <p><strong>Message:</strong> {message.message.substring(0, 50)}...</p>
            <Link to={`/message/${message.id}`} className="details-link">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllMessages;