import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function Read() {
  const [data, setData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    // Find the user by ID
    const user = users[id];
    // Set the user data
    setData(user);
  }, [id]);

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
      <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
        <h3>Detail of the user</h3>
        <div className='mb-2'>
          <strong>Id : {parseInt(id) + 1}</strong>
        </div>
        <div className='mb-2'>
          <strong>Name : {data?.name}</strong>
        </div>
        <div className='mb-3'>
          <strong>Address : {data?.address}</strong>
        </div>
        <div className='mb-3'>
          <strong>Amount : {data?.amount}</strong>
        </div>
        <Link to={`/update/${id}`} className='btn btn-warning'>Edit</Link>
        <Link to="/list" className="btn btn-primary ms-3">Back</Link>
      </div>
    </div>
  );
}
