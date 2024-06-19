import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import "../styles/Update.css";

export default function Update() {
  const { id } = useParams();
  const [value, setValue] = useState({
    name: "",
    address: "",
    amount: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Fetch the users from sessionStorage
    const users = JSON.parse(sessionStorage.getItem("users")) || [];
    // Update the user data
    users[id] = value;
    // Save the updated users back to sessionStorage
    sessionStorage.setItem("users", JSON.stringify(users));
    // Navigate back to the home page
    navigate("/list");
  };

  useEffect(() => {
    // Get users from sessionStorage
    const users = JSON.parse(sessionStorage.getItem("users")) || [];
    // Find the user by ID
    const user = users[id];
    // Set the user data
    setValue(user);
  }, [id]);

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center ">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1>Edit the details</h1>
        <form onSubmit={handleSubmit}>
          <div className="forms">
            <input
              type="text"
              name="name"
              id="name"
              placeholder=" "
              className="form__input"
              autoComplete="off"
              value={value.name}
              onChange={(e) => setValue({ ...value, name: e.target.value })}
              required
            />
            <label htmlFor="name" className="form__label">
              Fullname
            </label>
          </div>
          <div className="forms">
            <input
              type="text"
              id="address"
              name="address"
              placeholder=" "
              className="form__input"
              autoComplete="off"
              value={value.address}
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
              name="amount"
              placeholder=" "
              className="form__input"
              autoComplete="off"
              value={value.amount}
              onChange={(e) => setValue({ ...value, amount: e.target.value })}
              required
            />
            <label htmlFor="amount" className="form__label">
              Amount
            </label>
          </div>
          <button className="btn-submit">Update</button>
          <Link to="/list" className="btn btn-primary ms-3">
            Back
          </Link>
        </form>
      </div>
    </div>
  );
}
