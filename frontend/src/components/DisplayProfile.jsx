import React from "react";

const DisplayProfile = ({ profileData }) => {
  return (
    <div className="border rounded-lg p-2">
      <div className="flex flex-col p-1 m-1">
        <span className="flex border-b-2 font-bold">Description:</span>
        {profileData.description}
      </div>
      <section className="flex flex-col p-2 sm:flex-row">
        {/* Personal Details */}
        <div className="w-full border rounded-md p-1 m-1 sm:w-1/2">
          <h2 className="h2 border-b-2 mb-1"> Personal Information</h2>
          <div className="label-row">
            <span className="flex font-bold">Sex:</span>
            {profileData.sex}
          </div>
          <div className="label-row">
            <span className="flex font-bold">Marital Status:</span>
            {profileData.marital_status}
          </div>
          <div className="label-row">
            <span className="flex font-bold">Number of Children:</span>
            {profileData.children}
          </div>
          <div className="label-row">
            <span className="flex font-bold">Blood Group:</span>
            {profileData.blood_group}
          </div>
          <div className="label-row">
            <span className="flex font-bold">Work At:</span>
            {profileData.work_at}
          </div>
          <div className="label-row">
            <span className="flex font-bold">Profession:</span>
            {profileData.work}
          </div>
        </div>
        {/* Next of Kin */}
        <div className="w-full border rounded-md p-1 m-1 sm:w-1/2">
          <h2 className="h2 border-b-2 mb-1"> Next of Kin</h2>
          <div className="label-row">
            <span className="flex font-bold">Name:</span>
            {profileData.next_of_kin}
          </div>
          <div className="label-row">
            <span className="flex font-bold">Relationship:</span>
            {profileData.next_of_kin_rel}
          </div>
          <div className="label-row">
            <span className="flex font-bold">Contact:</span>
            {profileData.next_of_kin_contact}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DisplayProfile;
