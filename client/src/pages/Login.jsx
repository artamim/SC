import { useEffect } from "react";
import { Form, useNavigation, useActionData, redirect } from "react-router-dom";
import axiosInstance from "../api/axiosInstance"; // Use the existing axios instance
import "../styles/Login.css";

async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const response = await axiosInstance.post("/login", {
      email,
      password,
    });

    if (response.status === 200) {
      return redirect("/home");
    }
  } catch (err) {
    if (err.response && err.response.data.errors) {
      const errors = err.response.data.errors;
      return errors.email || errors.password || "Login failed";
    }
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

          {/* Display error message if available */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

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
            disabled={navigation.state === "submitting"}>
          </button>
        </Form>
      </div>
    </div>
  );
}

export { Login, action };
