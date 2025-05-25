// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import {
//   setloggedInUserSuccess,
//   setloggedInUserLoading,
//   setloggedInUserError,
// } from "../state/loggedInUser";
// import supabase from "../supabase";

// export default function AuthLoader({ children }) {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchUser = async () => {
//       dispatch(setloggedInUserLoading(true));

//       const {
//         data: { user },
//         error: authError,
//       } = await supabase.auth.getUser();

//       if (!user || authError) {
//         dispatch(setloggedInUserError(authError?.message || "Not logged in"));
//         dispatch(setloggedInUserLoading(false));
//         return;
//       }

//       const { data: profile, error: profileError } = await supabase
//         .from("profiles")
//         .select("first_name, last_name, email, role")
//         .eq("id", user.id)
//         .single();

//       if (profile && !profileError) {
//         dispatch(setloggedInUserSuccess(profile));
//       } else {
//         dispatch(setloggedInUserError(profileError?.message || "Failed to fetch profile"));
//       }

//       dispatch(setloggedInUserLoading(false));
//     };

//     fetchUser();
//   }, []);

//   return children;
// }
