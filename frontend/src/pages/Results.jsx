import React, { useState, useEffect } from "react";
import http from "../http-common.js";

const Results = () => {
  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData);
  const [booked, setBooked] = useState([]);
  const [formData, setFormData] = useState({
    results: "",
    test_no: "",
    staff: user.id,
  });

  const handleOnChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  /**
   * Wait button
   * @description Removes data from the array and adds it as the last index
   */
  const handleWaitButtonClick = () => {
    setBooked((prevBooked) => {
      const waitingPatient = prevBooked.shift();
      return [...prevBooked, waitingPatient];
    });
  };

  /**
   * @description Update test booked after
   */
  const handleUpdateTested = async (id) => {
    try {
      const testedPatient = await http.post(
        `/api/bktest/updateBookTestById/${id}`
      );
      console.log("Updated");
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Test Button
   * @description changes the tested status to true and updates booking collection. Also it updates the test_no, results and staff with new value.
   * @param bookingId an id of the current booking on the waiting list and updates test_no with new value, sets results to pending
   *
   */
  const handleTestButtonClick = (bookingId) => {
    const selectedBooking = booked.find((booking) => booking._id === bookingId);

    setFormData((prev) => ({
      ...prev,
      test_no: selectedBooking.booking_no,
      results: "Pending...",
      staff: user.id,
    }));

    handleUpdateTested(bookingId);
  };

  /**
   * @description fetchs all booked tests from the database
   * @returns array of all booked tests
   */
  const bookedTests = async () => {
    try {
      const results = await http.get("/bktest/getBookedTests");
      const bookedData = results.data.booked;

      const addFullName = await Promise.all(
        bookedData.map(async (booking) => {
          const userResponse = await http.get(
            `/user/getUserByEmail/${booking.user_email}`
          );
          const user = userResponse.data.user;
          return {
            ...booking,
            full_name: user.full_name,
          };
        })
      );
      setBooked(addFullName);
    } catch (error) {
      return { error: error };
    }
  };

  useEffect(() => {
    bookedTests();
  }, []);

  const handleSave = async (event) => {
    event.preventDefault();

    try {
      const response = await http.post(`/results/createResults/`, formData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center h-4/5 bg-teal-50 p-auto">
      <div className="flex flex-col m-3 md:flex-row">
        <div className="w-full border h-96 overflow-y-auto mr-3 md:w-1/2">
          <h1 className="text-center text-green-700 text-2xl">Waiting</h1>

          {/* LIST/ARRAY OF PENDING TESTS */}
          {booked.map((booking) => (
            <div className="flex flex-col justify-center border items-center p-2 mt-3">
              {/* START SINGLE TEST CARD */}
              <div className="p-2 border m-2">
                <h2>
                  Name:{" "}
                  <span className="text-green-700">{booking.full_name}</span>
                </h2>

                <h2>
                  Test:{" "}
                  <span className="text-green-700">{booking.disease}</span>
                </h2>

                <h2>
                  Booking No:{" "}
                  <span className="text-green-700">{booking.booking_no}</span>
                </h2>
              </div>
              <div className="flex flex-row w-full border justify-center text-white p-1">
                <button
                  type="button"
                  className="bg-green-700 w-1/2 mr-1"
                  onClick={() => handleTestButtonClick(booking._id)}
                >
                  Test
                </button>
                <button
                  type="button"
                  className="bg-green-700 w-1/2"
                  onClick={handleWaitButtonClick}
                >
                  Wait
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full border ml-3 md:w-1/2">
          <h1 className="text-center text-green-700 text-2xl mb-4">
            Edit Results
          </h1>
          <form className="flex flex-col p-2" action="">
            <input
              className="m-2 p-2 w-4/5 border-b-2"
              type="text"
              placeholder="Test No"
              name="test_no"
              value={formData.test_no}
              onChange={handleOnChange}
            />

            <select
              class="block appearance-none w-4/5 bg-white border border-gray-200 text-gray-700 m-2 p-2 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              required
              name="resuts"
              value={formData.results}
              onChange={handleOnChange}
            >
              <option value="" disabled selected>
                Select Results
              </option>
              <option value="pending">Pending...</option>
              <option value="positive">Positive</option>
              <option value="negative">Negative</option>
            </select>

            <div className="flex justify-end w-4/5">
              <input
                className="bg-green-700 text-white p-2 w-1/2 rounded-md"
                type="button"
                value="Save"
                onClick={handleSave}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Results;
