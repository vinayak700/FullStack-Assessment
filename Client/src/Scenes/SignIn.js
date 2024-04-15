import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, userSelector } from "../Redux/Reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorMessages from "../ErrorMessage";
import ClipLoader from "react-spinners/ClipLoader";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error } = useSelector(userSelector) || null;
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required(`Email ${ErrorMessages.emptyRegexMessage}`)
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, ErrorMessages.emailRegexMessage),
      password: Yup.string().required(
        `Password ${ErrorMessages.emptyRegexMessage}`
      ),
    }),
    onSubmit: async (userData) => {
      setLoading(true);
      try {
        dispatch(loginUser(userData))
          .unwrap()
          .then(() => {
            navigate("/purpose");
            toast.success("User Logged In");
          });
      } catch (error) {
        alert("Please fill in all the required fields.");
      }
      setLoading(false);
    },
  });

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Image Container */}
      <div className="w-full lg:w-2/5 h-72 lg:h-screen bg-blue-500 overflow-hidden">
        <img
          src="https://cdn.dribbble.com/userupload/10641887/file/original-ad44fd3376283e39dd938a9978d5411a.jpg?resize=1200x900"
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
          <div className=" md:relative w-auto md:h-20 h-14 md:text-nowrap  md:text-xs md:pt-0 pt-2 text-xs text-red-500 ">
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
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
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
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                autoComplete="username"
                name="email"
                value={formik.email}
                placeholder="Your email"
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
                name="password"
                value={formik.password}
                placeholder="******************"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </div>
            <div className="flex items-center justify-center lg:justify-between gap-2">
              <button
                className={`bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full lg:w-auto`}
                type="submit"
              >
                Sign In
              </button>
              {loading ? (
                <ClipLoader color="#36d7b7" loading={loading} size={25} />
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
