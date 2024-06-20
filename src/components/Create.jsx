import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../styles/Create.css";

export default function Create() {
  const [value, setValue] = useState({
    name: "",
    address: "",
    amount: "",
    additional:"",
  });
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const existingUsers = JSON.parse(sessionStorage.getItem("users")) || [];
    const newUser = { ...value };
    existingUsers.push(newUser);
    sessionStorage.setItem("users", JSON.stringify(existingUsers));
    navigate("/list");
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center ">
      <div className="main-form_create">
      <h1><strong>Add the details</strong></h1>
        <form onSubmit={handleSubmit}>
          <div className="forms_create">
            <input
              type="text"
              id="name"
              placeholder=" "
              className="form__input_create"
              autoComplete="off"
              onChange={(e) => setValue({ ...value, name: e.target.value })}
              required
            />
            <label htmlFor="fullname" className="form__label_create">
              Fullname
            </label>
          </div>
          <div className="forms_create">
            <input
              type="text"
              id="address"
              placeholder=" "
              className="form__input_create"
              autoComplete="off"
              onChange={(e) => setValue({ ...value, address: e.target.value })}
              required
            />
            <label htmlFor="address" className="form__label_create">
              Address
            </label>
          </div>
          <div className="forms_create">
            <input
              type="number"
              id="amount"
              placeholder=" "
              className="form__input_create"
              autoComplete="off"
              onChange={(e) => setValue({ ...value, amount: e.target.value })}
              required
            />
            <label htmlFor="amount" className="form__label_create">
              Amount
            </label>
          </div>
          <div className="forms_create">
            <input
              type="text"
              id="additional"
              placeholder=" "
              className="form__input_create"
              autoComplete="off"
              onChange={(e) => setValue({ ...value, additional: e.target.value })}
            />
            <label htmlFor="additional" className="form__label_create">
              Aditional
            </label>
          </div>
          <div className="forms_create_buttons">
          <button className="btn btn-submit">Submit</button>
          <Link to="/list" className="btn btn-back ms-3">
            Back
          </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
