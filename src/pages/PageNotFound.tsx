import React from "react";
import NeuralNetworkBackground from "../components/NeuralNetworkBackground";
import "../styles/PageNotFound.css";
import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="pnf">
      <NeuralNetworkBackground withSpiral={true} nodeCount={40} />

      <div className="pnf-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>Looks like you’re off the grid.</p>  
        <p>Let’s guide you back to the right path.</p>

        <button className="pnf-btn" onClick={() => navigate("/")}>
          Go Home
        </button>
      </div>
    </div>
  );
}
