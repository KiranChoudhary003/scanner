import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Wrapper from "./style";

const ScanResult = () => {
  const { status } = useParams();
  const navigate = useNavigate();

  return (
    <Wrapper>
      <div className="result-page">
        <h2>{status === "Booked" ? "Seat is Booked ✅" : "Seat is Not Booked ❌"}</h2>
        <button onClick={() => navigate("/")}>Scan Again</button>
      </div>
    </Wrapper>
  );
};

export default ScanResult;
