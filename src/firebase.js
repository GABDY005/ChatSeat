import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBB6KrILbmD6knl9yOsQuFEDP38oU67bcg",
  authDomain: "chat-seats-chat-room.firebaseapp.com",
  databaseURL:
    "https://chat-seats-chat-room-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chat-seats-chat-room",
  storageBucket: "chat-seats-chat-room.appspot.com",
  messagingSenderId: "804236683094",
  appId: "1:804236683094:web:a8236d8f0f0572acfbd8f7",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;
