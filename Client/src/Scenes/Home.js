import { Footer } from "../Components";
import Email from "../Components/Email";

const Home = () => {

  return (
    <>
      <div className="min-h-screen flex flex-col h-screen">
        <hr/>
        <Email />
        <hr />
        <Footer className="mt-auto" />
      </div>
    </>
  );
};

export default Home;
