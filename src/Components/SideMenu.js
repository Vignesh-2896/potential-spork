import React from "react";
import HomeIcon from "../assets/icons8-home-24.png";
import OrderIcon from "../assets/icons8-purchase-order-24.png";
import NotificationIcon from "../assets/icons8-notification-24.png";
import HelpIcon from "../assets/icons8-help-24.png";
import SettingsIcon from "../assets/icons8-settings-24.png";
import { Link } from "react-router-dom";

const SideMenu = () => {
  // Side Menu for the application.

  return (
    <div>
      <div className="SideMenu">
        <ul>
          <li className="closeBtn" onClick={CloseMenu}>
            &times;
          </li>
          <li>
            <Link to="/">
              <img
                src={HomeIcon}
                alt="Home Icon"
                style={{ marginRight: "15px" }}
              />
              {''}
              Home
            </Link>
          </li>
          <li>
            <img
              src={OrderIcon}
              alt="Order Icon"
              style={{ marginRight: "15px" }}
            />
            {''}
            Orders
          </li>
          <li>
            <img
              src={NotificationIcon}
              alt="Notification Icon"
              style={{ marginRight: "15px" }}
            />
            {''}
            Notification
          </li>
          <li>
            <img
              src={HelpIcon}
              alt="Help Icon"
              style={{ marginRight: "15px" }}
            />
            {''}
            Help & Support
          </li>
          <li>
            <img
              src={SettingsIcon}
              alt="Settings Icon"
              style={{ marginRight: "15px" }}
            />
            {''}
            Settings
          </li>
        </ul>
      </div>
    </div>
  );
};

const ShowMenu = () => {
  // Function to display the menu on click of the Hamburger Icon.
  document.getElementsByClassName("SideMenu")[0].style.width = "350px";
  if (document.getElementsByClassName("listSection")[0])
    document.getElementsByClassName("listSection")[0].style.filter =
      "blur(5px)";
  if (document.getElementsByClassName("restaurantPage")[0])
    document.getElementsByClassName("restaurantPage")[0].style.filter =
      "blur(5px)";
  document.getElementById("sideMenuBtn").style.display = "none";
};

let CloseMenu = () => {
  // Function to hide the menu on click of the Close Icon.
  document.getElementsByClassName("SideMenu")[0].style.width = "0px";
  if (document.getElementsByClassName("listSection")[0])
    document.getElementsByClassName("listSection")[0].style.filter =
      "blur(0px)";
  if (document.getElementsByClassName("restaurantPage")[0])
    document.getElementsByClassName("restaurantPage")[0].style.filter =
      "blur(0px)";
  document.getElementById("sideMenuBtn").style.display = "block";
};

export { SideMenu, ShowMenu };
