import React, { useState, useEffect } from "react";

const ManageTestsPage = () => {
  const [newTest, setNewTest] = useState({ testName: "", labName: "" });
  const [editData, setEditData] = useState({ id: "", testName: "", labName: "" });
  const [tests, setTests] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch tests from the backend
  const fetchTests = async () => {
    try {
      const response = await fetch("http://localhost:3002/api/test/tests");
      if (response.ok) {
        const data = await response.json();
        setTests(data.tests); // Set the tests state with the response data
      } else {
        console.error("Failed to fetch tests");
      }
    } catch (error) {
      console.error("Error fetching tests:", error);
    }
  };

  // Fetch tests when the component mounts
  useEffect(() => {
    fetchTests();
  }, []);

  // Handle adding a new test
  const handleSaveNewTest = async () => {
    if (!newTest.testName || !newTest.labName) {
      alert("Please fill out both fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3002/api/test/tests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTest),
      });

      if (response.ok) {
        setNewTest({ testName: "", labName: "" }); // Clear the form
        fetchTests(); // Refresh the list of tests
      } else {
        console.error("Failed to create test");
      }
    } catch (error) {
      console.error("Error saving new test:", error);
    }
  };

  // Handle editing an existing test
  const handleSaveEdit = async () => {
    if (!editData.testName || !editData.labName) {
      alert("Please fill out both fields.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3002/api/test/tests/${editData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editData),
      });

      if (response.ok) {
        setIsEditing(false); // Reset editing mode
        setEditData({ id: "", testName: "", labName: "" }); // Clear the form
        fetchTests(); // Refresh the list of tests
      } else {
        console.error("Failed to update test");
      }
    } catch (error) {
      console.error("Error updating test:", error);
    }
  };

  // Handle click on Edit button
  const handleEdit = (test) => {
    setIsEditing(true);
    setEditData({ id: test._id, testName: test.testName, labName: test.labName });
  };

  // Handle click on Delete button
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3002/api/test/tests/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchTests(); // Refresh the list of tests
      } else {
        console.error("Failed to delete test");
      }
    } catch (error) {
      console.error("Error deleting test:", error);
    }
  };

  return (
    <div className="container m-2 mx-auto p-6">
      <h1 className="text-2xl font-bold text-green-700 text-center mb-6">
        Manage Tests
      </h1>
      <div className="mb-4 m-2 text-center">
        <button
          onClick={() => setIsEditing(false)} // Reset to add mode
          className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
        >
          Add Test
        </button>
      </div>

      {/* Add New Test Section */}
      {!isEditing && (
        <div className="mb-6 p-4 bg-gray-100 rounded shadow">
          <h2 className="text-lg font-bold text-green-700 mb-4">Add New Test</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Test Name:</label>
            <input
              type="text"
              name="testName"
              value={newTest.testName}
              onChange={(e) => setNewTest({ ...newTest, testName: e.target.value })}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
              placeholder="Enter test name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Laboratory Name:</label>
            <input
              type="text"
              name="labName"
              value={newTest.labName}
              onChange={(e) => setNewTest({ ...newTest, labName: e.target.value })}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
              placeholder="Enter laboratory name"
              required
            />
          </div>
          <button
            onClick={handleSaveNewTest}
            className="mt-2 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
          >
            Save
          </button>
        </div>
      )}

      {/* Edit Test Section */}
      {isEditing && (
        <div className="mt-6 p-4 bg-gray-100 rounded shadow">
          <h2 className="text-sm font-bold text-green-700 mb-4">
            Edit Test ID: {editData.id}
          </h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Test Name:</label>
            <input
              type="text"
              name="testName"
              value={editData.testName}
              onChange={(e) => setEditData({ ...editData, testName: e.target.value })}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Laboratory Name:</label>
            <input
              type="text"
              name="labName"
              value={editData.labName}
              onChange={(e) => setEditData({ ...editData, labName: e.target.value })}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            onClick={handleSaveEdit}
            className="mt-2 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
          >
            Save
          </button>
        </div>
      )}

      {/* Tests Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-500">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Test Name</th>
              <th className="border px-4 py-2">Laboratory Name</th>
              <th className="border px-4 py-2">Edit</th>
              <th className="border px-4 py-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {tests.map((test) => (
              <tr key={test._id} className="text-center">
                <td className="border px-4 py-2">{test._id}</td>
                <td className="border px-4 py-2">{test.testName}</td>
                <td className="border px-4 py-2">{test.labName}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEdit(test)}
                    className="mr-2 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(test._id)}
                    className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTestsPage;