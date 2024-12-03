import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import http from "../http-common";

const TestBooking = () => {
  const [formData, setFormData] = useState({
    disease: "",
    user_email: "",
    date: "",
    time: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [testOptions, setTestOptions] = useState([]); // State for dynamic test options
  const navigate = useNavigate();

  // Fetch test options from the backend
  const fetchTestOptions = async () => {
    try {
      const response = await http.get("/api/test/tests"); // API endpoint to fetch available tests
      if (response.status === 200) {
        setTestOptions(response.data.tests); // Assuming the API returns a list of tests
      } else {
        setError("Failed to fetch test options. Please try again.");
      }
    } catch (error) {
      setError("Error fetching test options.");
      console.error("Error fetching test options:", error);
    }
  };

  useEffect(() => {
    fetchTestOptions(); // Call function to fetch test options on component mount
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setError(null); // Clear previous errors
      await http.post("/bktest/createBkTest", formData);
      setSuccess("Test booked successfully!");
      setTimeout(() => {
        navigate("/booked-tests");
      }, 1500); // Redirect after success message
    } catch (error) {
      setError("Failed to book the test. Please try again.");
      console.error("Error booking test:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-teal-50">
      <form
        className="flex flex-col items-center rounded-lg shadow-md p-4 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 bg-white"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center text-green-700 text-2xl mb-4">Test Booking</h1>

        {error && (
          <div className="text-red-500 text-center mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="text-green-500 text-center mb-4">
            {success}
          </div>
        )}

        <input
          type="email"
          name="user_email"
          value={formData.user_email}
          className="border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700"
          placeholder="Enter Email Address"
          onChange={handleInputChange}
          required
        />

        <div className="flex flex-row w-4/5 p-1 mb-4 items-center border-t-2">
          <label htmlFor="date" className="font-bold w-1/3 mr-1">
            Test Date
          </label>
          <input
            className="border-b-2 border-gray-400 w-2/3 p-2 focus:outline-none focus:border-green-700"
            required
            type="date"
            name="date"
            id="date"
            value={formData.date}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex flex-row w-4/5 p-1 mb-4 items-center border-t-2">
          <label htmlFor="time" className="font-bold w-1/3 mr-1">
            Test Time
          </label>
          <input
            className="border-b-2 border-gray-400 w-2/3 p-2 focus:outline-none focus:border-green-700"
            required
            type="time"
            name="time"
            id="time"
            value={formData.time}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex flex-row w-4/5 p-1 mb-4 items-center border-t-2">
          <label htmlFor="disease" className="font-bold w-1/3 mr-1">
            Test Name
          </label>
          <select
            className="border-b-2 border-gray-400 w-2/3 p-2 focus:outline-none focus:border-green-700"
            required
            name="disease"
            id="disease"
            value={formData.disease}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Select Test
            </option>
            {testOptions.length > 0 ? (
              testOptions.map((test) => (
                <option key={test._id} value={test.testName}>
                  {test.testName} {/* Using testName instead of title */}
                </option>
              ))
            ) : (
              <option value="" disabled>
                No tests available
              </option>
            )}
          </select>
        </div>

        <button
          className="bg-green-700 hover:bg-green-600 text-white font-bold p-2 rounded focus:outline-none focus:shadow-outline w-4/5 mb-4"
          type="submit"
        >
          Book
        </button>
      </form>
    </div>
  );
};

export default TestBooking;