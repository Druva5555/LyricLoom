import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './adminNavBar.css'
import AdminHome from './AdminHome';

import UsersData from './UsersData';
import SongsData from './SongsData';
import SideBarAdmin from '../components/sidebar/SideBarAdmin';
import AdminErrorPage from './AdminErrorPage';

export default function AdminNavBar() {

  return (
    <Router>
        <div className='main-body'>
            <SideBarAdmin/>
            <Routes>
                <Route path='/' element={<AdminHome/>}/>
                <Route path='/adminhome' element={<AdminHome/>}/>
               
                <Route path='/usersdata' element={<UsersData/>}/>
                <Route path='/songsdata' element={<SongsData/>}/>
                <Route path='*' element={<AdminErrorPage/>}/>
            </Routes>
            
        </div>
        
    </Router>
  )
}
