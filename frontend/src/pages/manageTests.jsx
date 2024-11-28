import React, { useState } from "react";

const ManageTestsPage = () => {
  const [newTest, setNewTest] = useState({ testName: "", labName: "" });
  const [editData, setEditData] = useState({ id: "", testName: "", labName: "" });

  return (
    <div className="container m-2 mx-auto p-6">
      <h1 className="text-2xl font-bold text-green-700 text-center mb-6">
        Manage Tests
      </h1>
      <div className="mb-4 m-2 text-center">
        <button
          className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
        >
          Add Test
        </button>
      </div>

      {/* Add New Test Section */}
     

      {newTest.testName && (
        <div className="mb-6 p-4 bg-gray-100 rounded shadow">
          <h2 className="text-lg font-bold text-green-700 mb-4">Add New Test</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Test Name:</label>
            <input
              type="text"
              name="testName"
              value={newTest.testName}
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
              className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
              placeholder="Enter laboratory name"
              required
            />
          </div>
          <button
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
            <tr className="text-center">
              <td className="border px-4 py-2">1</td>
              <td className="border px-4 py-2">Malaria Test</td>
              <td className="border px-4 py-2">Central Lab</td>
              <td className="border px-4 py-2">
             
                <button
                  className="mr-2 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
                >
                  Edit
                </button>
                
              </td>
              <td>
              <button
                  className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
                >
                  Delete
                </button>
              </td>
            </tr>
           
          </tbody>
        </table>
      </div>

      {/* Edit Section */}
      {editData.id && (
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
              className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Laboratory Name:
            </label>
            <input
              type="text"
              name="labName"
              value={editData.labName}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            className="mt-2 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageTestsPage;
