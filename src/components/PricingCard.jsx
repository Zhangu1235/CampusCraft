import React from 'react';
import { Check, Clock, RotateCcw, Zap } from 'lucide-react';

export const PricingCard = ({ 
  tier = 'standard', // 'basic' | 'standard' | 'premium'
  pkg, 
  onSelect,
  isPopular = false,
  selected = false
}) => {
  const isStandard = tier === 'standard' || isPopular;

  return (
    <div className={`relative bg-white rounded-2xl border transition-all duration-300 flex flex-col justify-between p-6 ${
      selected
        ? 'border-brand-600 ring-2 ring-brand-500/20 shadow-soft-lg'
        : isStandard
        ? 'border-brand-300 shadow-soft'
        : 'border-surface-border shadow-xs hover:border-slate-300'
    }`}>
      {isStandard && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 bg-gradient-to-r from-brand-600 to-violetAccent-600 text-white text-[11px] font-bold px-3 py-0.5 rounded-full shadow-sm uppercase tracking-wider">
            <Zap size={11} className="fill-white" />
            Most Popular
          </span>
        </div>
      )}

      <div>
        {/* Tier Header */}
        <div className="mb-4">
          <h4 className="text-base font-bold text-surface-text uppercase tracking-wider text-xs text-brand-600 mb-1">
            {pkg.name || tier}
          </h4>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-surface-text">${pkg.price}</span>
            <span className="text-xs text-surface-muted font-medium">USD</span>
          </div>
          <p className="text-xs text-slate-600 mt-2 min-h-[36px] leading-relaxed">
            {pkg.description}
          </p>
        </div>

        {/* Turnaround & Revisions Info */}
        <div className="grid grid-cols-2 gap-2 py-3 border-y border-surface-border text-xs text-surface-muted mb-4 bg-slate-50/50 rounded-xl px-3">
          <div className="flex items-center gap-1.5">
            <Clock size={14} className="text-brand-500" />
            <span><strong>{pkg.deliveryDays}</strong> Days Delivery</span>
          </div>
          <div className="flex items-center gap-1.5">
            <RotateCcw size={14} className="text-violetAccent-500" />
            <span><strong>{pkg.revisions}</strong> Revisions</span>
          </div>
        </div>

        {/* Feature List */}
        <div className="space-y-2.5 mb-6">
          <p className="text-[11px] font-bold uppercase tracking-wider text-surface-muted">
            What's Included:
          </p>
          {pkg.features?.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
              <div className="mt-0.5 rounded-full p-0.5 bg-brand-50 text-brand-600">
                <Check size={12} strokeWidth={3} />
              </div>
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Button */}
      <button
        onClick={() => onSelect && onSelect(tier, pkg)}
        className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 ${
          isStandard
            ? 'bg-brand-600 text-white hover:bg-brand-700 hover:shadow'
            : 'bg-slate-900 text-white hover:bg-slate-800'
        }`}
      >
        <span>Select {pkg.name || tier}</span>
      </button>
    </div>
  );
};

export default PricingCard;

