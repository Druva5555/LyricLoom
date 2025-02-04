import React, { useEffect, useState } from "react";
import "./SideBar.css";
import SideBarButton from "./SideBarButton";
import { IoHome } from "react-icons/io5";

import { FaPlay } from "react-icons/fa";
import { FaFire } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { MdFeedback } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

export default function SideBar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logging out");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("isUserLoggedIn");
    navigate("/userlogin");
    window.location.reload();
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <div className="sidebar-container">
      <img src="music_logo_design-removebg-preview.svg" alt="logo" className="logo-img" />
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src="profilelogo.png" alt="profile" className="profile-img" />
        <div>
          <div>Hello!</div>
          {user && <div>{user.name}</div>}
        </div>
      </div>
      <div>
        <SideBarButton title="Home" to="/home" icon={<IoHome />} />
        

        <SideBarButton title="Player" to="/player" icon={<FaPlay />} />
        <SideBarButton title="Feed" to="/feed" icon={<MdSpaceDashboard />} />
        <SideBarButton title="Trending" to="/trending" icon={<FaFire />} />
      </div>
      <div>
        <SideBarButton title="About" to="/about" icon={<MdFeedback />} />
        <SideBarButton
          title="Log Out"
          onClick={handleLogout}
          icon={<PiSignOutBold />}
        />
        <div className="footer-container">
          <p className="footer-text">
            Developed with{" "}
            <span role="img" aria-label="heart">
              🥰
            </span>
          </p>
          <p className="footer-text">By LyricLoom</p>
        </div>
      </div>
    </div>
  );
}
