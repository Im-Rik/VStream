import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const Navbar = ({ isLoggedIn }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const verifyToken = async () => {
      const token = Cookies.get('token');
      // console.log(token);
      if (token) {
        try {
          const response = await axios.post('http://localhost:4500/user/verify-token', { token } , {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          if (response.data.valid) {
            setUser(response.data.decoded);
          } else {
            console.error('Invalid token');
            Cookies.remove('token');
          }
        } catch (error) {
          console.error('Error verifying token', error);
          // Cookies.remove('token');
        }
      }
    };

    verifyToken();
  }, []);

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
                  {user ? user.name : 'User'}
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
};

export default Navbar;
