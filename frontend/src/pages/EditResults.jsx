import React from "react";

const EditResults = () => {
  return (
    <div className="flex flex-col items-center justify-center h-4/5 bg-teal-50 p-auto">
      <div className="flex flex-col item-center m-3 md:flex-row">
        <div className="w-full border ml-3">
          <h1 className="text-center text-green-700 text-2xl mb-4">
            Edit Results
          </h1>
          <form className="flex flex-col p-2" action="">
            <input
              className="m-2 p-2 w-4/5 border-b-2"
              type="text"
              placeholder="Test No"
              name="test_no"
            />

            <select
              class="block appearance-none w-4/5 bg-white border border-gray-200 text-gray-700 m-2 p-2 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              required
              name="resuts"
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
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditResults;
