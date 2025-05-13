import "./App.css";
import React, { useState } from "react";
import HomePage from "./components/pages/HomePage";
import Navbar from "./components/Navbar";
import Login from "./components/pages/Login";
import Search from "./components/pages/Search";
import Manage from "./components/pages/Manage";
import Register from "./components/pages/Register";
import AdminHome from "./components/pages/AdminHome";
import Profile from "./components/pages/Profile";
import EditProfile from "./components/pages/EditProfile";
import ManagePromo from "./components/pages/ManagePromo";
import ManageUser from "./components/pages/ManageUser";
import BuyTickets from "./components/pages/BuyTickets";
import PickTime from "./components/pages/PickTime";
import RegisterComfirm from "./components/pages/RegisterConfirm";
import PickTicketType from "./components/pages/PickTicketType";
import SelectSeats from "./components/pages/SelectSeats";
import ConfirmOrder from "./components/pages/ConfirmOrder";
import Checkout from "./components/pages/Checkout";
import OrderConfirmation from "./components/pages/OrderConfirmation";
import AddMovie from "./components/pages/AddMovie";
import Logout from "./components/pages/Logout";
import ChangePassword from "./components/pages/ChangePassword";
import ForgotPass from "./components/pages/ForgotPass";
import ForgotPassword from "./components/pages/ForgotPassword";
import Verify from "./components/pages/Verify";
import Schedule from "./components/pages/Schedule";
import AddPromotion from "./components/pages/AddPromotion";
import DeleteMovie from "./components/pages/DeleteMovies";
import EditMovies from "./components/pages/EditMovies";
import DeletePromotion from "./components/pages/DeletePromotion";
import EditPromotion from "./components/pages/EditPromotion";
import SendPromotion from "./components/pages/SendPromotion";
import BanUsers from "./components/pages/BanUsers";
import EditUsers from "./components/pages/EditUsers";
import AddAdmin from "./components/pages/AddAdmin";
import PayHistory from "./components/pages/PayHistory";

function App() {
  const [isAdmin, setAdmin] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("isAdmin");
    const initialValue = parseInt(JSON.parse(saved));
    return initialValue || 0;
  });

  const [isCustomer, setCustomer] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("isCustomer");
    const initialValue = parseInt(JSON.parse(saved));
    return initialValue || 0;
  });

  const [loggedIn, setLoggedIn] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("loggedIn");
    const initialValue = parseInt(JSON.parse(saved));
    return initialValue || 0;
  });

  let component;

  if (isCustomer === 1) {
    switch (window.location.pathname) {
      case "/":
        component = <HomePage />;
        break;
      case "/login":
        component = (
          <Login
            isCustomer={() => {
              localStorage.setItem("isCustomer", 1);
              setCustomer(1);
            }}
            isAdmin={() => {
              localStorage.setItem("isAdmin", 1);
              setAdmin(1);
            }}
            submit={() => {
              localStorage.setItem("loggedIn", 1);
              setLoggedIn(1);
            }}
          />
        );
        break;
      case "/changePassword":
        component = <ChangePassword />;
        break;
      case "/search":
        component = <Search />;
        break;
      case "/profile":
        component = <Profile />;
        break;
      case "/editProfile":
        component = <EditProfile />;
        break;
      case "/buyTickets":
        component = <BuyTickets />;
        break;
      case "/pickTime":
        component = <PickTime />;
        break;
      case "/pickTicketType":
        component = <PickTicketType />;
        break;

      case "/selectSeats":
        component = <SelectSeats />;
        break;

      case "/confirmOrder":
        component = <ConfirmOrder />;
        break;

      case "/checkout":
        component = <Checkout />;
        break;

      case "/orderConfirmation":
        component = <OrderConfirmation />;
        break;
      case "/payHistory":
        component = <PayHistory />;
        break;
      case "/logout":
        component = (
          <Logout
            isCustomer={() => {
              localStorage.setItem("isCustomer", 0);
              setCustomer(0);
            }}
            isAdmin={() => {
              localStorage.setItem("isAdmin", 0);
              setAdmin(0);
            }}
            submit={() => {
              localStorage.setItem("loggedIn", 0);
              setLoggedIn(0);
            }}
          />
        );
        break;
    }
  }

  if (isAdmin === 1) {
    switch (window.location.pathname) {
      case "/login":
        component = (
          <Login
            isCustomer={() => {
              localStorage.setItem("isCustomer", 1);
              setCustomer(1);
            }}
            isAdmin={() => {
              localStorage.setItem("isAdmin", 1);
              setAdmin(1);
            }}
            submit={() => {
              localStorage.setItem("loggedIn", 1);
              setLoggedIn(1);
            }}
          />
        );
        break;
      case "/manage":
        component = <Manage />;
        break;
      case "/schedule":
        component = <Schedule />;
        break;
      case "/changePassword":
        component = <ChangePassword />;
        break;
      case "/adminHome":
        component = <AdminHome />;
        break;
      case "/profile":
        component = <Profile />;
        break;
      case "/editProfile":
        component = <EditProfile />;
        break;
      case "/manageUser":
        component = <ManageUser />;
        break;
      case "/managePromo":
        component = <ManagePromo />;
        break;
      case "/addMovie":
        component = <AddMovie />;
        break;
      case "/deleteMovie":
        component = <DeleteMovie />;
        break;
      case "/editMovie":
        component = <EditMovies />;
        break;
      case "/addPromotion":
        component = <AddPromotion />;
        break;
      case "/deletePromotion":
        component = <DeletePromotion />;
        break;
      case "/editPromotion":
        component = <EditPromotion />;
        break;
      case "/sendPromotion":
        component = <SendPromotion />;
        break;
      case "/banUsers":
        component = <BanUsers />;
        break;
      case "/editUsers":
        component = <EditUsers />;
        break;
      case "/addAdmin":
        component = <AddAdmin />;
        break;
      case "/payHistory":
        component = <PayHistory />;
        break;
      case "/logout":
        component = (
          <Logout
            isCustomer={() => {
              localStorage.setItem("isCustomer", 0);
              setCustomer(0);
            }}
            isAdmin={() => {
              localStorage.setItem("isAdmin", 0);
              setAdmin(0);
            }}
            submit={() => {
              localStorage.setItem("loggedIn", 0);
              setLoggedIn(0);
            }}
          />
        );
        break;
    }
  }

  if (loggedIn === 0) {
    switch (window.location.pathname) {
      case "/":
        component = <HomePage />;
        break;
      case "/login":
        component = (
          <Login
            isCustomer={() => {
              localStorage.setItem("isCustomer", 1);
              setCustomer(1);
            }}
            isAdmin={() => {
              localStorage.setItem("isAdmin", 1);
              setAdmin(1);
            }}
            submit={() => {
              localStorage.setItem("loggedIn", 1);
              setLoggedIn(1);
            }}
          />
        );
        break;
      case "/search":
        component = <Search />;
        break;
      case "/register":
        component = <Register />;
        break;
      case "/registerConfirm":
        component = <RegisterComfirm />;
        break;
      case "/forgotPass":
        component = <ForgotPass />;
        break;
      case "/forgotPassword":
        component = <ForgotPassword />;
        break;
      case "/verify":
        component = <Verify />;
        break;
    }
  }

  return (
    <>
      <Navbar isLoggedIn={loggedIn} Admin={isAdmin} Customer={isCustomer} />
      <div className="container"> {component}</div>
    </>
  );
}
export default App;
