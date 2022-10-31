import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

 function Landing() {
    return (
      <div className="landing">
        <h1>FOOD BOOK</h1>
        <div>
          <Link to="./home" className="btnLan">
            <button>START</button>
          </Link>
        </div>
        
      </div>
    );
  }

    export default Landing;