import { NavLink } from 'react-router-dom';

export default function Navbar() {
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
        </nav>
      </div>
    </header>
  );
}
