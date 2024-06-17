import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function Update() {
  const { id } = useParams();
  const [value, setValue] = useState({
    name: '',
    address: "",
    amount:""
  });
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Fetch the users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    // Update the user data
    users[id] = value;
    // Save the updated users back to localStorage
    localStorage.setItem("users", JSON.stringify(users));
    // Navigate back to the home page
    navigate("/list");
  };

  useEffect(() => {
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    // Find the user by ID
    const user = users[id];
    // Set the user data
    setValue(user);
  }, [id]);

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center '>
      <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
        <h1>Edit the details</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="name">Name :</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter your name"
              value={value.name}
              onChange={e => setValue({ ...value, name: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address">Address :</label>
            <input
              type="text"
              name="address"
              className="form-control"
              placeholder="Enter your address"
              value={value.address}
              onChange={e => setValue({ ...value, address: e.target.value })}
            />
             <div className="mb-2">
            <label htmlFor="name">Amount :</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={value.amount}
              onChange={e => setValue({ ...value, amount: e.target.value })}
            />
          </div>
            <button className="btn btn-success">Update</button>
            <Link to="/list" className="btn btn-primary ms-3">
              Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
