import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const [user, setUser] = useState(null); // Tracks user data
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false); // Tracks mobile menu state
  const navigate = useNavigate(); // For navigation after logout

  // Fetch user data from localStorage on component mount
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const logout = () => {
    try {
      localStorage.clear();
      setUser(null); // Clear user data in state
      navigate("/"); // Redirect to the homepage
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div>
  <header className="bg-black text-white py-4">
    <div className="min-w-full mx-auto px-4 flex justify-between items-center">
      <div className="flex items-center">
        <h4 className="text-3xl text-green-800">
          Lab<span className="text-white">MS</span>
        </h4>
      </div>
      <div className="hidden md:flex flex-row">
        <div className="ml-4 py-2 px-2 rounded hover:bg-green-700">
          <Link to="/">Home</Link>
        </div>
        <div className="ml-4 py-2 px-2 rounded hover:bg-green-700">
          <Link to="/about-us">About Us</Link>
        </div>
        <div className="ml-4 py-2 px-2 rounded hover:bg-green-700">
          <Link to="/contact-us">Contact Us</Link>
        </div>
        {user ? (
          <>
            <div className="ml-4 py-2 px-2 rounded hover:bg-green-700">
              <Link to={`/test-booking/${user.id}`}>Book Test</Link>
            </div>
            <div className="block py-2 px-4 rounded hover:bg-green-700">
              <Link to={`/booked-tests`}>Booked Tests</Link>
            </div>
            <div className="block py-2 px-4 rounded hover:bg-green-700">
              <Link to={`/ManageTests`}>Manage Tests</Link>
            </div>
            <div className="ml-4 py-2 px-2 rounded hover:bg-green-700">
              <Link to={`/profile/${user.id}`}>Profile</Link>
            </div>
            <div className="ml-4 py-2 px-2 rounded hover:bg-green-700">
              <Link to="/" onClick={logout}>
                Logout
              </Link>
            </div>
          </>
        ) : (
          <div className="ml-4 py-2 px-2 rounded hover:bg-green-700">
            <Link to="/register">Register</Link>
          </div>
        )}
      </div>
      <div className="md:hidden">
        <button
          className="flex items-center px-3 py-2 border rounded text-green-700 border-gray-600 hover:text-white hover:border-white"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
    </div>
    {/* Mobile Menu */}
    {isMobileMenuOpen && (
      <div className="md:hidden">
        <div className="block py-2 px-4 rounded hover:bg-green-700">
          <Link to="/">Home</Link>
        </div>
        <div className="block py-2 px-4 rounded hover:bg-green-700">
          <Link to="/about-us">About Us</Link>
        </div>
        <div className="block py-2 px-4 rounded hover:bg-green-700">
          <Link to="/contact-us">Contact Us</Link>
        </div>
        {user ? (
          <>
            <div className="block py-2 px-4 rounded hover:bg-green-700">
              <Link to={`/test-booking/${user.id}`}>Book Test</Link>
            </div>
            <div className="block py-2 px-4 rounded hover:bg-green-700">
              <Link to={`/booked-tests`}>Booked Tests</Link>
            </div>
            <div className="block py-2 px-4 rounded hover:bg-green-700">
              <Link to={`/ManageTests`}>Manage Tests</Link>
            </div>
            <div className="block py-2 px-4 rounded hover:bg-green-700">
              <Link to={`/profile/${user.id}`}>Profile</Link>
            </div>
            <div className="block py-2 px-4 rounded hover:bg-green-700">
              <Link to="/" onClick={logout}>
                Logout
              </Link>
            </div>
          </>
        ) : (
          <div className="block py-2 px-4 rounded hover:bg-green-700">
            <Link to="/register">Register</Link>
          </div>
        )}
      </div>
    )}
  </header>
</div>
  );
};

export default NavBar;