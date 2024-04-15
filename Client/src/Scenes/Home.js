import { Footer } from "../Components";
import Email from "../Components/Email";

const Home = () => {

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
