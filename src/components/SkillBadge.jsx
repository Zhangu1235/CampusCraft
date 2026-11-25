import React from 'react';

export const SkillBadge = ({ skill, variant = 'default', onRemove = null, size = 'md' }) => {
  const name = typeof skill === 'string' ? skill : skill.name;
  const level = typeof skill === 'object' ? skill.level : null;
  const category = typeof skill === 'object' ? skill.category : null;

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-0.5',
    md: 'text-xs px-3 py-1 font-medium',
    lg: 'text-sm px-3.5 py-1.5 font-medium'
  };

  const variantClasses = {
    default: 'bg-brand-50 text-brand-700 border border-brand-200/60 hover:bg-brand-100',
    violet: 'bg-violetAccent-50 text-violetAccent-700 border border-violetAccent-200/60',
    outline: 'bg-white text-surface-muted border border-surface-border hover:border-brand-300 hover:text-brand-600',
    dark: 'bg-slate-900 text-white',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full transition-colors ${sizeClasses[size] || sizeClasses.md} ${variantClasses[variant] || variantClasses.default}`}>
      <span>{name}</span>
      {level && (
        <span className="text-[10px] uppercase tracking-wider opacity-75 font-semibold">
          • {level}
        </span>
      )}
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(name);
          }}
          className="ml-1 text-surface-muted hover:text-rose-600 focus:outline-none"
          title={`Remove ${name}`}
        >
          ×
        </button>
      )}
    </span>
  );
};

export default SkillBadge;

