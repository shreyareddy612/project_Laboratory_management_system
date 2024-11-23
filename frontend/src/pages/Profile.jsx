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

  const [description, setDescription] = useState("");

  useEffect(() => {
    setDescription(formData.description);
  }, [description]);

  const navigate = useNavigate();

  const handleFormChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
      user_id: user.id,
    }));
  };

  const handleSave = async (event) => {
    try {
      const profile = await http.post(
        `/profile/createProfile/${user.id}`,
        formData
      );
      console.log("Saved");
      navigate("/profile/" + user.id);
    } catch (error) {
      console.log(error);
    }
  };

  const clickUpdateButton = (event) => {
    if (showEditForm === false) {
      setShowEditForm(true);
    } else {
      setShowEditForm(false);
    }
  };

  const handleUpdate = async (event) => {
    try {
      const profile = await http.put(
        `/profile/updateProfile/${user.id}`,
        formData
      );
      navigate("/profile/" + user.id);
    } catch (error) {
      console.log(error);
    }
  };

  const showProfile = () => {
    setIsProfileVisible(!isProfileVisible);
  };

  /**
   * @description Checks if user is staff
   * @param {*} user Object
   * @returns true if user else false
   */
  const isStaff = (user) => {
    if (user.designation === "staff") {
      return true;
    }

    return false;
  };

  /**
   * @description Check if logged in
   * @param {*} user user object
   * @returns true if exists or false if not exist
   */
  const isLoggedIn = (user) => {
    if (user) {
      return true;
    }
    return false;
  };

  /**
   * @description Gets profile object
   */
  const getUserProfile = async () => {
    try {
      const profile = await http.get(`/profile/getProfileById/${user.id}`);
      setProfileData(profile.data.userProfile);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getUserProfile();
  }, [profileData]);

  console.log(showEditForm);

  const logout = () => {
    localStorage.clear();
  };

  const checkStaff = isStaff(user);
  const loggedIn = isLoggedIn(user);

  return (
    <section className="flex flex-col min-h-full bg-teal-50">
      {/* Menu */}
      <Link
        className="flex flex-col border justify-evenly items-center rounded-full p-1 h-9 w-9 absolute z-20 lg:hidden"
        onClick={showProfile}
      >
        <img src={account} alt={user.full_name} />
        {/* <span className="bg-green-700 h-1 w-7 rounded">-</span>
                <span className="bg-green-700 h-1 w-7 rounded">-</span>
                <span className="bg-green-700 h-1 w-7 rounded">-</span> */}
      </Link>
      <div className="flex flex-col sm:flex-row">
        {/* PROFILE SIDE BAR */}
        <div className="flex-col max-h-max w-full items-center border shadow-lg p-2 m-1 sm:w-1/3 hidden sm:flex md">
          {/* Profile Photo */}
          <div className="flex justify-center">
            <div className="cirular-image mb-2">
              <img src={profile} alt="Profile" />
            </div>
          </div>
          {/* PersonalInfo */}
          <div className="flex flex-col border-t-2 border-b-2">
            <div className="flex row p-2">
              <span className="flex font-bold pr-2">Name:</span>
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
              <Link className="link-nav-btn" onClick={clickUpdateButton}>
                Update
              </Link>
            </div>
          </div>

          <hr className="mt-2 mb-2" />

          {/* Navigate to other pages */}
          <div className="flex flex-col">
            {checkStaff ? (
              <div>
                <Link
                  to={`/patients/${user.id}`}
                  className="link-nav-btn-underline-full-width"
                >
                  Patients
                </Link>
                <Link
                  to={`/staff/${user.id}`}
                  className="link-nav-btn-underline-full-width"
                >
                  Staffs
                </Link>
                <Link
                  to={`/test-booking/${user.id}`}
                  className="link-nav-btn-underline-full-width"
                >
                  BookTest
                </Link>
              </div>
            ) : (
              <Link
                to={`/test-booking/${user.id}`}
                className="link-nav-btn-underline-full-width"
              >
                BookTest
              </Link>
            )}

            {loggedIn ? (
              <Link
                to="/login"
                onClick={logout}
                className="link-nav-btn-underline-full-width"
              >
                Logout
              </Link>
            ) : (
              <Link to="/login" className="link-nav-btn-underline-full-width">
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Other Details */}
        <div className="flex flex-col p-2 w-full border shadow-lg m-1 sm:w-2/3">
          {/* Welcome */}
          <h2 className="h2 mb-1">Welcome Again {user.name}!</h2>

          {profileData != null && showEditForm === false ? (
            <DisplayProfile profileData={profileData} />
          ) : (
            <EditProfile
              profileData={profileData}
              handleFormChange={handleFormChange}
              handleUpdate={handleUpdate}
              handleSave={handleSave}
            />
          )}
        </div>

        {/* Profile Small Screens */}
        <div
          className={`flex-col max-h-max bg-white w-full items-center border shadow-lg p-2 m-1 sm:w-1/3 ${
            isProfileVisible ? "block" : "hidden lg:hidden"
          } absolute z-10`}
        >
          {/* Profile Photo */}
          <div className="flex justify-center">
            <div className="cirular-image mb-2">
              <img src={profile} alt="Profile" />
            </div>
          </div>
          {/* PersonalInfo */}
          <div className="flex flex-col border-t-2 border-b-2">
            <div className="flex row p-2">
              <span className="flex font-bold pr-2">Name:</span>
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
              <Link className="link-nav-btn">Update</Link>
            </div>
          </div>

          <hr className="mt-2 mb-2" />

          {/* Navigate to other pages */}
          <div className="flex flex-col">
            {checkStaff ? (
              <div>
                <Link
                  to={`/patients/${user.id}`}
                  className="link-nav-btn-underline-full-width"
                >
                  Patients
                </Link>
                <Link
                  to={`/staff/${user.id}`}
                  className="link-nav-btn-underline-full-width"
                >
                  Staffs
                </Link>
                <Link
                  to={`/test-booking/${user.id}`}
                  className="link-nav-btn-underline-full-width"
                >
                  BookTest
                </Link>
              </div>
            ) : (
              <Link
                to={`/test-booking/${user.id}`}
                className="link-nav-btn-underline-full-width"
              >
                BookTest
              </Link>
            )}

            {loggedIn ? (
              <Link
                to="/login"
                onClick={logout}
                className="link-nav-btn-underline-full-width"
              >
                Logout
              </Link>
            ) : (
              <Link to="/login" className="link-nav-btn-underline-full-width">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
