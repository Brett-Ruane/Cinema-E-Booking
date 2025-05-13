import React, { useState } from "react";
import axios from "axios";

export default function Verify() {
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  async function handleSubmit() {
    const bool = await axios.post(
      `http://localhost:8080/api/email/verify?u_email=${email}&code=${code}`
    );
    console.log(bool);
    if (bool.data) {
      alert("Account Verified");
      window.location.assign("http://localhost:3000/login");
    } else {
      alert("Wrong Code");
    }
  }
  return (
    <body className="reg">
      <div style={{ paddingBottom: "20px" }}>
        <label>
          Enter email here:
          <input
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            type="text"
            name="email"
          />
        </label>
      </div>
      <div>
        <label>
          Enter verify code here:
          <input
            onChange={(event) => {
              setCode(event.target.value);
            }}
            type="text"
            name="code"
          />
        </label>
        <div style={{padding:'20px'}}>
        <button type="button" className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
        </div>
      </div>
      <div style={{ paddingTop: "20px" }}>
        <a href="/login">Go to Login</a>
      </div>
    </body>
  );
}
