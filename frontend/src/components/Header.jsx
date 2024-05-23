// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-secondary p-4">
      <nav className="flex justify-between items-center">
        <div>
          <Link to="/" className="text-3xl font-bold">
            <label className='text-error'>Task</label>
            <label className='text-white'>Manager</label>
            </Link>
        </div>
        <div className="flex gap-4">
          <Link to="/Projects" className="hover:underline">Projects</Link>
          <Link to="/CreateTeam" className="hover:underline">Manage Teams</Link>
          <Link to="/users" className="hover:underline">Users</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
          <Link to="/contact" className="hover:underline">Log Out</Link>
        </div>
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
