// src/components/Common/Navbar.js
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-white font-bold">Tender dApp</h1>
        <div>
          <a href="#client" className="text-white mr-4">Client</a>
          <a href="#bidder" className="text-white">Bidder</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
