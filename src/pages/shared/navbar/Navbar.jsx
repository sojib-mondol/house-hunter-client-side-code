import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  //const history = useHistory();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage?.getItem("user"));
  //console.log("user", user);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Clear the stored token or authentication-related data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Redirect the user to the login page after logout
    //history.push("/login")
    toast.success("You have successfully logged out!");
    navigate("/");
  };

  return (
    <div>
      <nav className="flex justify-between  items-center py-4 px-10 bg-white/80 backdrop-blur-md shadow-md w-full sticky top-0 left-0 right-0 z-10">
        <div className="flex items-center">
          <div className="cursor-pointer">
            <h3 className="text-2xl font-medium text-blue-500 mr-[44px]">
              {/* <img src="sd" alt="this is logo img" /> */}
              <Link to="/">House Hunter</Link>
            </h3>
          </div>
        </div>

        <div className="lg:flex items-center hidden gap-x-[44px] ">
          <Link
            to="/"
            className="flex text-gray-600 hover:text-blue-500 cursor-pointer transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className="flex text-gray-600 hover:text-blue-500 cursor-pointer transition-colors duration-300"
          >
            Dashboard
          </Link>

          {user?.name ? (
            <>
              <button
                className="btn btn-outline btn-warning"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline btn-success">
                Login
              </Link>
            </>
          )}
        </div>

        <div className="lg:hidden">
          <button
            type="button"
            className="text-gray-600 hover:text-blue-500 focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="h-6 w-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 5H20V7H4V5ZM4 11H20V13H4V11ZM4 17H20V19H4V17Z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 7H20V5H4V7ZM4 11H20V9H4V11ZM4 15H20V13H4V15ZM4 19H20V17H4V19Z"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="lg:hidden">
          <div className="flex flex-col items-start py-2 px-10 space-y-2">
            <Link
              to="/"
              className="flex text-gray-600 hover:text-blue-500 cursor-pointer transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className="flex text-gray-600 hover:text-blue-500 cursor-pointer transition-colors duration-300"
            >
              Dashboard
            </Link>
            {user?.name ? (
              <>
                <button
                  className="btn btn-outline btn-warning"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline btn-success">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
