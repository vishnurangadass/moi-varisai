import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/Userform.css";

export default function Userform() {
  const [form, setForm] = useState({
    name: "",
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
    sessionStorage.setItem("formData", JSON.stringify(form));
    navigate("/list");
  };

  return (
    <div>
      <form className="main-form_userForm " onSubmit={handleSubmit}>
        <h1>Ungala pathi sollitu moi eluthunga..</h1>
        <div className="forms_userForm">
          <input
            type="text"
            name="name"
            id="name"
            placeholder=" "
            className="form__input_userForm "
            autoComplete="off"
            value={form.name}
            onChange={handleChange}
            required
          />
          <label htmlFor="name" className="form__label_userForm">
            Fullname
          </label>
        </div>
        <div className="forms_userForm ">
          <input
            type="email"
            name="emailId"
            id="emailId"
            placeholder=" "
            className="form__input_userForm "
            autoComplete="off"
            value={form.emailId}
            onChange={handleChange}
            required
          />
          <label htmlFor="emailId" className="form__label_userForm ">
            Email Id
          </label>
        </div>
        <div className="forms_userForm ">
          <input
            type="text"
            id="mobile"
            name="mobile"
            placeholder=" "
            className="form__input_userForm "
            autoComplete="off"
            value={form.mobile}
            onChange={handleChange}
            required
          />
          <label htmlFor="mobile" className="form__label_userForm ">
            Mobile
          </label>
        </div>
        <div className="forms_userForm ">
          <input
            type="text"
            id="eventName"
            name="eventName"
            placeholder=" "
            className="form__input_userForm "
            autoComplete="off"
            value={form.eventName}
            onChange={handleChange}
            required
          />
          <label htmlFor="eventName" className="form__label_userForm ">
            Event Name
          </label>
        </div>
        <div className="forms_userForm ">
          <input
            type="text"
            id="place"
            name="place"
            placeholder=" "
            className="form__input_userForm "
            autoComplete="off"
            value={form.place}
            onChange={handleChange}
            required
          />
          <label htmlFor="place" className="form__label_userForm ">
            Place
          </label>
        </div>
        <div className="forms_userForm ">
          <input
            type="date"
            id="date"
            name="date"
            className="form__input_userForm "
            autoComplete="off"
            value={form.date}
            onChange={handleChange}
            required
          />
          <label htmlFor="date" className="form__label_userForm">
            Date
          </label>
        </div>
        <button type="submit" className="btn btn-submit">
          Submit
        </button>
      </form>
    </div>
  );
}
