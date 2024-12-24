import { useState, useEffect } from "react";
import "../styles/Customer.css";
import { NavLink, useLocation } from 'react-router-dom';
import Crudbuttons from "../layouts/Crudbuttons";
import { handleApiRequest } from "../utils/basicCrudApiUtils";

function DataManager() {

  //Retaining Previous Data After Traversing To OrderDetail
  const location = useLocation();
  const { state } = location || {};
  const returnedFormData = state?.prevFormData || {};

  useEffect(() => {
      if (Object.keys(returnedFormData).length > 0) {
          setFormData((prevData) => ({
              ...prevData,
              ...returnedFormData,
          }));
      }
  }, [returnedFormData]);
  //[Retaining Previous Data After Traversing To OrderDetail] End

  const [formData, setFormData] = useState({
    xordernum: "",
    xcus: "",
    xdate: "",
    xstatus: "",
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
        setRecords(data.salesOrders);
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
      xordernum: "",
      xcus: "",
      xdate: "",
      xstatus: "",
    });
    setActionMsg("");
  };

  // Handle salesorder actions
  const handleAction = (endpoint, method, successMsg) => {
    setIsDisabled(true);
    handleApiRequest({
      endpoint,
      method,
      data: method === "GET" ? {} : formData,
      params: method === "GET" ? { xordernum: formData.xordernum } : {},
      onSuccess: (data) => {
        setActionMsg(successMsg);
        if (data?.xordernum) setFormData((prev) => ({ ...prev, ...data }));
        fetchRecords();
      },
      onError: (error) => setActionMsg(`Error: ${error}`),
    });
    setTimeout(() => setIsDisabled(false), 1000);
  };

  function orderCancel(){
    handleApiRequest({
      endpoint: "/salesorder/cancel",
      method: "PATCH",
      params: { xordernum: formData.xordernum },
      onSuccess: (data) => {
        setFormData((prev) => ({ ...prev, xstatus: data.xstatus }));
        fetchRecords();
      },
      onError: (error) => setActionMsg(`Error: ${error}`)
    })
  }

  function orderComplete() {
    handleApiRequest({
      endpoint: "/salesorder/complete",
      method: "PATCH",
      params: { xordernum: formData.xordernum },
      onSuccess: (data) => {
        setFormData((prev) => ({ ...prev, xstatus: data.xstatus }));
        fetchRecords();
      },
      onError: (error) => setActionMsg(`Error: ${error}`)
    });
  }
  

  return (
    <div className="container">
    <h2>
        <b>Sales Order</b>
    </h2>
    <p style={{ color: actionmsg.includes("Error") ? "red" : "green" }}><b>{actionmsg}</b></p>
    
    {formData.xstatus !== "" ? 
      <div style={{ display: "flex" }}>
        <NavLink 
          to={`detail/${formData.xordernum}`}
          state={{ formData }} // Pass formData as state
          className="route" 
          style={{ display: "inline-block", textDecoration: "underline", fontSize: "16px" }}
        >
          Order Details
        </NavLink>
      </div> 
    : ""}
    

    {formData.xstatus === "Pending" ? 
      
      <div style={{ display: "flex", gap: "10px", padding: "10px", paddingLeft: "0px" }}>
        <button
          className="btn-complete"
          type="button"
          disabled={isDisabled}
          onClick={orderComplete}
        >
          Complete
        </button>

        <button
          className="btn-close1"
          type="button"
          disabled={isDisabled}
          onClick={orderCancel}
        >
          Close
        </button>
      </div> 

    : ""}
    
    

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
            placeholder="Customer"
            className="form-input"
            value={formData.xcus}
            onChange={(e) => handleInputChange("xcus", e.target.value)}
          />
        </div>

        <div className="form-layout-2">
          <input
            type="text"
            placeholder="Date Created"
            className="form-input"
            value={formData.xdate}
            onChange={(e) => handleInputChange("xdate", e.target.value)}
            readOnly={true}
            style={{ opacity: .8 }}
          />
          <input
            type="text"
            placeholder="Status"
            className="form-input"
            value={formData.xstatus}
            onChange={(e) => handleInputChange("xstatus", e.target.value)}
            readOnly={true}
            style={{ opacity: .8 }}
          />
        </div>

    </div>
    <div>
    
    <div className="detail-list-header">
      <h2><nobr>Sales Order List</nobr></h2>
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
        {records.filter(
          (data) =>
            (data.xordernum && data.xordernum.includes(searchval)) ||
            (data.xcus && data.xcus.includes(searchval)) ||
            (data.xorg && data.xorg.toLowerCase().includes(searchval.toLowerCase())) ||
            (data.xdate && data.xdate.includes(searchval)) ||
            (data.xstatus && data.xstatus.toLowerCase().includes(searchval.toLowerCase()))
        )
        .map((data) => (
          <tr key={data.xordernum} onClick={() => setFormData(data)}>
            <td>{data.xordernum}</td>
            <td>{data.xcus}</td>
            <td>{data.xorg}</td>
            <td>{data.xdate}</td>
            <td
              style={{
                color: data.xstatus === "Completed" ? "green" : data.xstatus === "Cancelled" ? "red" : "inherit",
              }}
            >
              {data.xstatus}
            </td>
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
