import React, { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  async function handleSubmit(e) {
    /*if () {
            alert("Invalid New Password");
            return;
          } */
    e.preventDefault();
    const emailExistsResponse = await axios.get(
      `http://localhost:8080/api/user/getUserByEmail?u_email=${email}`
    );
    const userExists = emailExistsResponse.data;
    console.log(userExists);
    if (oldPassword === userExists.u_token) {
      if (newPassword === confirmPassword) {
        userExists.u_pwd = newPassword;
        await axios.post(
          `http://localhost:8080/api/user/change-password?u_email=${email}&password=${newPassword}`
        );
        alert("Password have been saved");
        window.location.assign("http://localhost:3000/login");
      }
    }
  }

  return (
    <body className="register">
      <div style={{ paddingBottom: "20px" }}>
        <label>
          Email:
          <input onChange={(e) => setEmail(e.target.value)} required />
        </label>
      </div>
      <div style={{ paddingBottom: "20px" }}>
        <label>
          Token from email:
          <input onChange={(e) => setOldPassword(e.target.value)} required />
        </label>
      </div>
      <div style={{ paddingBottom: "20px" }}>
        <label>
          New Password:
          <input
            onChange={(e) => setNewPassword(e.target.value)}
            type="password"
            required
            minLength="8"
          />
          (8 Characters min)
        </label>
      </div>
      <div style={{ paddingBottom: "20px" }}>
        <label>
          Confirm New Password:
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            required
            minLength="8"
          />
        </label>
      </div>
      <div style={{ paddingBottom: "20px" }}>
        <label className="submit-btn" onClick={handleSubmit}>
          Confirm
        </label>
      </div>
    </body>
  );
}
