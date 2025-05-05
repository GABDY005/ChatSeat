//import logo from './logo.svg';
//import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/Listener/About.jsx";
import Login from "./Components/Login";
import Signup from "./Components/Signup";

//Listener components
import ListenerDashboard from "./Components/Listener/ListenerDashboard";
import ListenerResources from "./Components/Listener/ListenerResources.jsx";
import CoordinatorsListInListener from "./Components/Listener/CoordinatorsListInListener.jsx";
import ListenerChatroom from "./Components/Listener/ListenerChatroom";
import ListenerFeedback from "./Components/Listener/ListenerFeedback.jsx";
import ListenerScheduling from "./Components/Listener/ListenerScheduling.jsx";
import ListenerHelp from "./Components/Listener/ListenerHelp.jsx";

import RequireAuth from "./context/RequireAuth";
import { AuthProvider } from "./context/AuthContext.jsx";

//Coordinator components
import CoordinatorDashboard from "./Components/Coordinator/CoordinatorDashboard";
import CoordinatorChatroom from "./Components/Coordinator/CoordinatorChatroom";
import CoordinatorListenerChatroom from "./Components/Coordinator/CoordinatorListenerChatroom";
import CoordinatorAppointments from "./Components/Coordinator/CoordinatorAppointments";
import CoordinatorAvailability from "./Components/Coordinator/CoordinatorAvailability";
import LessonCoordinator from "./Components/Coordinator/LessonCoordinator";
import Logos from "./Components/Coordinator/Logos";
import CoordinatorFeedback from "./Components/Coordinator/CoordinatorFeedback";
import CoordinatorHelp from "./Components/Coordinator/CoordinatorHelp.jsx";
import BookedListener from "./Components/BookedListener.jsx";

//Admin components
import AdminDashboard from "./Components/Admin/AdminDashboard";
import AdminCoordinatorChatroom from "./Components/Admin/AdminCoordinatorChatroom";
import AdminListenerChatroom from "./Components/Admin/AdminListenerChatroom";
import AdminUserList from "./Components/Admin/AdminUserList";
import AdminResources from "./Components/Admin/AdminResources";
import AdminHelp from "./Components/Admin/AdminHelp";
import AdminSchedulingSetting from "./Components/Admin/AdminSchedulingSetting";
import AdminFeedback from "./Components/Admin/AdminFeedback";
import PendingApproval from "./Components/Admin/PendingApproval";

function App() {
  return (
    <div>
      {/* <AuthProvider> */}
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ListenerHelp" element={<ListenerHelp />} />
            <Route path="/About" element={<About />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route
              path="/ListenerDashboard"
              element={
                // <RequireAuth allowedRoles={["listener"]}>
                  <ListenerDashboard />
                // </RequireAuth>
              }
            />
            <Route path="/ListenerResources" element={<ListenerResources />} />
            <Route
              path="/CoordinatorsListInListener"
              element={<CoordinatorsListInListener />}
            />
            <Route path="/ListenerChatroom" element={<ListenerChatroom />} />
            <Route path="/ListenerFeedback" element={<ListenerFeedback />} />
            <Route
              path="/ListenerScheduling"
              element={<ListenerScheduling />}
            />
            <Route path="/BookedListener" element={<BookedListener />} />
            <Route path="/PendingApproval" element={<PendingApproval />} />

            <Route
              path="/CoordinatorDashboard"
              element={
                // <RequireAuth allowedRoles={["coordinator"]}>
                  <CoordinatorDashboard />
                // </RequireAuth>
              }
            />

            <Route
              path="/AdminDashboard"
              element={
                // <RequireAuth allowedRoles={["admin"]}>
                  <AdminDashboard />
                // </RequireAuth>
              }
            />

            <Route
              path="/CoordinatorAppointments"
              element={<CoordinatorAppointments />}
            />
            <Route
              path="/CoordinatorAvailability"
              element={<CoordinatorAvailability />}
            />
            <Route path="/LessonCoordinator" element={<LessonCoordinator />} />
            <Route
              path="/CoordinatorChatroom"
              element={<CoordinatorChatroom />}
            />
            <Route
            path="/CoordinatorListenerChatroom"
            element={<CoordinatorListenerChatroom />}
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
            <Route
            path="/AdminCoordinatorChatroom"
            element={<AdminCoordinatorChatroom />}
            />
            <Route
            path="/AdminListenerChatroom"
            element={<AdminListenerChatroom />}
            />
            <Route
              path="/AdminSchedulingSetting"
              element={<AdminSchedulingSetting />}
            />

            {/* Add other routes here */}
          </Routes>
        </Router>
      {/* </AuthProvider> */}
    </div>
  );
}

export default App;
