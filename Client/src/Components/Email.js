import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { userSelector } from "../Redux/Reducers/userReducer";
import { useSelector } from "react-redux";

const Email = () => {
  const { user } = useSelector(userSelector);
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-lg flex flex-col">
        <div className="flex space-x-3 mb-4 text-sm font-semibold">
          <div className="flex-auto flex space-x-3 flex-col justify-center items-center">
            <h3 className="text-gray-600 text-4xl text-center my-3">
              Please Verify your email
            </h3>
            <FontAwesomeIcon
              icon={faEnvelope}
              className="text-gray-500"
              size="10x"
            />
          </div>
        </div>
        <div className="text-center">
          {" "}
          {/* Parent container for paragraphs */}
          <p className="text-gray-500 items-center">
            Please Verify your email address. We've sent a confirmation email
            to:
          </p>
          <p className="text-blue-500">{user.email}</p>
          <p className="text-gray-500 items-center my-2">
            Click the confirmation link in that email to begin using Dribbble.
          </p>
          <p className="text-gray-500 items-center">
            Didn't receive the email? Check your Spam folder, it may have been
            caught by the filter. if you don't see it, you can{" "}
            <span className="text-blue-400">
              resend the confirmation email{" "}
            </span>
            with below option.
          </p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
            Resend Email
          </button>
          <button className="px-4 py-2 text-blue-500 hover:underline">
            Change Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default Email;
