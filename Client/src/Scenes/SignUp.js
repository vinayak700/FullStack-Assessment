import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ErrorMessages from "../ErrorMessage";
import {
  loginUser,
  registerUser,
  userSelector,
} from "../Redux/Reducers/userReducer";
import * as Yup from "yup";
import { useFormik } from "formik";
import ClipLoader from "react-spinners/ClipLoader";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector(userSelector) || null;

  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      terms: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(`Name ${ErrorMessages.emptyRegexMessage}`),
      username: Yup.string()
        .required(`Username ${ErrorMessages.emptyRegexMessage}`)
        .min(6, `Username ${ErrorMessages.lengthErrorRegexMessage}`)
        .matches(
          /^\S*$/,
          `Username ${ErrorMessages.SpaceNotAllowedRegexMessage}`
        ),
      password: Yup.string()
        .required(`Password ${ErrorMessages.emptyRegexMessage}`)
        .matches(
          /^[a-zA-Z0-9_\-!@#$%^&*()+=[\]{}|\\;:'",<.>/?]{8,}$/,
          `Password ${ErrorMessages.passwordRegexMessage}`
        ),

      email: Yup.string()
        .required(`Email ${ErrorMessages.emptyRegexMessage}`)
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, ErrorMessages.emailRegexMessage),

      terms: Yup.boolean()
        .required(ErrorMessages.termsConditionRegexMessage)
        .oneOf([true], ErrorMessages.termsConditionRegexMessage),
    }),
    onSubmit: (userData) => {
      setLoading(true);
      // Dispatch register user action
      dispatch(registerUser(userData))
        .unwrap()
        .then(() => {
          // Dispatch login user action
          dispatch(
            loginUser({ email: userData.email, password: userData.password })
          )
            .unwrap()
            .then(() => {
              navigate("/profile");
            });
        })
        .catch((err) => {
          alert(err);
          setLoading(false);
        });
    },
  });

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

      <div className="absolute left-5 top-7">
        <div className="text-2xl font-bold text-pink-500">dribbble</div>
        <div className="text-lg text-gray-800 mt-1">
          Discover the world's top Designers & Creatives.
        </div>
      </div>

      {/* Form Container */}
      <div className="w-full lg:w-3/5 flex flex-col justify-center items-center p-6 lg:p-12">
        <div className="mb-6 lg:mb-10 text-left">
          <p className="text-gray-700 text-sm">
            Already a member?{" "}
            <Link className="text-blue-500 hover:underline">Sign In</Link>
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
          {/* Listing Validation Errors */}
          <div className=" md:relative w-auto md:h-20 h-14 md:text-nowrap  md:text-xs md:pt-0 pt-2 text-xs text-red-500 ">
            <li
              className={`  transition duration-300 ease-in-out opacity-0  ${
                formik.errors.name && formik.touched.name ? "opacity-100" : ""
              }`}
            >
              {formik.touched.name && formik.errors.name
                ? formik.errors.name
                : null}
            </li>
            <li
              className={` text-wrap  transition duration-300 ease-in-out opacity-0  ${
                formik.errors.username && formik.touched.username
                  ? "opacity-100"
                  : ""
              }`}
            >
              {formik.touched.username && formik.errors.username
                ? formik.errors.username
                : null}
            </li>
            <li
              className={`   transition duration-300 ease-in-out opacity-0  ${
                formik.errors.email && formik.touched.email ? "opacity-100" : ""
              }`}
            >
              {formik.touched.email && formik.errors.email
                ? formik.errors.email
                : null}
            </li>
            <li
              className={`  transition duration-300 ease-in-out opacity-0   ${
                formik.errors.password && formik.touched.password
                  ? "opacity-100"
                  : ""
              }`}
            >
              {formik.touched.password && formik.errors.password
                ? formik.errors.password
                : null}
            </li>
            <li
              className={`  transition duration-300 ease-in-out opacity-0  ${
                formik.errors.terms && formik.touched.terms ? "opacity-100" : ""
              }`}
            >
              {formik.touched.terms && formik.errors.terms
                ? formik.errors.terms
                : null}
            </li>
          </div>
          <form onSubmit={formik.handleSubmit}>
            {/* Name and Username Inputs */}
            <div className="mb-4 flex flex-wrap">
              <div className="w-full lg:w-1/2 lg:pr-2 mb-4 lg:mb-0">
                <div className="flex gap-2">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <img
                    className={` ${
                      formik.touched.name && !formik.values.name === true
                        ? "h-4 self-center"
                        : "hidden"
                    }`}
                    src="https://res.cloudinary.com/df8suxer2/image/upload/v1712836234/o4pfs1kqxhyrv6qqnv64.svg"
                    alt="attention"
                  />
                </div>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Your name"
                  name="name"
                  value={formik.name}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="w-full lg:w-1/2 lg:pl-2">
                <div className="flex gap-2">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Username
                  </label>
                  <img
                    className={` ${
                      formik.touched.username &&
                      !formik.values.username === true
                        ? "h-4 self-center"
                        : "hidden"
                    }`}
                    src="https://res.cloudinary.com/df8suxer2/image/upload/v1712836234/o4pfs1kqxhyrv6qqnv64.svg"
                    alt="attention"
                  />
                </div>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  autoComplete="username"
                  name="username"
                  placeholder="Your username"
                  value={formik.username}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
            {/* Email, Password, and Checkbox Inputs */}
            <div className="mb-6">
              <div className="flex gap-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <img
                  className={` ${
                    formik.touched.email && !formik.values.email === true
                      ? "h-4 self-center"
                      : "hidden"
                  }`}
                  src="https://res.cloudinary.com/df8suxer2/image/upload/v1712836234/o4pfs1kqxhyrv6qqnv64.svg"
                  alt="attention"
                />
              </div>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                autoComplete="email"
                placeholder="Your email"
                name="email"
                value={formik.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </div>
            <div className="mb-6">
              <div className="flex gap-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <img
                  className={` ${
                    formik.touched.password && !formik.values.password === true
                      ? "h-4 self-center"
                      : "hidden"
                  }`}
                  src="https://res.cloudinary.com/df8suxer2/image/upload/v1712836234/o4pfs1kqxhyrv6qqnv64.svg"
                  alt="attention"
                />
              </div>

              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="6+ characters"
                value={formik.password}
                onBlur={formik.handleBlur}
                name="password"
                onChange={formik.handleChange}
              />
            </div>
            <div className="mb-6">
              <input
                className="mr-2 leading-tight"
                id="checkbox"
                type="checkbox"
                name="terms"
                value={formik.terms}
                onBlur={formik.handleBlur}
                onClick={formik.handleChange}
              />
              <label className="text-gray-700 text-sm" htmlFor="checkbox">
                Creating an account means you're okay with with our Terms of
                Service, Privacy Policy, and our default Notification Settings.
              </label>
            </div>
            {/* Sign Up Button */}
            <div className="flex items-center justify-center lg:justify-between gap-2">
              <button
                className={`bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full lg:w-auto`}
                type="submit"
              >
                Create Account
              </button>
              {loading ? (
                <ClipLoader color="#36d7b7" loading={loading} size={25} />
              ) : null}
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
