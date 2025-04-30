import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import database from "../firebase";
import { ref, push, onValue, set, remove } from "firebase/database";
import CoordinatorSidebar from "./CoordinatorSidebar";
import CoordinatorNavbar from "./CoordinatorNavbar";
import supabase from "../../supabase";
import { checkUserRole } from "../../Controller/UserController";

export default function CoordinatorChatroom() {
  const [threads, setThreads] = useState({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [username, setUsername] = useState("User");
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("listener");
  const [searchQuery, setSearchQuery] = useState(""); 

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error || !user) {
          navigate("/");
          return;
        }

        setUserId(user.id);

        const isCoordinator = await checkUserRole("coordinator");
        const isAdmin = await checkUserRole("admin");

        if (!isCoordinator && !isAdmin) {
          alert("Access denied. Coordinators and Admins only.");
          navigate("/");
          return;
        }

        setRole(isAdmin ? "admin" : "coordinator");

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("first_name")
          .eq("id", user.id)
          .single();

        if (profileError || !profile) {
          alert("Failed to load user profile.");
          navigate("/");
          return;
        }

        setUsername(profile.first_name);
      } catch (err) {
        console.error("Error verifying user:", err);
        navigate("/");
      }
    };

    fetchUser();
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

  const filteredThreads = Object.entries(threads).filter(([id, thread]) =>
    thread.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <CoordinatorNavbar title="Coordinator Chat" />
      <div className="flex min-h-screen pt-16 bg-[#e6f4f9]">
        <div className="sticky top-16 h-[calc(100vh-64px)]">
          <CoordinatorSidebar userName={username} />
        </div>

        <div className="main-content p-6 w-full">
          <h2 className="text-xl font-bold mb-4">Discussion Forum</h2>

          {/*SearchQuery*/}
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
                  <h4 className="font-bold text-[#003366]">{thread.title}</h4>
                  <p>{thread.content}</p>
                  <small>
                    Posted by <b>{thread.username}</b> at{" "}
                    {new Date(thread.timestamp).toLocaleString()}
                  </small>

                  {(thread.user_id === userId || role === "admin") && (
                    <button
                      onClick={() => handleDeleteThread(id)}
                      className="text-red-500 ml-4"
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
                          className="bg-blue-100 p-2 rounded text-sm flex justify-between"
                          key={key}
                        >
                          <div>
                            <b>{reply.username}</b> at{" "}
                            {new Date(reply.timestamp).toLocaleString()} <br />
                            {reply.text}
                          </div>

                          {(reply.user_id === userId || role === "admin") && (
                            <button
                              onClick={() => handleDeleteReply(id, key)}
                              className="text-red-500 ml-4"
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