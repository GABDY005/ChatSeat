import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import database from "../firebase";
import { ref, push, onValue, set, remove } from "firebase/database";
import AdminSidebar from "../Admin/AdminSidebar";
import AdminNavbar from "../Admin/AdminNavbar";
import supabase from "../../supabase";
import { toast } from "react-toastify";

export default function AdminListenerChatroom() {
  const [threads, setThreads] = useState({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [username, setUsername] = useState("Admin");
  const [userId, setUserId] = useState("");
  const [userRole, setUserRole] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [firstName, setFirstName] = useState("User");
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

  //     if (!profile || profileError || profile.role !== "admin") {
  //       navigate("/");
  //       return;
  //     }

  //     setUserId(user.id);
  //     setUsername(profile.first_name);
  //     setFirstName(profile.first_name);
  //     setUserRole("admin");
  //   };

  //   verifyUser();
  // }, [navigate]);

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
      role: userRole,
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

  const canDeleteReply = (replyUserId) => {
    return replyUserId === userId || userRole === "admin";
  };

  const filteredThreads = Object.entries(threads).filter(([id, thread]) =>
    thread.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <AdminNavbar title="Admin - Listener Chatroom" />
      <div className="flex min-h-screen pt-16 bg-[#e6f4f9]">
        <div className="w-full sm:w-auto sticky top-16 h-[calc(100vh-64px)]">
          <AdminSidebar userName={firstName} />
        </div>

        <div className="main-content p-6 w-full bg-emerald-50">
          <h2 className="text-xl font-bold text-[#1E3A8A] mb-4">Discussion Forum</h2>

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

                  {canDeleteReply(thread.user_id) && (
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

                          {canDeleteReply(reply.user_id) && (
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