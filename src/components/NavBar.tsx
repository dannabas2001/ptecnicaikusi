import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { user, logout } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200/50 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo / Brand */}
          <div className="flex-shrink-0">
            <Link 
              to="/dashboard" 
              className="flex items-center space-x-2 font-semibold text-xl text-gray-900 hover:text-gray-700 transition-colors duration-200"
            >
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <span>Dashboard</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {/* User Info */}
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <span>Hola,</span>
              <span className="font-medium text-gray-900">{user?.name || user?.email}</span>
            </div>

            {/* Logout Button */}
            <button
              onClick={logout}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200 border border-gray-200 hover:border-gray-300"
            >
              Salir
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-200 ease-out ${isOpen ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
        <div className="bg-gray-50/80 backdrop-blur-sm border-t border-gray-200/50 px-6 py-4 space-y-3">
          {/* Mobile User Info */}
          <div className="text-sm text-gray-600">
            <span>Hola, </span>
            <span className="font-medium text-gray-900">{user?.name || user?.email}</span>
          </div>

          {/* Mobile Logout Button */}
          <button
            onClick={logout}
            className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-white rounded-lg transition-all duration-200 border border-gray-200 hover:border-gray-300"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;