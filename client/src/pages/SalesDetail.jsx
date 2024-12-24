import { useState, useEffect } from "react";
import { useParams, useLocation  } from "react-router-dom";
import { NavLink} from 'react-router-dom';
import "../styles/Customer.css";
import Crudbuttons from "../layouts/Crudbuttons";
import { handleApiRequest } from "../utils/basicCrudApiUtils";

function DataManager() {

  //Capturing Header Data
  const location = useLocation();
  const { state } = location || {};
  const previousFormData = state?.formData || {};

  const [prevFormData, setPrevFormData] = useState({
    xordernum: "",
    xcus: "",
    xdate: "",
    xstatus: "",
  });

  useEffect(() => {
    if (Object.keys(previousFormData).length > 0) {
      setPrevFormData((prevData) => ({
            ...prevData,
            ...previousFormData,
        }));
    }
  }, [previousFormData]);

  //[Capturing Header Data] End

  const param = useParams();
  const { xordernum } = param;

  const [formData, setFormData] = useState({
    xordernum: xordernum,
    xitem: "",
    xqty: 0,
    xtotamt: 0.00,
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
      endpoint: "/salesorder/detail/showall",
      method: "GET",
      params: { offset: listoffset, xordernum: xordernum },
      onSuccess: (data) => {
        setRecords(data.salesDetails);
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
      xqty: 0,
      xtotamt: 0.00,
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
        if (data?.xtotamt !== undefined) {
          setFormData((prev) => ({
            ...prev,
            xtotamt: data.xtotamt,
          }));
        }
        fetchRecords();
      },
      onError: (error) => setActionMsg(`Error: ${error}`),
    });
    setTimeout(() => setIsDisabled(false), 1000);
  };

  return (
    <div className="container">
    <h2>
        <b>Sales Detail</b>
    </h2>
    <p style={{ color: actionmsg.includes("Error") ? "red" : "green" }}><b>{actionmsg}</b></p>

    <div style={{display: "flex"}}>
      <NavLink 
        to="/home/salesorder"
        state={{ prevFormData }}
        className="route" 
        style={{ display: "inline-block", textDecoration: "underline", fontSize: "16px" }}
      >
        Return
    </NavLink>

    </div>

    <div className="crud-form">
      {/* Action Buttons */}
        <Crudbuttons
          handleShow={() => handleAction("/salesorder/detail/show", "GET", "Order Detail fetched successfully")}
          handleClear={handleClear}
          handleAdd={() => handleAction("/salesorder/detail/add", "POST", "Order Detail added successfully")}
          handleUpdate={() => handleAction("/salesorder/detail/update", "PUT", "Order Detail updated successfully")}
          handleDelete={() => handleAction("/salesorder/detail/delete", "DELETE", "Order Detail deleted successfully")}
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
            placeholder="Item Quantity"
            className="form-input"
            value={formData.xqty}
            onChange={(e) => handleInputChange("xqty", e.target.value)}
          />
        </div>

        <div className="form-layout-1">
          <input
            type="text"
            placeholder="Total Amount"
            className="form-input"
            value={formData.xtotamt}
            onChange={(e) => handleInputChange("xtotamt", e.target.value)}
            readOnly={true}
            style={{ opacity: .8 }}
          />
        </div>

    </div>
    <div>
    
    <div className="detail-list-header">
      <h2><nobr>Sales Detail of {xordernum}</nobr></h2>
      <input type="text" placeholder="Search" onChange={(e) => setsearchval(e.target.value)}/>
    </div>
    
      <table className="detail-list">
        <tr>
          <th>Item Code</th>
          <th>Item Name</th>
          <th>Qty</th>
          <th>Rate</th>
          <th>Total Amount</th>
        </tr>
        {records
        .filter(
          (data) =>
            (data.xitem && data.xitem.includes(searchval))
        )
        .map((data) => (
          <tr key={data.xitem} onClick={() => setFormData(data)}>
            <td>{data.xitem}</td>
            <td>{data.xdesc}</td>
            <td>{data.xqty}</td>
            <td>{data.xrate}</td>
            <td>{data.xtotamt}</td>
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
