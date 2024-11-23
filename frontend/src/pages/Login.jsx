import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import http from "../http-common";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [err, setError] = useState(null);
  const navigate = useNavigate();

  const handleFormChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await http.post("/user/loginUser", formData);
      const user = {
        id: response.data.user._id,
        email: response.data.user.email,
        designation: response.data.user.designation,
        name: response.data.user.full_name,
        phone: response.data.user.phone,
      };

      // const userResponse = await http.get("/user/getUserById/" + user.id);

      // const isPatient = userResponse.data.user.designation;
      navigate(`/profile/${user.id}`);

      localStorage.setItem("user", JSON.stringify(user));
    } catch (err) {
      // setError(err.response.data);
      console.log(err);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center h-4/5 bg-teal-50">
      <form className="flex flex-col items-center rounded-lg shadow-md p-2 w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
        <h1 className="text-center text-green-700 text-2xl mb-4">Login</h1>
        <input
          className="border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700"
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleFormChange}
        />

        <input
          className="border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700"
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleFormChange}
        />

        <button
          className="bg-green-700 hover:bg-green-600 text-white font-bold p-2 rounded focus:outline-none focus:shadow-outline w-4/5 mb-4"
          type="button"
          onClick={handleSubmit}
        >
          Login
        </button>
        <span>
          Don't have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
