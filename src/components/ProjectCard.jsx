import React from 'react';
import { Calendar, DollarSign, Clock, Users, ArrowUpRight, GraduationCap } from 'lucide-react';
import SkillBadge from './SkillBadge';

export const ProjectCard = ({ project, onApply = null, isApplied = false }) => {
  return (
    <div className="bg-white rounded-2xl border border-surface-border p-6 hover:border-brand-300 hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Category & Budget Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-1 rounded-lg">
            {project.category}
          </span>
          <div className="text-right">
            <span className="text-xl font-extrabold text-surface-text flex items-center justify-end text-brand-600">
              ${project.budget}
            </span>
            <span className="text-[10px] text-surface-muted block font-medium">
              {project.budgetType || 'Fixed Price'}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-surface-text text-base group-hover:text-brand-600 transition-colors mb-2 line-clamp-2">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
          {project.description}
        </p>

        {/* Required Skills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.requiredSkills?.map((skill) => (
            <SkillBadge key={skill} skill={skill} size="sm" variant="outline" />
          ))}
        </div>
      </div>

      <div>
        {/* Meta Info (Duration, Deadline, Proposals) */}
        <div className="grid grid-cols-2 gap-2 text-[11px] text-surface-muted mb-4 pt-3 border-t border-surface-border">
          <div className="flex items-center gap-1.5">
            <Clock size={13} className="text-brand-500" />
            <span>Duration: <strong className="text-surface-text">{project.duration}</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar size={13} className="text-amber-500" />
            <span>Deadline: <strong className="text-surface-text">{project.deadline}</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users size={13} className="text-violetAccent-500" />
            <span>Proposals: <strong className="text-surface-text">{project.proposalsCount || 0}</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Level: <strong className="text-surface-text">{project.experienceLevel || 'Intermediate'}</strong></span>
          </div>
        </div>

        {/* Client info & Action */}
        <div className="flex items-center justify-between pt-3 border-t border-surface-border/70">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={project.client?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"}
              alt={project.client?.name}
              className="w-8 h-8 rounded-full object-cover border border-slate-200"
            />
            <div className="min-w-0">
              <p className="text-xs font-bold text-surface-text truncate">{project.client?.name}</p>
              <div className="flex items-center gap-1 text-[10px] text-surface-muted truncate">
                <GraduationCap size={11} />
                <span className="truncate">{project.client?.college}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onApply && onApply(project)}
            disabled={isApplied}
            className={`py-2 px-4 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
              isApplied
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-brand-600 text-white hover:bg-brand-700 shadow-sm hover:shadow'
            }`}
          >
            <span>{isApplied ? 'Applied' : 'Apply Now'}</span>
            {!isApplied && <ArrowUpRight size={14} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

