import React from "react";

const EditProfile = ({
  profileData = {},
  handleFormChange = () => {},
  handleSave = () => {},
  handleUpdate = () => {},
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (profileData?.description ) {
      handleUpdate();
    } else {
      handleSave();
    }
  };

  return (
    <form
      className="flex flex-col"
      onSubmit={handleSubmit}
    >
      <section className="flex flex-col p-2 sm:flex-row">
        <div className="w-full border rounded-md p-1 m-1 sm:w-1/2">
          <h2 className="h2 border-b-2 mb-1">Edit Personal Data</h2>

          {/* Description */}
          <div className="label-row">
            <label htmlFor="description" className="flex font-bold">
              Description:
            </label>
            <textarea
              id="description"
              className="p-1"
              name="description"
              placeholder="Description..."
              cols={100}
              rows={5}
              onChange={handleFormChange}
              value={profileData?.description || ""}
            />
          </div>

          {/* Sex */}
          <div className="label-row">
            <label htmlFor="sex" className="flex font-bold">
              Sex:
            </label>
            <select
              id="sex"
              name="sex"
              onChange={handleFormChange}
              value={profileData.sex || ""}
            >
              <option value="" disabled>
                Choose Sex
              </option>
              <option value="">Select</option>

              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Disability */}
          <div className="label-row">
            <label htmlFor="disabled" className="flex font-bold">
              Disability:
            </label>
            <select
              id="disabled"
              name="disabled"
              onChange={handleFormChange}
              value={profileData.disabled || ""}
            >
              <option value="" disabled>
                Choose Disability
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Marital Status */}
          <div className="label-row">
            <label htmlFor="marital_status" className="flex font-bold">
              Marital Status:
            </label>
            <select
              id="marital_status"
              name="marital_status"
              onChange={handleFormChange}
              value={profileData.marital_status || ""}
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

          {/* Number of Children */}
          <div className="label-row">
            <label htmlFor="children" className="flex font-bold">
              Number of Children:
            </label>
            <input
              id="children"
              className="w-7 p-1"
              type="text"
              name="children"
              onChange={handleFormChange}
              value={profileData.children || "0"}
            />
          </div>

          {/* Blood Group */}
          <div className="label-row">
            <label htmlFor="blood_group" className="flex font-bold">
              Blood Group:
            </label>
            <select
              id="blood_group"
              name="blood_group"
              onChange={handleFormChange}
              value={profileData.blood_group || ""}
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

          {/* Work At */}
          <div className="label-row">
            <label htmlFor="work_at" className="flex font-bold">
              Work At:
            </label>
            <input
              id="work_at"
              className="p-1"
              type="text"
              placeholder="e.g Google"
              name="work_at"
              onChange={handleFormChange}
              value={profileData.work_at || ""}
            />
          </div>

          {/* Profession */}
          <div className="label-row">
            <label htmlFor="work" className="flex font-bold">
              Profession:
            </label>
            <input
              id="work"
              className="p-1"
              type="text"
              placeholder="e.g Software Engineer"
              name="work"
              onChange={handleFormChange}
              value={profileData.work || ""}
            />
          </div>
        </div>
      </section>

      {/* Submit Button */}
      <div className="label-row justify-end">
        <button type="submit" className="link-nav-btn">
          {profileData?.description ? "Update" : "Save"}
        </button>
      </div>
    </form>
  );
};

export default EditProfile;