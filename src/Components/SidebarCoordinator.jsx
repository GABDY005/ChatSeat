import { useLocation } from "react-router-dom"
import React from "react";

function SidebarCoordiantor({userName ="Coordinator"}) {
    const location = useLocation();


    const isActive = (path) =>
        location.pathname ===path
    ? 'bg-[#003366] text-white font-semibold'
    : 'bg-white text-[#1E3A8A] hover:bg-[#d9eefe]';
    return(
        <>
            <div>
                <div>
                    Hello, {userName}
                </div>

                <div>
                    <Link to="/CoordinatorDashboard">
                        Dashboard
                    </Link>
                    
                    <Link to="/Appintments">
                        Appointments
                    </Link>

                    <Link to="/AvailabilityCoordinator">
                        Availability
                    </Link>

                    <Link to="/LessonsCoordinator">
                        Resources
                    </Link>

                    <Link to="/ChatroomCoordinator">
                        Let's Talk
                    </Link>

                    <Link to="/Feedback">
                        Feedback
                    </Link>

                    <Link to="/Help">
                        Help
                    </Link>
                </div>


                <div>
                    <Link to="/">
                        Logout
                    </Link>
                </div>
            </div>
        </>

    );
    
}

export default SidebarCoordiantor;