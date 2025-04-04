import React from 'react'
import { Link } from 'react-router-dom'
//import Sidebar from './Sidebar';

export default function Chatroom() {
  return (
      <>
   <div className="bg-[#003366] text-white text-center py-3">
                 <h4 className="m-0 text-lg font-semibold">Feedback Form</h4>
             </div>
              <div class="flex min-h-[calc(100vh-60px)]">
                      <div className="w-1/5 bg-[#A8E4F2] p-4 flex flex-col">
                          <div>
                              <div className="flex flex-col p-4 space-y-4">
                                  
                                  <div className="nav-links space-y-4">
                                     <Link to="/Coordinators" className="block text-[#003366] font-bold text-lg hover:underline">Coordinators</Link>
                                     <Link to="/Scheduling" className="block text-[#003366] font-bold text-lg hover:underline">Scheduling</Link>
                                     <Link to="/Listener" className="block text-[#003366] font-bold text-lg hover:underline">Listener</Link>
                                     <Link to="/Chatroom" className="block text-[#003366] font-bold text-lg hover:underline"> Chat Room</Link>
                                     <Link to="/About" className="block text-[#003366] font-bold text-lg hover:underline"> About</Link>
                                     <Link to="/Feedback" className="block text-[#003366] font-bold text-lg hover:underline">Feedback</Link>
                                     <Link to="/Help" className="block text-[#003366] font-bold text-lg hover:underline">Help</Link>
                                  </div>
             
                              </div>
             
                              <div className="mt-auto pt-4">
                                 
                                  <Link to="/" className="bg-white text-black font-bold px-5 py-2 rounded-lg hover:bg-gray-200 inline-block">Logout</Link>
                              </div>
                          </div>
             
                          </div>

            <div className="ml-[17%] pt-20 pb-10 px-10">
                <h2 className="fw-bold mb-4">Discussion Forum</h2>
                <p>Post new topics and discuss with others.</p>

                <div className="mb-3">
                    <input type="text" id="threadTitle" placeholder="Enter topic title" className="form-control mb-2" />
                    <textarea id="threadContent" placeholder="Write your discussion" className="form-control mb-2"></textarea>
                    <button onclick="postThread()" className="btn btn-primary w-100">Post Discussion</button>
                </div>

                <h3 className="mt-4">Discussion Threads</h3>
                 <div id="threads"></div> 
            </div>
     

    

    
        {/* const firebaseConfig = {
            apiKey: "AIzaSyBB6KrILbmD6knl9yOsQuFEDP38oU67bcg",
            authDomain: "chat-seats-chat-room.firebaseapp.com",
            databaseURL: "https://chat-seats-chat-room-default-rtdb.asia-southeast1.firebasedatabase.app",
            projectId: "chat-seats-chat-room",
            storageBucket: "chat-seats-chat-room.firebasestorage.app",
            messagingSenderId: "804236683094",
            appId: "1:804236683094:web:a8236d8f0f0572acfbd8f7"
        }; */}

        {/* firebase.initializeApp(firebaseConfig);
        const database = firebase.database(); */}

        {/* function postThread() {
            let title = document.getElementById("threadTitle").value;
            let content = document.getElementById("threadContent").value;

            if (!title || !content) {
                alert("Please enter a title and content!");
                return;
            }

            let newThread = database.ref("threads").push();
            newThread.set({
                title: title,
                content: content,
                username: "User", 
                timestamp: Date.now() 
            });

            document.getElementById("threadTitle").value = "";
            document.getElementById("threadContent").value = "";
        }

        function loadThreads() {
            database.ref("threads").on("value", snapshot => {
                let threadsDiv = document.getElementById("threads");
                threadsDiv.innerHTML = "";

                snapshot.forEach(childSnapshot => {
                    let threadID = childSnapshot.key;
                    let data = childSnapshot.val();

                    let date = new Date(data.timestamp);
                    let formattedTime = date.toLocaleString();

                    let thread =  `<div className="thread-card" style="background-color: #f1f1f1; padding: 10px; border-radius: 8px; margin-bottom: 15px;">
                                    <h4 style="color: #003366;">${data.title}</h4>
                                    <p>${data.content}</p>
                                    <small>Posted by <b>${data.username}</b> at ${formattedTime}</small>

                                    <div className="reply-box mt-2">
                                        <input type="text" id="reply-${threadID}" placeholder="Write a reply..." className="form-control mb-2">
                                        <button onclick="postReply('${threadID}')" className="btn btn-sm btn-secondary">Reply</button>
                                    </div>

                                    <div id="replies-${threadID}" className="mt-3"></div>
                                  </div>
                                  <hr style="border: 1px solid #ccc; margin: 20px 0;">`;

                    threadsDiv.innerHTML += thread;

                    loadReplies(threadID);
                });
            }); */}
        {/* }

        function postReply(threadID) {
            let replyInput = document.getElementById(`reply-${threadID}`);
            let replyText = replyInput.value.trim();

            if (!replyText) {
                alert("Reply cannot be empty!");
                return;
            }

            let newReply = database.ref(`threads/${threadID}/replies`).push();
            newReply.set({
                text: replyText,
                username: "User",
                timestamp: Date.now()
            });

            replyInput.value = "";
        }

        function loadReplies(threadID) {
            database.ref(`threads/${threadID}/replies`).on("value", snapshot => {
                let repliesDiv = document.getElementById(`replies-${threadID}`);
                repliesDiv.innerHTML = "";

                snapshot.forEach(replySnapshot => {
                    let replyData = replySnapshot.val();
                    let date = new Date(replyData.timestamp);
                    let formattedTime = date.toLocaleString();
                    let reply = `<div style="background: #e6f2ff; padding: 8px; border-radius: 5px; margin-top: 5px;">
                                    <b>${replyData.username}</b> at ${formattedTime}: <br>
                                    ${replyData.text}
                                 </div>`;

                    repliesDiv.innerHTML += reply;
                });
            });
        }

        window.onload = loadThreads; */}
    </div> 
    </>
  )
}
