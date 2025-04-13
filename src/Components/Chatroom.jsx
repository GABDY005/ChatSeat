import React, { useState, useEffect } from "react";
//import { Link } from 'react-router-dom';
import database from "../firebase";
import { ref, push, onValue, set } from "firebase/database";
import Sidebar from "./Sidebar";

export default function Chatroom() {
  const [threads, setThreads] = useState({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const threadsRef = ref(database, "threads");
    onValue(threadsRef, (snapshot) => {
      const data = snapshot.val() || {};
      setThreads(data);
    });
  }, []);

  const handlePost = () => {
    if (!title || !content) {
      alert("Please enter a title and content!");
      return;
    }
    const newRef = push(ref(database, "threads"));
    set(newRef, {
      title,
      content,
      username: "User",
      timestamp: Date.now(),
    });
    setTitle("");
    setContent("");
  };

  const handleReply = (threadID, replyText) => {
    if (!replyText) return;
    const newReply = push(ref(database, `threads/${threadID}/replies`));
    set(newReply, {
      text: replyText,
      username: "User",
      timestamp: Date.now(),
    });
  };

  return (
    <>
      <div className="bg-[#003366] text-white h-16 flex items-center justify-center shadow-md px-6">
        <h4 className="text-xl font-bold">Chatroom</h4>
      </div>
      <div class="flex min-h-[calc(100vh-60px)]">
        <Sidebar userName="Darshi" />

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
            <button className="btn-post" onClick={handlePost}>
              Post Discussion
            </button>
          </div>

          <h3>Discussion Threads</h3>
          <div className="thread-list">
            {Object.entries(threads)
              .reverse()
              .map(([id, thread]) => (
                <div className="thread-card" key={id}>
                  <h4>{thread.title}</h4>
                  <p>{thread.content}</p>
                  <small>
                    Posted by <b>{thread.username}</b> at{" "}
                    {new Date(thread.timestamp).toLocaleString()}
                  </small>

                  <input
                    type="text"
                    className="form-control mt-2"
                    placeholder="Write a reply..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleReply(id, e.target.value);
                    }}
                  />
                  <div className="replies">
                    {thread.replies &&
                      Object.values(thread.replies).map((reply, i) => (
                        <div className="reply" key={i}>
                          <b>{reply.username}</b> at{" "}
                          {new Date(reply.timestamp).toLocaleString()}
                          <br />
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
