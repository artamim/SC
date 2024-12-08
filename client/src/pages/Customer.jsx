import { useState, useEffect } from "react";
import { Form, useNavigation, useActionData, redirect } from "react-router-dom";
import "../styles/Customer.css";

// Reusable Input Field Component
function RenderInputField({ placeholder, id, type, className }) {
  return (
    <div className="input-form">
      <input
        type={type}
        name={id}
        id={id}
        className={className}
        placeholder={placeholder}
      />
    </div>
  );
}

function Customer() {
  const navigation = useNavigation();

  return (
    <div className="container">
      <Form method="post">
        <h2 className="">
          <b>Customer Master</b>
        </h2>

        {/* Dynamic Input Fields */}
        <div className="crud-form">
          <div className="form-layout-2">
            <RenderInputField
              placeholder="Customer Name"
              id="xcus1"
              type="text"
              className="form-input"
            />

            <RenderInputField
              placeholder="Customer Address"
              id="xadd1"
              type="text"
              className="form-input"
            />
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <button
            className="form-btn"
            type="submit"
            disabled={navigation.state === "submitting"}
          >
            Submit
          </button>
        </div>
      </Form>
    </div>
  );
}

export default Customer;
