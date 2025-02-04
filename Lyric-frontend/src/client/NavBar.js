//import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Player from "./Player";
import About from "./About";
import Feed from "./Feed";


import "./NavBar.css";
import SideBar from "../components/sidebar/SideBar";
import ErrorPage from "./ErrorPage";
import Trending from "./Trending";

export default function NavBar() {
  return (
    <Router>
      <div className="main-body">
        <SideBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          

          <Route path="/player" element={<Player />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/trending" element={<Trending />} />
        
          <Route path="/about" element={<About />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
}
