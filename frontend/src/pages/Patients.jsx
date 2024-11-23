import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import http from "../http-common";
import PatientCard from "../components/PatientCard";

const Patients = () => {
  const [allPatients, setAllPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState("Waiting");
  const [searchField, setSearchField] = useState(""); // Tracks dropdown selection
  const [searchValue, setSearchValue] = useState(""); // Tracks input value
  const [error, setError] = useState(null); // Tracks API errors

  /**
   * @description Sets filter array to provided filter i.e Waiting, Pending, Negative or Positive
   * @param {*} filter filter parameter
   */
  const handleFilterChange = (filter) => {
    setFilteredPatients(filter);
  };

  /**
   * @description Filters patients as per the given filter in handleFilterChange
   * @param {*} patients Array of filtered patients
   * @returns filtered patients
   */
  const filterPatients = (patients) => {
    if (filteredPatients === "Waiting") {
      return patients;
    } else if (filteredPatients === "Pending") {
      return patients?.filter((patient) => patient.results === "Pending...");
    } else if (filteredPatients === "Negative") {
      return patients?.filter((patient) => patient.results === "Negative");
    } else if (filteredPatients === "Positive") {
      return patients?.filter((patient) => patient.results === "Positive");
    }
    return patients; // Default return
  };

  /**
   * @description Gets data for all patients
   * @returns an array of all patients
   */
  const getAllPatients = async () => {
    try {
      const results = await http.get("/results/allPatients");
      setAllPatients(results?.data?.patients || []);
    } catch (err) {
      setError(err.message || "Failed to fetch patients.");
    }
  };

  useEffect(() => {
    getAllPatients();
  }, []);

  // Filter patients by criteria
  const filtered = filterPatients(allPatients);

  // Search patients based on searchField and searchValue
  const searchPatient = filtered?.filter((patient) => {
    if (!searchField || searchValue === "") {
      return true; // No filtering if either field or value is empty
    }

    const lowerCaseSearch = searchValue.toLowerCase();

    if (searchField === "results" && patient.results.toLowerCase().includes(lowerCaseSearch)) {
      return true;
    }

    if (searchField === "test_no" && patient.test_no === parseInt(searchValue)) {
      return true;
    }

    if (searchField === "full_name" && patient.full_name.toLowerCase().includes(lowerCaseSearch)) {
      return true;
    }

    if (searchField === "disease" && patient.disease.toLowerCase().includes(lowerCaseSearch)) {
      return true;
    }

    return false;
  });

  // Handle error or loading states
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!allPatients.length) {
    return <div>No patients data...</div>;
  }

  return (
    <div className="flex flex-col items-center bg-teal-50 mt-4">
      <div className="flex flex-col items-center rounded-lg p-2 w-full">
        <h2 className="h2">Welcome to Patients Page</h2>
        <hr />
        <div className="flex flex-row">
          <Link
            className="link-nav-btn"
            to=""
            onClick={() => handleFilterChange("Waiting")}
          >
            Waiting
          </Link>
          <Link
            className="link-nav-btn"
            to=""
            onClick={() => handleFilterChange("Pending")}
          >
            Pending
          </Link>
          <Link
            className="link-nav-btn"
            to=""
            onClick={() => handleFilterChange("Positive")}
          >
            Positive
          </Link>
          <Link
            className="link-nav-btn"
            to=""
            onClick={() => handleFilterChange("Negative")}
          >
            Negative
          </Link>
        </div>
        <hr />
        {/* List of tested patients */}
        <div className="flex flex-col items-center w-full m-1 p-1 rounded-md border">
          {/* Search Box */}
          <div>
            <form action="" className="flex flex-row p-1">
              <select
                className="block appearance-none w-2/3 h-10 bg-white border border-gray-200 text-gray-700 m-2 p-2 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                required
                onChange={(e) => setSearchField(e.target.value)}
              >
                <option value="" disabled selected>
                  Select Filter
                </option>
                <option value="full_name">Full Name</option>
                <option value="test_no">Test No</option>
                <option value="results">Results</option>
                <option value="disease">Disease</option>
              </select>

              <input
                type="text"
                className="block appearance-none w-full h-10 bg-white border border-gray-200 text-gray-700 m-2 p-2 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Enter search value..."
              />
            </form>
          </div>

          {/* List of all or filtered tested patients */}
          {searchPatient.length ? (
            <PatientCard patients={searchPatient} />
          ) : (
            <div>No patients match the criteria.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Patients;