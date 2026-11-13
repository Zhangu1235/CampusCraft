import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Compass, Sparkles, Filter, DollarSign, Calendar, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { categories } from '../data/mockData';
import ProjectCard from '../components/ProjectCard';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import Modal from '../components/Modal';

export const ExploreProjects = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { projects, applyToProject, applications, showToast } = useApp();

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedExperience, setSelectedExperience] = useState('All');
  const [budgetRange, setBudgetRange] = useState([0, 400]);
  const [sortBy, setSortBy] = useState('newest');

  // Apply Modal state
  const [applyingProject, setApplyingProject] = useState(null);
  const [proposalForm, setProposalForm] = useState({
    bidAmount: 250,
    timeline: '10 days',
    coverLetter: ''
  });

  // Handle URL query trigger (e.g. ?apply=proj-1)
  useEffect(() => {
    const applyId = searchParams.get('apply');
    if (applyId) {
      const targetProj = projects.find(p => p.id === applyId);
      if (targetProj) {
        handleOpenApply(targetProj);
      }
      setSearchParams({});
    }
  }, [searchParams, projects]);

  const handleOpenApply = (proj) => {
    setApplyingProject(proj);
    setProposalForm({
      bidAmount: proj.budget || 200,
      timeline: proj.duration || '1-2 weeks',
      coverLetter: `Hi ${proj.client?.name || 'Client'}, I have extensive experience in ${proj.requiredSkills?.slice(0, 2).join(' and ') || 'this field'}. I would love to tackle this project and deliver high quality code on time.`
    });
  };

  const handleSubmitProposal = (e) => {
    e.preventDefault();
    if (!applyingProject) return;

    applyToProject(applyingProject.id, proposalForm);
    setApplyingProject(null);
  };

  const isAlreadyApplied = (projId) => {
    return applications.some(a => a.projectId === projId);
  };

  // Filtered & Sorted Projects
  const filteredProjects = useMemo(() => {
    return projects.filter((proj) => {
      const matchesSearch = !searchTerm ||
        proj.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proj.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proj.client?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proj.requiredSkills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = selectedCategory === 'All' || proj.category === selectedCategory;
      const matchesExp = selectedExperience === 'All' || proj.experienceLevel === selectedExperience;
      const matchesBudget = proj.budget <= budgetRange[1];

      return matchesSearch && matchesCategory && matchesExp && matchesBudget;
    }).sort((a, b) => {
      if (sortBy === 'price-high') return b.budget - a.budget;
      if (sortBy === 'price-low') return a.budget - b.budget;
      return (b.proposalsCount || 0) - (a.proposalsCount || 0);
    });
  }, [projects, searchTerm, selectedCategory, selectedExperience, budgetRange, sortBy]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedExperience('All');
    setBudgetRange([0, 400]);
    setSortBy('newest');
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-brand-600 via-indigo-600 to-violetAccent-600 rounded-3xl p-8 text-white shadow-soft relative overflow-hidden">
        <div className="max-w-3xl space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-white/15 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
            <Compass size={14} className="text-amber-300" />
            <span>Campus Freelance Opportunities</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Explore Open Projects & Gigs
          </h1>
          <p className="text-xs sm:text-sm text-brand-100 max-w-xl leading-relaxed">
            Bid on active projects from campus clubs, college departments, student ventures, and external clients. Clear budgets, milestone tracking, and secured escrow payouts.
          </p>
        </div>
      </div>

      {/* Grid Layout: Filters on Left, Projects on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Column: Filters */}
        <div className="lg:col-span-1 space-y-4">
          <FilterPanel
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            showCollegeFilter={false}
            selectedExperience={selectedExperience}
            onSelectExperience={setSelectedExperience}
            priceRange={budgetRange}
            onPriceChange={setBudgetRange}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onReset={resetFilters}
          />
        </div>

        {/* Right Column: Projects Feed */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search projects by keyword, tech stack, or client..."
              className="max-w-md"
            />
            <div className="text-xs font-bold text-surface-muted self-end sm:self-auto">
              Found <span className="text-brand-600 font-extrabold">{filteredProjects.length}</span> open projects
            </div>
          </div>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((proj) => (
              <ProjectCard
                key={proj.id}
                project={proj}
                onApply={handleOpenApply}
                isApplied={isAlreadyApplied(proj.id)}
              />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-surface-border p-8 space-y-3">
              <Compass size={40} className="mx-auto text-slate-300" />
              <h3 className="font-bold text-surface-text text-base">No open projects match criteria</h3>
              <p className="text-xs text-surface-muted max-w-sm mx-auto">
                Try widening your budget filter or selecting all categories.
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-brand-600 text-white rounded-xl text-xs font-bold hover:bg-brand-700 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Apply to Project Modal */}
      <Modal
        isOpen={!!applyingProject}
        onClose={() => setApplyingProject(null)}
        title={applyingProject ? `Submit Proposal: ${applyingProject.title}` : "Apply Now"}
      >
        {applyingProject && (
          <form onSubmit={handleSubmitProposal} className="space-y-4">
            <div className="p-3 bg-slate-50 rounded-xl border border-surface-border text-xs space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-bold text-surface-text">Client Budget: ${applyingProject.budget}</span>
                <span className="text-brand-600 font-semibold">{applyingProject.category}</span>
              </div>
              <p className="text-surface-muted text-[11px] line-clamp-2">{applyingProject.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-surface-muted mb-1.5">
                  Your Bid Amount ($ USD)
                </label>
                <input
                  type="number"
                  min="20"
                  value={proposalForm.bidAmount}
                  onChange={(e) => setProposalForm({ ...proposalForm, bidAmount: Number(e.target.value) })}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-surface-border rounded-xl text-xs text-surface-text focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-surface-muted mb-1.5">
                  Proposed Timeline
                </label>
                <input
                  type="text"
                  value={proposalForm.timeline}
                  onChange={(e) => setProposalForm({ ...proposalForm, timeline: e.target.value })}
                  placeholder="e.g. 10 days"
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-surface-border rounded-xl text-xs text-surface-text focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-surface-muted mb-1.5">
                Cover Letter / Pitch to Client *
              </label>
              <textarea
                rows={4}
                value={proposalForm.coverLetter}
                onChange={(e) => setProposalForm({ ...proposalForm, coverLetter: e.target.value })}
                required
                placeholder="Explain why you are the best fit, highlight relevant course projects or GitHub code, and outline your approach..."
                className="w-full px-3 py-2 bg-slate-50 border border-surface-border rounded-xl text-xs text-surface-text focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
              />
            </div>

            <div className="p-3 bg-brand-50 border border-brand-100 rounded-xl text-xs text-brand-800">
              <span className="font-bold block">CampusCraft Guarantee:</span>
              <p className="text-[11px] leading-snug">
                Upon proposal acceptance, the client deposits the full amount into escrow before you begin work.
              </p>
            </div>

            <div className="pt-3 border-t border-surface-border flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setApplyingProject(null)}
                className="px-4 py-2 rounded-xl border border-surface-border text-xs font-semibold hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-brand-600 text-white text-xs font-bold hover:bg-brand-700 shadow-sm flex items-center gap-1.5"
              >
                <Send size={13} />
                <span>Submit Proposal</span>
              </button>
            </div>
          </form>
        )}
      </Modal>

    </div>
  );
};

export default ExploreProjects;

