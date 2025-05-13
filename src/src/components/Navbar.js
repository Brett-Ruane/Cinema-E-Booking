/* nagivation bar on top of website */

export default function Navbar(prop) {

  return (
    <nav className="navbar">
      {(prop.isLoggedIn === 0) && (
        <a href="/" className="site-title">
          ABC
        </a>
      )}

      {(prop.isLoggedIn === 1 && prop.Customer === 1) && (
        <a href="/" className="site-title">
          ABC
        </a>
      )}

      {(prop.isLoggedIn === 1 && prop.Admin === 1) && (
        <a href="/adminHome" className="site-title">
          Admin Home
        </a>
      )}

      <ul>
        {(prop.Admin === 1) && (
          <li>
            <a href="/manage">Manage Movie</a>
          </li>
        )}

        {(prop.Admin === 1 ) && (
          <li>
            <a href="/manageUser">Manage User</a>
          </li>
        )}

        {(prop.Admin === 1) && (
          <li>
            <a href="/managePromo">Manage Promo</a>
          </li>
        )}

        {(prop.Customer === 1 || prop.isLoggedIn === 0) && (
          <li>
            <a href="/search">Search</a>
          </li>
        )}

        {(prop.Customer === 1 || prop.Admin === 1) && (
          <li>
            <a href="/profile">Profile</a>
          </li>
        )}

        {(prop.isLoggedIn === 0) && (
          <li>
            <a href="/login">Login</a>
          </li>
        )}

        {(prop.isLoggedIn === 1) && (
          <li>
            <a href="/logout">Logout</a>
          </li>
        )}
        
      </ul>
    </nav>
  );
}
