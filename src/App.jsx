import { useState, useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import html2canvas from 'html2canvas'
import './App.css'

function App() {
  const [userId, setUserId] = useState('')
  const [passName, setPassName] = useState('')
  const passRef = useRef(null)

  const downloadPass = async () => {
    if (passRef.current) {
      const canvas = await html2canvas(passRef.current)
      const link = document.createElement('a')
      link.download = `${passName}-pass.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    }
  }

  return (
    <div className="container">
      <div className="input-section">
        <h1>Event Pass Generator</h1>
        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Enter Pass Name"
          value={passName}
          onChange={(e) => setPassName(e.target.value)}
          className="input-field"
        />
        <button 
          onClick={downloadPass}
          disabled={!userId || !passName}
          className="download-button"
        >
          Download Pass
        </button>
      </div>

      <div className="pass-container" ref={passRef}>
        <div className="event-pass">
          <div className="pass-header">
            <h2>EVENT PASS</h2>
            <p className="pass-date">{new Date().toLocaleDateString()}</p>
          </div>
          
          <div className="pass-details">
            <h3>{passName}</h3>
            <p>ID: {userId}</p>
          </div>

          <div className="qr-section">
            {userId && (
              <QRCodeSVG 
                value={userId}
                size={128}
                level="H"
                includeMargin={true}
              />
            )}
          </div>

          <div className="pass-footer">
            <p>Scan QR code for verification</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
