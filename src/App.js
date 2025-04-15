//import logo from './logo.svg';
//import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import ListenerHelp from "./Components/ListenerHelp";
import About from "./Components/About";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import ListenerDashboard from "./Components/ListenerDashboard";
import ListenerResources from "./Components/ListenerResources.jsx";
import CoordinatorsListInListener from "./Components/CoordinatorsListInListener.jsx";
import ListenerChatroom from "./Components/ListenerChatroom";
import ListenerFeedback from "./Components/ListenerFeedback.jsx";
import ListenerScheduling from "./Components/ListenerScheduling.jsx";
import BookedListener from "./Components/BookedListener.jsx";

import AdminDashboard from "./Components/AdminDashboard";
//import RequireAuth from "./context/RequireAuth";
import CoordinatorDashboard from "./Components/CoordinatorDashboard";
import CoordinatorAppointments from "./Components/CoordinatorAppointments";
import CoordinatorAvailability from "./Components/CoordinatorAvailability";
import LessonCoordinator from "./Components/LessonCoordinator";
import Logos from "./Components/Logos";
import CoordinatorFeedback from "./Components/CoordinatorFeedback";
import CoordinatorHelp from "./Components/CoordinatorHelp.jsx";
import AdminUserList from "./Components/AdminUserList";
import AdminResources from "./Components/AdminResources";
import AdminHelp from "./Components/AdminHelp";
import AdminFeedback from "./Components/AdminFeedback";
import CoordinatorChatroom from "./Components/CoordinatorChatroom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ListenerHelp" element={<ListenerHelp />} />
          <Route path="/About" element={<About />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/ListenerDashboard" element={<ListenerDashboard />} />
          <Route path="/ListenerResources" element={<ListenerResources />} />
          <Route path="/CoordinatorsListInListener" element={<CoordinatorsListInListener />} />
          <Route path="/ListenerChatroom" element={<ListenerChatroom />} />
          <Route path="/ListenerFeedback" element={<ListenerFeedback />} />
          <Route path="/ListenerScheduling" element={<ListenerScheduling />} />
          <Route path="/BookedListener" element={<BookedListener />} />
          <Route
            path="/CoordinatorDashboard"
            element={<CoordinatorDashboard />}
          />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route
            path="/CoordinatorDashboard"
            element={<CoordinatorDashboard />}
          />
          <Route path="/CoordinatorAppointments" element={<CoordinatorAppointments />} />
          <Route
            path="/CoordinatorAvailability"
            element={<CoordinatorAvailability />}
          />
          <Route path="/LessonCoordinator" element={<LessonCoordinator />} />
          <Route
            path="/CoordinatorChatroom"
            element={<CoordinatorChatroom />}
          />
          <Route path="/Logos" element={<Logos />} />
          <Route
            path="/CoordinatorFeedback"
            element={<CoordinatorFeedback />}
          />
          <Route path="/CoordinatorHelp" element={<CoordinatorHelp />} />
          <Route path="/AdminUserList" element={<AdminUserList />} />
          <Route path="/AdminResources" element={<AdminResources />} />
          <Route path="/AdminHelp" element={<AdminHelp />} />
          <Route path="/AdminFeedback" element={<AdminFeedback />} />

          {/* Add other routes here */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
