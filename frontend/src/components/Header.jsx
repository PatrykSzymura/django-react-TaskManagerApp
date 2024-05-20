// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-500 text-white p-4">
      <nav className="flex justify-between items-center">
        <div>
          <Link to="/" className="text-xl font-bold">TaskManager</Link>
        </div>
        <div className="flex gap-4">
          <Link to="/projects" className="hover:underline">Projects</Link>
          <Link to="/teams" className="hover:underline">Teams</Link>
          <Link to="/users" className="hover:underline">Users</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
          <Link to="/Priorities" className="hover:underline">Priorities</Link>
          <Link to="/contact" className="hover:underline">Log Out</Link>

        </div>
      </nav>
    </header>
  );
};

export default Header;
