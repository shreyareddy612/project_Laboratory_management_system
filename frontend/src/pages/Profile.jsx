import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import profile from "../images/person.png";
import account from "../images/test-account.png";
import DisplayProfile from "../components/DisplayProfile";
import EditProfile from "../components/EditProfile";

import http from "../http-common";

const Profile = ({ user = JSON.parse(localStorage.getItem("user")) }) => {
  const [profileData, setProfileData] = useState({});
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const [formData, setFormData] = useState({
    description: "",
    sex: "",
    disabled: "",
    marital_status: "",
    children: 0,
    blood_group: "",
    work_at: "",
    work: "",
    next_of_kin: "",
    next_of_kin_rel: "",
    next_of_kin_contact: "",
  });

  const navigate = useNavigate();

  const handleFormChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
      user_id: user.id,
    }));
  };

  const handleSave = async () => {
    try {
      await http.post(`/profile/createProfile/${user.id}`, formData);
      alert("Profile saved successfully!");
      navigate(`/profile/${user.id}`);
    } catch (error) {
      console.error("Save Error:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await http.put(`/profile/updateProfile/${user.id}`, formData);
      alert("Profile updated successfully!");
      navigate(`/profile/${user.id}`);
    } catch (error) {
      console.error("Update Error:", error);
    }
  };

  const toggleEditForm = () => {
    setShowEditForm((prev) => !prev);
  };

  const fetchUserProfile = async () => {
    try {
      const response = await http.get(`/profile/getProfileById/${user.id}`);
      setProfileData(response.data.userProfile || {});
      setFormData((prev) => ({
        ...prev,
        ...response.data.userProfile,
      }));
    } catch (error) {
      console.error("Fetch Profile Error:", error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []); // Fetch profile data only once on mount

  const logout = () => {
    localStorage.clear();
    alert("Logged out successfully!");
    navigate("/login");
  };

  const isStaff = (user) => user?.designation === "staff";

  return (
    <section className="flex flex-col min-h-full bg-teal-50">
      {/* Menu Toggle for Small Screens */}
      <button
        className="flex flex-col border justify-evenly items-center rounded-full p-1 h-9 w-9 absolute z-20 lg:hidden"
        onClick={() => setIsProfileVisible((prev) => !prev)}
      >
        <img src={account} alt={user.full_name} />
      </button>

      <div className="flex flex-col sm:flex-row">
        {/* PROFILE SIDE BAR */}
        <aside className="hidden sm:flex flex-col max-h-max w-full items-center border shadow-lg p-2 m-1 sm:w-1/3">
          {/* Profile Photo */}
          <div className="flex justify-center">
            <div className="cirular-image mb-2">
              <img src={profile} alt="Profile" />
            </div>
          </div>
          {/* Personal Info */}
          <div className="flex flex-col border-t-2 border-b-2">
            <div className="flex row p-2">
              <span className="font-bold pr-2">Name:</span>
              {user.name}
            </div>
            <div className="flex row p-2">
              <span className="font-bold pr-2">Email:</span>
              {user.email}
            </div>
            <div className="flex row p-2">
              <span className="font-bold pr-2">Phone:</span>
              {user.phone}
            </div>
            <div className="flex justify-center">
              <button onClick={toggleEditForm} className="link-nav-btn">
                Update
              </button>
            </div>
          </div>

          <hr className="mt-2 mb-2" />

          {/* Navigation Links */}
          <nav className="flex flex-col">
            {isStaff(user) && (
              <>
                <Link to={`/patients/${user.id}`} className="link-nav-btn-underline-full-width">
                  Patients
                </Link>
                <Link to={`/staff/${user.id}`} className="link-nav-btn-underline-full-width">
                  Staffs
                </Link>
              </>
            )}
            <Link to={`/test-booking/${user.id}`} className="link-nav-btn-underline-full-width">
              BookTest
            </Link>
            <button onClick={logout} className="link-nav-btn-underline-full-width">
              Logout
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex flex-col p-2 w-full border shadow-lg m-1 sm:w-2/3">
          <h2 className="h2 mb-1">Welcome Again, {user.name}!</h2>
          {Object.keys(profileData).length > 0 && !showEditForm ? (
            <DisplayProfile profileData={profileData} />
          ) : (
            <EditProfile
              profileData={formData}
              handleFormChange={handleFormChange}
              handleSave={handleSave}
              handleUpdate={handleUpdate}
            />
          )}
        </main>
      </div>
    </section>
  );
};

export default Profile;