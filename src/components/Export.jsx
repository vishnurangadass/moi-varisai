import React, { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

export default function Export() {
    const [sheet, setSheet]=useState([])
    useEffect(() => {
        const sheets = JSON.parse(localStorage.getItem("users")) || [];
        setSheet(sheets);
      }, []);

  const handleDownload = () => {
    if (!sheet) {
      alert('No data found in local storage');
      return;
    }

    // Convert the object into an array of arrays
    const data = [['Key', 'Value']]; // Header row
    for (const key in sheet) {
      if (sheet.hasOwnProperty(key)) {
        data.push([key, sheet[key]]);
      }
    }
    
    // const data = [
    //   ['name', 'age'],
    //   ['vishnu', 24],
    //   ['venkat', 30]
    // ];

    // Create a new workbook
    const xBook = XLSX.utils.book_new();
    console.log(xBook);

    // Create a new worksheet from the data
    const xSheet = XLSX.utils.aoa_to_sheet(data);
    console.log(xSheet);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(xBook, xSheet, 'sheet1');

    // Generate the Excel file
    const newxlsxFile = XLSX.write(xBook, { bookType: 'xlsx', type: 'array' });

    // Convert to blob and save
    const blob = new Blob([newxlsxFile], { type: 'application/octet-stream' });
    saveAs(blob, 'example.xlsx');
  };

  return (
    <div>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
}
