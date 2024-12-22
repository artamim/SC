import { useState, useEffect } from 'react';
import '../styles/Dashboard.css';

function Dashboard() {
  const [msgcol, setmsgcol] = useState("red");

  useEffect(() => {
    const interval = setInterval(() => {
      setmsgcol((prevColor) => (prevColor === "red" ? "green" : "red"));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ fontSize: "40px", fontWeight: "bold", color: msgcol }}>
      The project is really big and I am finishing one module at a time. I am still working on Report Building and eventually will move towards applying graphs in the Dashboard.
      <br></br>
      <br></br>
      One thing I found out, Making a huge application like ERP with React was a bad idea. Maybe NEST JS can help.
    </div>
  );
}

export default Dashboard;
