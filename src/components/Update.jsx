import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import "../styles/Update.css";

export default function Update() {
  const { id } = useParams();
  const [value, setValue] = useState({
    name: "",
    address: "",
    amount: "",
    additional:"",
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
      <div className="main-form_update">
        <h1><strong>Edit the details</strong></h1>
        <form onSubmit={handleSubmit}>
          <div className="forms_update">
            <input
              type="text"
              name="name"
              id="name"
              placeholder=" "
              className="form__input_update"
              autoComplete="off"
              value={value.name}
              onChange={(e) => setValue({ ...value, name: e.target.value })}
              required
            />
            <label htmlFor="name" className="form__label_update">
              Fullname
            </label>
          </div>
          <div className="forms_update">
            <input
              type="text"
              id="address"
              name="address"
              placeholder=" "
              className="form__input_update"
              autoComplete="off"
              value={value.address}
              onChange={(e) => setValue({ ...value, address: e.target.value })}
              required
            />
            <label htmlFor="address" className="form__label_update">
              Address
            </label>
          </div>
          <div className="forms_update">
            <input
              type="number"
              id="amount"
              name="amount"
              placeholder=" "
              className="form__input_update"
              autoComplete="off"
              value={value.amount}
              onChange={(e) => setValue({ ...value, amount: e.target.value })}
              required
            />
            <label htmlFor="amount" className="form__label_update">
              Amount
            </label>
          </div>
          <div className="forms_update">
            <input
              type="text"
              id="additional"
              name="additional"
              placeholder=" "
              className="form__input_update"
              autoComplete="off"
              value={value.additional}
              onChange={(e) => setValue({ ...value, additional: e.target.value })}
            />
            <label htmlFor="additional" className="form__label_update">
              Additional
            </label>
          </div>
          <div className="forms_update_buttons">
          <button className="btn btn-submit">Update</button>
          <Link to="/list" className="btn btn-back ms-3">
            Back
          </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
