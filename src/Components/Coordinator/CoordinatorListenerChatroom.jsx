import { useState, useEffect } from "react";
import database from "../firebase";
import { ref, push, onValue, set, remove } from "firebase/database";
import CoordinatorSidebar from "./CoordinatorSidebar";
import CoordinatorNavbar from "./CoordinatorNavbar";
import AdminNavbar from "../Admin/AdminNavbar";
import { toast } from "react-toastify";
import FeedbackWidget from "./CoordinatorFeedback";
import { useSelector } from "react-redux";

export default function CoordinatorListenerChatroom() {
  const [threads, setThreads] = useState({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [replyTexts, setReplyTexts] = useState({});
  const user = useSelector((state) => state.loggedInUser.success);

  // Fetch threads from Firebase Realtime Database
  useEffect(() => {
    const threadsRef = ref(database, "threads");
    onValue(threadsRef, (snapshot) => {
      const data = snapshot.val() || {};
      setThreads(data);
    });
  }, []);

  // Handle posting a new thread
  const handlePost = () => {
    if (!title || !content) {
      toast.warning("Please enter a title and content!");
      return;
    }

    // Check if the user is logged in
    const newRef = push(ref(database, "threads"));
    set(newRef, {
      title,
      content,
      username: user.first_name,
      user_id: user.id,
      timestamp: Date.now(),
    });

    setTitle("");
    setContent("");
  };

  // Handle posting a reply to a thread
  const handleReply = (threadID, replyText) => {
    if (!replyText) return;

    const newReply = push(ref(database, `threads/${threadID}/replies`));
    set(newReply, {
      text: replyText,
      username: user.first_name,
      user_id: user.id,
      role: user.role,
      timestamp: Date.now(),
    });
  };

  // Handle deleting a thread
  const handleDeleteThread = (threadId, threadTitle) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete the thread "${threadTitle}"? This action cannot be undone.`
    );

    if (isConfirmed) {
      const threadRef = ref(database, `threads/${threadId}`);
      remove(threadRef);
      toast.success("Thread deleted successfully!");
    }
  };

  // Handle deleting a reply from a thread
  const handleDeleteReply = (threadId, replyKey, reply) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete the thread "${reply}"? This action cannot be undone.`
    );
    if (isConfirmed) {
      const replyRef = ref(database, `threads/${threadId}/replies/${replyKey}`);
      remove(replyRef);
    }
  };

  // Function to check if the user can delete a reply
  const canDeleteReply = (replyUserId, replyUserRole) => {
    if (user.id === replyUserId) return true;
    if (user.role === "coordinator" && replyUserRole === "listener")
      return true;
    if (
      user.role === "admin" &&
      (replyUserRole === "listener" || replyUserRole === "coordinator")
    )
      return true;
    return false;
  };

  // Filter threads based on search query
  const filteredThreads = Object.entries(threads).filter(([id, thread]) =>
    thread.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {user.role === "admin" ? (
        <AdminNavbar title="Coordinator Dashboard" />
      ) : (
        <CoordinatorNavbar title="Coordinator & Listener Chat" />
      )}

      <div className="flex min-h-screen pt-16 bg-[#e6f4f9]">
        <div className="w-full sm:w-auto sticky top-16 h-[calc(100vh-64px)]">
          <CoordinatorSidebar />
        </div>

        <div className="main-content p-4 sm:p-6 w-full">
          <h2 className="text-lg sm:text-xl text-[#1E3A8A] font-bold mb-4">
            Discussion Forum
          </h2>

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

          {/* Display threads */}
          <div className="space-y-4">
            {filteredThreads.length > 0 ? (
              filteredThreads.reverse().map(([id, thread]) => (
                <div
                  className="bg-white p-4 rounded shadow w-full break-words"
                  key={id}
                >
                  <h4 className="font-bold text-[#003366]">{thread.title}</h4>
                  <p>{thread.content}</p>
                  <small>
                    Posted by <b>{thread.username}</b> at{" "}
                    {new Date(thread.timestamp).toLocaleString()}
                  </small>

                  {(thread.user_id === user.id || user.role === "admin") && (
                    <button
                      onClick={() => handleDeleteThread(id, thread.title)}
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

                  {/*  Display replies */}
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
                              onClick={() =>
                                handleDeleteReply(id, key, reply.text)
                              }
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
      <FeedbackWidget />
    </>
  );
}
