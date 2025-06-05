import { useEffect, useState } from "react";
import supabase from "../../supabase";
import CoordinatorNavbar from "./CoordinatorNavbar";
import CoordinatorSidebar from "./CoordinatorSidebar";
import AdminNavbar from "../Admin/AdminNavbar";
import { toast } from "react-toastify";
import FeedbackWidget from "./CoordinatorFeedback";
import { useSelector } from "react-redux";

export default function CoordinatorImageGallery() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const user = useSelector((state) => state.loggedInUser.success);

  useEffect(() => {
    fetchImages();
  }, []);
  const fetchImages = async () => {
    const { data, error } = await supabase.storage
      .from("coordinator-images")
      .list("", {
        limit: 100,
        sortBy: { column: "created_at", order: "desc" },
      });

    if (error) {
      console.error("Failed to list images:", error);
      return;
    }

    const signed = await Promise.all(
      data.map(async (file) => {
        const { data: signedUrl } = await supabase.storage
          .from("coordinator-images")
          .createSignedUrl(file.name, 300);

        return { name: file.name, url: signedUrl?.signedUrl };
      })
    );

    setFiles(signed);
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const fileName = `${Date.now()}_${file.name}`;
    const { error } = await supabase.storage
      .from("coordinator-images")
      .upload(fileName, file);

    if (error) {
      toast.error("Upload failed.");
      console.error(error);
    } else {
      fetchImages();
    }

    setUploading(false);
  };

  const handleDelete = async (fileName) => {
    const { error } = await supabase.storage
      .from("coordinator-images")
      .remove([fileName]);

    if (error) {
      toast.error("Failed to delete.");
      console.error(error);
    } else {
      fetchImages();
    }
  };

  return (
    <>
      {user.role === "admin" ? (
        <AdminNavbar title="Coordinator Dashboard" />
      ) : (
        <CoordinatorNavbar title="Image Gallery" />
      )}

      <div className="flex min-h-screen pt-16 bg-[#e6f4f9]">
        <div className="w-full sm:w-auto sticky top-16 h-[calc(100vh-64px)]">
          <CoordinatorSidebar />
        </div>

        <div className="flex-1 p-4 sm:p-6 md:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-[#003366] mb-4">
            Image Gallery
          </h2>
          <div className="mb-4">
            <input
              type="file"
              onChange={handleUpload}
              disabled={uploading}
              className="block w-full text-sm text-gray-600"
            />
          </div>
          {uploading && <p className="text-blue-500">Uploading...</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {files.length === 0 && <p>No images found.</p>}
            {files.map((file) => (
              <div
                key={file.name}
                className="w-full border p-3 rounded bg-white shadow"
              >
                <img
                  src={file.url}
                  alt={file.name}
                  className="mb-2 max-w-full h-auto"
                />
                <p className="text-sm break-words">{file.name}</p>
                <div className="flex space-x-4 mt-2">
                  <a
                    href={file.url}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </a>
                  <button
                    onClick={() => handleDelete(file.name)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FeedbackWidget />
    </>
  );
}
