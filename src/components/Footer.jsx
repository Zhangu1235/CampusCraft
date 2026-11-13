import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Github, Twitter, Linkedin, Heart, ShieldCheck, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-violetAccent-600 flex items-center justify-center text-white shadow-lg">
                <GraduationCap size={22} className="stroke-[2.2]" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                Campus<span className="text-brand-400">Craft</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              The premier student freelancing marketplace. Connecting ambitious college creators, engineers, and designers with campus ventures and industry clients with secure escrow payouts.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-brand-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                <Github size={16} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-brand-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                <Twitter size={16} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-brand-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {/* Column 1: For Students */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              For Students
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link to="/freelancers" className="hover:text-white transition-colors">Showcase Your Skills</Link></li>
              <li><Link to="/projects" className="hover:text-white transition-colors">Browse Projects</Link></li>
              <li><Link to="/profile" className="hover:text-white transition-colors">Create Portfolio</Link></li>
              <li><Link to="/dashboard/services" className="hover:text-white transition-colors">Publish Services</Link></li>
              <li><Link to="/dashboard/orders" className="hover:text-white transition-colors">Escrow Milestones</Link></li>
            </ul>
          </div>

          {/* Column 2: For Clients */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              For Clients
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link to="/freelancers" className="hover:text-white transition-colors">Hire Top Students</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Fixed Price Packages</Link></li>
              <li><Link to="/projects" className="hover:text-white transition-colors">Post a Project</Link></li>
              <li><Link to="/reviews" className="hover:text-white transition-colors">Verified Reviews</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Client Portal</Link></li>
            </ul>
          </div>

          {/* Column 3: Trust & Safety */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Trust & Security
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <ShieldCheck size={16} />
                <span>100% Escrow Protection</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                CampusCraft holds client funds in escrow until the student's delivery is reviewed and approved.
              </p>
              <div className="pt-1">
                <span className="text-[11px] text-slate-500 block">College Email Verified</span>
                <span className="text-[11px] text-slate-500 block">Dispute Resolution Guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} CampusCraft Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/terms" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <span className="flex items-center gap-1">
              Built with <Heart size={12} className="text-rose-500 fill-rose-500" /> for College Students
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

