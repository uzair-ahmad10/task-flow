import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center p-6 text-center">
      {/* Simple App Logo */}
      <div className="w-12 h-12 bg-[#1A1A1A] rounded-xl flex items-center justify-center mb-6">
        <div className="grid grid-cols-2 gap-1">
          <div className="w-2.5 h-2.5 bg-[#FFB067] rounded-full"></div>
          <div className="w-2.5 h-2.5 bg-[#FF7A59] rounded-full"></div>
          <div className="w-2.5 h-2.5 bg-[#A87FFB] rounded-full"></div>
          <div className="w-2.5 h-2.5 bg-[#D2E85A] rounded-full"></div>
        </div>
      </div>

      <h1 className="text-2xl font-bold text-[#1A1A1A] mb-2">Page not found</h1>
      <p className="text-gray-500 mb-8">Taking you back to the dashboard...</p>

      {/* The actual redirect logic */}
      <Link
        to="/"
        className="px-6 py-2 bg-[#1A1A1A] text-white rounded-lg hover:bg-black transition"
      >Back to Dashboard </Link>
    </div>
  );
};

export default NotFound;
