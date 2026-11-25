import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { showToast } = useApp();
  const [email, setEmail] = useState('arjun.m@iitb.ac.in');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!email.trim()) errs.email = 'Email address is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Please enter a valid email address';
    if (!password) errs.password = 'Password is required';
    else if (password.length < 6) errs.password = 'Password must be at least 6 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    showToast('Signed in successfully! Welcome back.');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-3xl border border-surface-border p-8 shadow-soft-lg space-y-6">
        
        {/* Brand & Title */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-violetAccent-600 text-white shadow-md mb-1">
            <GraduationCap size={26} />
          </div>
          <h2 className="text-2xl font-extrabold text-surface-text tracking-tight">
            Welcome to CampusCraft
          </h2>
          <p className="text-xs text-surface-muted">
            Sign in to access your student portfolio, active gigs, and earnings.
          </p>
        </div>

        {/* Demo Credentials Alert */}
        <div className="bg-brand-50 border border-brand-100 rounded-2xl p-3 text-xs text-brand-800">
          <p className="font-bold flex items-center gap-1.5 mb-0.5">
            <ShieldCheck size={14} className="text-brand-600" />
            Quick Demo Login Loaded:
          </p>
          <p className="text-[11px] opacity-90">
            Click <strong>Sign In</strong> below to jump into the live interactive student dashboard with sample projects & orders.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-surface-muted mb-1.5">
              College Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 text-surface-muted pointer-events-none" size={16} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@college.edu or .ac.in"
                className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl text-xs text-surface-text focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 transition-all ${
                  errors.email ? 'border-rose-400 bg-rose-50/20' : 'border-surface-border'
                }`}
              />
            </div>
            {errors.email && <p className="text-[11px] text-rose-500 mt-1 font-medium">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-surface-muted">
                Password
              </label>
              <a href="#forgot" onClick={(e) => { e.preventDefault(); showToast('Password reset link sent to registered email'); }} className="text-xs text-brand-600 hover:text-brand-700 font-semibold">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 text-surface-muted pointer-events-none" size={16} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full pl-10 pr-10 py-2.5 bg-slate-50 border rounded-xl text-xs text-surface-text focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 transition-all ${
                  errors.password ? 'border-rose-400 bg-rose-50/20' : 'border-surface-border'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-surface-muted hover:text-surface-text transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <p className="text-[11px] text-rose-500 mt-1 font-medium">{errors.password}</p>}
          </div>

          {/* Remember me */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-surface-text">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
              />
              <span>Remember me on this browser</span>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-500/20 hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <span>Sign In to CampusCraft</span>
            <ArrowRight size={15} />
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center pt-4 border-t border-surface-border text-xs text-surface-muted">
          Don't have a verified account yet?{' '}
          <Link to="/register" className="font-bold text-brand-600 hover:text-brand-700">
            Sign up as Student or Client
          </Link>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;

