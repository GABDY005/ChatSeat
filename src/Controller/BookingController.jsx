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