import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { RegisPage } from '../pages/LogReg';
import TeamForm from '../pages/forms/TeamForm';

const logout = () => {
  localStorage.removeItem('jwtToken'); 
  localStorage.removeItem('refresh_token');
};

const Header = () => {
  let nav = useNavigate()
  const handleLogout = () => {
    logout()
    nav("/")
  }

  return (
    <header className="bg-secondary p-4">
      <nav className="flex justify-between items-center">
        <div>
          <Link to="/" className="text-3xl font-bold">
            <label className='text-error'>Task</label>
            <label className='text-white'>Manager</label>
            </Link>
        </div>
        {
         (typeof localStorage['jwtToken'] != "undefined") ? (
        <div className="flex gap-4">
          <Link to="/Projects" className="hover:underline">Projects</Link>
          <Modal element={<RegisPage/>} btn_Name={"create user"} modal_ID={"regis"} />
          <Modal element={<TeamForm/>} btn_Name={"TeamPanel"} modal_ID={"team"} />
          <Link to="/users" className="hover:underline">Users</Link>
          <button onClick={handleLogout}> Logout</button>
        </div>) : (
          <Link to="/login" className="hover:underline">Login</Link>
          )
        }
        
      </nav>
    </header>
  );
};

export const Footer = () => {
  return(
    <div className="p-1">
      <div className="badge bg-green-600"></div>
      <div className="badge bg-yellow-500"></div>
      <div className="badge bg-red-600"></div>
      <div className="badge bg-sky-500"></div>
      <div className="badge bg-gray-500"></div>
      <div className="badge bg-blue-700"></div>
      <div className="badge bg-pink-700"></div>
    </div>
  );
}

export default Header;
