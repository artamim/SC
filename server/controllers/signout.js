require("dotenv").config();

const maxAge = 1;

const signoutHandler = (req, res) => {
  try {
    res.cookie("jwt", "", { httpOnly: true, maxAge: maxAge });
    res.status(200).json({ message: "User signed out successfully." });
  } catch (err) {
    console.error("Error during signout:", err);
    res.status(500).json({ errors: { server: "An internal server error occurred" } });
  }
};

module.exports = signoutHandler;
