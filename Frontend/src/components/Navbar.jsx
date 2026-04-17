import { NavLink, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 w-full h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Logo or Title */}
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            AI Resume Builder
          </h1>
        </div>
        
        <nav className="flex items-center gap-6">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `text-sm font-medium transition-colors ${isActive ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/builder" 
            className={({ isActive }) => 
              `text-sm font-medium transition-colors ${isActive ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`
            }
          >
            Builder
          </NavLink>
          
          {/* Auth Links */}
          <div className="flex items-center gap-4 ml-2 pl-6 border-l border-gray-200">
            {token ? (
              <button 
                onClick={handleLogout}
                className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <>
                <NavLink 
                  to="/login"
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Log in
                </NavLink>
                <NavLink 
                  to="/signup"
                  className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Sign up
                </NavLink>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
