import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  FolderGit2,
  Briefcase,
  Compass,
  FileCheck2,
  Layers,
  MessageSquare,
  Star,
  Settings,
  LogOut,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SignOutButton } from '@clerk/react';

export const Sidebar = () => {
  const { currentUser, userRole, toggleRole } = useApp();

  const navItems = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard, exact: true },
    { name: 'My Profile', path: '/profile', icon: User },
    { name: 'My Portfolio', path: '/dashboard/portfolio', icon: FolderGit2 },
    { name: 'My Services', path: '/dashboard/services', icon: Briefcase },
    { name: 'Explore Projects', path: '/projects', icon: Compass },
    { name: 'My Applications', path: '/dashboard/applications', icon: FileCheck2 },
    { name: 'Orders & Tracking', path: '/dashboard/orders', icon: Layers, badge: '3' },
    { name: 'Messages', path: '/dashboard/messages', icon: MessageSquare, badge: '1' },
    { name: 'Reviews', path: '/reviews', icon: Star },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-surface-border min-h-[calc(100vh-4rem)] p-4 flex flex-col justify-between shrink-0">
      <div className="space-y-6">
        {/* User Card in Sidebar */}
        <div className="p-3 bg-slate-50 border border-surface-border rounded-2xl flex items-center gap-3">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-10 h-10 rounded-xl object-cover border border-brand-200"
          />
          <div className="min-w-0 flex-1">
            <h4 className="font-bold text-xs text-surface-text truncate">{currentUser.name}</h4>
            <p className="text-[10px] text-surface-muted truncate">{currentUser.college}</p>
            <span className="inline-block mt-0.5 text-[9px] font-bold text-brand-600 bg-brand-50 px-1.5 py-0.2 rounded">
              {currentUser.role}
            </span>
          </div>
        </div>

        {/* Navigation list */}
        <div className="space-y-1">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-surface-muted mb-2">
            Main Navigation
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.exact}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-brand-600 text-white shadow-sm font-bold'
                      : 'text-slate-600 hover:text-surface-text hover:bg-slate-100/70'
                  }`
                }
              >
                <div className="flex items-center gap-2.5">
                  <Icon size={16} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-brand-100 text-brand-700">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Bottom Pro / Escrow Help Card */}
      <div className="space-y-3 pt-4 border-t border-surface-border">
        <div className="p-3.5 bg-gradient-to-br from-brand-50 to-violetAccent-50 border border-brand-100 rounded-2xl">
          <div className="flex items-center gap-1.5 text-xs font-bold text-brand-700 mb-1">
            <Sparkles size={14} />
            <span>Escrow Guarantee</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-snug">
            All payments are 100% secured until milestone review is signed off.
          </p>
        </div>

        <SignOutButton>
          <button className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors">
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </SignOutButton>
      </div>
    </aside>
  );
};

export default Sidebar;

