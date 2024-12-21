import { useState, useEffect } from "react";
import "../styles/Customer.css";
import Crudbuttons from "../layouts/Crudbuttons";
import { handleApiRequest } from "../utils/basicCrudApiUtils";

function DataManager() {
  const [formData, setFormData] = useState({
    xcus: "",
    xorg: "",
    xadd1: "",
    xphone: "",
    xemail: "",
    xsup: "",
  });
  const [records, setRecords] = useState([]);
  const [actionmsg, setActionMsg] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [listoffset, setListOffset] = useState(0);
  const [totalData, settotalData] = useState(0);
  const [searchval, setsearchval] = useState("");

  // Fetch customers with pagination
  const fetchRecords = () => {
    handleApiRequest({
      endpoint: "/customer/showall",
      method: "GET",
      params: { offset: listoffset },
      onSuccess: (data) => {
        setRecords(data.customers);
        settotalData(data.total);
      },
      onError: (error) => setActionMsg(`Error: ${error}`),
    });
  };

  useEffect(() => {
    fetchRecords();
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
      xsup: "",
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
        fetchRecords();
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

        {/* Form for Details */}
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
            value={formData.xsup}
            onChange={(e) => handleInputChange("xsup", e.target.value)}
          />
          {/* Add other input fields */}
        </div>
    </div>
    {/* Customer List with Pagination */}
    <div>
    
    <div className="detail-list-header">
      <h1><nobr>Customer List</nobr></h1>
      <input type="text" placeholder="Search" onChange={(e) => setsearchval(e.target.value)}/>
    </div>
    
      <table className="detail-list">
        <tr>
          <th>Customer Code</th>
          <th>Customer Name</th>
          <th>Customer Address</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Sales Person</th>
        </tr>
        {records
        .filter(
          (data) =>
            (data.xcus && data.xcus.includes(searchval)) ||
            (data.xorg && data.xorg.toLowerCase().includes(searchval.toLowerCase())) ||
            (data.xadd1 && data.xadd1.toLowerCase().includes(searchval.toLowerCase())) ||
            (data.xphone && data.xphone.includes(searchval)) ||
            (data.xemail && data.xemail.includes(searchval)) ||
            (data.xsup && data.xsup.includes(searchval))
        )
        .map((data) => (
          <tr key={data.xcus} onClick={() => setFormData(data)}>
            <td>{data.xcus}</td>
            <td>{data.xorg}</td>
            <td>{data.xadd1}</td>
            <td>{data.xphone}</td>
            <td>{data.xemail}</td>
            <td>{data.xsup}</td>
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
            disabled={listoffset + 10 >= totalData}
          >
            &gt;
          </button>
      </div>
    </div>
  );
}

export default DataManager;
