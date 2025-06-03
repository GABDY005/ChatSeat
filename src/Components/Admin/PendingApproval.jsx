import { useNavigate } from "react-router-dom";

export default function PendingApproval() {
  const navigate = useNavigate();
  return (
    <>
  
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
        <div className="bg-blue-50 border border-blue-300 shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-blue-700 mb-4">
            Awaiting Admin Approval
          </h1>

          {/* Customise the message and styles as needed */}
          <p className="text-blue-900 mb-4">
            Thank you for signing up! Your account is currently under review by
            an admin. Once approved, you will be redirected to your dashboard
            automatically.
          </p>

          
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    </>
  );
}
