import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

import "../styles/List.css";
import moiLogo from "../assets/moi-app-logo.png";


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
      const updatedUsers = users.filter((user, index) => index !== id);
      sessionStorage.setItem("users", JSON.stringify(updatedUsers));
      setData(updatedUsers);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF("p", "pt", "a4");
    const margin = 20;
    const pageWidth = doc.internal.pageSize.width - margin * 2;

    const kanakkuData = JSON.parse(sessionStorage.getItem("users"));
    const rows = kanakkuData.map((user, index) => [
      index + 1,
      user.name,
      user.address,
      user.amount,
      user.additional,
    ]);

    const addLogoAndTitle = (doc, callback) => {
      const logoPath = process.env.PUBLIC_URL + moiLogo;

      const logoImg = new Image();
      logoImg.src = logoPath;
      logoImg.onload = () => {
        const imgWidth = 50; // Adjust the size as needed
        const imgHeight = 50; // Adjust the size as needed
        const imgX = (doc.internal.pageSize.width - imgWidth) / 2;
        const imgY = margin;
        doc.addImage(logoImg, "PNG", imgX, imgY, imgWidth, imgHeight);

        const title = "Moi Kannaku";
        const titleFontSize = 18;
        doc.setFontSize(titleFontSize);
        doc.setFont("helvetica", "bold");
        doc.setFont(undefined, "underline");

        const titleWidth = (doc.getStringUnitWidth(title) * titleFontSize) / doc.internal.scaleFactor;
        const titleX = (doc.internal.pageSize.width - titleWidth) / 2;
        const titleY = imgY + imgHeight + 30; // Added extra space here
        doc.text(title, titleX, titleY);

        callback(doc, titleY + titleFontSize + 10);
      };
    };

    addLogoAndTitle(doc, (doc, startY) => {
      doc.autoTable({
        head: [["S.no", "Name", "Address", "Amount", "Additional"]],
        body: rows,
        startY: startY,
        margin: { top: margin, left: margin, right: margin, bottom: margin },
        tableWidth: pageWidth,
        styles: {
          cellPadding: 2,
          fontSize: 10,
          overflow: "linebreak",
          valign: "middle",
        },
        headStyles: {
          fillColor: [255, 255, 0],
          textColor: [230, 52, 42], 
        },
      });

      doc.save("Moi-Kanakku.pdf");
    });
  };

  const ownerData = JSON.parse(sessionStorage.getItem("formData"));

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="bgText_list">Moi varisai Kanaku</h1>
      <div className="list-form">
        <div className="userDetails">
          <strong className="userDetailsText">Owner :</strong>
          <span>{ownerData.name}</span>
          <strong className="userDetailsText">Event Name : </strong>
          <span>{ownerData.eventName}</span>
          <strong className="userDetailsText">Place : </strong>
          <span>{ownerData.place}</span>
          <strong className="userDetailsText">Date :</strong>
          <span>{ownerData.date}</span>
        </div>
        <div className="listHeader">
          <Link to="/create" className="btn btn-submit">Add List</Link>
          <button className="btn btn-export" onClick={generatePDF} type="button">Export as PDF</button>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Address</th>
              <th>Amount</th>
              <th>Additional</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.address}</td>
                <td>{user.amount}</td>
                <td>{user.additional}</td>
                <td>
                  <Link to={`/read/${index}`} className="btn me-2">
                    <FontAwesomeIcon icon={faEye} style={{ color: "rgb(49, 96, 252)" }} />
                  </Link>
                  <Link to={`/update/${index}`} className="btn me-2">
                    <FontAwesomeIcon icon={faPencil} style={{ color: "rgb(76, 76, 76)" }} />
                  </Link>
                  <button onClick={() => handleDelete(index)} className="btn me-2 trash">
                    <FontAwesomeIcon icon={faTrash} style={{ color: "rgb(228, 33, 39)" }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
