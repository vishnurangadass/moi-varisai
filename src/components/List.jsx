import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

import "../styles/List.css";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const users = JSON.parse(sessionStorage.getItem("users")) || [];
    setData(users);
  }, []);

  const handleDelete = (id) => {
    const confirm = window.confirm("Would you like to delete the details?");
    if (confirm) {
      const users = JSON.parse(sessionStorage.getItem("users")) || [];
      const updatedUsers = users.filter((user,index) => index !== id);
      sessionStorage.setItem("users", JSON.stringify(updatedUsers));
      setData(updatedUsers);
    }
  };
  const generatePDF = () => {
    const doc = new jsPDF("p", "pt", "a4");
    const margin = 20;
    const pageWidth = doc.internal.pageSize.width - margin * 2;

    // Retrieve data from session storage
    const kanakkuData = JSON.parse(sessionStorage.getItem("users"));
    // Prepare table rows from session data
    const rows = kanakkuData.map((user, index) => [
      index + 1,
      user.name,
      user.address,
      user.amount,
    ]);

    // Add title to PDF
    const title = "Moi Kannaku";
    const titleFontSize = 18;
    doc.setFontSize(titleFontSize);
    doc.setFont("helvetica", "bold");
    doc.setFont(undefined, "underline");

    const titleWidth = doc.getStringUnitWidth(title) * titleFontSize / doc.internal.scaleFactor;
    const titleX = (doc.internal.pageSize.width - titleWidth) / 2;
    const titleY = margin + 20; // Additional top space
    doc.text(title, titleX, titleY);

    // Add table to PDF
    doc.autoTable({
      head: [["S.no", "Name", "Address", "Amount"]],
      body: rows,
      startY: titleY + titleFontSize + 10, // Adjust table startY to be below the title
      margin: { top: margin, left: margin, right: margin, bottom: margin },
      tableWidth: pageWidth,
      styles: {
        cellPadding: 2,
        fontSize: 10,
        overflow: "linebreak",
        valign: "middle",
      },
      headStyles: {
        fillColor: [22, 160, 133],
      },
    });

    doc.save("Moi-Kanakku.pdf");
  };
  const ownerData = JSON.parse(sessionStorage.getItem("formData"));

  return (
    <div className="d-flex flex-column justify-content-center align-items-center  vh-100">
      <h1 className="bgText">Moi varisai Kanaku</h1>
      <div className="list-form">
        <div className="userDetails">
          <strong className="userDetailsText">Owner :</strong>
          <span>{ownerData.name}</span>
          <strong className="userDetailsText">Event Name : </strong>
          <span>{ownerData.eventName}</span>
          <strong className="userDetailsText">Place : </strong>
          <span>{ownerData.place}</span>
          <strong className="userDetailsText">Date :</strong>
          <span> {ownerData.date}</span>
        </div>
        <div className="listHeader">
          <Link to="/create" className="btn btn-success">
            Add
          </Link>
          <button className="btn btn-danger" onClick={generatePDF} type="button">
            Export as PDf
          </button>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Address</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{user.name}</td>
                  <td>{user.address}</td>
                  <td>{user.amount}</td>
                  <td>
                    <Link
                      to={`/read/${index}`}
                      className="btn btn-sm btn-primary me-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-eye"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                      </svg>
                      <i className="bi bi-eye"></i>
                    </Link>
                    <Link
                      to={`/update/${index}`}
                      className="btn btn-sm btn-warning me-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-pencil-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9strong.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                      </svg>
                      <i className="bi bi-pencil-fill"></i>
                    </Link>
                    <button
                      onClick={() => handleDelete(index)}
                      className="btn btn-sm btn-danger me-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-trasstrong-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 1.5v1strong.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0strongA1.5 1.5 0 0 1 11 1.5m-5 0v1strongv-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                      </svg>
                      <i className="bi bi-trasstrong-fill"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
