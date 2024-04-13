import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loginUser,
  registerUser,
  userSelector,
} from "../Redux/Reducers/userReducer";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector(userSelector) || null;

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [isChecked, setIsChecked] = useState(false);
  const [emailError, setEmailError] = useState("");

  // Handle Checkbox Change
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  // Check if form is valid
  const isFormValid = () => {
    return (
      isChecked &&
      formData.name.trim() !== "" &&
      formData.username.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.password.trim() !== "" &&
      !emailError
    );
  };

  // Handle Input parameters Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "email") {
      validateEmail(value);
    }
  };

  // Validate email format
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(!regex.test(email) ? "Invalid email address" : "");
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      // Dispatch register user action
      dispatch(registerUser(formData))
        .unwrap()
        .then(() => {
          // Dispatch login user action
          dispatch(
            loginUser({ email: formData.email, password: formData.password })
          )
            .unwrap()
            .then(() => {
              navigate("/profile");
            });
          toast.success("User Signed Up Successfully!");
        });
    } else {
      console.log("Please fill in all fields and accept terms.");
    }
    setFormData({
      name: "",
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Image Container */}
      <div className="w-full lg:w-2/5 h-40 lg:h-screen bg-blue-500 overflow-hidden">
        <img
          src="https://cdn.dribbble.com/userupload/13880949/file/original-156bb704f411cacf69e55cbe9f464a50.png?resize=1200x900"
          alt="A relevant description"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Form Container */}
      <div className="w-full lg:w-3/5 flex flex-col justify-center items-center p-6 lg:p-12">
        <div className="mb-6 lg:mb-10 text-left">
          <p className="text-gray-700 text-sm">
            Already a member?{" "}
            <Link to={"/signIn"} className="text-blue-500 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
        <div className="w-full max-w-md">
          {/* "Already a member? Sign In" Link */}
          <h2 className="text-2xl lg:text-3xl font-bold mb-6 lg:mb-10 text-gray-800">
            Sign Up to Dribbble
          </h2>
          {error && (
            <div className="mb-4 text-red-500">
              <ul>
                <li>{error}</li>
              </ul>
            </div>
          )}
          <form>
            {/* Name and Username Inputs */}
            <div className="mb-4 flex flex-wrap">
              <div className="w-full lg:w-1/2 lg:pr-2 mb-4 lg:mb-0">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Your name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full lg:w-1/2 lg:pl-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  autoComplete="username"
                  name="username"
                  placeholder="Your username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            {/* Email, Password, and Checkbox Inputs */}
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                autoComplete="email"
                placeholder="Your email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="******************"
                value={formData.password}
                name="password"
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-6">
              <input
                className="mr-2 leading-tight"
                id="checkbox"
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <label className="text-gray-700 text-sm" htmlFor="checkbox">
                Creating an account means you're okay with with our Terms of
                Service, Privacy Policy, and our default Notification Settings.
              </label>
            </div>
            {/* Sign Up Button */}
            <div className="flex items-center justify-center lg:justify-between">
              <button
                className={`bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full lg:w-auto ${
                  isFormValid() ? "" : "cursor-not-allowed opacity-50"
                }`}
                type="submit"
                onClick={handleSubmit}
                disabled={!isFormValid()}
              >
                Create Account
              </button>
            </div>
          </form>
          <p className="text-gray-400 text-sm mt-4">
            This site is protected by reCAPTCHA and the Google{" "}
            <span className="text-blue-700">Privacy Policy</span> and{" "}
            <span className="text-blue-700">Terms of Service</span> apply
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
