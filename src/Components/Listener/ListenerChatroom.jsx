import { useState, useEffect } from "react";
import database from "../firebase";
import { ref, push, onValue, set, remove } from "firebase/database";
import ListenerSidebar from "./ListenerSidebar";
import ListenerNavbar from "./ListenerNavbar";
import AdminNavbar from "../Admin/AdminNavbar";
import ListenerFeedbackWidget from "./ListenerFeedback";
import { useSelector } from "react-redux";
import { toast } from "react-toastify/unstyled";

export default function ListenerChatroom() {
  const [threads, setThreads] = useState({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [replyTexts, setReplyTexts] = useState({});
  const user = useSelector((state) => state.loggedInUser.success);

  // Fetch threads from Firebase on component mount
  useEffect(() => {
    const threadsRef = ref(database, "threads");
    onValue(threadsRef, (snapshot) => {
      const data = snapshot.val() || {};
      setThreads(data);
    });
  }, []);

  // Handle posting a new discussion thread
  const handlePost = () => {
    if (!title || !content) {
      alert("Please enter a title and content!");
      return;
    }

    const newRef = push(ref(database, "threads"));
    set(newRef, {
      title,
      content,
      username: user.first_name,
      user_id: user.id,
      role: user.role,
      timestamp: Date.now(),
    });

    setTitle("");
    setContent("");
  };

  // Handle replying to a discussion thread
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

  // Handle deleting a discussion thread
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

  // Handle deleting a reply from a discussion thread
  const handleDeleteReply = (threadId, replyKey, reply) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete the thread "${reply}"? This action cannot be undone.`
    );
    if (isConfirmed) {
      const replyRef = ref(database, `threads/${threadId}/replies/${replyKey}`);
      remove(replyRef);
    }
  };
  
  // Check if the user can delete a reply
  const canDeleteReply = (replyUserId, replyUserRole) => {
    return user.id === replyUserId || user.role === "admin";
  };

  // Filter threads based on search query
  const filteredThreads = Object.entries(threads).filter(([id, thread]) =>
    thread.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {user.role === "admin" ? (
        <AdminNavbar title="Listener Dashboard" />
      ) : (
        <ListenerNavbar title="Let's Chat" />
      )}

      <div className="flex flex-col lg:flex-row min-h-screen pt-16 bg-[#e6f4f9]">
        <div className="sticky top-16 h-[calc(100vh-64px)]">
          <ListenerSidebar />
        </div>

        <div className="flex-1 p-4 sm:p-6 w-full">
          <h2 className="text-xl font-bold mb-4">Discussion Forum</h2>

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
              className="w-full bg-[#003366] hover:bg-[#002244] text-white py-2 rounded"
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

                  {(thread.user_id === user.id || user.role === "admin") && (
                    <button
                      onClick={() => handleDeleteThread(id, thread.title)}
                      className="text-red-500 ml-4 hover:underline"
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
                      className="bg-[#003366] text-white px-4 rounded text-sm hover:bg-[#002244]"
                    >
                      Post
                    </button>
                  </div>
                  <div className="mt-3 space-y-2">
                    {thread.replies &&
                      Object.entries(thread.replies).map(([key, reply]) => (
                        <div
                          className="bg-blue-100 p-2 rounded text-sm flex flex-col sm:flex-row justify-between"
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
                              className=" bg-red-700 hover:bg-red-900 px-2 py-1 rounded text-white"
                            >
                              delete
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
      <ListenerFeedbackWidget />
    </>
  );
}
