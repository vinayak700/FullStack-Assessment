import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  savePreference,
  togglePurpose,
  userSelector,
} from "../Redux/Reducers/userReducer";

const CardQuestionPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector(userSelector);

  const [selectedOption, setSelectedOption] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { choice: selectedOption, token };
    dispatch(savePreference(data))
      .unwrap()
      .then(() => {
        dispatch(togglePurpose({ token }))
          .unwrap()
          .then(() => {
            navigate("/home");
          });
      });
  };

  const options = [
    {
      id: "option1",
      title: "I'm a designer looking to Share my work",
      imageUrl:
        "https://res.cloudinary.com/vistaprint/image/upload/c_scale,w_1284,h_600,dpr_1.25/f_auto,q_auto/v1682412496/ideas-and-advice-prod/blogadmin/morning-coffee-makes-thi_2788786ad.jpg?_i=AA",
    },
    {
      id: "option2",
      title: "I'm looking to hire a designer",
      imageUrl:
        "https://res.cloudinary.com/vistaprint/image/upload/c_scale,w_1284,h_600,dpr_1.25/f_auto,q_auto/v1682412496/ideas-and-advice-prod/blogadmin/morning-coffee-makes-thi_2788786ad.jpg?_i=AA",
    },
    {
      id: "option3",
      title: "I'm looking for design inspiration",
      imageUrl:
        "https://res.cloudinary.com/vistaprint/image/upload/c_scale,w_1284,h_600,dpr_1.25/f_auto,q_auto/v1682412496/ideas-and-advice-prod/blogadmin/morning-coffee-makes-thi_2788786ad.jpg?_i=AA",
    },
  ];

  const handleSelectOption = (optionId) => {
    setSelectedOption(optionId);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="h-screen">
        <h1 className="text-2xl font-bold text-pink-600 mt-12 pl-8">
          Dribbble
        </h1>
        <div className="flex flex-col justify-center items-center mt-8 lg:mt-16">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            What brings you to dribbble?
          </h1>
          <p className="text-gray-600 mb-6 text-center px-4">
            Select the options that best describe you. Don't worry, you can
            explore other options later.
          </p>
          <div className="flex flex-col lg:flex-row justify-center items-center space-y-6 lg:space-y-0 lg:space-x-6 mb-6 mt-8 lg:mt-24">
            {/* Map over options array */}
            {options.map((option) => (
              <div
                key={option.id}
                className={`flex flex-col items-center bg-white rounded-lg shadow p-4 ${
                  selectedOption === option.id && "border border-pink-600"
                }`}
                onClick={() => handleSelectOption(option.id)}
              >
                <img
                  src={option.imageUrl}
                  alt={option.title}
                  className="w-24 h-24 object-cover rounded-full mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">
                  {option.title}
                </h3>
                <input
                  type="radio"
                  id={option.id}
                  name="options"
                  className="mr-2"
                  checked={selectedOption === option.id}
                  readOnly
                />
              </div>
            ))}
          </div>

          {/* Finish Button */}
          <button
            type="submit"
            className={`bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded mt-24 ${
              selectedOption ? "" : "cursor-not-allowed opacity-50"
            }`}
            disabled={!selectedOption}
            onClick={handleSubmit}
          >
            Finish
          </button>
        </div>
      </div>
    </form>
  );
};

export default CardQuestionPage;
