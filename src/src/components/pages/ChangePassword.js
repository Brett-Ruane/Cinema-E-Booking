import React, { useState } from "react";
import axios from "axios";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  async function handleSubmit(e) {
    /*if () {
            alert("Invalid New Password");
            return;
          } */
    e.preventDefault();
    const userExistsJSON = localStorage.getItem("CurrentUser");
    const userExists = JSON.parse(userExistsJSON);
    console.log(userExists);
    const passwordDecryptNonData = await axios.get(
      `http://localhost:8080/api/user/getDecrypt?u_email=${userExists.u_email}`
    );
    const passwordDecrypt = JSON.stringify(passwordDecryptNonData.data);
    console.log(passwordDecrypt);
    if (oldPassword === passwordDecrypt) {
      if (newPassword === confirmPassword) {
        await axios.post(
          `http://localhost:8080/api/user/change-password?u_email=${userExists.u_email}&password=${newPassword}`
        );
        alert("Password have been saved");
        window.location.assign("http://localhost:3000/profile");
      }
    }
  }

  return (
    <body className="register">
      <h1>Join ABC </h1>
      <div style={{ paddingBottom: "20px" }}>
        <label>
          Old Password:
          <input onChange={(e) => setOldPassword(e.target.value)} />
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
