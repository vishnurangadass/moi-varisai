import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Create() {
  const [value, setValue] = useState({
    name: "",
    address: "",
    amount:"",
  });
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const newUser = { ...value };
    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));
    navigate("/list");
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1>Add a user</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="name">Name :</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter your name"
              onChange={(e) => setValue({ ...value, name: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address">Address :</label>
            <input
              type="text"
              name="address"
              className="form-control"
              placeholder="Enter your address"
              onChange={(e) => setValue({ ...value, address: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address">Amount :</label>
            <input
              type="number"
              name="amount"
              className="form-control"
              onChange={(e) => setValue({ ...value, amount: e.target.value })}
              required
            />
          </div>
          <button className="btn btn-success">Submit</button>
          <Link to="/list" className="btn btn-primary ms-3">
            Back
          </Link>
        </form>
      </div>
    </div>
  );
}
