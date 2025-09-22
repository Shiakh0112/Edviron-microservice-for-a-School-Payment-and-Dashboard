// src/pages/Home.jsx
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">School Payment App</h1>
        <div className="space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
          >
            Login
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
          >
            Signup
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-6">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to School Payment System
        </h2>
        <p className="text-lg text-gray-600 max-w-xl mb-6">
          Manage school payments easily and securely with our platform. Login or
          signup to get started.
        </p>
        <div className="space-x-4">
          <Link
            to="/login"
            className="px-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
