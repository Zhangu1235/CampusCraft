import React, { useState } from 'react';
import { Settings, User, Bell, Shield, CreditCard, CheckCircle2, Lock } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SettingsPage = () => {
  const { currentUser, updateUserProfile, showToast, userRole, toggleRole } = useApp();

  const [notifications, setNotifications] = useState({
    emailGigs: true,
    chatAlerts: true,
    milestoneUpdates: true,
    marketing: false
  });

  const [payoutInfo, setPayoutInfo] = useState({
    accountHolder: currentUser.name,
    upiOrIban: 'arjun.mehta@okaxis',
    bankName: 'HDFC Bank, IIT Powai Branch',
    escrowAutoRelease: true
  });

  const handleSavePayout = (e) => {
    e.preventDefault();
    showToast('Payout preferences saved securely!');
  };

  return (
    <div className="space-y-8 pb-16 max-w-4xl">
      <div>
        <h1 className="text-2xl font-extrabold text-surface-text">
          Account & Marketplace Settings
        </h1>
        <p className="text-xs text-surface-muted mt-0.5">
          Manage your verified college credentials, escrow payout accounts, and notification preferences
        </p>
      </div>

      {/* Role Toggle Box */}
      <div className="bg-white rounded-2xl border border-surface-border p-6 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-brand-600 uppercase tracking-wider block mb-1">
            Active Workspace Mode
          </span>
          <h3 className="font-bold text-base text-surface-text">
            {userRole === 'student' ? 'Student Freelancer Mode' : 'Campus Client / Recruiter Mode'}
          </h3>
          <p className="text-xs text-surface-muted mt-0.5">
            Switch between offering skills/services and hiring student talent.
          </p>
        </div>

        <button
          onClick={toggleRole}
          className="px-5 py-2.5 rounded-xl bg-brand-50 border border-brand-200 text-brand-700 font-bold text-xs hover:bg-brand-100 transition-colors self-start sm:self-auto"
        >
          Switch to {userRole === 'student' ? 'Client' : 'Student'} View
        </button>
      </div>

      {/* Escrow Payout Bank Details */}
      <div className="bg-white rounded-2xl border border-surface-border p-6 shadow-soft space-y-5">
        <div className="flex items-center gap-2">
          <CreditCard size={18} className="text-brand-600" />
          <h3 className="font-bold text-sm text-surface-text">Escrow Payout & Bank Account</h3>
        </div>

        <form onSubmit={handleSavePayout} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold uppercase tracking-wider text-surface-muted mb-1.5">
                Account Holder Name
              </label>
              <input
                type="text"
                value={payoutInfo.accountHolder}
                onChange={(e) => setPayoutInfo({ ...payoutInfo, accountHolder: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-surface-border rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block font-bold uppercase tracking-wider text-surface-muted mb-1.5">
                UPI ID or Bank Account Number
              </label>
              <input
                type="text"
                value={payoutInfo.upiOrIban}
                onChange={(e) => setPayoutInfo({ ...payoutInfo, upiOrIban: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-surface-border rounded-xl text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-surface-muted mb-1.5">
              Bank Branch / Details
            </label>
            <input
              type="text"
              value={payoutInfo.bankName}
              onChange={(e) => setPayoutInfo({ ...payoutInfo, bankName: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-surface-border rounded-xl text-xs"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-brand-600 text-white font-bold hover:bg-brand-700 transition-colors"
            >
              Update Payout Account
            </button>
          </div>
        </form>
      </div>

      {/* Verification Status */}
      <div className="bg-white rounded-2xl border border-surface-border p-6 shadow-soft space-y-4">
        <div className="flex items-center gap-2">
          <Shield size={18} className="text-emerald-600" />
          <h3 className="font-bold text-sm text-surface-text">Collegiate Verification Status</h3>
        </div>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl border border-emerald-200">
            <div className="flex items-center gap-2 text-emerald-800">
              <CheckCircle2 size={16} />
              <span>College Email Verified ({currentUser.email})</span>
            </div>
            <span className="font-bold text-emerald-700 uppercase tracking-wider text-[10px]">Verified</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-surface-border">
            <div className="flex items-center gap-2 text-slate-700">
              <CheckCircle2 size={16} className="text-emerald-600" />
              <span>Student ID Card Uploaded ({currentUser.college})</span>
            </div>
            <span className="font-bold text-brand-600 uppercase tracking-wider text-[10px]">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

