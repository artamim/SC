import { useState, useEffect } from "react";
import "../styles/Customer.css";
import Crudbuttons from "../layouts/Crudbuttons";
import { handleApiRequest } from "../utils/basicCrudApiUtils";

function DataManager() {
  const [formData, setFormData] = useState({
    xsalesorder: "",
    xcat: "",
    xdesc: "",
  });
  const [records, setRecords] = useState([]);
  const [actionmsg, setActionMsg] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [listoffset, setListOffset] = useState(0);
  const [totalData, settotalData] = useState(0);
  const [searchval, setsearchval] = useState("");

  // Fetch salesorders with pagination
  const fetchRecords = () => {
    handleApiRequest({
      endpoint: "/salesorder/showall",
      method: "GET",
      params: { offset: listoffset },
      onSuccess: (data) => {
        setRecords(data.salesorders);
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
      xsalesorder: "",
      xcat: "",
      xdesc: "",
    });
    setActionMsg("");
  };

  // Handle salesorder actions
  const handleAction = (endpoint, method, successMsg) => {
    setIsDisabled(true);
    handleApiRequest({
      endpoint,
      method,
      data: method === "GET" ? {} : formData, // Include `formData` only for non-GET requests
      params: method === "GET" ? { xsalesorder: formData.xsalesorder } : {}, // Pass xsalesorder in params for GET requests
      onSuccess: (data) => {
        setActionMsg(successMsg);
        if (data?.xsalesorder) setFormData((prev) => ({ ...prev, ...data }));
        fetchRecords();
      },
      onError: (error) => setActionMsg(`Error: ${error}`),
    });
    setTimeout(() => setIsDisabled(false), 1000);
  };

  return (
    <div className="container">
    <h2>
        <b>SalesOrder Master</b>
    </h2>
    <p style={{ color: actionmsg.includes("Error") ? "red" : "green" }}><b>{actionmsg}</b></p>

    <div className="crud-form">
      {/* Action Buttons */}
        <Crudbuttons
          handleShow={() => handleAction("/salesorder/show", "GET", "SalesOrder fetched successfully")}
          handleClear={handleClear}
          handleAdd={() => handleAction("/salesorder/add", "POST", "SalesOrder added successfully")}
          handleUpdate={() => handleAction("/salesorder/update", "PUT", "SalesOrder updated successfully")}
          handleDelete={() => handleAction("/salesorder/delete", "DELETE", "SalesOrder deleted successfully")}
          isDisabled={isDisabled}
        />

        {/* Form for Details */}
        <div className="form-layout-2">
          <input
            type="text"
            placeholder="SalesOrder Code"
            className="form-input"
            value={formData.xordernum}
            onChange={(e) => handleInputChange("xordernum", e.target.value)}
          />
          <input
            type="text"
            placeholder="SalesOrder Catagory"
            className="form-input"
            value={formData.xcus}
            onChange={(e) => handleInputChange("xcus", e.target.value)}
          />
        </div>

    </div>
    <div>
    
    <div className="detail-list-header">
      <h1><nobr>SalesOrder List</nobr></h1>
      <input type="text" placeholder="Search" onChange={(e) => setsearchval(e.target.value)}/>
    </div>
    
      <table className="detail-list">
        <tr>
          <th>SalesOrder Number</th>
          <th>Customer Code</th>
          <th>Customer Name</th>
          <th>Date</th>
          <th>Status</th>
        </tr>
        {records
        .filter(
          (data) =>
            (data.xordernum && data.xordernum.includes(searchval)) ||
            (data.xcus && data.xcus.includes(searchval)) ||
            (data.xorg && data.xorg.toLowerCase().includes(searchval.toLowerCase())) ||
            (data.xdate && data.xdate.includes(searchval)) ||
            (data.xdesc && data.xdesc.toLowerCase().includes(searchval.toLowerCase()))
        )
        .map((data) => (
          <tr key={data.xordernum} onClick={() => setFormData(data)}>
            <td>{data.xordernum}</td>
            <td>{data.xcus}</td>
            <td>{data.xorg}</td>
            <td>{data.xdate}</td>
            <td>{data.xdesc}</td>
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
