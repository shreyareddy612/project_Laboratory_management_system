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
              results: test.results || "Pending",
              status: test.status || "Pending",
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

  const handleShowReport = async (id) => {
    try {
      const url = `http://localhost:3002/api/bktest/labReports/getReport/${id}`;
      window.open(url, "_blank");
    } catch (err) {
      console.error("Error fetching lab report:", err);
      alert("Failed to fetch lab report.");
    }
  };

  const handleEditChange = (event) => {
    setEditData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      await http.put(`/bktest/updateBookTestById/${editData.id}`, {
        results: editData.results,
        status: editData.status,
      });

      fetchBookedTests();
      setEditData({ test_no: "", results: "", status: "", id: "" });
      alert("Booking updated successfully!");
    } catch (err) {
      console.error("Error saving booking:", err);
      alert("Failed to save booking updates.");
    }
  };

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
    <p className="text-center text-gray-900">No booked tests available.</p>
  ) : (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-gray-500">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Full Name</th>
            <th className="border px-4 py-2">Test</th>
            <th className="border px-4 py-2">Booking No</th>
            <th className="border px-4 py-2">Results</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookedTests
            .slice() // Create a shallow copy of the array to avoid mutating the original array
            .reverse() // Reverse the array to display the latest bookings first
            .map((booking) => (
              <tr key={booking._id} className="text-center">
                <td className="border px-4 py-2">{booking.full_name}</td>
                <td className="border px-4 py-2">{booking.disease}</td>
                <td className="border px-4 py-2">{booking.booking_no}</td>
                <td className="border px-4 py-2">{booking.results}</td>
                <td className="border px-4 py-2">{booking.status}</td>
                <td className="border px-4 py-2">
                  {booking.status === "Completed" && (
                    <div className="m-2 p-2">
                      <button
                        onClick={() => handleShowReport(booking?._id)}
                        className="mr-2 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
                      >
                        Show Report
                      </button>
                    </div>
                  )}
                  <button
                    onClick={() => handleEditClick(booking)}
                    className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
                  >
                    Edit
                  </button>
                  {editData.id === booking._id && (
                    <div className="mt-6 p-4 bg-gray-100 rounded shadow">
                      <h2 className="text-sm font-bold text-green-700 mb-4">
                        Edit Test No: {editData.test_no}
                      </h2>

                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">
                          Results:
                        </label>
                        <select
                          name="results"
                          value={editData.results}
                          onChange={handleEditChange}
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Positive">Positive</option>
                          <option value="Negative">Negative</option>
                        </select>
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">
                          Status:
                        </label>
                        <select
                          name="status"
                          value={editData.status}
                          onChange={handleEditChange}
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>

                      <button
                        onClick={handleSave}
                        className="mt-2 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
                      >
                        Save
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )}
</div>

  );
};

export default BookedTestsPage;
