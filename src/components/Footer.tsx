import React from "react";
import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-600 text-white">
                <span className="text-xs font-bold">B</span>
              </div>
              <span className="text-lg font-bold tracking-tight text-gray-900">SecureBlog</span>
            </Link>
            <p className="text-sm text-gray-500 max-w-xs">
              A modern blog management system designed for security, performance, and scalability.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-4">Explore</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-gray-500 hover:text-indigo-600">All Posts</Link></li>
              <li><Link to="/trending" className="text-sm text-gray-500 hover:text-indigo-600">Trending</Link></li>
              <li><Link to="/categories" className="text-sm text-gray-500 hover:text-indigo-600">Categories</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm text-gray-500 hover:text-indigo-600">About Us</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-500 hover:text-indigo-600">Contact</Link></li>
              <li><Link to="/privacy" className="text-sm text-gray-500 hover:text-indigo-600">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-indigo-600"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-indigo-600"><Github className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-indigo-600"><Linkedin className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-indigo-600"><Mail className="h-5 w-5" /></a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} SecureBlog Pro. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 font-mono">
            Powered by Node.js & Express
          </p>
        </div>
      </div>
    </footer>
  );
}
