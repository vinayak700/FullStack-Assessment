import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import {
  sendEmail,
  userSelector,
} from "../Redux/Reducers/userReducer";
import img from "../assets/dribbble.png";

const CardQuestionPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, user } = useSelector(userSelector);

  const [selectedOption, setSelectedOption] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendEmail({ email: user.email, token }))
      .unwrap()
      .then(() => {
        navigate("/home");
      });
  };

  const options = [
    {
      id: 1,
      title: "I'm a designer looking to Share my work",
      imageUrl:
        "https://res.cloudinary.com/df8suxer2/image/upload/v1713090648/n2dxwzjxnf5fq18qgaug.png",
      desc: "As a designer, you can share your work by creating an impressive online portfolio where peoples can see your talent.",
    },
    {
      id: 2,
      title: "I'm looking to hire a designer",
      imageUrl:
        "https://res.cloudinary.com/df8suxer2/image/upload/v1713090020/rvfnfrq0k3wou9c7kkej.png",
      desc: "Dribbble is the leading source for design inspiration with over 7 million shots from a vast community of designers.",
    },
    {
      id: 3,
      title: "I'm looking for design inspiration",
      imageUrl:
        "https://res.cloudinary.com/df8suxer2/image/upload/v1713090089/f9nh1cegtr8q7woauzpg.png",
      desc: "With over 7 million shots from a vast community of designers, Dribbble is the leading source for design inspiration.",
    },
  ];

  const handleSelectOption = (optionId) => {
    setSelectedOption(optionId);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="h-screen">
        <div className="flex mt-6 pl-8 h-24 text-pink-400 gap-2">
          <img className=" " src={img} alt="logo" />
          <Link to={"/profile"} className="relative top-8">
            <FontAwesomeIcon icon={faChevronLeft} size="2x" />
          </Link>
        </div>
        <div className="flex flex-col justify-center items-center mt-8 lg:mt-16">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            What brings you to dribbble?
          </h1>
          <p className="text-gray-600 mb-6 text-center px-4">
            Select the options that best describe you. Don't worry, you can
            explore other options later.
          </p>
          <div className="flex flex-col lg:flex-row justify-center items-center space-y-6 lg:space-y-0 lg:space-x-6 mt-1 lg:mt-14 w-4/5">
            {/* Map over options array */}
            {options.map((option) => (
              <div
                key={option.id}
                className={`flex flex-col items-center bg-white rounded-lg shadow p-2 w-1/3 ${
                  selectedOption === option.id && "border border-pink-600 w-1/4"
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
                {selectedOption === option.id && (
                  <p className="mb-3 text-center">{option.desc}</p>
                )}
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
