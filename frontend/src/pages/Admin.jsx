import React from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <div className="flex flex-col justify-center items-center h-4/5 bg-teal-50">
      <div className="flex flex-row p-2">
        <span className="flex justify-center items-center bg-green-700 text-white border rounded-md p-2 m-2 w-28">
          <Link to="/register-staff">Register</Link>
        </span>
        <span className="flex justify-center items-center bg-green-700 text-white border rounded-md p-2 m-2 w-28">
          <Link to="/login-staff">Login</Link>
        </span>
      </div>
    </div>
  );
};

export default Admin;
