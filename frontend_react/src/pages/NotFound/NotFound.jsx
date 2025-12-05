import React from 'react'

const NotFound = () => {
  return (
        <div style={{
            height: "60vh", 
            position: "relative"
            }}>
            <div style={{
                backgroundColor: "#002C6D",
                height: "100px",
                width: "100%",
                position: "absolute",
                top: "0",
                left: "0"
            }}></div>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%", 
                flexDirection: "column",
                color: "#002C6D",
                fontFamily: "Poppins, sans-serif",
                zIndex: "1",
                transform: "translateY(90px)"
            }}>
            <h1>404</h1>
            <p>Stranica koju tražite ne postoji.</p>
            </div>
        </div>
  )
}

export default NotFound