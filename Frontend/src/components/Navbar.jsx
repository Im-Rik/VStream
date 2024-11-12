import React, { useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import {AuthContext} from '../context/AuthContext'

const Navbar = ({ isLoggedIn }) => {

  const authContext = useContext(AuthContext);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const [user, setUser] = useState(null); //Using Context instead

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const Logout = () => {
    Cookies.remove('token');
    authContext.setUser(null);
  }

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
            authContext.setUser(response.data.decoded);
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
          {authContext.user ? (
            <>
              <a href="/upload" className="text-gray-300 hover:text-white">Add Files</a>
              <div className="relative">
                <button 
                  onClick={toggleDropdown} 
                  className="text-gray-300 hover:text-white"
                >
                  {authContext.user.name }
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10">
                    <a 
                      href="#"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={Logout}
                    >
                      Logout
                    </a>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <a href="/login" className="text-gray-300 hover:text-white">Log In</a>
              <a href="/signup" className="text-gray-300 hover:text-white">Sign Up</a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
