import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faSearch,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import {
  upload,
  userActions,
  userSelector,
} from "../Redux/Reducers/userReducer.js";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, token } = useSelector(userSelector) || null;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleUpload = () => {
    const img = document.getElementById("uploadedFile");
    const formData = new FormData();
    formData.append("photo", img.files[0]);
    const formBody = { formData, token };
    dispatch(upload(formBody))
      .unwrap()
      .then(() => {
        toast.success("Project uploaded successfully!!!");
      });
  };

  return (
    <>
      {/* Header for larger screens */}
      <header className="bg-transparent p-4 flex justify-between items-center lg:hidden">
        {/* Logo */}
        <h1 className="text-lg font-bold text-pink-400 font-heading">
          Dribble
        </h1>

        {/* Hamburger Icon (for mobile screens) */}
        <div className="flex items-center">
          {user && (
            <>
              <label
                htmlFor="uploadedFile"
                className="cursor-pointer bg-pink-600 rounded-lg px-2 lg:px-1 md:px-1 border border-gray-300 focus:outline-none text-white py-1 sm:py-2 xl:py-0"
              >
                Upload
              </label>
              <input
                id="uploadedFile"
                type="file"
                accept="image/*"
                name="picture"
                className="hidden"
                onChange={handleUpload}
              />
            </>
          )}

          {/* Dropdown Menu */}
          <div className="relative">
            <button
              className="bg-white rounded-lg p-2 focus:outline-none"
              onClick={toggleDropdown}
            >
              <FontAwesomeIcon icon={faCaretDown} color="pink" size="2x" />
            </button>
            {isDropdownVisible && (
              <ul className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg py-1">
                {user ? (
                  <>
                    <li>
                      <NavLink
                        to="/profile"
                        className="block px-4 py-2 hover:bg-gray-200"
                        activeClassName="font-bold"
                      >
                        Profile
                      </NavLink>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          dispatch(userActions.logout());
                          navigate("/signin");
                        }}
                        className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <NavLink
                        to="/profile"
                        className="block px-4 py-2 hover:bg-gray-200"
                        activeClassName="font-bold"
                      >
                        Login
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/signUp"
                        className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
                      >
                        Register
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            )}
          </div>

          {/* Hamburger Icon */}
          <button
            className="block text-gray-700 focus:outline-none"
            onClick={toggleMenu}
          >
            <FontAwesomeIcon icon={faBars} size="lg" />
          </button>
        </div>
      </header>

      {/* Navbar for larger screens */}
      <nav className="hidden lg:flex justify-between items-center bg-transparent p-4">
        <h1 className="text-lg font-bold text-black font-heading">Dribble</h1>
        <ul className="flex space-x-4 text-gray-700">
          <li>
            <NavLink
              to="/"
              className="hover:text-gray-900"
              activeClassName="font-bold"
            >
              Inspiration
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/find-work"
              className="hover:text-gray-900"
              activeClassName="font-bold"
            >
              Find Work
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/learn-design"
              className="hover:text-gray-900"
              activeClassName="font-bold"
            >
              Learn Design
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/go-pro"
              className="hover:text-gray-900"
              activeClassName="font-bold"
            >
              Go Pro
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/hire-designers"
              className="hover:text-gray-900"
              activeClassName="font-bold"
            >
              Hire Designers
            </NavLink>
          </li>
        </ul>

        {/* Profile and Logout */}
        <div className="flex space-x-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="rounded-lg p-2 pl-8 bg-white border border-gray-300 focus:outline-none"
            />
            <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none pb-2">
              <FontAwesomeIcon icon={faSearch} color="pink" />
            </div>
          </div>
          {/* Upload Button */}
          {user ? (
            <>
              <label
                htmlFor="uploadedFile"
                className="cursor-pointer bg-pink-600 rounded-lg px-3 py-2 border border-gray-300 focus:outline-none text-white"
              >
                Upload
              </label>
              <input
                id="uploadedFile"
                type="file"
                accept="image/*"
                name="picture"
                className="hidden"
                onChange={handleUpload}
              />
              <div className="relative">
                <img
                  src={user.previewUrl}
                  alt="profile"
                  className="h-10 w-10 object-cover rounded-full cursor-pointer"
                />
                <button
                  className="absolute bottom-0 right-0 bg-pink-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  onClick={toggleDropdown}
                >
                  <FontAwesomeIcon icon={faCaretDown} size="sm" />
                </button>
                {isDropdownVisible && (
                  <ul className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg py-1">
                    <li>
                      <NavLink
                        to="/profile"
                        className="block px-4 py-2 hover:bg-gray-200"
                        activeClassName="font-bold"
                      >
                        Profile
                      </NavLink>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          dispatch(userActions.logout());
                          navigate("/signin");
                        }}
                        className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Dropdown Menu */}
              <div className="relative">
                <button
                  className="bg-white rounded-lg p-2 focus:outline-none"
                  onClick={toggleDropdown}
                >
                  <FontAwesomeIcon icon={faCaretDown} color="pink" size="2x" />
                </button>
                {isDropdownVisible && (
                  <ul className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg py-1">
                    <li>
                      <NavLink
                        to={"/signIn"}
                        className="block px-4 py-1 hover:bg-gray-200 w-full text-left"
                      >
                        Login
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"/signUp"}
                        className="block px-4 py-1 hover:bg-gray-200 w-full text-left"
                      >
                        Register
                      </NavLink>
                    </li>
                  </ul>
                )}
              </div>
            </>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white p-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="rounded-lg p-2 pl-8 bg-gray-100 border border-gray-300 focus:outline-none"
            />
            <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faSearch} color="pink" />
            </div>
          </div>

          {/* Navigation Links */}
          <ul className="flex flex-col space-y-4 mt-4">
            <li>
              <NavLink
                to="/"
                className="hover:text-gray-900"
                activeClassName="font-bold"
                onClick={toggleMenu}
              >
                Inspiration
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/find-work"
                className="hover:text-gray-900"
                activeClassName="font-bold"
                onClick={toggleMenu}
              >
                Find Work
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/learn-design"
                className="hover:text-gray-900"
                activeClassName="font-bold"
                onClick={toggleMenu}
              >
                Learn Design
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/go-pro"
                className="hover:text-gray-900"
                activeClassName="font-bold"
                onClick={toggleMenu}
              >
                Go Pro
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/hire-designers"
                className="hover:text-gray-900"
                activeClassName="font-bold"
                onClick={toggleMenu}
              >
                Hire Designers
              </NavLink>
            </li>
          </ul>
        </div>
      )}
      <Outlet />
    </>
  );
};

export default Navbar;
