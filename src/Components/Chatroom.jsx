import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import database from '../firebase';
import { ref, push, onValue, set } from 'firebase/database';
import './Chatroom.css';

export default function Chatroom() {
  const [threads, setThreads] = useState({});
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const threadsRef = ref(database, 'threads');
    onValue(threadsRef, snapshot => {
      const data = snapshot.val() || {};
      setThreads(data);
    });
  }, []);

  const handlePost = () => {
    if (!title || !content) {
      alert("Please enter a title and content!");
      return;
    }
    const newRef = push(ref(database, 'threads'));
    set(newRef, {
      title,
      content,
      username: "User",
      timestamp: Date.now()
    });
    setTitle('');
    setContent('');
  };

  const handleReply = (threadID, replyText) => {
    if (!replyText) return;
    const newReply = push(ref(database, `threads/${threadID}/replies`));
    set(newReply, {
      text: replyText,
      username: "User",
      timestamp: Date.now()
    });
  };

  return (
    <>
      <div className="topbar">
        <h4>Chat Room</h4>
      </div>

      <div className="main-layout">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="logo">
            <img src="assets/GetAttachmentThumbnail.png" alt="Chat Seats Logo" />
          </div>
          <div className="nav-links">
            <Link to="/Dashboard">Dashboard</Link>
            <Link to="/Coordinators">Coordinator</Link>
            <Link to="/Listener">Listener</Link>
            <Link to="/Scheduling">Book Your Slot</Link>
            <Link to="/Chatroom">Chat Room</Link>
            <Link to="/Feedback">Feedback</Link>
            <Link to="/Help">Help</Link>
            <Link to="/About">About Us</Link>
          </div>
          <Link to="/" className="logout-btn">Logout</Link>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <h2>Discussion Forum</h2>
          <p>Post new topics and discuss with others.</p>

          <div className="form-section">
            <input
              type="text"
              className="form-control"
              placeholder="Enter topic title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="form-control"
              placeholder="Write your discussion"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button className="btn-post" onClick={handlePost}>Post Discussion</button>
          </div>

          <h3>Discussion Threads</h3>
          <div className="thread-list">
            {Object.entries(threads).reverse().map(([id, thread]) => (
              <div className="thread-card" key={id}>
                <h4>{thread.title}</h4>
                <p>{thread.content}</p>
                <small>Posted by <b>{thread.username}</b> at {new Date(thread.timestamp).toLocaleString()}</small>

                <input
                  type="text"
                  className="form-control mt-2"
                  placeholder="Write a reply..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleReply(id, e.target.value);
                  }}
                />
                <div className="replies">
                  {thread.replies && Object.values(thread.replies).map((reply, i) => (
                    <div className="reply" key={i}>
                      <b>{reply.username}</b> at {new Date(reply.timestamp).toLocaleString()}<br />
                      {reply.text}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}