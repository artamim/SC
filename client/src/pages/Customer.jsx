import { useState } from "react";
import "../styles/Customer.css";
import Crudbuttons from "../layouts/Crudbuttons"; // Your custom CRUD button layout
import axiosInstance from "../api/axiosInstance";;

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
  const [actionmsg, setactionmsg] = useState("");
  const [isDisabled, setIsDisabled] = useState(false); // State to disable buttons
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
    setactionmsg("");
  };

  const handleActionStart = () => {
    setIsDisabled(true); // Disable buttons when action starts
  };

  const handleActionComplete = () => {
    setTimeout(() => {
      setIsDisabled(false); // Re-enable buttons 1 second after action finishes
    }, 1000);
  };

  const handleAdd = async () => {
    handleActionStart();
    try {
      const response = await axiosInstance.post("/customer/add", formData);
      setFormData((prevData) => ({
        ...prevData,
        xcus: response.data.xcus,
      }));
      setactionmsg(`Customer ${response.data.xcus} Added Successfully`);
    } catch (error) {
      setactionmsg(`Error Adding Customer: ${error}`);
    } finally {
      handleActionComplete();
    }
  };

  const handleShow = async () => {
    if (formData.xcus === "") {
      setactionmsg("Error: Customer Code Cannot Be Empty");
      return;
    }
    handleActionStart();
    try {
      const response = await axiosInstance.get("/customer/show", {
        params: { xcus: formData.xcus },
      });

      if (response.data) {
        setFormData(response.data);
        setactionmsg("");
      }
    } catch (error) {
      setactionmsg(`Error Fetching Customer: ${error.response?.data?.error || error.message}`);
    } finally {
      handleActionComplete();
    }
  };

  const handleUpdate = async () => {
    if (formData.xcus === "") {
      setactionmsg("Error: Customer Code Cannot Be Empty");
      return;
    }
    handleActionStart();
    try {
      const response = await axiosInstance.put("/customer/update", formData);
      setactionmsg(`Customer ${formData.xcus} Updated Successfully`);
    } catch (error) {
      setactionmsg(`Error Updating Customer: ${error}`);
    } finally {
      handleActionComplete();
    }
  };

  const handleDelete = async () => {
    if (formData.xcus === "") {
      setactionmsg("Error: Customer Code Cannot Be Empty");
      return;
    }
    handleActionStart();
    try {
      const response = await axiosInstance.delete("/customer/delete", {
        data: { xcus: formData.xcus },
      });
      setactionmsg(`Customer ${formData.xcus} Deleted Successfully`);
      setFormData({
        xcus: "",
        xorg: "",
        xadd1: "",
        xphone: "",
        xemail: "",
        xempnum: "",
      });
    } catch (error) {
      setactionmsg(`Error Deleting Customer: ${error}`);
    } finally {
      handleActionComplete();
    }
  };

  return (
    <div className="container">
      <h2>
        <b>Customer Master</b>
      </h2>
      <h6 style={{ color: actionmsg.includes("Error") ? "red" : "green" }}>
        <b>{actionmsg}</b>
      </h6>
      <div className="crud-form">
        {/* Pass the disabled state to the CRUD buttons */}
        <Crudbuttons
          handleShow={handleShow}
          handleClear={handleClear}
          handleAdd={handleAdd}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
          isDisabled={isDisabled} // Pass disabled state
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
