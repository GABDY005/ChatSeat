//import logo from './logo.svg';
//import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Help from "./Components/Help";
import About from "./Components/About";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Dashboard from "./Components/Dashboard";
import Listener from "./Components/Listener";
import Coordinators from "./Components/Coordinators";
import Chatroom from "./Components/Chatroom";
import Feedback from "./Components/Feedback";
import Scheduling from "./Components/Scheduling";
import AvailableListener from "./Components/AvailableListener";
import Sidebar from './Components/Sidebar';
import AdminDashboard from "./Components/AdminDashboard";
//import RequireAuth from "./context/RequireAuth";
//import SidebarCoordinator from "./Components/SidebarCoordinator";
import CoordinatorDashboard from "./Components/CoordinatorDashboard";
import Appointments from "./Components/Appointments";
import AvailabilityCoordinator from "./Components/AvailabilityCoordinator";
import ChatroomCoordinator from "./Components/ChatroomCoordinator";
import LessonCoordinator from "./Components/LessonCoordinator";
import Logos from "./Components/Logos";
import FeedbackCoordinator from "./Components/FeedbackCoordinator";
import HelpCoordinator from "./Components/HelpCoordinator";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Help" element={<Help />} />
          <Route path="/About" element={<About />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Listener" element={<Listener />} />
          <Route path="/Coordinators" element={<Coordinators />} />
          <Route path="/Chatroom" element={<Chatroom />} />
          <Route path="/Feedback" element={<Feedback />} />
          <Route path="/Scheduling" element={<Scheduling />} />
          <Route path="/AvailableListener" element={<AvailableListener />} />
          <Route path="/Sidebar" element={<Sidebar />} />
          <Route path = "/CoordinatorDashboard" element={<CoordinatorDashboard />} />
          <Route path = "/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/CoordinatorDashboard" element={<CoordinatorDashboard />} />
          <Route path="/Appointments" element={<Appointments />} />
          <Route path="/AvailabilityCoordinator" element={<AvailabilityCoordinator />} />
          <Route path="/LessonCoordinator" element={<LessonCoordinator />} />
          <Route path="/ChatroomCoordinator" element={<ChatroomCoordinator />} />
          <Route path="/Logos" element={<Logos />} />
          <Route path="/FeedbackCoordinator" element={<FeedbackCoordinator />} />
          <Route path="/HelpCoordinator" element={<HelpCoordinator />} />
          {/* Add other routes here */}
        



        </Routes>
      </Router>
    </div>
  );
}

export default App;
