import React, { useEffect, useState } from 'react';
import ListenerSidebar from './ListenerSidebar';
import supabase from '../supabase';

export default function ListenerDashboard() {
  const [firstName, setFirstName] = useState("User");

  useEffect(() => {
    const fetchUserName = async () => {
      const {
        data: { user },
        error: authError
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

  return (
    <>
      <div className="bg-[#003366] text-white h-16 flex items-center justify-center shadow-md px-6">
        <h4 className="text-xl font-bold">Welcome to Dashboard</h4>
      </div>

      <div className="flex min-h-[calc(100vh-64px)]">
        <ListenerSidebar userName={firstName} />

        <div className="flex-1 flex items-center justify-center p-10">
          <div className="text-center max-w-[600px]">
            <h2 className="font-bold text-2xl mb-5 text-[#1E3A8A]">Have a chat seat</h2>
            <p className="font-medium mb-4 text-gray-700">
              The purpose behind setting up chat seat is to connect members of the community through conversation.
            </p>
            <p className="font-medium mb-4 text-gray-700">
              You may find a chat seat in a library or shopping centre. You will recognise them by a banner such as one shown.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

