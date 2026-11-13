import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Plus, 
  Edit3, 
  ExternalLink, 
  Github, 
  Trash2, 
  Award, 
  GraduationCap, 
  Layers, 
  Sparkles, 
  FolderGit2,
  Code2,
  CheckCircle2,
  Eye,
  Upload,
  Briefcase
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProfileHeader from '../components/ProfileHeader';
import PortfolioCard from '../components/PortfolioCard';
import SkillBadge from '../components/SkillBadge';
import Modal from '../components/Modal';

export const StudentProfile = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { 
    currentUser, 
    updateUserProfile, 
    portfolio, 
    addPortfolioProject, 
    updatePortfolioProject, 
    deletePortfolioProject,
    addSkill,
    removeSkill
  } = useApp();

  const [isPublicView, setIsPublicView] = useState(false);
  
  // Modals state
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAddSkillOpen, setIsAddSkillOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  // Form states
  const [profileForm, setProfileForm] = useState({ ...currentUser });
  const [newSkillForm, setNewSkillForm] = useState({ name: '', category: 'Technical', level: 'Intermediate' });
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    technologies: '',
    thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80',
    githubUrl: '',
    liveUrl: '',
    featured: false
  });

  // Handle URL query trigger (e.g. ?action=add-project)
  useEffect(() => {
    if (searchParams.get('action') === 'add-project') {
      openAddProjectModal();
      setSearchParams({});
    }
  }, [searchParams]);

  // Open Edit Project modal
  const openEditProjectModal = (proj) => {
    setEditingProject(proj);
    setProjectForm({
      title: proj.title,
      description: proj.description,
      technologies: proj.technologies?.join(', ') || '',
      thumbnail: proj.thumbnail,
      githubUrl: proj.githubUrl || '',
      liveUrl: proj.liveUrl || '',
      featured: !!proj.featured
    });
    setIsProjectModalOpen(true);
  };

  const openAddProjectModal = () => {
    setEditingProject(null);
    setProjectForm({
      title: '',
      description: '',
      technologies: 'React, Tailwind CSS, Node.js',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
      githubUrl: 'https://github.com/my-student-repo',
      liveUrl: 'https://demo.campuscraft.app',
      featured: false
    });
    setIsProjectModalOpen(true);
  };

  const handleSaveProject = (e) => {
    e.preventDefault();
    if (!projectForm.title.trim()) return;

    const techArray = projectForm.technologies
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const projectData = {
      title: projectForm.title,
      description: projectForm.description,
      technologies: techArray,
      thumbnail: projectForm.thumbnail,
      githubUrl: projectForm.githubUrl,
      liveUrl: projectForm.liveUrl,
      featured: projectForm.featured
    };

    if (editingProject) {
      updatePortfolioProject(editingProject.id, projectData);
    } else {
      addPortfolioProject(projectData);
    }
    setIsProjectModalOpen(false);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateUserProfile(profileForm);
    setIsEditProfileOpen(false);
  };

  const handleAddSkillSubmit = (e) => {
    e.preventDefault();
    if (!newSkillForm.name.trim()) return;
    addSkill(newSkillForm);
    setNewSkillForm({ name: '', category: 'Technical', level: 'Intermediate' });
    setIsAddSkillOpen(false);
  };

  const technicalSkills = currentUser.skills?.filter(s => s.category === 'Technical') || [];
  const nonTechnicalSkills = currentUser.skills?.filter(s => s.category !== 'Technical') || [];

  return (
    <div className="space-y-8 pb-12">
      {/* Public View Notification Banner */}
      {isPublicView && (
        <div className="bg-amber-50 border border-amber-200 text-amber-900 px-4 py-2.5 rounded-2xl flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Eye size={16} className="text-amber-600" />
            <span><strong>Public Preview Mode Active:</strong> This is how recruiters and campus clients see your portfolio.</span>
          </div>
          <button
            onClick={() => setIsPublicView(false)}
            className="font-bold underline text-amber-700 hover:text-amber-900"
          >
            Switch to Editor View
          </button>
        </div>
      )}

      {/* Profile Header (Module 1) */}
      <ProfileHeader
        user={currentUser}
        onEditProfile={() => {
          setProfileForm({ ...currentUser });
          setIsEditProfileOpen(true);
        }}
        onAddSkill={() => setIsAddSkillOpen(true)}
        onAddProject={openAddProjectModal}
        isPublicView={isPublicView}
        onTogglePublicView={() => setIsPublicView(!isPublicView)}
      />

      {/* Main Grid: Skills, Experience, Education & Portfolio */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Skills & Academic Details */}
        <div className="space-y-6">
          
          {/* Skills Section */}
          <div className="bg-white rounded-2xl border border-surface-border p-6 shadow-soft space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code2 size={18} className="text-brand-600" />
                <h3 className="font-bold text-sm text-surface-text">Skills & Competencies</h3>
              </div>
              {!isPublicView && (
                <button
                  onClick={() => setIsAddSkillOpen(true)}
                  className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                >
                  <Plus size={13} />
                  <span>Add Skill</span>
                </button>
              )}
            </div>

            {/* Technical Skills */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-surface-muted mb-2.5">
                Technical Stack
              </p>
              <div className="flex flex-wrap gap-1.5">
                {technicalSkills.map((sk) => (
                  <SkillBadge
                    key={sk.name}
                    skill={sk}
                    variant="default"
                    onRemove={!isPublicView ? removeSkill : null}
                  />
                ))}
              </div>
            </div>

            {/* Non-Technical / Soft Skills */}
            {nonTechnicalSkills.length > 0 && (
              <div className="pt-2 border-t border-surface-border">
                <p className="text-[11px] font-bold uppercase tracking-wider text-surface-muted mb-2.5">
                  Professional & Soft Skills
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {nonTechnicalSkills.map((sk) => (
                    <SkillBadge
                      key={sk.name}
                      skill={sk}
                      variant="violet"
                      onRemove={!isPublicView ? removeSkill : null}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Education Details */}
          <div className="bg-white rounded-2xl border border-surface-border p-6 shadow-soft space-y-4">
            <div className="flex items-center gap-2">
              <GraduationCap size={18} className="text-brand-600" />
              <h3 className="font-bold text-sm text-surface-text">Education Details</h3>
            </div>

            <div className="space-y-3.5">
              {currentUser.education?.map((edu, idx) => (
                <div key={idx} className="pb-3 border-b border-surface-border/60 last:border-0 last:pb-0">
                  <h4 className="text-xs font-bold text-surface-text">{edu.institution}</h4>
                  <p className="text-[11px] text-brand-600 font-semibold mt-0.5">{edu.degree}</p>
                  <div className="flex justify-between items-center text-[10px] text-surface-muted mt-1">
                    <span>{edu.period}</span>
                    <span className="font-bold text-slate-700">{edu.grade}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-white rounded-2xl border border-surface-border p-6 shadow-soft space-y-4">
            <div className="flex items-center gap-2">
              <Award size={18} className="text-violetAccent-600" />
              <h3 className="font-bold text-sm text-surface-text">Certifications & Honors</h3>
            </div>

            <div className="space-y-3">
              {currentUser.certifications?.map((cert, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-brand-100 text-brand-600 flex items-center justify-center shrink-0">
                    <Award size={16} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-surface-text truncate">{cert.title}</p>
                    <p className="text-[11px] text-surface-muted">{cert.issuer} • {cert.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Portfolio Projects */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <FolderGit2 size={20} className="text-brand-600" />
                <h2 className="text-xl font-extrabold text-surface-text">
                  Showcased Portfolio Projects
                </h2>
              </div>
              <p className="text-xs text-surface-muted mt-0.5">
                Real student applications, hackathon creations, and live repositories
              </p>
            </div>

            {!isPublicView && (
              <button
                onClick={openAddProjectModal}
                className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 self-start sm:self-auto"
              >
                <Plus size={15} />
                <span>Add Portfolio Project</span>
              </button>
            )}
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolio.map((project) => (
              <PortfolioCard
                key={project.id}
                project={project}
                onEdit={!isPublicView ? openEditProjectModal : null}
                onDelete={!isPublicView ? deletePortfolioProject : null}
                isOwner={!isPublicView}
              />
            ))}
          </div>

          {portfolio.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300 p-8 space-y-3">
              <FolderGit2 size={36} className="mx-auto text-slate-300" />
              <h3 className="font-bold text-surface-text text-sm">No portfolio projects yet</h3>
              <p className="text-xs text-surface-muted max-w-sm mx-auto">
                Add projects you built in college courses or hackathons to attract clients.
              </p>
              <button
                onClick={openAddProjectModal}
                className="px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-bold"
              >
                Add Your First Project
              </button>
            </div>
          )}
        </div>

      </div>

      {/* MODAL 1: Edit Profile */}
      <Modal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        title="Edit Student Profile Details"
      >
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-surface-muted mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={profileForm.name || ''}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-surface-border rounded-xl text-xs text-surface-text focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-surface-muted mb-1.5">
                Professional Title
              </label>
              <input
                type="text"
                value={profileForm.title || ''}
                onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                placeholder="e.g. Full-Stack Developer & UI Designer"
                className="w-full px-3 py-2 bg-slate-50 border border-surface-border rounded-xl text-xs text-surface-text focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-surface-muted mb-1.5">
                College / University
              </label>
              <input
                type="text"
                value={profileForm.college || ''}
                onChange={(e) => setProfileForm({ ...profileForm, college: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-surface-border rounded-xl text-xs text-surface-text focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-surface-muted mb-1.5">
                Course & Year
              </label>
              <input
                type="text"
                value={profileForm.course || ''}
                onChange={(e) => setProfileForm({ ...profileForm, course: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-surface-border rounded-xl text-xs text-surface-text focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-surface-muted mb-1.5">
              Short Professional Bio
            </label>
            <textarea
              rows={3}
              value={profileForm.bio || ''}
              onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-surface-border rounded-xl text-xs text-surface-text focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-surface-muted mb-1.5">
                Hourly Rate ($ USD)
              </label>
              <input
                type="number"
                value={profileForm.hourlyRate || ''}
                onChange={(e) => setProfileForm({ ...profileForm, hourlyRate: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 border border-surface-border rounded-xl text-xs text-surface-text focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-surface-muted mb-1.5">
                Starting Project Price ($)
              </label>
              <input
                type="number"
                value={profileForm.startingPrice || ''}
                onChange={(e) => setProfileForm({ ...profileForm, startingPrice: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 border border-surface-border rounded-xl text-xs text-surface-text focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-surface-border flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsEditProfileOpen(false)}
              className="px-4 py-2 rounded-xl border border-surface-border text-xs font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-brand-600 text-white text-xs font-bold hover:bg-brand-700 shadow-sm"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      </Modal>

      {/* MODAL 2: Add Skill */}
      <Modal
        isOpen={isAddSkillOpen}
        onClose={() => setIsAddSkillOpen(false)}
        title="Add a Skill to Your Profile"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleAddSkillSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-surface-muted mb-1.5">
              Skill Name
            </label>
            <input
              type="text"
              value={newSkillForm.name}
              onChange={(e) => setNewSkillForm({ ...newSkillForm, name: e.target.value })}
              placeholder="e.g. Next.js, Framer Motion, Figma"
              className="w-full px-3 py-2 bg-slate-50 border border-surface-border rounded-xl text-xs text-surface-text focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-surface-muted mb-1.5">
                Category
              </label>
              <select
                value={newSkillForm.category}
                onChange={(e) => setNewSkillForm({ ...newSkillForm, category: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-surface-border rounded-xl text-xs text-surface-text focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
              >
                <option value="Technical">Technical</option>
                <option value="Non-Technical">Non-Technical / Soft</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-surface-muted mb-1.5">
                Proficiency Level
              </label>
              <select
                value={newSkillForm.level}
                onChange={(e) => setNewSkillForm({ ...newSkillForm, level: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-surface-border rounded-xl text-xs text-surface-text focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
          </div>

          <div className="pt-3 border-t border-surface-border flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAddSkillOpen(false)}
              className="px-4 py-2 rounded-xl border border-surface-border text-xs font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-brand-600 text-white text-xs font-bold hover:bg-brand-700 shadow-sm"
            >
              Add Skill
            </button>
          </div>
        </form>
      </Modal>

      {/* MODAL 3: Add / Edit Portfolio Project */}
      <Modal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        title={editingProject ? "Edit Portfolio Project" : "Add Portfolio Project"}
      >
        <form onSubmit={handleSaveProject} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-surface-muted mb-1.5">
              Project Title *
            </label>
            <input
              type="text"
              value={projectForm.title}
              onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
              placeholder="e.g. UniEvents - Campus Ticketing Platform"
              required
              className="w-full px-3 py-2 bg-slate-50 border border-surface-border rounded-xl text-xs text-surface-text focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-surface-muted mb-1.5">
              Project Description *
            </label>
            <textarea
              rows={3}
              value={projectForm.description}
              onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
              placeholder="Describe the problem, your solution, features, and metrics (e.g. 4,500+ ticket bookings handled)..."
              required
              className="w-full px-3 py-2 bg-slate-50 border border-surface-border rounded-xl text-xs text-surface-text focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-surface-muted mb-1.5">
              Technologies Used (Comma-separated)
            </label>
            <input
              type="text"
              value={projectForm.technologies}
              onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
              placeholder="React, Tailwind CSS, Node.js, Stripe API"
              className="w-full px-3 py-2 bg-slate-50 border border-surface-border rounded-xl text-xs text-surface-text focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-surface-muted mb-1.5">
              Project Thumbnail Image URL
            </label>
            <input
              type="url"
              value={projectForm.thumbnail}
              onChange={(e) => setProjectForm({ ...projectForm, thumbnail: e.target.value })}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3 py-2 bg-slate-50 border border-surface-border rounded-xl text-xs text-surface-text focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-surface-muted mb-1.5">
                GitHub Repository URL
              </label>
              <input
                type="url"
                value={projectForm.githubUrl}
                onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                placeholder="https://github.com/..."
                className="w-full px-3 py-2 bg-slate-50 border border-surface-border rounded-xl text-xs text-surface-text focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-surface-muted mb-1.5">
                Live Demo / Vercel URL
              </label>
              <input
                type="url"
                value={projectForm.liveUrl}
                onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                placeholder="https://project-demo.vercel.app"
                className="w-full px-3 py-2 bg-slate-50 border border-surface-border rounded-xl text-xs text-surface-text focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
              />
            </div>
          </div>

          <div className="pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-surface-text">
              <input
                type="checkbox"
                checked={projectForm.featured}
                onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
              />
              <span className="font-semibold">Feature this project at the top of your portfolio</span>
            </label>
          </div>

          <div className="pt-3 border-t border-surface-border flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsProjectModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-surface-border text-xs font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-brand-600 text-white text-xs font-bold hover:bg-brand-700 shadow-sm"
            >
              {editingProject ? "Update Project" : "Publish Project"}
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};

export default StudentProfile;

