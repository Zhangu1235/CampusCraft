import React from 'react';
import { ExternalLink, Github, Heart, Edit3, Trash2 } from 'lucide-react';
import SkillBadge from './SkillBadge';

export const PortfolioCard = ({ 
  project, 
  onEdit = null, 
  onDelete = null,
  isOwner = true
}) => {
  return (
    <div className="bg-white rounded-2xl border border-surface-border overflow-hidden hover:border-brand-300 hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Project Thumbnail Image */}
        <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {project.featured && (
            <span className="absolute top-3 left-3 bg-brand-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm">
              Featured Work
            </span>
          )}

          {/* Action buttons overlay for owner */}
          {isOwner && (onEdit || onDelete) && (
            <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
              {onEdit && (
                <button
                  onClick={() => onEdit(project)}
                  className="p-1.5 bg-white/90 hover:bg-white text-surface-text rounded-lg shadow-sm backdrop-blur-sm transition-colors hover:text-brand-600"
                  title="Edit Project"
                >
                  <Edit3 size={14} />
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => onDelete(project.id)}
                  className="p-1.5 bg-white/90 hover:bg-white text-surface-text rounded-lg shadow-sm backdrop-blur-sm transition-colors hover:text-rose-600"
                  title="Delete Project"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Project Details */}
        <div className="p-5">
          <div className="flex items-center justify-between text-xs text-surface-muted mb-1.5">
            <span>{project.date || 'Recent Project'}</span>
            <div className="flex items-center gap-1 text-slate-500">
              <Heart size={13} className="text-rose-500 fill-rose-500/20" />
              <span>{project.likes || 24}</span>
            </div>
          </div>

          <h3 className="font-bold text-surface-text text-base group-hover:text-brand-600 transition-colors mb-2 line-clamp-1">
            {project.title}
          </h3>

          <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {project.technologies?.map((tech) => (
              <span key={tech} className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* External Links */}
      <div className="px-5 py-3.5 bg-slate-50/70 border-t border-surface-border flex items-center justify-between text-xs font-semibold">
        {project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-slate-700 hover:text-brand-600 transition-colors"
          >
            <Github size={14} />
            <span>Source Code</span>
          </a>
        ) : (
          <span className="text-surface-muted">Code Private</span>
        )}

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-brand-600 hover:text-brand-700 transition-colors"
          >
            <span>Live Demo</span>
            <ExternalLink size={13} />
          </a>
        )}
      </div>
    </div>
  );
};

export default PortfolioCard;

