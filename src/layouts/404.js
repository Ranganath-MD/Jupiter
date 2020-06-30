import React from 'react'
import NotFoundImage from "../assets/images/notfound.png"
const NotFound = () => {
    return (
        <div style={{
            maxWidth: 768,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10vh"
        }}>
            <div style={{
                width: 300,
                height: 400
            }}>
                <img src={NotFoundImage} alt="not found" width="100%" />
            </div>
            <h1 style={{
                color: "white"
            }}>Page Not Found</h1>
        </div>
    )
}

export default NotFound
