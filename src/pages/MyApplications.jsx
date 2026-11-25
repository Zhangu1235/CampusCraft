import React from 'react';
import { Link } from 'react-router-dom';
import { FileCheck2, DollarSign, Calendar, Clock, ArrowRight, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MyApplications = () => {
  const { applications } = useApp();

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-surface-text">
            My Project Applications & Proposals
          </h1>
          <p className="text-xs text-surface-muted mt-0.5">
            Track status of bids you submitted for campus projects and gigs
          </p>
        </div>
        <Link
          to="/projects"
          className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 self-start sm:self-auto"
        >
          <span>Browse More Projects</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="space-y-4">
        {applications.map((app) => (
          <div
            key={app.id}
            className="bg-white rounded-2xl border border-surface-border p-6 shadow-soft space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="font-bold text-base text-surface-text">
                {app.projectTitle}
              </h3>
              <span className={`text-xs font-extrabold px-3 py-1 rounded-full self-start sm:self-auto ${
                app.status === 'Accepted'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-brand-50 text-brand-700 border border-brand-200'
              }`}>
                {app.status || 'Under Review'}
              </span>
            </div>

            <p className="text-xs text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-100 leading-relaxed italic">
              "{app.coverLetter}"
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-surface-border text-xs text-surface-muted">
              <div className="flex items-center gap-6">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Bid Amount</span>
                  <span className="font-extrabold text-brand-600 text-sm">${app.bidAmount}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Proposed Timeline</span>
                  <span className="font-semibold text-slate-700">{app.timeline}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Applied On</span>
                  <span className="font-semibold text-slate-700">{app.appliedDate}</span>
                </div>
              </div>

              <span className="text-brand-600 font-semibold text-[11px]">
                Escrow Guarantee Activated Upon Acceptance
              </span>
            </div>
          </div>
        ))}

        {applications.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-surface-border p-8 text-xs text-surface-muted">
            <FileCheck2 size={36} className="mx-auto text-slate-300 mb-2" />
            <p className="font-bold text-surface-text text-sm">No applications submitted yet</p>
            <p className="mt-1">Browse the open projects board to apply for campus projects.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;

