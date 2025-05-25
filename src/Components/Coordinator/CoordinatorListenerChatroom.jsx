import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import database from "../firebase";
import { ref, push, onValue, set, remove } from "firebase/database";
import CoordinatorSidebar from "./CoordinatorSidebar";
import CoordinatorNavbar from "./CoordinatorNavbar";
import supabase from "../../supabase";
import AdminNavbar from "../Admin/AdminNavbar";
import { toast } from "react-toastify";

export default function CoordinatorListenerChatroom() {
  const [threads, setThreads] = useState({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [username, setUsername] = useState("User");
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("coordinator");
  const [searchQuery, setSearchQuery] = useState("");
  const [firstName, setFirstName] = useState("User");
  const [userRole, setUserRole] = useState("");
  const [replyTexts, setReplyTexts] = useState({});
  const navigate = useNavigate();

  // useEffect(() => {
  //   const verifyUser = async () => {
  //     const {
  //       data: { user },
  //       error: authError,
  //     } = await supabase.auth.getUser();

  //     if (!user || authError) {
  //       navigate("/");
  //       return;
  //     }

  //     const { data: profile, error: profileError } = await supabase
  //       .from("profiles")
  //       .select("first_name, role")
  //       .eq("id", user.id)
  //       .single();

  //     if (!profile || profileError) {
  //       navigate("/");
  //       return;
  //     }

  //     if (profile.role !== "coordinator" && profile.role !== "admin") {
  //       navigate("/");
  //       return;
  //     }

  //     setUserId(user.id);
  //     setFirstName(profile.first_name);
  //     setUserRole(profile.role);
  //     setUsername(profile.first_name);
  //     setRole(profile.role);
  //   };

  //   verifyUser();
  // }, [navigate]);
  useEffect(() => {
    localStorage.getItem("userRole") === "admin"
      ? setUserRole("admin")
      : setUserRole("coordinator");
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
      toast.warning("Please enter a title and content!");
      return;
    }

    const newRef = push(ref(database, "threads"));
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

    const newReply = push(ref(database, `threads/${threadID}/replies`));
    set(newReply, {
      text: replyText,
      username,
      user_id: userId,
      role,
      timestamp: Date.now(),
    });
  };

  const handleDeleteThread = (threadId) => {
    const threadRef = ref(database, `threads/${threadId}`);
    remove(threadRef);
  };

  const handleDeleteReply = (threadId, replyKey) => {
    const replyRef = ref(database, `threads/${threadId}/replies/${replyKey}`);
    remove(replyRef);
  };

  const canDeleteReply = (replyUserId, replyUserRole) => {
    if (userId === replyUserId) return true;
    if (role === "coordinator" && replyUserRole === "listener") return true;
    if (role === "admin" && (replyUserRole === "listener" || replyUserRole === "coordinator")) return true;
    return false;
  };

  const filteredThreads = Object.entries(threads).filter(([id, thread]) =>
    thread.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {userRole === "admin" ? (
        <AdminNavbar title="Coordinator Dashboard" />
      ) : (
        <CoordinatorNavbar title="Coordinator & Listener Chat" />
      )}

      <div className="flex min-h-screen pt-16 bg-[#e6f4f9]">
        <div className="w-full sm:w-auto sticky top-16 h-[calc(100vh-64px)]">
          <CoordinatorSidebar userName={firstName} />
        </div>

        <div className="main-content p-4 sm:p-6 w-full">
          <h2 className="text-lg sm:text-xl text-[#1E3A8A] font-bold mb-4">Discussion Forum</h2>

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
                <div className="bg-white p-4 rounded shadow w-full break-words" key={id}>
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

                    <div className="flex items-stretch gap-2 mt-2">
                    <input
                      type="text"
                      className="flex-1 px-4 py-2 border rounded text-sm"
                      placeholder="Write a reply..."
                      value={replyTexts[id] || ""}
                      onChange={(e) =>
                        setReplyTexts((prev) => ({
                          ...prev,
                          [id]: e.target.value,
                        }))
                      }
                    />

                    <button
                      onClick={() => {
                        handleReply(id, replyTexts[id]);
                        setReplyTexts((prev) => ({ ...prev, [id]: "" }));
                      }}
                      className="bg-[#003366] text-white px-4 rounded text-sm"
                    >
                      Post
                    </button>
                  </div>
                  {/* <input
                    type="text"
                    className="form-control mt-2 p-2 border rounded w-full"
                    placeholder="Write a reply..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleReply(id, e.target.value);
                        e.target.value = "";
                      }
                    }}
                  /> */}

                  <div className="mt-3 space-y-2">
                    {thread.replies &&
                      Object.entries(thread.replies).map(([key, reply]) => (
                        <div
                          className="bg-blue-100 p-2 rounded text-sm flex flex-col sm:flex-row justify-between w-full break-words"
                          key={key}
                        >
                          <div>
                            <b>{reply.username}</b> at{" "}
                            {new Date(reply.timestamp).toLocaleString()} <br />
                            {reply.text}
                          </div>

                          {canDeleteReply(reply.user_id, reply.role) && (
                            <button
                              onClick={() => handleDeleteReply(id, key)}
                              className="text-red-500 ml-4"
                            >
                              Delete
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