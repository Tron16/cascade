import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();
  console.log("LandingPage rendered");

  return (
    <div className="landing-container">
      <div className="content">
        <img src="/logo.png" alt="Logo" className="logo" />
        <h1 className="title">Welcome to Cascade.Ai</h1>
        <p className="subtitle">Your own personal AI meeting facilitator</p>

        <div className="facilitation-buttons">
          <button className="facilitate-btn">Light Assistance</button>
          <button className="facilitate-btn">Moderate Assistance</button>
          <button className="facilitate-btn">Full Facilitation</button>
        </div>

        <button className="enter-btn" onClick={() => navigate("/workspace")}>
          Enter Workspace
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
