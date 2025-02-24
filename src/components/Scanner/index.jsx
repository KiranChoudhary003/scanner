import React, { useState, useEffect, useRef } from "react"
import QrScanner from "qr-scanner"
import Wrapper from "./style"

const Scanner = () => {
  const [scannedData, setScannedData] = useState("")
  const [status, setStatus] = useState("")
  const [message, setMessage] = useState("")
  const [isScanning, setIsScanning] = useState(false)

  const videoRef = useRef(null)
  const scannerRef = useRef(null)
  
  useEffect(() => {
    if (isScanning && videoRef.current) {
      scannerRef.current = new QrScanner(
        videoRef.current,
        (result) => handleScan(result?.data),
        { preferredCamera: "environment" }
      )

      scannerRef.current
        .start()
        .catch((err) => {
          console.error("Scanner Error:", err)
          setStatus("Error")
          setMessage("Failed to start the scanner.")
        })

      return () => {
        scannerRef.current?.stop()
      }
    }
  }, [isScanning])

  const handleScan = async (result) => {
    if (result) {
      console.log("QR Code Detected:", result)
      setScannedData(result)
      setIsScanning(false)
      scannerRef.current?.stop()
  
      try {
        const response = await fetch(`https://seat-booking-backend-sand.vercel.app/scan`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ qrData: result }),
        })
 
        if (!response.ok) {
          throw new Error(`Server Error: ${response.status}`)
        }
  
        const data = await response.json()
        console.log("API Response:", data)
  
        if (data.status === "Booked") {
          setStatus("Booked")
          setMessage("Attendance marked successfully!")
        } else if (data.status === "Already Scanned") {
          setStatus("Already Scanned")
          setMessage("This QR code has already been scanned!")
        } else {
          setStatus("Not Booked")
          setMessage(data.message)
        }
      } catch (error) {
        console.error("API Fetch Error:", error)
        setStatus("Error")
        setMessage("Something went wrong while checking the QR code.")
      }
    }
  }

  return (
    <Wrapper>
      <div className="scanner">
        <h2>QR Code Scanner</h2>

        <button onClick={() => setIsScanning((prev) => !prev)}>
          {isScanning ? "Close Scanner" : "Open Scanner"}
        </button>

        {isScanning && (
          <video ref={videoRef} />
        )}

        <p><strong>Scanned Data:</strong> {scannedData || "No data scanned yet."}</p>
        <p><strong>Status:</strong> {status || "Waiting for scan..."}</p>
        <p>{message}</p>
      </div>
    </Wrapper>
  )
}

export default Scanner
