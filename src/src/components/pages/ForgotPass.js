import React, { useState } from "react";
import axios from "axios";

export default function ForgotPass() {
  const [email, setEmail] = useState("");

  async function handleSubmit() {
    if (email) {
      const emailExistsResponse = await axios.post(
        `http://localhost:8080/api/email/send-password-email?u_email=${email}`
      );
      alert("Password associated with this email has been sent.");
      window.location.assign("http://localhost:3000/forgotPassword");
    } else {
      alert("enter an email");
    }
    /* send corresponding password to the email. We dont have to tell user if email is valid or not */
  }

  return (
    <body className="reg">
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ paddingBottom: "20px" }}>
          <label>
            Email:
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              name="u_email"
            />
          </label>
        </div>
        <div style={{ paddingBottom: "20px" }}>
          <label className="submit-btn" onClick={handleSubmit}>
            Submit
          </label>
        </div>
      </form>
    </body>
  );
}
