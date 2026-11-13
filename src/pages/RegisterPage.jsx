import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  GraduationCap, 
  Mail, 
  Lock, 
  User, 
  Building2, 
  BookOpen, 
  Calendar, 
  CheckCircle2, 
  Briefcase,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('type') === 'client' ? 'Client' : 'Student Freelancer';
  const { updateUserProfile, setUserRole, showToast } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    college: '',
    course: '',
    year: '2nd Year (Class of 2027)',
    accountType: initialType,
    terms: true
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim()) errs.email = 'College email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Enter a valid email address';
    if (!formData.password) errs.password = 'Password is required';
    else if (formData.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (!formData.college.trim()) errs.college = 'College/University name is required';
    if (!formData.course.trim()) errs.course = 'Course and branch are required';
    if (!formData.terms) errs.terms = 'You must agree to CampusCraft terms';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const isStudent = formData.accountType === 'Student Freelancer';
    updateUserProfile({
      name: formData.name,
      email: formData.email,
      college: formData.college,
      course: formData.course,
      year: formData.year,
      role: formData.accountType
    });

    setUserRole(isStudent ? 'student' : 'client');
    showToast(`Account created as ${formData.accountType}! Welcome to CampusCraft.`);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full bg-white rounded-3xl border border-surface-border p-8 shadow-soft-lg space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-violetAccent-600 text-white shadow-md mb-1">
            <GraduationCap size={26} />
          </div>
          <h2 className="text-2xl font-extrabold text-surface-text tracking-tight">
            Create Your CampusCraft Account
          </h2>
          <p className="text-xs text-surface-muted">
            Join the trusted collegiate ecosystem for skill monetization and student hiring.
          </p>
        </div>

        {/* Account Type Selector Tabs */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-surface-muted mb-2 text-center">
            I Want To Join As:
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, accountType: 'Student Freelancer' }))}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                formData.accountType === 'Student Freelancer'
                  ? 'border-brand-600 bg-brand-50/60 ring-2 ring-brand-500/20'
                  : 'border-surface-border hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs text-surface-text">Student Freelancer</span>
                {formData.accountType === 'Student Freelancer' && (
                  <CheckCircle2 size={16} className="text-brand-600" />
                )}
              </div>
              <p className="text-[11px] text-surface-muted">
                Offer skills, showcase projects, and earn money safely.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, accountType: 'Client' }))}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                formData.accountType === 'Client'
                  ? 'border-brand-600 bg-brand-50/60 ring-2 ring-brand-500/20'
                  : 'border-surface-border hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs text-surface-text">Client / Recruiter</span>
                {formData.accountType === 'Client' && (
                  <CheckCircle2 size={16} className="text-brand-600" />
                )}
              </div>
              <p className="text-[11px] text-surface-muted">
                Post student projects, hire talent, and manage deliverables.
              </p>
            </button>
          </div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-surface-muted mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 text-surface-muted pointer-events-none" size={16} />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Maya Patel"
                  className={`w-full pl-10 pr-3 py-2.5 bg-slate-50 border rounded-xl text-xs text-surface-text focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 transition-all ${
                    errors.name ? 'border-rose-400 bg-rose-50/20' : 'border-surface-border'
                  }`}
                />
              </div>
              {errors.name && <p className="text-[11px] text-rose-500 mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-surface-muted mb-1.5">
                College / Work Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 text-surface-muted pointer-events-none" size={16} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@college.edu or .ac.in"
                  className={`w-full pl-10 pr-3 py-2.5 bg-slate-50 border rounded-xl text-xs text-surface-text focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 transition-all ${
                    errors.email ? 'border-rose-400 bg-rose-50/20' : 'border-surface-border'
                  }`}
                />
              </div>
              {errors.email && <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>}
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-surface-muted mb-1.5">
              Create Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 text-surface-muted pointer-events-none" size={16} />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="At least 6 characters"
                className={`w-full pl-10 pr-3 py-2.5 bg-slate-50 border rounded-xl text-xs text-surface-text focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 transition-all ${
                  errors.password ? 'border-rose-400 bg-rose-50/20' : 'border-surface-border'
                }`}
              />
            </div>
            {errors.password && <p className="text-[11px] text-rose-500 mt-1">{errors.password}</p>}
          </div>

          {/* College Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-surface-muted mb-1.5">
              College / University Name
            </label>
            <div className="relative">
              <Building2 className="absolute left-3.5 top-3 text-surface-muted pointer-events-none" size={16} />
              <input
                type="text"
                value={formData.college}
                onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                placeholder="e.g. Indian Institute of Technology, Bombay"
                className={`w-full pl-10 pr-3 py-2.5 bg-slate-50 border rounded-xl text-xs text-surface-text focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 transition-all ${
                  errors.college ? 'border-rose-400 bg-rose-50/20' : 'border-surface-border'
                }`}
              />
            </div>
            {errors.college && <p className="text-[11px] text-rose-500 mt-1">{errors.college}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Course & Branch */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-surface-muted mb-1.5">
                Course & Branch
              </label>
              <div className="relative">
                <BookOpen className="absolute left-3.5 top-3 text-surface-muted pointer-events-none" size={16} />
                <input
                  type="text"
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  placeholder="e.g. B.Tech Computer Science"
                  className={`w-full pl-10 pr-3 py-2.5 bg-slate-50 border rounded-xl text-xs text-surface-text focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 transition-all ${
                    errors.course ? 'border-rose-400 bg-rose-50/20' : 'border-surface-border'
                  }`}
                />
              </div>
              {errors.course && <p className="text-[11px] text-rose-500 mt-1">{errors.course}</p>}
            </div>

            {/* Year of Study */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-surface-muted mb-1.5">
                Current Year of Study
              </label>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-3 text-surface-muted pointer-events-none" size={16} />
                <select
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-surface-border rounded-xl text-xs text-surface-text focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
                >
                  <option value="1st Year (Class of 2028)">1st Year (Class of 2028)</option>
                  <option value="2nd Year (Class of 2027)">2nd Year (Class of 2027)</option>
                  <option value="3rd Year (Class of 2026)">3rd Year (Class of 2026)</option>
                  <option value="4th Year (Class of 2025)">4th Year (Class of 2025)</option>
                  <option value="Postgraduate / Masters">Postgraduate / Masters</option>
                </select>
              </div>
            </div>
          </div>

          {/* Terms */}
          <div className="pt-2">
            <label className="flex items-start gap-2 text-xs text-surface-text cursor-pointer">
              <input
                type="checkbox"
                checked={formData.terms}
                onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
                className="mt-0.5 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
              />
              <span className="text-[11px] text-surface-muted leading-tight">
                I agree to the CampusCraft Student Code of Conduct, Escrow Agreement terms, and verified college verification guidelines.
              </span>
            </label>
            {errors.terms && <p className="text-[11px] text-rose-500 mt-1">{errors.terms}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-500/20 hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <span>Complete Registration & Enter Dashboard</span>
            <ArrowRight size={15} />
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center pt-4 border-t border-surface-border text-xs text-surface-muted">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-brand-600 hover:text-brand-700">
            Sign In here
          </Link>
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;

