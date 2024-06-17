import React, { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

export default function Userform() {
  const [form, setForm] = useState({
    fullName: "",
    emailId: "",
    mobile: "",
    eventName: "",
    place: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("formData", JSON.stringify(form));
    navigate("/create");
  };

  return (
    <div>
      <form className="main-form" onSubmit={handleSubmit}>
        <h1>Fill the form..</h1>
        <label htmlFor="fullName">Fullname : </label>
        <input
          type="text"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="Fullname"
          required
        />
        <label htmlFor="emailId">Email ID : </label>
        <input
          type="email"
          name="emailId"
          placeholder="Email ID"
          value={form.emailId}
          onChange={handleChange}
          required
        />
        <label htmlFor="mobile">Mobile : </label>
        <input
          type="tel"
          name="mobile"
          placeholder="Mobile Number"
          value={form.mobile}
          onChange={handleChange}
          required
        />
        <label htmlFor="eventName">Event Name : </label>
        <input
          type="text"
          name="eventName"
          placeholder="Event Name"
          value={form.eventName}
          onChange={handleChange}
          required
        />
        <label htmlFor="place">Place : </label>
        <input
          type="text"
          name="place"
          placeholder="Place"
          value={form.place}
          onChange={handleChange}
          required
        />
        <label htmlFor="date">Date : </label>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </div>
  );
}
