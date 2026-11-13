import React from 'react';
import { CheckCircle2, Clock, AlertCircle, Sparkles, ChevronRight } from 'lucide-react';

export const stages = [
  { id: 1, name: "Order Confirmed", desc: "Payment secured in escrow & requirements frozen" },
  { id: 2, name: "Work in Progress", desc: "Development/design underway by student" },
  { id: 3, name: "Submitted for Review", desc: "Deliverables shared for client feedback" },
  { id: 4, name: "Revision Requested", desc: "Optional tweaks requested by client" },
  { id: 5, name: "Completed", desc: "Approved & escrow payout released" }
];

export const ProjectProgressTracker = ({ currentStage = 2, onUpdateStage = null, interactive = true }) => {
  return (
    <div className="bg-white rounded-2xl border border-surface-border p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h4 className="font-bold text-surface-text text-sm">Project Milestones & Delivery Stages</h4>
          <p className="text-xs text-surface-muted">Escrow protection tracks every phase transparently</p>
        </div>
        <span className="text-xs font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-100">
          Stage {currentStage} of 5
        </span>
      </div>

      {/* Stepper bar */}
      <div className="relative">
        {/* Line */}
        <div className="hidden md:block absolute top-4 left-6 right-6 h-0.5 bg-slate-200 -z-0">
          <div 
            className="h-full bg-gradient-to-r from-brand-600 to-violetAccent-600 transition-all duration-500"
            style={{ width: `${((currentStage - 1) / 4) * 100}%` }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
          {stages.map((st) => {
            const isCompleted = st.id < currentStage || (currentStage === 5 && st.id === 5);
            const isCurrent = st.id === currentStage;
            const isRevision = st.id === 4;

            return (
              <div 
                key={st.id}
                onClick={() => interactive && onUpdateStage && onUpdateStage(st.id)}
                className={`flex md:flex-col items-center md:text-center gap-3 md:gap-2 p-2 rounded-xl transition-all ${
                  interactive ? 'cursor-pointer hover:bg-slate-50' : ''
                }`}
              >
                {/* Node circle */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs ${
                  isCompleted
                    ? 'bg-emerald-500 text-white ring-4 ring-emerald-50'
                    : isCurrent
                    ? 'bg-brand-600 text-white ring-4 ring-brand-100 animate-pulse'
                    : 'bg-white border-2 border-slate-300 text-slate-400'
                }`}>
                  {isCompleted ? <CheckCircle2 size={16} /> : st.id}
                </div>

                {/* Text */}
                <div className="text-left md:text-center">
                  <p className={`text-xs font-bold ${
                    isCurrent ? 'text-brand-600' : isCompleted ? 'text-surface-text' : 'text-slate-400'
                  }`}>
                    {st.name}
                  </p>
                  <p className="text-[10px] text-surface-muted hidden md:block mt-0.5">
                    {st.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Controls info */}
      {interactive && onUpdateStage && (
        <div className="mt-6 pt-4 border-t border-surface-border flex flex-wrap items-center justify-between gap-3 text-xs bg-slate-50/70 p-3 rounded-xl">
          <span className="text-surface-muted">
            Click on any milestone above or advance stage quickly:
          </span>
          <div className="flex gap-2">
            {currentStage > 1 && (
              <button
                type="button"
                onClick={() => onUpdateStage(currentStage - 1)}
                className="px-3 py-1 bg-white border border-surface-border rounded-lg text-slate-700 hover:bg-slate-100 font-semibold"
              >
                ← Previous Stage
              </button>
            )}
            {currentStage < 5 && (
              <button
                type="button"
                onClick={() => onUpdateStage(currentStage + 1)}
                className="px-3 py-1 bg-brand-600 text-white rounded-lg hover:bg-brand-700 font-semibold flex items-center gap-1 shadow-sm"
              >
                <span>Advance to Next Stage</span>
                <ChevronRight size={13} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectProgressTracker;

