import supabase from "../supabase";

export const signupUser = async ({
  email,
  password,
  firstName,
  lastName,
  phoneNumber,
}) => {
  // Validate input
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  // If there's an error during signup, throw an error
  if (error) {
    throw new Error("Signup failed：" + error.message);
  }

  const user = data.user;

  // If user is not created, throw an error
  const { error: profileError } = await supabase.from("profiles").insert([
    {
      id: user.id,
      email,
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      role: "pending",
    },
  ]);

  if (profileError) {
    throw new Error("Failed to add user data:" + profileError.message);
  }

  return user;
};

// Login a user
export const loginUser = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error("Login failed:" + error.message);
  }

  const { user } = data;

  // Fetch the user's profile to get their role
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profileError) {
    throw new Error("Unable to read user identity:" + profileError.message);
  }

  return { user, role: profile.role };
};

// Get a specific user's profile
export const getUserProfile = async (userId) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    throw new Error("Unable to read user identity:" + error.message);
  }

  return data;
};

// Update a user's profile
export const updateUserRole = async (userId, newRole) => {
  const { error } = await supabase
    .from("profiles")
    .update({ role: newRole })
    .eq("id", userId);

  if (error) {
    throw new Error("Update Role failed" + error.message);
  }

  return true;
};

//Fetch all users from the profiles table
export const fetchAllUsers = async () => {
  const { data, error } = await supabase.from("profiles").select("*");

  if (error) {
    throw new Error("Failed to fetch users:" + error.message);
  }

  return data;
};

//Delete a user
export const deleteUserById = async (userId) => {
  const { error } = await supabase.from("profiles").delete().eq("id", userId);

  // If there's an error during deletion, throw an error
  if (error) {
    throw new Error("Failed to delete user:" + error.message);
  }

  return true;
};

// Sign out the current user
export const getCurrentUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) throw new Error("No authenticated user");

  // Fetch the user's profile to get their first name and role
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("first_name, role")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) throw new Error("Failed to load user profile");

  return { id: user.id, ...profile };
};

// Check if the user has a specific role
export const checkUserRole = async (requiredRole) => {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) throw new Error("User not authenticated");

  // Fetch the user's profile to get their role
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) throw new Error("Failed to retrieve role");

  return profile.role === requiredRole;
};
