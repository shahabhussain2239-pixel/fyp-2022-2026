import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, User as UserIcon, Settings, PenTool, LayoutDashboard, Menu, X } from "lucide-react";
import { cn } from "../lib/utils";

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
              <span className="text-xl font-bold">B</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">SecureBlog</span>
          </Link>

          <div className="hidden md:flex md:items-center md:gap-6">
            <Link to="/" className="text-sm font-medium text-gray-600 hover:text-indigo-600">Home</Link>
            <Link to="/trending" className="text-sm font-medium text-gray-600 hover:text-indigo-600">Trending</Link>
            <Link to="/categories" className="text-sm font-medium text-gray-600 hover:text-indigo-600">Categories</Link>
          </div>
        </div>

        <div className="hidden md:flex md:items-center md:gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              {user?.role !== "USER" && (
                <Link
                  to="/create"
                  className="flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-indigo-700 hover:shadow-lg active:scale-95"
                >
                  <PenTool className="h-4 w-4" />
                  Write
                </Link>
              )}
              
              <div className="relative group">
                <button className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-gray-50 transition-colors hover:border-indigo-300">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                  ) : (
                    <UserIcon className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                
                <div className="absolute right-0 mt-2 w-48 origin-top-right translate-y-2 scale-95 opacity-0 invisible rounded-xl border border-gray-100 bg-white p-2 shadow-xl ring-1 ring-black/5 transition-all group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-hover:visible">
                  <div className="px-3 py-2">
                    <p className="text-sm font-bold text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.role}</p>
                  </div>
                  <div className="my-1 h-px bg-gray-100" />
                  
                  {user?.role === "ADMIN" && (
                    <Link to="/admin" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                      <LayoutDashboard className="h-4 w-4" /> Dashboard
                    </Link>
                  )}
                  
                  <Link to="/profile" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                    <Settings className="h-4 w-4" /> Profile
                  </Link>
                  
                  <button
                    onClick={logout}
                    className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <LogOut className="h-4 w-4" /> Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-indigo-600">Login</Link>
              <Link
                to="/signup"
                className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-indigo-700 hover:shadow-md"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3">
          <Link to="/" className="block text-sm font-medium text-gray-600 p-2">Home</Link>
          <Link to="/trending" className="block text-sm font-medium text-gray-600 p-2">Trending</Link>
          <Link to="/categories" className="block text-sm font-medium text-gray-600 p-2">Categories</Link>
          {!isAuthenticated && (
            <div className="pt-4 flex flex-col gap-2">
              <Link to="/login" className="w-full text-center py-2 text-sm font-medium text-gray-600">Login</Link>
              <Link to="/signup" className="w-full text-center py-2 rounded-lg bg-indigo-600 text-white font-medium">Sign Up</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
