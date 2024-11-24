import React, { useState, useEffect } from "react";
import http from "../http-common.js";

const BookedTestsPage = () => {
  const [bookedTests, setBookedTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editData, setEditData] = useState({
    test_no: "",
    results: "",
    status: "",
    id: "",
  });

  /**
   * Fetch all booked tests from the backend.
   */
  const fetchBookedTests = async () => {
    try {
      setLoading(true);
      const response = await http.get("/bktest/getBookedTests");
      const tests = response.data.booked;

      const enrichedTests = await Promise.all(
        tests.map(async (test) => {
          try {
            const userResponse = await http.get(
              `/user/getUserByEmail/${test.user_email}`
            );
            const user = userResponse.data.user;
            return {
              ...test,
              full_name: user.full_name,
              results: test.results || "Pending", // Default results to "Pending"
              status: test.status || "Pending",  // Default status to "Pending"
            };
          } catch (err) {
            console.error("Error fetching user details:", err);
            return {
              ...test,
              full_name: "Unknown",
              results: test.results || "Pending",
              status: test.status || "Pending",
            };
          }
        })
      );

      setBookedTests(enrichedTests);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching booked tests:", err);
      setError("Failed to load booked tests. Please try again later.");
      setLoading(false);
    }
  };

  /**
   * Open lab report in a new tab.
   */
  const handleShowReport = async (id) => {
    try {

            const url = `http://localhost:3002/api/labReports/getReport/${id}`;
            window.open(url, "_blank"); // Open the PDF in a new tab

        
    } catch (err) {
      console.error("Error fetching lab report:", err);
      alert("Failed to fetch lab report.");
    }
  };

  /**
   * Handle changes in the edit form fields.
   */
  const handleEditChange = (event) => {
    setEditData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  /**
   * Save updated results and status to the backend.
   */
  const handleSave = async () => {
    try {
      await http.put(`/bktest/updateBookTestById/${editData.id}`, {
        results: editData.results,
        status: editData.status,
      });

      // Refresh the list
      fetchBookedTests();
      setEditData({ test_no: "", results: "", status: "", id: "" });
      alert("Booking updated successfully!");
    } catch (err) {
      console.error("Error saving booking:", err);
      alert("Failed to save booking updates.");
    }
  };

  /**
   * Start editing a specific booking.
   */
  const handleEditClick = (booking) => {
    setEditData({
      test_no: booking.booking_no,
      results: booking.results || "Pending",
      status: booking.status || "Pending",
      id: booking._id,
    });
  };

  useEffect(() => {
    fetchBookedTests();
  }, []);

  if (loading) {
    return <div className="text-center text-green-700">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-700">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-green-700 text-center mb-6">
        Booked Tests
      </h1>

      {bookedTests.length === 0 ? (
        <p className="text-center text-gray-600">No booked tests available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookedTests.map((booking) => (
            <div
              key={booking._id}
              className="p-4 border rounded-lg shadow-lg bg-white"
            >
              <h2 className="font-bold text-green-700 text-lg mb-2">
                {booking.full_name}
              </h2>
              <p className="text-gray-700">
                <strong>Test:</strong> {booking.disease}
              </p>
              <p className="text-gray-700">
                <strong>Booking No:</strong> {booking.booking_no}
              </p>
              <p className="text-gray-700">
                <strong>Results:</strong> {booking.results}
              </p>
              <p className="text-gray-700">
                <strong>Status:</strong> {booking.status}
              </p>

              {booking.status === "Completed" && (
                <button
                  onClick={() => handleShowReport(booking?._id)}
                  className="mt-2 px-4 py-2 bg-green-700 text-white rounded"
                >
                  Show Report
                </button>
              )}

              <button
                onClick={() => handleEditClick(booking)}
                className="mt-2 px-4 py-2 bg-green-700 text-white rounded"
              >
                Edit
              </button>

              {/* Inline Edit Form */}
              {editData.id === booking._id && (
                <div className="mt-4 border p-4 bg-gray-50 rounded-lg">
                  <h2 className="text-lg font-bold text-green-700 mb-2">
                    Edit Results for Test No: {editData.test_no}
                  </h2>
                  <div className="flex flex-col gap-4">
                    <label className="text-sm font-medium">Results:</label>
                    <select
                      name="results"
                      value={editData.results}
                      onChange={handleEditChange}
                      className="p-2 border rounded-md"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Positive">Positive</option>
                      <option value="Negative">Negative</option>
                    </select>

                    <label className="text-sm font-medium">Status:</label>
                    <select
                      name="status"
                      value={editData.status}
                      onChange={handleEditChange}
                      className="p-2 border rounded-md"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                    </select>

                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-green-700 text-white rounded"
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookedTestsPage;