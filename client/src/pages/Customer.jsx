import { useState } from "react";
import "../styles/Customer.css";
import Crudbuttons from "../layouts/Crudbuttons"; // Your custom CRUD button layout
import axios from "axios";

// Reusable Input Field Component
function RenderInputField({ placeholder, id, type, className, value, onChange, trn }) {
  return (
    <div className="input-form">
      <input
        type={type}
        name={id}
        id={id}
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
      />
      {trn === "true" && (
        <button className="trn-btn" type="button">
          {/* Optional Icon/Button logic for transaction buttons */}
        </button>
      )}
    </div>
  );
}

function Customer() {
  const [formData, setFormData] = useState({
    xcus: "",
    xorg: "",
    xadd1: "",
    xphone: "",
    xemail: "",
    xempnum: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleClear = () => {
    setFormData({
      xcus: "",
      xorg: "",
      xadd1: "",
      xphone: "",
      xemail: "",
      xempnum: "",
    });
    console.log("Form cleared");
  };

  const handleAdd = async () => {
    try {
      const response = await axios.post("/customer/add", formData);
      console.log("Customer added:", response.data);
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

  const handleShow = async () => {
    try {
      const response = await axios.get("/customer/show", {
        params: { xcus: formData.xcus },
      });
      console.log("Customer details:", response.data);
    } catch (error) {
      console.error("Error fetching customer:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put("/customer/update", formData);
      console.log("Customer updated:", response.data);
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete("/customer/delete", {
        data: { xcus: formData.xcus },
      });
      console.log("Customer deleted:", response.data);
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  return (
    <div className="container">
      <h2>
        <b>Customer Master</b>
      </h2>
      <div className="crud-form">
        {/* CRUD Buttons Component */}
        <Crudbuttons
          handleShow={handleShow}
          handleClear={handleClear}
          handleAdd={handleAdd}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />

        {/* Form Inputs */}
        <div className="form-layout-2">
          <RenderInputField
            placeholder="Customer Code"
            id="xcus"
            type="text"
            className="form-input"
            value={formData.xcus}
            onChange={handleInputChange}
          />
          <RenderInputField
            placeholder="Customer Name"
            id="xorg"
            type="text"
            className="form-input"
            value={formData.xorg}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-layout-2">
          <RenderInputField
            placeholder="Customer Address"
            id="xadd1"
            type="text"
            className="form-input"
            value={formData.xadd1}
            onChange={handleInputChange}
          />
          <RenderInputField
            placeholder="Phone"
            id="xphone"
            type="tel"
            className="form-input"
            value={formData.xphone}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-layout-2">
          <RenderInputField
            placeholder="Email"
            id="xemail"
            type="email"
            className="form-input"
            value={formData.xemail}
            onChange={handleInputChange}
          />
          <RenderInputField
            placeholder="Sales Person"
            id="xempnum"
            type="text"
            className="form-input"
            value={formData.xempnum}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Customer;
