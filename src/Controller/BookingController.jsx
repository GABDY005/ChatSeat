import supabase from "../supabase";

export const fetchAllBookings = async () => {
    const { data, error } = await supabase
        .from("bookings")
        .select("id, location, date, time, user_id")
        .order("date", { ascending: true });
    
    if (error) {
        throw new Error("Error fetching bookings:" + error.message);
    }
    
    return data;
    };

export const deletePastBookings = async () => {
  const today = new Date().toISOString().split("T")[0]; 

  const { error } = await supabase
    .from("bookings") 
    .lt("date", today);

  if (error) {
    console.error("Error deleting past bookings:", error);
    throw new Error("Could not delete past bookings");
  }
};

    