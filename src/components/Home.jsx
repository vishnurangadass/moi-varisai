import React from "react";
import Userform from "./Userform";

import "../styles/Home.css";

export default function Home() {
  return (
    <div className="main-content">
      <h1 className="bgText_home">Moi App for your Function</h1>
      <Userform />
    </div>
  );
}
