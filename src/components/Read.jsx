import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import "../styles/Read.css";

export default function Read() {
  const [data, setData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    // Get users from sessionStorage
    const users = JSON.parse(sessionStorage.getItem("users")) || [];
    // Find the user by ID
    const user = users[id];
    // Set the user data
    setData(user);
  }, [id]);

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="main-form_read">
        <h1><strong>Detail of the user</strong></h1>
        <div className="mb-2">
          <strong>Id : </strong>
          {parseInt(id)+1}
        </div>
        <div className="mb-2">
          <strong>Name : </strong>
          {data?.name}
        </div>
        <div className="mb-3">
          <strong>Address : </strong>
          {data?.address}
        </div>
        <div className="mb-3">
          <strong>Amount : </strong>
          {data?.amount}
        </div>
        <div className="mb-3">
          <strong>Additional: </strong>
          {data?.additional}
        </div>
        <Link to={`/update/${id}`} className="btn btn-edit ms-3">
          Edit
        </Link>
        <Link to="/list" className="btn btn-back ms-3">
          Back
        </Link>
      </div>
    </div>
  );
}
