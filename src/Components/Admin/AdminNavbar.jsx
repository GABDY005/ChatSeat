import React, { useEffect , useState } from "react";
import { useNavigate, useLocation  } from "react-router-dom";
import logo from "../../assets/Logo.jpg";
import supabase from "../../supabase";


export default function AdminNavbar({title="Admin Dashboard"}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [userRole, setUserRole] = useState("");
  const [switchDashboard, setSwitchDashboard] = useState(false);

  const handleLogoClick = () => {
    window.location.reload();
  };

  useEffect(() => {
    const fetchUserRole = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

          if (profile?.role) {
        setUserRole(profile.role);
      }
    }
    

    const isListenerDashboard = location.pathname.includes("ListenerDashboard");
    const isCoordinatorDashboard = location.pathname.includes("CoordinatorDashboard");
    const isAdminDashboard = location.pathname.includes("AdminDashboard");

     setSwitchDashboard(isListenerDashboard || isCoordinatorDashboard || isAdminDashboard);
  };
  fetchUserRole();
    }, [location]);

  return (
    <>
    <div className="fixed top-0 w-full z-50 bg-[#003366] text-white h-16 flex items-center justify-between px-6 shadow-md">
     
      <div
        onClick={handleLogoClick}
        className="flex items-center space-x-2 cursor-pointer"
      >
        <img
          src={logo}
          alt="Chat Seat Logo"
          className="w-10 h-10 object-cover border-2 border-black shadow cursor-pointer"
        />
      </div>

      <div className="absolute left-1/2 transform -translate-x-1/2">
        <h4 className="text-xl font-bold">{title}</h4>
      </div>

     
      {userRole === "admin" && (
          <div className="right-6 relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="bg-blue-700 px-4 py-2 rounded hover:bg-blue-800 focus:outline-none"
            >
              Dashboards ▾
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white text-gray-800 rounded shadow-lg z-10">
                <button
                  onClick={() => {
                    navigate("/ListenerDashboard");
                    setDropdownOpen(false);
                  }}
                  className="text-sm w-full text-left px-4 py-2 hover:bg-blue-100"
                >
                  Listener Dashboard
                </button>
                <button
                  onClick={() => {
                    navigate("/CoordinatorDashboard");
                    setDropdownOpen(false);
                  }}
                  className="text-sm w-full text-left px-4 py-2 hover:bg-green-100"
                >
                  Coordinator Dashboard
                </button>
                <button
                  onClick={() => {
                    navigate("/AdminDashboard");
                    setDropdownOpen(false);
                  }}
                  className="text-sm w-full text-left px-4 py-2 hover:bg-yellow-100"
                >
                  Admin Dashboard
                </button>
              </div>
            )}
          </div>
      )}
    </div>
    </>
  );
}
