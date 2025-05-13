/* page for managing user */

export default function ManageUser() {
  return (
    <body style={{ padding: "30px", backgroundColor: "crimson" }}>
      <h1 style={{ color: "black", fontSize: "30px", padding: "30px" }}>
        Manage User
      </h1>
      <li style={{ padding: "10px" }}>
        <a href="/banUsers" style={{ color: "white" }}>
          Ban Users
        </a>
      </li>
      <li style={{ padding: "10px" }}>
        <a href="/editUsers" style={{ color: "white" }}>
          Edit Users
        </a>
      </li>
      <li style={{ padding: "10px" }}>
        <a href="/addAdmin" style={{ color: "white" }}>
          Add Admin
        </a>
      </li>
    </body>
  );
}
