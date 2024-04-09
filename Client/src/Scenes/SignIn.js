import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, userSelector } from "../Redux/Reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error } = useSelector(userSelector) || null;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState("");

  // Checking form validation
  const isFormValid = () => {
    return (
      formData.email.trim() !== "" &&
      formData.password.trim() !== "" &&
      !emailError
    );
  };

  // Handle Input Change
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

  // Email Validator
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(!regex.test(email) ? "Invalid email address" : "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      // Dispatch signup action
      dispatch(loginUser(formData))
        .unwrap()
        .then(() => {
          navigate("/purpose");
          toast.success("User Logged In");
        });
    } else {
      console.log("Please fill in all fields and accept terms.");
    }
    setFormData({ email: "", password: "" });
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Image Container */}
      <div className="w-full lg:w-2/5 h-72 lg:h-screen bg-blue-500 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1711580299297-a57d3d6b8f04?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="A relevant description"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Form Container */}
      <div className="w-full lg:w-3/5 flex flex-col justify-center items-center p-6 lg:p-12">
        <div className="mb-6 lg:mb-10 text-left">
          <p className="text-gray-700 text-sm">
            Not a member?{" "}
            <Link to={"/signUp"} className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
        <div className="w-full max-w-md">
          <h2 className="text-2xl lg:text-3xl font-bold mb-6 lg:mb-10 text-gray-800">
            Sign In to Dribbble
          </h2>
          {error && (
            <div className="mb-4 text-red-500">
              <ul>
                <li>{error}</li>
              </ul>
            </div>
          )}
          <form>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                autoComplete="username"
                name="email"
                value={formData.email}
                placeholder="Your email"
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
                name="password"
                value={formData.password}
                placeholder="******************"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex items-center justify-center lg:justify-between">
              <button
                className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full lg:w-auto"
                type="submit"
                onClick={handleSubmit}
                disabled={!isFormValid}
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
