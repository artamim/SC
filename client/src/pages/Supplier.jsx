import { useState, useEffect } from "react";
import "../styles/Customer.css";
import Crudbuttons from "../layouts/Crudbuttons";
import { handleApiRequest } from "../utils/basicCrudApiUtils";

function DataManager() {
  const [formData, setFormData] = useState({
    xsup: "",
    xorg: "",
    xadd1: "",
    xphone: "",
    xemail: "",
    xcountry: "",
  });
  const [records, setRecords] = useState([]);
  const [actionmsg, setActionMsg] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [listoffset, setListOffset] = useState(0);
  const [totalData, settotalData] = useState(0);
  const [searchval, setsearchval] = useState("");

  // Fetch suppliers with pagination
  const fetchRecords = () => {
    handleApiRequest({
      endpoint: "/supplier/showall",
      method: "GET",
      params: { offset: listoffset },
      onSuccess: (data) => {
        setRecords(data.suppliers);
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
      xsup: "",
      xorg: "",
      xadd1: "",
      xphone: "",
      xemail: "",
      xcountry: "",
    });
    setActionMsg("");
  };

  // Handle supplier actions
  const handleAction = (endpoint, method, successMsg) => {
    setIsDisabled(true);
    handleApiRequest({
      endpoint,
      method,
      data: method === "GET" ? {} : formData, // Include `formData` only for non-GET requests
      params: method === "GET" ? { xsup: formData.xsup } : {}, // Pass xsup in params for GET requests
      onSuccess: (data) => {
        setActionMsg(successMsg);
        if (data?.xsup) setFormData((prev) => ({ ...prev, ...data }));
        fetchRecords();
      },
      onError: (error) => setActionMsg(`Error: ${error}`),
    });
    setTimeout(() => setIsDisabled(false), 1000);
  };

  return (
    <div className="container">
    <h2>
        <b>Supplier Master</b>
    </h2>
    <p style={{ color: actionmsg.includes("Error") ? "red" : "green" }}><b>{actionmsg}</b></p>

    <div className="crud-form">
      {/* Action Buttons */}
        <Crudbuttons
          handleShow={() => handleAction("/supplier/show", "GET", "Supplier fetched successfully")}
          handleClear={handleClear}
          handleAdd={() => handleAction("/supplier/add", "POST", "Supplier added successfully")}
          handleUpdate={() => handleAction("/supplier/update", "PUT", "Supplier updated successfully")}
          handleDelete={() => handleAction("/supplier/delete", "DELETE", "Supplier deleted successfully")}
          isDisabled={isDisabled}
        />

        {/* Form for Details */}
        <div className="form-layout-2">
          <input
            type="text"
            placeholder="Supplier Code"
            className="form-input"
            value={formData.xsup}
            onChange={(e) => handleInputChange("xsup", e.target.value)}
          />
          <input
            type="text"
            placeholder="Supplier Name"
            className="form-input"
            value={formData.xorg}
            onChange={(e) => handleInputChange("xorg", e.target.value)}
          />
        </div>

        <div className="form-layout-2">
          <input
            type="text"
            placeholder="Supplier Address"
            className="form-input"
            value={formData.xadd1}
            onChange={(e) => handleInputChange("xadd1", e.target.value)}
          />
          <input
            type="tel"
            placeholder="Supplier Phone"
            className="form-input"
            value={formData.xphone}
            onChange={(e) => handleInputChange("xphone", e.target.value)}
          />
        </div>

        <div className="form-layout-2">
          <input
            type="email"
            placeholder="Supplier Email"
            className="form-input"
            value={formData.xemail}
            onChange={(e) => handleInputChange("xemail", e.target.value)}
          />
          <input
            type="email"
            placeholder="Supplier Email"
            className="form-input"
            value={formData.xcountry}
            onChange={(e) => handleInputChange("xcountry", e.target.value)}
          />
        </div>
    </div>
    <div>
    
    <div className="detail-list-header">
      <h1><nobr>Supplier List</nobr></h1>
      <input type="text" placeholder="Search" onChange={(e) => setsearchval(e.target.value)}/>
    </div>
    
      <table className="detail-list">
        <tr>
          <th>Supplier Code</th>
          <th>Supplier Name</th>
          <th>Supplier Address</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Country</th>
        </tr>
        {records
        .filter(
          (data) =>
            (data.xsup && data.xsup.includes(searchval)) ||
            (data.xorg && data.xorg.toLowerCase().includes(searchval.toLowerCase())) ||
            (data.xadd1 && data.xadd1.toLowerCase().includes(searchval.toLowerCase())) ||
            (data.xphone && data.xphone.includes(searchval)) ||
            (data.xemail && data.xemail.includes(searchval)) ||
            (data.xcountry && data.xcountry.includes(searchval))
        )
        .map((data) => (
          <tr key={data.xsup} onClick={() => setFormData(data)}>
            <td>{data.xsup}</td>
            <td>{data.xorg}</td>
            <td>{data.xadd1}</td>
            <td>{data.xphone}</td>
            <td>{data.xemail}</td>
            <td>{data.xcountry}</td>
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
