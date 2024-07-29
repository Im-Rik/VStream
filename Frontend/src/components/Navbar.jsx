import React, { useState } from 'react';

const Navbar = ({ isLoggedIn }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">Vstream</div>
        <div className="flex space-x-4">
          <a href="/" className="text-gray-300 hover:text-white">Home</a>
          {isLoggedIn ? (
            <>
              <a href="/add-files" className="text-gray-300 hover:text-white">Add Files</a>
              <div className="relative">
                <button 
                  onClick={toggleDropdown} 
                  className="text-gray-300 hover:text-white"
                >
                  User Name
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
                    <a 
                      href="/logout" 
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </a>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <a href="/sign-in" className="text-gray-300 hover:text-white">Sign In</a>
              <a href="/sign-up" className="text-gray-300 hover:text-white">Sign Up</a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
