import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './styles.css';

const MessageDetail = () => {
  const { id } = useParams();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adminReply, setAdminReply] = useState('');
  const [adminEmails, setAdminEmails] = useState([]);
  const [selectedAdminEmails, setSelectedAdminEmails] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/admin/messages/${id}/replay/`)
      .then(response => {
        setMessage(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });

    axios.get('http://127.0.0.1:8000/api/users/emails/')
      .then(response => {
        setAdminEmails(response.data);
      })
      .catch(error => {
        console.log('Error fetching admin emails:', error);
      });
  }, [id]);

  const handleReplyChange = (event) => {
    setAdminReply(event.target.value);
  };

  const handleEmailChange = (event) => {
    const selectedId = event.target.value;
    const selectedEmail = adminEmails.find(email => email.id === parseInt(selectedId));

    if (selectedEmail && !selectedAdminEmails.includes(selectedEmail.email)) {
      setSelectedAdminEmails([...selectedAdminEmails, selectedEmail.email]);
    }
  
  };

  const handleSendReply = () => {
    axios.post(`http://localhost:8000/api/admin/messages/${id}/replay/`, {
      admin_reply: adminReply
    })
      .then(response => {
        setMessage(response.data);
        setAdminReply('');
        alert('Reply sent successfully!');
      })
      .catch(error => {
        alert('Failed to send reply. Please try again.');
      });
  };

  const handleForward = () => {
    let selectedEmailsIds = [];
    let forwardedMessage = `Please see this message\n`;
    forwardedMessage += `Sender Name: ${message.name}\n`;
    forwardedMessage += `Sender Email: ${message.email}\n`;
    forwardedMessage += `Sender message: ${message.message}`;
    
    console.log(forwardedMessage);

    selectedAdminEmails.forEach(email => {
      const selectedEmail = adminEmails.find(emailList => emailList.email === email);
      
      if (selectedEmail && !selectedEmailsIds.includes(selectedEmail.id)) {
        selectedEmailsIds = [...selectedEmailsIds, selectedEmail.id];
      }

    });

    const forwardData = {
      forwarded_to: selectedEmailsIds,
      admin_reply: forwardedMessage
    };

    axios.post(`http://localhost:8000/api/admin/messages/${id}/replay/`, forwardData)
      .then(response => {
        setMessage(response.data);
        setSelectedAdminEmails([]);
        setAdminReply('');
        alert('Message forwarded successfully!');
      })
      .catch(error => {
        alert('Failed to forward message. Please try again.');
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!message) return <div>Message not found</div>;

  return (
    <div className="container">
      <h1>Message Detail</h1>
      <div className="detail"><strong>Name:</strong> {message.name}</div>
      <div className="detail"><strong>Email:</strong> {message.email}</div>
      <div className="form-group">
        <label>Admin Emails</label>
        <select
          name="admin"
          value=""
          onChange={handleEmailChange}
        >
          <option value="">Select an email</option>
          {adminEmails.map(adminEmail => (
            <option key={adminEmail.id} value={adminEmail.id}>{adminEmail.email}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Selected Emails</label>
        <textarea
          value={selectedAdminEmails.join(', ')}
          readOnly
        />
      </div>
      <div className="detail"><strong>Subject:</strong> {message.subject}</div>
      <div className="message">
        <strong>Message:</strong>
        <p>{message.message}</p>
      </div>
      <div className="detail"><strong>Created At:</strong> {message.created_at}</div>
      {message.admin_reply && (
        <>
          <div className="detail"><strong>Admin Reply:</strong> {message.admin_reply}</div>
          <div className="detail"><strong>Replied At:</strong> {message.replied_at}</div>
        </>
      )}
      <div className="reply-box">
        <textarea
          value={adminReply}
          onChange={handleReplyChange}
          placeholder="Type your reply here..."
        />
        <button onClick={handleSendReply}>Send Reply</button>
        {selectedAdminEmails.length > 0 && (
          <button onClick={handleForward}>Forward</button>
        )}
      </div>
    </div>
  );
};

export default MessageDetail;
