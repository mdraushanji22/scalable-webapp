import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-r from-blue-500 to-purple-600 text-white">
      <div className="text-center p-8 rounded-lg shadow-xl bg-white bg-opacity-20 backdrop-blur-lg">
        <h1 className="text-4xl md:text-6xl font-semibold mb-6 text-blue-500">
          Scalable Web App
        </h1>
        <p className="text-xl mb-8 max-w-2xl text-gray-600">
          A full-stack application with authentication, dashboard, and CRUD
          operations
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/login"
            className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition duration-300 cursor-pointer"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-6 py-3 bg-transparent border-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-200 hover:text-blue-600 transition duration-300 cursor-pointer"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
