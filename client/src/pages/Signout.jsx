// src/pages/Signout.jsx
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import axiosInstance from "../api/axiosInstance"; // Import the axios instance

function Signout() {
  const { setUser } = useContext(AuthContext); // Access the setUser function from AuthContext
  const navigate = useNavigate();

  useEffect(() => {
    const signOut = async () => {
      try {
        // Send a request to the server to log out the user
        const response = await axiosInstance.get("/signout");

        if (response.status === 200) {
          // On success, clear the user context and localStorage
          setUser(null); // Clear user data in context
          localStorage.removeItem("user"); // Remove user data or token from localStorage
          navigate("/login", { replace: true }); // Redirect to login page
        }
      } catch (error) {
        console.error("Error during sign-out", error);
        // Handle any error (e.g., show a message, log out locally anyway)
        setUser(null);
        localStorage.removeItem("user");
        navigate("/login", { replace: true });
      }
    };

    signOut();
  }, [setUser, navigate]);

  //return <div>Signing out...</div>; // Optionally show a loading message while signing out
}

export default Signout;
