/* page for login in an account */
import React, { useState } from "react";
import axios from "axios";

export default function Login(prop) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [userId, setUserId] = useState(() => {
  //   // getting stored value
  //   const saved = localStorage.getItem("userId");
  //   const initialValue = parseInt(JSON.parse(saved));
  //   return initialValue || 0;
  // });

  async function handleSubmit(e) {
    e.preventDefault();
    const emailExistsResponse = await axios.get(
      `http://localhost:8080/api/user/getUserByEmail?u_email=${email}`
    );
    const userExists = emailExistsResponse.data;
    console.log(userExists);
    // console.log(userExists.u_email);
    // console.log(userExists.u_pwd);
    console.log(email);
    // console.log(password);
    // console.log(userExists.u_email === email);
    console.log(userExists.u_pwd);
    // console.log(userExists.u_role);
    const passwordDecryptNonData = await axios.get(
      `http://localhost:8080/api/user/getDecrypt?u_email=${email}`
    );
    console.log(passwordDecryptNonData);
    const passwordDecrypt = JSON.stringify(passwordDecryptNonData.data);
    console.log(passwordDecrypt);
    if (userExists && userExists.u_mark !== "banned") {
      localStorage.setItem("userId", userExists.u_id);
      localStorage.setItem("userEmail", userExists.u_email);
      localStorage.setItem("CurrentUser", JSON.stringify(userExists));
      //console.log(localStorage.getItem("currentUser"));
      //console.log(userExists.u_id);
      if (
        email === userExists.u_email &&
        password === passwordDecrypt &&
        userExists.u_role === 1
      ) {
        alert("logged in");
        prop.isAdmin();
        prop.submit();
        window.location.assign("http://localhost:3000/adminHome");
        return;
      } else if (
        email === userExists.u_email &&
        password === passwordDecrypt &&
        userExists.u_role === 0
      ) {
        if (userExists.u_mark === "inactive") {
          alert("Verify Your Email");
          window.location.assign("http://localhost:3000/verify");
        } else {
          alert("logged in");
          prop.isCustomer();
          prop.submit();
          window.location.assign("http://localhost:3000/");
        }
        return;
      } else {
        alert("Invalid Login");
      }
    } else {
      alert("Email does not have account connected with it or you have banned");
    }
  }

  return (
    <body className="reg">
      <h1
        style={{ padding: "20px", display: "flex", justifyContent: "center" }}
      >
        Login
      </h1>
      <form onSubmit={handleSubmit}>
        <div style={{ paddingBottom: "20px" }}>
          <label>
            Email:{" "}
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            Password:{" "}
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <a style={{ fontSize: 15 }} href="/forgotPass">
            {" "}
            Can't Remember?
          </a>
        </div>

        <div style={{ padding: "20px" }}>
          <button className="submit-btn" onClick={handleSubmit}>
            Submit
          </button>
        </div>

        <a href="/register">Don't have an account yet? Sign Up</a>
      </form>
    </body>
  );
}
