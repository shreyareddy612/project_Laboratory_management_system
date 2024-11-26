import React from "react";
import images from "../images/images.jpg";

const Home = () => {
  return (
    <div
      className="flex flex-col justify-center items-center h-screen bg-teal-50 bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${images})`,
        backgroundRepeat: "no-repeat",  // Ensures the image does not repeat
        backgroundSize: "cover",        // Ensures the image covers the whole screen
      }}
    >
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <h1 className="font-bold sm:text-4xl md:text-4xl lg:text-5xl relative z-10">
        Welcome to LabMS Laboratory
      </h1>
      <p className="text-base sm:text-sm md:text-l lg:text-xl relative z-10">
        Here, we test and diagnose all kinds of diseases
      </p>
    </div>
  );
};

export default Home;
