import React from "react";

const AboutUs = () => {
  return (
    <div className="flex flex-col items-center h-4/5 bg-teal-50 p-auto">
      <h1 className="font-bold text-green-700 font- sm:text-4xl md:text-4xl lg:text-5xl">
        About Us
      </h1>

      <hr></hr>

      <div className="flex flex-col md:flex-row justify-center p-4">
        <div className="flex flex-col items-center w-full md:w-1/2">
          <article className="w-2/3">
            <h2 className="font-bold text-md text-2xl">Who are we?</h2>
            <hr></hr>
            <p className="italic">
              We are a small company in health sector that sepends mostly on
              customers’ contributions to run.
            </p>

            <hr></hr>

            <h2 className="font-bold text-md text-2xl">What do we do?</h2>
            <hr></hr>
            <p className="italic">
              We conduct test, scanning, & screening to diagnose diagnose
              various disease. Some of diseases we screen are cancer. We do
              x-rays.
            </p>
          </article>
        </div>
        <div className="flex flex-col items-center w-full md:w-1/2">
          <article className="w-2/3">
            <h2 className="font-bold text-md text-2xl">Why we are the best?</h2>
            <hr></hr>
            <p className="italic">
              We have modern equipments such as MRI machines, PCR machines, CT-
              Scanner, Cell Counter, Clinical Laboratory Incubator,
              Chromatography, Microscopes, Cryostat, and many more. <br></br>
              We have enough wards and some of them are reserved preserved for
              quarantine incase a there is suspicion of contagious diseases.{" "}
              <br></br>
              We have skilled lab technicians.
            </p>
          </article>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
