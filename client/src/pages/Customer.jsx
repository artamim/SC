import { useState, useEffect } from "react";
import "../styles/Customer.css";
import Crudbuttons from "../layouts/Crudbuttons";
import { handleApiRequest } from "../utils/basicCrudApiUtils";

function CustomerManager() {
  const [formData, setFormData] = useState({
    xcus: "",
    xorg: "",
    xadd1: "",
    xphone: "",
    xemail: "",
    xempnum: "",
  });
  const [customers, setCustomers] = useState([]);
  const [actionmsg, setActionMsg] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [listoffset, setListOffset] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);

  // Fetch customers with pagination
  const fetchCustomers = () => {
    handleApiRequest({
      endpoint: "/customer/showall",
      method: "GET",
      params: { offset: listoffset },
      onSuccess: (data) => {
        setCustomers(data.customers);
        setTotalCustomers(data.total);
      },
      onError: (error) => setActionMsg(`Error: ${error}`),
    });
  };

  useEffect(() => {
    fetchCustomers();
  }, [listoffset]);

  // Handle form input changes
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
    setActionMsg("");
  };

  // Handle customer actions
  const handleAction = (endpoint, method, successMsg) => {
    setIsDisabled(true);
    handleApiRequest({
      endpoint,
      method,
      data: method === "GET" ? {} : formData, // Include `formData` only for non-GET requests
      params: method === "GET" ? { xcus: formData.xcus } : {}, // Pass xcus in params for GET requests
      onSuccess: (data) => {
        setActionMsg(successMsg);
        if (data?.xcus) setFormData((prev) => ({ ...prev, ...data }));
        fetchCustomers();
      },
      onError: (error) => setActionMsg(`Error: ${error}`),
    });
    setTimeout(() => setIsDisabled(false), 1000);
  };

  return (
    <div className="container">
    <h2>
        <b>Customer Master</b>
    </h2>
    <p style={{ color: actionmsg.includes("Error") ? "red" : "green" }}><b>{actionmsg}</b></p>

    <div className="crud-form">
      {/* Action Buttons */}
        <Crudbuttons
          handleShow={() => handleAction("/customer/show", "GET", "Customer fetched successfully")}
          handleClear={handleClear}
          handleAdd={() => handleAction("/customer/add", "POST", "Customer added successfully")}
          handleUpdate={() => handleAction("/customer/update", "PUT", "Customer updated successfully")}
          handleDelete={() => handleAction("/customer/delete", "DELETE", "Customer deleted successfully")}
          isDisabled={isDisabled}
        />

        {/* Form for Customer Details */}
        <div className="form-layout-2">
          <input
            type="text"
            placeholder="Customer Code"
            className="form-input"
            value={formData.xcus}
            onChange={(e) => handleInputChange("xcus", e.target.value)}
          />
          <input
            type="text"
            placeholder="Customer Name"
            className="form-input"
            value={formData.xorg}
            onChange={(e) => handleInputChange("xorg", e.target.value)}
          />
        </div>

        <div className="form-layout-2">
          <input
            type="text"
            placeholder="Customer Address"
            className="form-input"
            value={formData.xadd1}
            onChange={(e) => handleInputChange("xadd1", e.target.value)}
          />
          <input
            type="tel"
            placeholder="Customer Phone"
            className="form-input"
            value={formData.xphone}
            onChange={(e) => handleInputChange("xphone", e.target.value)}
          />
        </div>

        <div className="form-layout-2">
          <input
            type="email"
            placeholder="Customer Email"
            className="form-input"
            value={formData.xemail}
            onChange={(e) => handleInputChange("xemail", e.target.value)}
          />
          <input
            type="text"
            placeholder="Sales Person"
            className="form-input"
            value={formData.xempnum}
            onChange={(e) => handleInputChange("xempnum", e.target.value)}
          />
          {/* Add other input fields */}
        </div>
    </div>
    {/* Customer List with Pagination */}
    <div>
      <table className="detail-list">
        <tr>
          <th>Customer Code</th>
          <th>Customer Name</th>
          <th>Customer Address</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Sales Person</th>
        </tr>
        {customers.map((customer) => (
          <tr key={customer.xcus} onClick={() => setFormData(customer)}>
            <td>{customer.xcus}</td>
            <td>{customer.xorg}</td>
            <td>{customer.xadd1}</td>
            <td>{customer.xphone}</td>
            <td>{customer.xemail}</td>
            <td>{customer.xempnum}</td>
          </tr>
        ))}
      </table>

          <button
            className="pagination-btn-lt" 
            onClick={() => setListOffset((prev) => Math.max(prev - 10, 0))}
            disabled={listoffset === 0}
          >
            &lt;
          </button>
          <button
            className="pagination-btn-gt" 
            onClick={() => setListOffset((prev) => prev + 10)}
            disabled={listoffset + 10 >= totalCustomers}
          >
            &gt;
          </button>
      </div>
    </div>
  );
}

export default CustomerManager;
