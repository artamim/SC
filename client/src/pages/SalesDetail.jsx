import { useState, useEffect } from "react";
import "../styles/Customer.css";
import Crudbuttons from "../layouts/Crudbuttons";
import { handleApiRequest } from "../utils/basicCrudApiUtils";

function DataManager() {
  const [formData, setFormData] = useState({
    xitem: "",
    xcat: "",
    xdesc: "",
  });
  const [records, setRecords] = useState([]);
  const [actionmsg, setActionMsg] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [listoffset, setListOffset] = useState(0);
  const [totalData, settotalData] = useState(0);
  const [searchval, setsearchval] = useState("");

  // Fetch items with pagination
  const fetchRecords = () => {
    handleApiRequest({
      endpoint: "/item/showall",
      method: "GET",
      params: { offset: listoffset },
      onSuccess: (data) => {
        setRecords(data.items);
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
      xitem: "",
      xcat: "",
      xdesc: "",
    });
    setActionMsg("");
  };

  // Handle item actions
  const handleAction = (endpoint, method, successMsg) => {
    setIsDisabled(true);
    handleApiRequest({
      endpoint,
      method,
      data: method === "GET" ? {} : formData, // Include `formData` only for non-GET requests
      params: method === "GET" ? { xitem: formData.xitem } : {}, // Pass xitem in params for GET requests
      onSuccess: (data) => {
        setActionMsg(successMsg);
        if (data?.xitem) setFormData((prev) => ({ ...prev, ...data }));
        fetchRecords();
      },
      onError: (error) => setActionMsg(`Error: ${error}`),
    });
    setTimeout(() => setIsDisabled(false), 1000);
  };

  return (
    <div className="container">
    <h2>
        <b>Item Master</b>
    </h2>
    <p style={{ color: actionmsg.includes("Error") ? "red" : "green" }}><b>{actionmsg}</b></p>

    <div className="crud-form">
      {/* Action Buttons */}
        <Crudbuttons
          handleShow={() => handleAction("/item/show", "GET", "Item fetched successfully")}
          handleClear={handleClear}
          handleAdd={() => handleAction("/item/add", "POST", "Item added successfully")}
          handleUpdate={() => handleAction("/item/update", "PUT", "Item updated successfully")}
          handleDelete={() => handleAction("/item/delete", "DELETE", "Item deleted successfully")}
          isDisabled={isDisabled}
        />

        {/* Form for Details */}
        <div className="form-layout-2">
          <input
            type="text"
            placeholder="Item Code"
            className="form-input"
            value={formData.xitem}
            onChange={(e) => handleInputChange("xitem", e.target.value)}
          />
          <input
            type="text"
            placeholder="Item Catagory"
            className="form-input"
            value={formData.xcat}
            onChange={(e) => handleInputChange("xcat", e.target.value)}
          />
        </div>

        <div className="form-layout-1">
          <input
            type="text"
            placeholder="Item Description"
            className="form-input"
            value={formData.xdesc}
            onChange={(e) => handleInputChange("xdesc", e.target.value)}
          />
        </div>

    </div>
    <div>
    
    <div className="detail-list-header">
      <h1><nobr>Item List</nobr></h1>
      <input type="text" placeholder="Search" onChange={(e) => setsearchval(e.target.value)}/>
    </div>
    
      <table className="detail-list">
        <tr>
          <th>Item Code</th>
          <th>Item Catagory</th>
          <th>Item Description</th>
        </tr>
        {records
        .filter(
          (data) =>
            (data.xitem && data.xitem.includes(searchval)) ||
            (data.xcat && data.xcat.toLowerCase().includes(searchval.toLowerCase())) ||
            (data.xdesc && data.xdesc.toLowerCase().includes(searchval.toLowerCase()))
        )
        .map((data) => (
          <tr key={data.xitem} onClick={() => setFormData(data)}>
            <td>{data.xitem}</td>
            <td>{data.xcat}</td>
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
