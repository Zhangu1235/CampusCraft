import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend = null, // e.g. "+14% vs last month"
  trendType = 'up', // 'up' | 'down'
  colorClass = 'brand' // 'brand' | 'violet' | 'emerald' | 'amber'
}) => {
  const colorMap = {
    brand: {
      bg: 'bg-brand-50',
      text: 'text-brand-600',
      border: 'border-brand-100'
    },
    violet: {
      bg: 'bg-violetAccent-50',
      text: 'text-violetAccent-600',
      border: 'border-violetAccent-100'
    },
    emerald: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
      border: 'border-emerald-100'
    },
    amber: {
      bg: 'bg-amber-50',
      text: 'text-amber-600',
      border: 'border-amber-100'
    }
  };

  const scheme = colorMap[colorClass] || colorMap.brand;

  return (
    <div className="bg-white rounded-2xl border border-surface-border p-5 shadow-soft hover:shadow-soft-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-surface-muted uppercase tracking-wider">
          {title}
        </span>
        {Icon && (
          <div className={`p-2 rounded-xl ${scheme.bg} ${scheme.text} ${scheme.border} border`}>
            <Icon size={18} />
          </div>
        )}
      </div>

      <div className="flex items-baseline justify-between">
        <span className="text-2xl lg:text-3xl font-extrabold text-surface-text tracking-tight">
          {value}
        </span>
        {trend && (
          <span className={`inline-flex items-center text-xs font-bold ${
            trendType === 'up' ? 'text-emerald-600' : 'text-rose-500'
          }`}>
            {trendType === 'up' ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
            {trend}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="text-xs text-surface-muted mt-1.5 font-medium">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default StatCard;

