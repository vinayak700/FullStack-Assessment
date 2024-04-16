import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  sendImageAPI,
  updateProfile,
  userSelector,
} from "../Redux/Reducers/userReducer.js";
import img from "../assets/dribbble.png";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProfilePage = () => {
  const { user, token } = useSelector(userSelector) || null;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    avatar: null,
    previewUrl: "",
    location: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateProfile({ data: profileData.location, userId: user?._id, token })
    )
      .unwrap()
      .then(() => {
        navigate("/preference");
      });
  };

  // Handle Image Change
  const handleImageUpload = async (e) => {
    setProfileData((prevProfileData) => ({
      ...prevProfileData,
      avatar: e.target.files[0],
    }));
    const formData = new FormData();
    formData.append("avatar", e.target.files[0] || "");
    dispatch(sendImageAPI({ formData, token }))
      .unwrap()
      .then(() => {
        setProfileData(user);
      });
  };

  useEffect(() => {
    setProfileData(user);
  }, [dispatch, user]);

  return (
    <>
      {/* Heading for the application */}
      <div className="h-screen">
        <img className=" mt-6 pl-8 h-24" src={img} alt="logo" />
        <form className="container mx-auto mt-2 flex flex-col m-auto w-full md:w-2/3 lg:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome! Let's create your profile
          </h2>
          <p className="text-md text-gray-400 mb-8">
            Let others get to know you better! You can do this later
          </p>

          <h3 className="mb-2 text-2xl font-bold text-gray-700">
            Add an Avatar
          </h3>
          {/* Add an Avatar */}
          <div className="flex items-center mb-8" style={{ gap: "3rem" }}>
            <div
              className="relative rounded-full overflow-hidden h-48 w-48 mb-4 border-solid border-gray-400"
              style={{
                height: "12rem",
                width: "12rem",
                border: "2px solid gray",
                borderStyle: "dotted",
              }}
            >
              {user?.previewUrl !== "" ? (
                <img
                  src={user?.previewUrl}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover rounded-full text-black"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faCamera}
                  className="text-pink-400 relative top-20 left-12 lg:left-20 md:left-16"
                  size="2x"
                />
              )}
            </div>
            <div>
              <label
                htmlFor="pictureFile"
                className="cursor-pointer hover:bg-pink-500 hover:text-white text-slate-800 font-bold py-2 px-4 rounded inline-block text-center"
              >
                Choose Image
              </label>
              <input
                id="pictureFile"
                type="file"
                accept="image/*"
                name="picture"
                className="hidden"
                onChange={handleImageUpload}
              />
              <p className="text-gray-400">Or Chose one of our defaults</p>
            </div>
          </div>

          {/* Add Your Location */}
          <h3 className="mb-2 text-2xl font-bold text-gray-700">
            Add Your Location
          </h3>
          <input
            type="text"
            placeholder="Enter your location"
            className="rounded-lg p-2 border border-gray-300 focus:outline-none mb-4 w-full"
            value={profileData?.location}
            onChange={(e) =>
              setProfileData({ ...profileData, location: e.target.value })
            }
          />
          <button
            className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded w-full"
            type="submit"
            onClick={handleSubmit}
          >
            Next
          </button>
        </form>
        <p className="text-gray-400 text-center">or Press Return</p>
      </div>
    </>
  );
};

export default ProfilePage;
