import React, { useState } from "react";
import { NavLink, Outlet} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { userSelector } from "../Redux/Reducers/userReducer.js";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user} = useSelector(userSelector) || null;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Header for smaller screens */}
      <header className="bg-transparent p-4 flex justify-between items-center lg:hidden">
        <NavLink to={"/home"}>
          <img
            className="h-14 hidden"
            src="https://res.cloudinary.com/df8suxer2/image/upload/v1713085030/xlsuba1pijqdde2abjil.png"
            alt="logo"
          />
        </NavLink>
        <button
          className="block text-gray-700 focus:outline-none absolute left-8 top-8"
          onClick={toggleMenu}
        >
          <FontAwesomeIcon icon={faBars} size="xl" />
        </button>

        {/* Hamburger Icon (for mobile screens) */}
        <div className="flex items-center justify-start relative">
          <img
            src={user?.previewUrl}
            alt="Profile"
            className="h-10 w-10 object-cover rounded-full cursor-pointer"
          />
        </div>
      </header>

      <nav className="hidden lg:flex justify-between items-center bg-transparent p-4">
        <div className="flex items-center gap-5">
          <NavLink to={"/home"}>
            <img
              className="h-14"
              src="https://res.cloudinary.com/df8suxer2/image/upload/v1713085030/xlsuba1pijqdde2abjil.png"
              alt="logo"
            />
          </NavLink>
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
        </div>

        {/* Header for larger Screens*/}
        <div className="flex space-x-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="rounded-lg p-2 pl-8 bg-white border border-gray-300 focus:outline-none"
            />
            <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faSearch} color="pink" />
            </div>
          </div>

          <li className="lg:block hidden px-1">
            <img
              className="h-9 "
              src="https://res.cloudinary.com/df8suxer2/image/upload/v1713090838/xuwdwo8st4whqg5wabvi.png"
              alt="lock"
            />
          </li>
          <div className="relative pr-2 pl-1">
            <img
              src={user?.previewUrl}
              alt="profile"
              className="h-10 w-10 object-cover rounded-full cursor-pointer"
            />
          </div>

          <label
            htmlFor="uploadedFile"
            className="cursor-pointer bg-pink-500 rounded-lg px-3 py-2 border border-gray-300 focus:outline-none text-white"
          >
            Upload
          </label>
          <input
            id="uploadedFile"
            type="file"
            accept="image/*"
            name="picture"
            className="hidden"
          />
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
                className="hover:text-gray-900"
                activeClassName="font-bold"
              >
                Inspiration
              </NavLink>
            </li>
            <li>
              <NavLink
                className="hover:text-gray-900"
                activeClassName="font-bold"
              >
                Find Work
              </NavLink>
            </li>
            <li>
              <NavLink
                className="hover:text-gray-900"
                activeClassName="font-bold"
              >
                Learn Design
              </NavLink>
            </li>
            <li>
              <NavLink
                className="hover:text-gray-900"
                activeClassName="font-bold"
              >
                Go Pro
              </NavLink>
            </li>
            <li>
              <NavLink
                className="hover:text-gray-900"
                activeClassName="font-bold"
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
