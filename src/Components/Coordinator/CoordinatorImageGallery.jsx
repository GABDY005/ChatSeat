import React, { useEffect, useState } from "react";
import supabase from "../../supabase";
import CoordinatorNavbar from "./CoordinatorNavbar";
import CoordinatorSidebar from "./CoordinatorSidebar";

export default function CoordinatorImageGallery() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("User");

  useEffect(() => {
    const fetchUserName = async () => {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (user && !authError) {
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("first_name")
          .eq("id", user.id)
          .single();

        if (profile?.first_name) {
          setFirstName(profile.first_name);
        }
      }

    };

    fetchUserName();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("first_name, role")
        .eq("id", user.id)
        .single();

      if (profile) {
        setUserName(profile.first_name);
        setUserRole(profile.role);
        fetchImages();
      }
    };
    getUser();
  }, []);

  const fetchImages = async () => {
    const { data, error } = await supabase
      .storage
      .from("coordinator-images")
      .list("", { limit: 100, sortBy: { column: "created_at", order: "desc" } });

    if (error) return console.error("Failed to list images:", error);

    const signed = await Promise.all(
      data.map(async (file) => {
        const { data: signedUrl } = await supabase
          .storage
          .from("coordinator-images")
          .createSignedUrl(file.name, 300); // valid for 5 minutes

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
      alert("Upload failed.");
      console.error(error);
    } else {
      fetchImages();
    }
    setUploading(false);
  };

  const handleDelete = async (fileName) => {
    const { error } = await supabase
      .storage
      .from("coordinator-images")
      .remove([fileName]);

    if (error) {
      alert("Failed to delete.");
      console.error(error);
    } else {
      fetchImages();
    }
  };

  return (
    <>
      <CoordinatorNavbar title="Image Gallery" />
      <div className="flex min-h-screen pt-16 bg-[#e6f4f9]">
        <div className="sticky top-16 h-[calc(100vh-64px)]">
          <CoordinatorSidebar userName={firstName} />
        </div>

        <div className="flex-1 p-8">
          <h2 className="text-2xl font-bold text-[#003366] mb-4">Image Gallery</h2>
          <input
            type="file"
            onChange={handleUpload}
            disabled={uploading}
            className="mb-4"
          />
          {uploading && <p className="text-blue-500">Uploading...</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {files.length === 0 && <p>No images found.</p>}
            {files.map(file => (
              <div key={file.name} className="border p-3 rounded bg-white shadow">
                <img src={file.url} alt={file.name} className="mb-2 max-w-full h-auto" />
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
    </>
  );
}