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
//import Sidebar from './Components/Sidebar';
import TestUser from "./Components/TestUser";
import CoordinatorDashboard from "./Components/CoordinatorDashboard";
import AdminDashboard from "./Components/AdminDashboard";
import RequireAuth from "./context/RequireAuth";




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
          {/* <Route path="/Sidebar" element={<Sidebar />} /> */}
          <Route path="/TestUser" element={<TestUser />} />
          <Route path = "/CoordinatorDashboard" element={<CoordinatorDashboard />} />
          <Route path = "/AdminDashboard" element={<AdminDashboard />} />
          {/* <Route
            path="/coordinator"
            element={
              <RequireAuth role="coordinator">
                <CoordinatorDashboard />
              </RequireAuth>
            }
          /> */}
          {/* <Route
            path="/admin"
            element={
              <RequireAuth role="admin">
                <AdminDashboard />
              </RequireAuth>


            }
          /> */}



        </Routes>
      </Router>
    </div>
  );
}

export default App;
