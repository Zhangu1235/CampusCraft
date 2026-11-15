import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  Menu, 
  X, 
  Sparkles, 
  User, 
  LayoutDashboard, 
  Briefcase, 
  Layers, 
  MessageSquare,
  Shield,
  ArrowRight,
  LogOut,
  FolderGit2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Show, SignOutButton } from '@clerk/react';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, userRole, toggleRole } = useApp();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore Freelancers', path: '/freelancers' },
    { name: 'Find Projects', path: '/projects' },
    { name: 'Services', path: '/services' },
    { name: 'Reviews', path: '/reviews' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-violetAccent-600 flex items-center justify-center text-white shadow-sm shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <GraduationCap size={22} className="stroke-[2.2]" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-surface-text">
                Campus<span className="text-brand-600">Craft</span>
              </span>
              <span className="hidden sm:block text-[9px] font-bold text-violetAccent-600 uppercase tracking-widest -mt-1">
                Student Marketplace
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive(link.path)
                    ? 'text-brand-600 bg-brand-50 font-bold'
                    : 'text-slate-600 hover:text-surface-text hover:bg-slate-100/70'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Show when="signed-out">
              <Link to="/login" className="px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100">Sign in</Link>
              <Link to="/register" className="px-3.5 py-2 rounded-xl text-xs font-bold bg-brand-600 text-white hover:bg-brand-700">Create account</Link>
            </Show>
            <Show when="signed-in">
            {/* Quick Role Switcher Pill */}
            <button
              onClick={toggleRole}
              title="Click to toggle perspective"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-bold border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors text-slate-700"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Mode: {userRole === 'student' ? 'Student Freelancer' : 'Campus Client'}</span>
            </button>

            {/* Dashboard Link Button */}
            <Link
              to="/dashboard"
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                location.pathname.startsWith('/dashboard')
                  ? 'bg-slate-900 text-white'
                  : 'bg-brand-50 text-brand-700 hover:bg-brand-100 border border-brand-200/60'
              }`}
            >
              <LayoutDashboard size={14} />
              <span>Dashboard</span>
            </Link>

            {/* Profile Avatar & Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-xl object-cover border border-brand-200"
                />
              </button>

              {profileDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-surface-border p-2 z-50 text-xs font-medium"
                  onMouseLeave={() => setProfileDropdownOpen(false)}
                >
                  <div className="p-3 border-b border-surface-border mb-1">
                    <p className="font-bold text-surface-text truncate">{currentUser.name}</p>
                    <p className="text-[11px] text-surface-muted truncate">{currentUser.email}</p>
                    <span className="inline-block mt-1 text-[10px] font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">
                      {currentUser.role}
                    </span>
                  </div>

                  <Link
                    to="/profile"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-50 hover:text-brand-600"
                  >
                    <User size={14} />
                    <span>My Profile & Portfolio</span>
                  </Link>

                  <Link
                    to="/dashboard/services"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-50 hover:text-brand-600"
                  >
                    <Briefcase size={14} />
                    <span>My Services</span>
                  </Link>

                  <Link
                    to="/dashboard/orders"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-50 hover:text-brand-600"
                  >
                    <Layers size={14} />
                    <span>Track Orders & Milestones</span>
                  </Link>

                  <Link
                    to="/dashboard/messages"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-50 hover:text-brand-600"
                  >
                    <MessageSquare size={14} />
                    <span>Messages</span>
                  </Link>

                  <div className="border-t border-surface-border mt-1 pt-1">
                    <SignOutButton>
                      <button
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 font-semibold"
                    >
                      <LogOut size={14} />
                      <span>Sign out</span>
                      </button>
                    </SignOutButton>
                  </div>
                </div>
              )}
            </div>
            </Show>
          </div>

          {/* Mobile menu trigger */}
          <div className="md:hidden flex items-center gap-2">
            <Show when="signed-in">
            <button
              onClick={toggleRole}
              className="text-[10px] font-bold px-2 py-1 rounded-lg border border-slate-200 bg-slate-50 text-slate-700"
            >
              {userRole === 'student' ? 'Student' : 'Client'}
            </button>
            </Show>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-surface-text hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-surface-border bg-white px-4 pt-2 pb-5 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-xl text-sm font-semibold ${
                isActive(link.path)
                  ? 'bg-brand-50 text-brand-600'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 border-t border-surface-border grid grid-cols-2 gap-2">
            <Show when="signed-in">
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-xl bg-brand-600 text-white text-xs font-bold text-center"
            >
              Dashboard
            </Link>
            <Link
              to="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold text-center"
            >
              My Profile
            </Link>
            </Show>
            <Show when="signed-out">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold text-center">Sign in</Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 rounded-xl bg-brand-600 text-white text-xs font-bold text-center">Create account</Link>
            </Show>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

