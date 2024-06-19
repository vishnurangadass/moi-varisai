import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../styles/Create.css";

export default function Create() {
  const [value, setValue] = useState({
    name: "",
    address: "",
    amount: "",
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
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <form onSubmit={handleSubmit}>
          <h1>Add the details</h1>
          <div className="forms">
            <input
              type="text"
              id="name"
              placeholder=" "
              className="form__input"
              autoComplete="off"
              onChange={(e) => setValue({ ...value, name: e.target.value })}
              required
            />
            <label htmlFor="fullname" className="form__label">
              Fullname
            </label>
          </div>
          <div className="forms">
            <input
              type="text"
              id="address"
              placeholder=" "
              className="form__input"
              autoComplete="off"
              onChange={(e) => setValue({ ...value, address: e.target.value })}
              required
            />
            <label htmlFor="address" className="form__label">
              Address
            </label>
          </div>
          <div className="forms">
            <input
              type="number"
              id="amount"
              placeholder=" "
              className="form__input"
              autoComplete="off"
              onChange={(e) => setValue({ ...value, amount: e.target.value })}
              required
            />
            <label htmlFor="amount" className="form__label">
              Amount
            </label>
          </div>
          <button className="btn-submit">Submit</button>
          <Link to="/list" className="btn btn-primary ms-3">
            Back
          </Link>
        </form>
      </div>
    </div>
  );
}
