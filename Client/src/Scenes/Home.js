// import { useState } from "react";
import { Footer } from "../Components";
// import { useSelector, useDispatch } from "react-redux";
// import { userSelector } from "../Redux/Reducers/userReducer";
// import { toast } from "react-toastify";
// import { unwrapResult } from "@reduxjs/toolkit";
import Email from "../Components/Email";

const Home = () => {
  // const { projects, token } = useSelector(userSelector);
  // const dispatch = useDispatch();

  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   const fetchAllUploads = () => {
  //     try {
  //       dispatch(getAllUploads({ token }));
  //       // const allProjects = await dispatch(getAllUploads({ token }));
  //       // .then(() => unwrapResult())
  //       // .then(() => {
  //       //   setData(projects);
  //       console.log(projects);
  //       // });
  //     } catch (error) {
  //       toast.error("Could Not load all User Projects");
  //     }
  //   };
  //   fetchAllUploads();
  // }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col h-screen">
        {/* <div className="flex flex-wrap gap-8">
          {projects?.length > 0 ? (
            projects?.map((work, index) => (
              <img
                key={work._id}
                src={work.pictureUrl}
                alt={`Work ${index}`}
                className="mb-4 w-2/5 sm:w-1/4 md:w-1/3 lg:w-1/4 xl:w-1/5"
              />
            ))
          ) : (
            <p className="text-gray-400">No projects to display.</p>
          )}
        </div> */}
        <Email />
        <hr />
        <Footer className="mt-auto" />
      </div>
    </>
  );
};

export default Home;
