import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./Components/Home";
import About from "./Components/Listener/About.jsx";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import ResetPassword from "./Components/ResetPassword";
import ResetRequest from "./Components/ResetRequest";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Listener components
import ListenerDashboard from "./Components/Listener/ListenerDashboard";
import CoordinatorsListInListener from "./Components/Listener/CoordinatorsListInListener.jsx";
import ListenerChatroom from "./Components/Listener/ListenerChatroom";
import ListenerFeedback from "./Components/Listener/ListenerFeedback.jsx";
import ListenerScheduling from "./Components/Listener/ListenerScheduling.jsx";
import ListenerHelp from "./Components/Listener/ListenerHelp.jsx";
import ConversationSkills from "./Components/Listener/ConversationSkills.jsx";
import ListeningSkills from "./Components/Listener/ListeningSkills.jsx";
import MakePeopleComfortable from "./Components/Listener/MakePeopleComfortable.jsx";

//Coordinator components
import CoordinatorDashboard from "./Components/Coordinator/CoordinatorDashboard";
import CoordinatorChatroom from "./Components/Coordinator/CoordinatorChatroom";
import CoordinatorListenerChatroom from "./Components/Coordinator/CoordinatorListenerChatroom";
import CoordinatorAppointments from "./Components/Coordinator/CoordinatorAppointments";
import CoordinatorAvailability from "./Components/Coordinator/CoordinatorAvailability";
import LessonCoordinator from "./Components/Coordinator/LessonCoordinator";
// import Logos from "./Components/Coordinator/Logos";
import CoordinatorFeedback from "./Components/Coordinator/CoordinatorFeedback";
import CoordinatorHelp from "./Components/Coordinator/CoordinatorHelp.jsx";
import BookedListener from "./Components/BookedListener.jsx";

//Admin components
import AdminDashboard from "./Components/Admin/AdminDashboard";
import AdminCoordinatorChatroom from "./Components/Admin/AdminCoordinatorChatroom";
import AdminListenerChatroom from "./Components/Admin/AdminListenerChatroom";
import AdminUserList from "./Components/Admin/AdminUserList";
import AdminHelp from "./Components/Admin/AdminHelp";
import AdminSchedulingSetting from "./Components/Admin/AdminSchedulingSetting";
import AdminFeedback from "./Components/Admin/AdminFeedback";
import PendingApproval from "./Components/Admin/PendingApproval";
import AdminCoordinatorList from "./Components/Admin/AdminCoordinatorList.jsx";
import ProtectedRoute from "./contexts/ProtectedRoutes.js";
import { AuthProvider } from "./contexts/AuthContext.js";

function App() {
  return (
    <div>
      <ToastContainer position="top-center" autoClose={2000} />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/listenerhelp" element={<ListenerHelp />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ResetRequest />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/bookedlistener" element={<BookedListener />} />

            <Route element={<ProtectedRoute requiredRole="listener" />}>
              <Route
                path="/listenerdashboard"
                element={<ListenerDashboard />}
              />

              <Route
                path="/coordinatorslistinlistener"
                element={<CoordinatorsListInListener />}
              />
              <Route path="/listenerchatroom" element={<ListenerChatroom />} />
              <Route path="/listenerfeedback" element={<ListenerFeedback />} />
              <Route
                path="/listenerscheduling"
                element={<ListenerScheduling />}
              />
              <Route
                path="/listener/conversation-skills"
                element={<ConversationSkills />}
              />
              <Route
                path="/listener/listening-skills"
                element={<ListeningSkills />}
              />
              <Route
                path="/listener/make-people-comfortable"
                element={<MakePeopleComfortable />}
              />
            </Route>
            <Route element={<ProtectedRoute requiredRole="coordinator" />}>
              <Route
                path="/coordinatordashboard"
                element={<CoordinatorDashboard />}
              />
              <Route
                path="/coordinatorappointments"
                element={<CoordinatorAppointments />}
              />
              <Route
                path="/coordinatoravailability"
                element={<CoordinatorAvailability />}
              />
              <Route
                path="/lessoncoordinator"
                element={<LessonCoordinator />}
              />
              <Route
                path="/coordinatorchatroom"
                element={<CoordinatorChatroom />}
              />
              <Route
                path="/coordinatorlistenerchatroom"
                element={<CoordinatorListenerChatroom />}
              />
              {/* <Route path="/Logos" element={<Logos />} /> */}
              <Route
                path="/coordinatorfeedback"
                element={<CoordinatorFeedback />}
              />
              <Route path="/coordinatorhelp" element={<CoordinatorHelp />} />
            </Route>
            <Route element={<ProtectedRoute requiredRole="admin" />}>
              <Route path="/admindashboard" element={<AdminDashboard />} />
              <Route path="/adminuserlist" element={<AdminUserList />} />
              <Route path="/adminhelp" element={<AdminHelp />} />
              <Route path="/adminfeedback" element={<AdminFeedback />} />
              <Route
                path="/admincoordinatorchatroom"
                element={<AdminCoordinatorChatroom />}
              />
              <Route
                path="/adminlistenerchatroom"
                element={<AdminListenerChatroom />}
              />
              <Route
                path="/admincoordinatorlist"
                element={<AdminCoordinatorList />}
              />
              <Route
                path="/adminschedulingsetting"
                element={<AdminSchedulingSetting />}
              />
            </Route>
            <Route element={<ProtectedRoute requiredRole="pending" />}>
              <Route path="/pendingapproval" element={<PendingApproval />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
