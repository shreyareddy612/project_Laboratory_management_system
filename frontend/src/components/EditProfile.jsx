import React from "react";

const EditProfile = ({
  profileData,
  handleFormChange,
  handleUpdate,
  handleSave,
}) => {
  return (
    <form className="flex flex-col">
      {/* Edit Personal Info */}
      <section className="flex flex-col p-2 sm:flex-row">
        <div className="w-full border rounded-md p-1 m-1 sm:w-1/2">
          <h2 className="h2 border-b-2 mb-1"> Edit Personal Data </h2>
          <div className="label-row">
            <textarea
              className="p-1"
              type="text"
              name="description"
              placeholder="Description..."
              cols={100}
              rows={5}
              onChange={handleFormChange}
              value={profileData != null ? profileData.description : ""}
            ></textarea>
          </div>
          <div className="label-row">
            <span className="flex font-bold">Sex:</span>
            <select
              name="sex"
              onChange={handleFormChange}
              value={profileData != null ? profileData.sex : ""}
            >
              <option value="" disabled>
                Choose Sex
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="label-row">
            <span className="flex font-bold">Disability:</span>
            <select
              name="disabled"
              onChange={handleFormChange}
              value={profileData != null ? profileData.disabled : ""}
            >
              <option value="" disabled>
                Choose Disability
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="label-row">
            <span className="flex font-bold">Marital Status:</span>
            <select
              name="marital_status"
              onChange={handleFormChange}
              value={profileData != null ? profileData.marital_status : ""}
            >
              <option value="" disabled>
                Marital Status
              </option>
              <option value="Married">Married</option>
              <option value="Single">Single</option>
              <option value="Separated">Separated</option>
              <option value="Divorced">Divorced</option>
            </select>
          </div>
          <div className="label-row">
            <span className="flex font-bold">Number of Children:</span>
            <input
              className="w-7 p-1"
              type="text"
              name="children"
              onChange={handleFormChange}
              value={profileData != null ? profileData.children : 0}
            />
          </div>
          <div className="label-row">
            <span className="flex font-bold">Blood Group:</span>
            <select
              name="blood_group"
              onChange={handleFormChange}
              value={profileData != null ? profileData.blood_group : ""}
            >
              <option value="" disabled>
                Blood Group
              </option>
              <option value="A">A</option>
              <option value="AB">AB</option>
              <option value="B">B</option>
              <option value="O">O</option>
              <option value="I don't Know">I don't Know</option>
            </select>
          </div>
          <div className="label-row">
            <span className="flex font-bold">Work At:</span>
            <input
              className="p-1"
              type="text"
              placeholder="e.g Google"
              name="work_at"
              onChange={handleFormChange}
              value={profileData != null ? profileData.work_at : ""}
            />
          </div>
          <div className="label-row">
            <span className="flex font-bold">Profession:</span>
            <input
              className="p-1"
              type="text"
              placeholder="e.g Software Engineer"
              name="work"
              onChange={handleFormChange}
              value={profileData != null ? profileData.work : ""}
            />
          </div>
        </div>
        {/* Next of Kin */}
        <div className="w-full border rounded-md p-1 m-1 sm:w-1/2">
          <h2 className="h2 border-b-2 mb-1"> Edit Next of Kin</h2>
          <div className="label-row">
            <span className="flex font-bold">Name:</span>
            <input
              className="p-1"
              type="text"
              placeholder="e.g Jane Doe"
              name="next_of_kin"
              onChange={handleFormChange}
              value={profileData != null ? profileData.next_of_kin : ""}
            />
          </div>
          <div className="label-row">
            <span className="flex font-bold">Relationship:</span>
            <select
              name="next_of_kin_rel"
              onChange={handleFormChange}
              value={profileData != null ? profileData.next_of_kin_rel : ""}
            >
              <option value="" disabled>
                Relationship
              </option>
              <option value="Spouse">Spouse</option>
              <option value="Sibling">Sibling</option>
              <option value="Relative">Relative</option>
              <option value="Friend">Friend</option>
            </select>
          </div>
          <div className="label-row">
            <span className="flex font-bold">Contact:</span>
            <input
              className="p-1"
              type="text"
              placeholder="e.g +254 7xxxxxxxx"
              name="next_of_kin_contact"
              onChange={handleFormChange}
              value={profileData != null ? profileData.next_of_kin_contact : ""}
            />
          </div>
        </div>
      </section>
      <div className="label-row justify-end">
        <input
          className="link-nav-btn"
          type="submit"
          value={profileData ? "Update" : "Save"} // Change button text based on profileData
          onClick={!profileData ? handleSave : handleUpdate}
        />
      </div>
    </form>
  );
};

export default EditProfile;
