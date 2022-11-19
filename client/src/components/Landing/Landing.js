import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

 function Landing() {
    return (
      <div className="container">
        <div className="item">
          <h1>RECIPE BOOK</h1>
          <Link to="./home" className="btnLan">
            <button>HOME</button>
          </Link>
        </div>
      </div>
    );
  }

    export default Landing;