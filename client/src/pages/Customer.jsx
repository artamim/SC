import { useState, useEffect } from "react";
import { Form, useNavigation, useActionData, redirect } from "react-router-dom";
import "../styles/Customer.css";
import Crudbuttons from "../layouts/Crudbuttons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons'

async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const response = await axiosInstance.post("/login", {
      email,
      password,
    });
    
    if (response.status === 200) {
      return redirect("/home");
    }
  } catch (err) {
    if (err.response && err.response.data.errors) {
      const errors = err.response.data.errors;
      return errors.email || errors.password || "Login failed";
    }
    return "An unexpected error occurred. Please try again.";
  }
}

// Reusable Input Field Component
function RenderInputField({ placeholder, id, type, className, trn }) {
  return (
    <div className="input-form">
      <input
        type={type}
        name={id}
        id={id}
        className={className}
        placeholder={placeholder}
      />
      {trn === "true" && (
        <button className="trn-btn" name="action" value="show">
          <FontAwesomeIcon icon={faList} />
        </button>
      )}
      
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

          <Crudbuttons />

          <div className="form-layout-2">
          <RenderInputField
              placeholder="Customer Code"
              id="xcus"
              type="text"
              className="form-input"
              trn="true"
            />

            <RenderInputField
              placeholder="Customer Name"
              id="xcus1"
              type="text"
              className="form-input"
            />
          </div>

          <div className="form-layout-2">
          <RenderInputField
              placeholder="Customer Address"
              id="xadd1"
              type="text"
              className="form-input"
            />

            <RenderInputField
              placeholder="Phone"
              id="xphone"
              type="tel"
              className="form-input"
            />
          </div>

          <div className="form-layout-2">
          <RenderInputField
              placeholder="Email"
              id="xemail"
              type="email"
              className="form-input"
            />

            <RenderInputField
              placeholder="Sales Person"
              id="xempnum"
              type="text"
              className="form-input"
            />
          </div>


        </div>
        

        {/*----------------------Table field----------------------*/}
        <input type="hidden" value="customer" name="table"></input>
        {/*--------------------Table field End--------------------*/}

        
      </Form>
    </div>
  );
}

export { Customer, action };
