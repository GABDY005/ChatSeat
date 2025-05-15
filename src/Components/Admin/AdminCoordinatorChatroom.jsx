import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import database from "../firebase";
import { ref, push, onValue, set, remove } from "firebase/database";
import AdminSidebar from "../Admin/AdminSidebar";
import AdminNavbar from "../Admin/AdminNavbar";
import supabase from "../../supabase";

export default function AdminCoordinatorChatroom() {
  const [threads, setThreads] = useState({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [username, setUsername] = useState("Admin");
  const [userId, setUserId] = useState("");
  const [userRole, setUserRole] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [firstName, setFirstName] = useState("User");

  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (!user || authError) {
        navigate("/");
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("first_name, role")
        .eq("id", user.id)
        .single();

      if (!profile || profileError || profile.role !== "admin") {
        navigate("/");
        return;
      }

      setUserId(user.id);
      setUsername(profile.first_name);
      setFirstName(profile.first_name);
      setUserRole("admin");
    };

    verifyUser();
  }, [navigate]);

  useEffect(() => {
    const threadsRef = ref(database, "coordinator_threads");
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

    const newRef = push(ref(database, "coordinator_threads"));
    set(newRef, {
      title,
      content,
      username,
      user_id: userId,
      timestamp: Date.now(),
    });

    setTitle("");
    setContent("");
  };

  const handleReply = (threadID, replyText) => {
    if (!replyText) return;

    const newReply = push(ref(database, `coordinator_threads/${threadID}/replies`));
    set(newReply, {
      text: replyText,
      username,
      user_id: userId,
      role: userRole,
      timestamp: Date.now(),
    });
  };

  const handleDeleteThread = (threadId) => {
    const threadRef = ref(database, `coordinator_threads/${threadId}`);
    remove(threadRef);
  };

  const handleDeleteReply = (threadId, replyKey) => {
    const replyRef = ref(database, `coordinator_threads/${threadId}/replies/${replyKey}`);
    remove(replyRef);
  };

  const canDeleteReply = (replyUserId) => {
    return userId === replyUserId || userRole === "admin";
  };

  const filteredThreads = Object.entries(threads).filter(([id, thread]) =>
    thread.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <AdminNavbar title="Admin - Coordinator Chatroom" />
      <div className="flex min-h-screen pt-16 bg-[#e6f4f9]">
        <div className="sticky top-16 h-[calc(100vh-64px)]">
          <AdminSidebar userName={firstName} />
        </div>

<<<<<<< HEAD
        <div className="main-content p-6 w-full bg-emerald-50">
          <h2 className="text-xl font-bold text-[#1E3A8A] mb-4">Discussion Forum</h2>
=======
        <div className="main-content p-6 w-full bg-[#cfffa5]">
          <h2 className="text-xl font-bold text-green-800 mb-4">Discussion Forum</h2>
>>>>>>> ea43b36166f4099ab56049f714515fb64340b5f0

          <div className="mb-6">
            <input
              type="text"
              placeholder="Search discussions..."
              className="form-control w-full p-2 mb-4 border rounded"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <input
              type="text"
              className="form-control w-full p-2 mb-2 border rounded"
              placeholder="Enter topic title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="form-control w-full p-2 mb-2 border rounded"
              placeholder="Write your discussion"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button
              className="w-full bg-[#003366] text-white py-2 rounded"
              onClick={handlePost}
            >
              Post Discussion
            </button>
          </div>

          <div className="space-y-4">
            {filteredThreads.length > 0 ? (
              filteredThreads.reverse().map(([id, thread]) => (
                <div className="bg-white p-4 rounded shadow" key={id}>
<<<<<<< HEAD
                  <h4 className="font-bold text-black">{thread.title}</h4>
=======
                  <h4 className="font-bold text-green-700">{thread.title}</h4>
>>>>>>> ea43b36166f4099ab56049f714515fb64340b5f0
                  <p>{thread.content}</p>
                  <small>
                    Posted by <b>{thread.username}</b> at{" "}
                    {new Date(thread.timestamp).toLocaleString()}
                  </small>

                  {canDeleteReply(thread.user_id) && (
                    <button
                      onClick={() => handleDeleteThread(id)}
                      className="text-green-500 ml-4"
                    >
                      Delete
                    </button>
                  )}

                  <input
                    type="text"
                    className="form-control mt-2 p-2 border rounded w-full"
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
                      Object.entries(thread.replies).map(([key, reply]) => (
                        <div
<<<<<<< HEAD
                          className="bg-emerald-50 p-2 rounded text-sm flex justify-between"
=======
                          className="bg-green-100 p-2 rounded text-sm flex justify-between"
>>>>>>> ea43b36166f4099ab56049f714515fb64340b5f0
                          key={key}
                        >
                          <div>
                            <b>{reply.username}</b> at{" "}
                            {new Date(reply.timestamp).toLocaleString()} <br />
                            {reply.text}
                          </div>

                          {canDeleteReply(reply.user_id) && (
                            <button
                              onClick={() => handleDeleteReply(id, key)}
<<<<<<< HEAD
                              className="text-black ml-4"
=======
                              className="text-green-500 ml-4"
>>>>>>> ea43b36166f4099ab56049f714515fb64340b5f0
                            >
                              ❌
                            </button>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">
                No discussions found.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}