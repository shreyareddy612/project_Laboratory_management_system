import React from "react";
import person from "../images/person.png";

/**
 * @description Gets each patint from a list of patients either in waiting, pending,
 * negative or positive and prints their details on a card.
 * @param patients Array of patients
 * @returns card each with patient information or no patient if array is empty
 */
const PatientCard = ({ parients }) => {
  return (
    <div>
      <div className="flex flex-wrap justify-center">
        {parients.length > 0 ? (
          parients.map((patient) => (
            <div className="flex flex-col w-56 h-auto items-center border shadow-md m-1">
              <div className="cirular-image">
                <img src={person} alt="" srcset="" />
              </div>
              <span>John Doe</span>
              <hr />
              <span>Test: Malaria Test</span>
              <span>Test No: {patient.test_no}</span>
              <span>Results: {patient.results}</span>
              <hr />
              <div className="flex flex-row justify-between">
                <button type="button" className="link-nav-btn">
                  Update
                </button>
                <button type="button" className="link-nav-btn">
                  Print
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-red">No patients found</p>
        )}
      </div>
    </div>
  );
};

export default PatientCard;
