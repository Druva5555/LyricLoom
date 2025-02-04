import "./SideBar.css";
import SideBarButton from "./SideBarButton";
import { IoHome } from "react-icons/io5";
import { PiSignOutBold } from "react-icons/pi";

import { FaUsersLine } from "react-icons/fa6";
import { BiSolidMusic } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function SideBarAdmin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Logging out');
    localStorage.removeItem('adminAuthToken');
    localStorage.removeItem('user');
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/adminlogin');
    window.location.reload();
  };
  
  return (
    <div className="sidebar-container">
    <style>
      {`
      .logo-img {
  margin-bottom: 20px;
  margin-left: 7px;
  width:100px;
  height:100px;
}
      `}
    </style>
      <img src="music_logo_design-removebg-preview.svg" alt="logo" className="logo-img" />
      <div margin>
      <h2>ADMIN SPACE</h2>

      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src="profilelogo.png" alt="profile" className="profile-img" />
        <div>
          <div>Hello!</div>
          <div>ADMIN</div>
        </div>
      </div>

      <div>
        <SideBarButton title="Home" to="/adminhome" icon={<IoHome />} />
        
        <SideBarButton title="Users Data" to="/usersdata" icon={<FaUsersLine />} />
        <SideBarButton title="Songs Data" to="/songsdata" icon={<BiSolidMusic />} />
      </div>
      <div>
        <SideBarButton title="Log Out" onClick={handleLogout} icon={<PiSignOutBold />} />
      </div>
    </div>
  );
}
