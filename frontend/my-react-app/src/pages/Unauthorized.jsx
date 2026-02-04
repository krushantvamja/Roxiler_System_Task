import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        403 - Unauthorized
      </h1>

      <p className="text-gray-700 mb-6">
        You don’t have permission to access this page.
      </p>

      <Link
        to="/login"
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Go to Login
      </Link>
    </div>
  );
};

export default Unauthorized;
