import React, { useState, useEffect } from "react";
import axios from "axios";

const DemoComponent = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [demoText, setDemoText] = useState("");

  // Fetch random images from Unsplash
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const urls = [];
        for (let i = 0; i < 6; i++) {
          const response = await axios.get(
            `https://source.unsplash.com/random/200x300?sig=${i}`
          );
          urls.push(response.request.responseURL);
        }
        setImageUrls(urls);
      } catch (error) {
        console.error("Error fetching images: ", error);
      }
    };
    fetchImages();
  }, []);

  // Generate demo text using OpenAI Chat API
  // useEffect(() => {
  //   axios
  //     .post(
  //       "https://api.openai.com/v1/engines/text-davinci-003/completions",
  //       {
  //         prompt: "Generate demo text for a website.",
  //         max_tokens: 100,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization:
  //             "Bearer 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",
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       setDemoText(response.data.choices[0].text);
  //     })
  //     .catch((error) => {
  //       console.error("Error generating demo text: ", error);
  //     });
  // }, []);

  return (
    <div className="flex flex-col justify-top items-center mt-16">
      <div className="max-w-7xl w-full p-8 text-left">
        <h1 className="text-5xl font-bold text-stone-700 mb-4">
          Hello <span className="text-stone-600">World!</span>
        </h1>
        <p className="text-base text-gray-700 mb-8">
          {/* {demoText || "Loading demo text..."} */}
          <br />
          Cheers,
          <br />
          Start your project 🚀
        </p>
        <div className="flex flex-wrap gap-8">
          {imageUrls.length !== 0 ? (
            imageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Demo ${index}`}
                className="mb-4 w-2/5 sm:w-1/4 md:w-1/3 lg:w-1/4 xl:w-1/5"
              />
            ))
          ) : (
            <p className="text-gray-400">Loading demo images...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DemoComponent;
