import { useState, useEffect } from "react";
import "../styles/Customer.css";
import Crudbuttons from "../layouts/Crudbuttons";
import { handleApiRequest } from "../utils/basicCrudApiUtils";

function DataManager() {

  const [formData, setFormData] = useState({
    xrecnum: "",
    xordernum: "",
    xcus: "",
    xdate: "",
    xstatus: "",
    xamount: 0.00,
  });
  const [records, setRecords] = useState([]);
  const [actionmsg, setActionMsg] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [listoffset, setListOffset] = useState(0);
  const [totalData, settotalData] = useState(0);
  const [searchval, setsearchval] = useState("");

  // Fetch collections with pagination
  const fetchRecords = () => {
    handleApiRequest({
      endpoint: "/collection/showall",
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
      xrecnum: "",
      xordernum: "",
      xcus: "",
      xdate: "",
      xstatus: "",
      xamount: 0.00,
    });
    setActionMsg("");
  };

  // Handle collection actions
  const handleAction = (endpoint, method, successMsg) => {
    setIsDisabled(true);
    handleApiRequest({
      endpoint,
      method,
      data: method === "GET" ? {} : formData,
      params: method === "GET" ? { xrecnum: formData.xrecnum } : {},
      onSuccess: (data) => {
        setActionMsg(successMsg);
        if (data?.xrecnum) setFormData((prev) => ({ ...prev, ...data }));
        fetchRecords();
      },
      onError: (error) => setActionMsg(`Error: ${error}`),
    });
    setTimeout(() => setIsDisabled(false), 1000);
  };

  function collectionCancel(){
    handleApiRequest({
      endpoint: "/collection/cancel",
      method: "PATCH",
      params: { xrecnum: formData.xrecnum },
      onSuccess: (data) => {
        setFormData((prev) => ({ ...prev, xstatus: data.xstatus }));
        fetchRecords();
      },
      onError: (error) => setActionMsg(`Error: ${error}`)
    })
  }

  function collectionComplete() {
    handleApiRequest({
      endpoint: "/collection/complete",
      method: "PATCH",
      params: { xrecnum: formData.xrecnum },
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
        <b>Collection</b>
    </h2>
    <p style={{ color: actionmsg.includes("Error") ? "red" : "green" }}><b>{actionmsg}</b></p>

    {formData.xstatus === "Pending" ? 
      
      <div style={{ display: "flex", gap: "10px", padding: "10px", paddingLeft: "0px" }}>
        <button
          className="btn-complete"
          type="button"
          disabled={isDisabled}
          onClick={collectionComplete}
        >
          Complete
        </button>

        <button
          className="btn-close1"
          type="button"
          disabled={isDisabled}
          onClick={collectionCancel}
        >
          Close
        </button>
      </div> 

    : ""}
    
    

    <div className="crud-form">
      {/* Action Buttons */}
        <Crudbuttons
          handleShow={() => handleAction("/collection/show", "GET", "Collection fetched successfully")}
          handleClear={handleClear}
          handleAdd={() => handleAction("/collection/add", "POST", "Collection added successfully")}
          handleUpdate={() => handleAction("/collection/update", "PUT", "Collection updated successfully")}
          handleDelete={() => handleAction("/collection/delete", "DELETE", "Collection deleted successfully")}
          isDisabled={isDisabled}
        />

        {/* Form for Details */}
        <div className="form-layout-3">
          <input
            type="text"
            placeholder="Collection Code"
            className="form-input"
            value={formData.xrecnum}
            onChange={(e) => handleInputChange("xrecnum", e.target.value)}
          />
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

        <div className="form-layout-3">
        <input
            type="text"
            placeholder="Customer Code"
            className="form-input"
            value={formData.xcus}
            onChange={(e) => handleInputChange("xcus", e.target.value)}
          />
          <input
            type="text"
            placeholder="Sales Order No."
            className="form-input"
            value={formData.xordernum}
            onChange={(e) => handleInputChange("xordernum", e.target.value)}
          />
          <input
            type="text"
            placeholder="Total Amount"
            className="form-input"
            value={formData.xamount}
            onChange={(e) => handleInputChange("xamount", e.target.value)}
          />
        </div>

    </div>
    <div>
    
    <div className="detail-list-header">
      <h2><nobr>Collection List</nobr></h2>
      <input type="text" placeholder="Search" onChange={(e) => setsearchval(e.target.value)}/>
    </div>
    
      <table className="detail-list">
        <tr>
          <th>Collection Number</th>
          <th>Customer Code</th>
          <th>Customer Name</th>
          <th>Sales Order Number</th>
          <th>Date</th>
          <th>Status</th>
        </tr>
        {records.filter(
          (data) =>
            (data.xrecnum && data.xrecnum.includes(searchval)) ||
            (data.xcus && data.xcus.includes(searchval)) ||
            (data.xorg && data.xorg.toLowerCase().includes(searchval.toLowerCase())) ||
            (data.xordernum && data.xordernum.includes(searchval)) ||
            (data.xdate && data.xdate.includes(searchval)) ||
            (data.xstatus && data.xstatus.toLowerCase().includes(searchval.toLowerCase()))
        )
        .map((data) => (
          <tr key={data.xrecnum} onClick={() => setFormData(data)}>
            <td>{data.xrecnum}</td>
            <td>{data.xcus}</td>
            <td>{data.xorg}</td>
            <td>{data.xordernum}</td>
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
