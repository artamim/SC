import { useEffect } from "react";
import { Form, useNavigation, useActionData, redirect } from "react-router-dom";
import axios from "axios"; // Import Axios
import "../styles/Login.css";

// Action function for form submission
export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    // Use Axios to send login data to the backend
    const response = await axios.post("http://localhost:5000/login", {
      email,
      password,
    });

    // If successful, redirect to the protected route
    if (response.status === 200) {
      return redirect("/home");
    }
  } catch (err) {
    // Handle errors returned from the backend
    if (err.response && err.response.data.errors) {
      const errors = err.response.data.errors;
      return errors.email || errors.password || "Login failed";
    }
    // Handle network or unexpected errors
    return "An unexpected error occurred. Please try again.";
  }
}

function Login() {
  // Handle global CSS issue with font size
  useEffect(() => {
    document.documentElement.style.fontSize = "10px";
    return () => {
      document.documentElement.style.fontSize = "";
    };
  }, []);

  const errorMessage = useActionData(); // Error message from action
  const navigation = useNavigation(); // Get form submission state

  return (
    <div className="loginfbdy">
      <div className="container1">
        <Form method="post">
          <h1 className="form-header">Sign In</h1>

          {errorMessage && (
            <p className="error-message">{errorMessage}</p>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-input"
            required
          />
          <label htmlFor="email" className="form-label">
            Email
          </label>

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-input"
            required
          />
          <label htmlFor="password" className="form-label">
            Password
          </label>

          <button
            className="form-btn"
            type="submit"
            disabled={navigation.state === "submitting"}
          >
            {navigation.state === "submitting" ? "Logging in..." : "Sign In"}
          </button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
