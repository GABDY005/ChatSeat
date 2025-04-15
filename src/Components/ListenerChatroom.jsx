import React, { useState, useEffect } from "react";
import database from "../firebase";
import { ref, push, onValue, set } from "firebase/database";
import ListenerSidebar from "./ListenerSidebar";
import supabase from "../supabase";

export default function ListenerChatroom() {
  const [threads, setThreads] = useState({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [username, setUsername] = useState("User");

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("first_name")
          .eq("id", user.id)
          .single();

        if (profile && profile.first_name) {
          setUsername(profile.first_name);
        }
      }
    };

    fetchUser();
  }, []);

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
      username,
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
      username,
      timestamp: Date.now(),
    });
  };

  return (
    <>
      <div className="bg-[#003366] text-white h-16 flex items-center justify-center shadow-md px-6">
        <h4 className="text-xl font-bold">Chatroom</h4>
      </div>
      <div className="flex min-h-[calc(100vh-64px)]">
        <ListenerSidebar userName={username} />

        <div className="main-content p-6 w-full">
          <h2 className="text-xl font-bold mb-4">Discussion Forum</h2>
          <p className="mb-4">Post new topics and discuss with others.</p>

          <div className="mb-6">
            <input
              type="text"
              className="form-control w-full p-2 mb-2 border border-gray-300 rounded"
              placeholder="Enter topic title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="form-control w-full p-2 mb-2 border border-gray-300 rounded"
              placeholder="Write your discussion"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button
              className="w-full bg-[#003366] text-white py-2 rounded hover:bg-[#1E3A8A]"
              onClick={handlePost}
            >
              Post Discussion
            </button>
          </div>

          <h3 className="text-lg font-semibold mb-3">Discussion Threads</h3>
          <div className="space-y-4">
            {Object.entries(threads)
              .reverse()
              .map(([id, thread]) => (
                <div className="bg-white p-4 rounded shadow" key={id}>
                  <h4 className="font-bold text-[#003366]">{thread.title}</h4>
                  <p>{thread.content}</p>
                  <small>
                    Posted by <b>{thread.username}</b> at{" "}
                    {new Date(thread.timestamp).toLocaleString()}
                  </small>

                  <input
                    type="text"
                    className="form-control mt-2 p-2 border border-gray-300 rounded w-full"
                    placeholder="Write a reply..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleReply(id, e.target.value);
                        e.target.value = "";
                      }
                    }}
                  />
                  <div className="mt-3 space-y-2">
                    {thread.replies &&
                      Object.values(thread.replies).map((reply, i) => (
                        <div
                          className="bg-blue-100 p-2 rounded text-sm"
                          key={i}
                        >
                          <b>{reply.username}</b> at{" "}
                          {new Date(reply.timestamp).toLocaleString()}<br />
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