import React, { useState } from "react";
import { QrReader } from "@blackbox-vision/react-qr-reader";
import Wrapper from "./style";

const Scanner = () => {
  const [scannedData, setScannedData] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [isScanning, setIsScanning] = useState(false); // Controls scanner visibility

  const handleScan = async (result) => {
    if (result?.text) {
      setScannedData(result.text);
      setIsScanning(false); // Hide scanner after successful scan

      try {
        const response = await fetch("http://localhost:5000/scan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ qrData: result.text }), // Send scanned data to backend
        });

        const data = await response.json();

        if (data.status === "Booked") {
          setStatus("Booked");
        } else {
          setStatus("Not Booked");
        }

        setMessage(data.message);
      } catch (error) {
        console.error("Error scanning QR code:", error);
        setStatus("Error");
        setMessage("Something went wrong");
      }
    }
  };

  const handleError = (error) => {
    console.error("Scanner Error:", error);
    setStatus("⚠️ Error");
    setMessage("Error scanning QR code");
  };

  return (
    <Wrapper>
      <h2>QR Code Scanner</h2>

      <button onClick={() => setIsScanning(true)}>Open Scanner</button>

      {isScanning && (
        <QrReader
          onResult={handleScan}
          onError={handleError}
          constraints={{ facingMode: "environment" }}
          containerStyle={{ width: "100%", marginTop: "10px" }}
        />
      )}

      <p><strong>Scanned Data:</strong> {scannedData}</p>
      <p><strong>Status:</strong> {status}</p>
      <p>{message}</p>
    </Wrapper>
  );
};

export default Scanner;
