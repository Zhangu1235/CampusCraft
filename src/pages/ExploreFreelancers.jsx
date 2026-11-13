import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, Filter, Sparkles, Users, Briefcase, GraduationCap } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { categories, sampleColleges } from '../data/mockData';
import FreelancerCard from '../components/FreelancerCard';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import Modal from '../components/Modal';

export const ExploreFreelancers = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { freelancers, createOrder, startConversationWith, showToast } = useApp();

  // Search and Filter states
  const categoryParam = searchParams.get('category') || 'All';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedCollege, setSelectedCollege] = useState('All Colleges');
  const [selectedExperience, setSelectedExperience] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 250]);
  const [sortBy, setSortBy] = useState('popular');

  // Hire Modal state
  const [hiringFreelancer, setHiringFreelancer] = useState(null);
  const [hireForm, setHireForm] = useState({
    projectTitle: '',
    agreedAmount: 150,
    deliveryDays: 7,
    scope: '',
    revisionPolicy: '2 free revisions included'
  });

  // Filtered & Sorted Freelancers
  const filteredFreelancers = useMemo(() => {
    return freelancers.filter((fl) => {
      // Search matches name, skills, bio, or college
      const matchesSearch = !searchTerm || 
        fl.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fl.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fl.college.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fl.skills.some(s => (typeof s === 'string' ? s : s.name).toLowerCase().includes(searchTerm.toLowerCase()));

      // Category matches
      const matchesCategory = selectedCategory === 'All' || fl.category === selectedCategory;

      // College matches
      const matchesCollege = selectedCollege === 'All Colleges' || fl.college.toLowerCase().includes(selectedCollege.toLowerCase());

      // Experience matches
      const matchesExp = selectedExperience === 'All' || fl.experienceLevel === selectedExperience;

      // Price matches
      const matchesPrice = fl.startingPrice <= priceRange[1];

      return matchesSearch && matchesCategory && matchesCollege && matchesExp && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-low') return a.startingPrice - b.startingPrice;
      if (sortBy === 'price-high') return b.startingPrice - a.startingPrice;
      if (sortBy === 'newest') return b.completedProjects - a.completedProjects;
      return b.rating * b.reviewsCount - a.rating * a.reviewsCount; // popularity
    });
  }, [freelancers, searchTerm, selectedCategory, selectedCollege, selectedExperience, priceRange, sortBy]);

  const handleHireClick = (freelancer) => {
    setHiringFreelancer(freelancer);
    setHireForm({
      projectTitle: `Project with ${freelancer.name}`,
      agreedAmount: freelancer.startingPrice || 120,
      deliveryDays: 7,
      scope: `Deliverables: 1 high quality project according to specs discussed.`,
      revisionPolicy: '2 free revisions included within 7 days of delivery.'
    });
  };

  const handleConfirmHire = (e) => {
    e.preventDefault();
    if (!hireForm.projectTitle.trim()) return;

    // Create order with escrow protection
    const deliveryDateObj = new Date();
    deliveryDateObj.setDate(deliveryDateObj.getDate() + Number(hireForm.deliveryDays));

    const newOrder = createOrder({
      serviceTitle: hireForm.projectTitle,
      clientName: "Campus Client (You)",
      freelancerName: hiringFreelancer.name,
      agreedAmount: Number(hireForm.agreedAmount),
      deliveryDate: deliveryDateObj.toISOString().split('T')[0],
      scope: hireForm.scope,
      revisionPolicy: hireForm.revisionPolicy
    });

    // Start a chat conversation
    startConversationWith(
      hiringFreelancer,
      `Hi ${hiringFreelancer.name}! I just hired you for "${hireForm.projectTitle}" ($${hireForm.agreedAmount} secured in escrow). Looking forward to collaborating!`,
      hireForm.projectTitle
    );

    setHiringFreelancer(null);
    navigate('/dashboard/orders');
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedCollege('All Colleges');
    setSelectedExperience('All');
    setPriceRange([0, 250]);
    setSortBy('popular');
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-brand-600 via-indigo-600 to-violetAccent-600 rounded-3xl p-8 text-white shadow-soft relative overflow-hidden">
        <div className="max-w-3xl space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-white/15 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
            <Sparkles size={13} className="text-amber-300" />
            <span>Collegiate Talent Pool</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Discover Verified Student Freelancers
          </h1>
          <p className="text-xs sm:text-sm text-brand-100 max-w-xl leading-relaxed">
            Hire talented college developers, UI/UX designers, video creators, and writers. All verified with college credentials and protected with guaranteed milestone escrow.
          </p>
        </div>
      </div>

      {/* Main Filter & Results Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Column: Filter Panel */}
        <div className="lg:col-span-1 space-y-4">
          <FilterPanel
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              setSearchParams(cat === 'All' ? {} : { category: cat });
            }}
            selectedCollege={selectedCollege}
            onSelectCollege={setSelectedCollege}
            selectedExperience={selectedExperience}
            onSelectExperience={setSelectedExperience}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onReset={resetFilters}
          />
        </div>

        {/* Right Column: Search + Freelancer Cards */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search bar and counter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search by student name, college (e.g. IIT, BITS), or skill..."
              className="max-w-md"
            />
            <div className="text-xs font-bold text-surface-muted self-end sm:self-auto">
              Showing <span className="text-brand-600 font-extrabold">{filteredFreelancers.length}</span> student freelancers
            </div>
          </div>

          {/* Freelancer Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
            {filteredFreelancers.map((fl) => (
              <FreelancerCard
                key={fl.id}
                freelancer={fl}
                onHire={handleHireClick}
              />
            ))}
          </div>

          {filteredFreelancers.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-surface-border p-8 space-y-3">
              <Users size={40} className="mx-auto text-slate-300" />
              <h3 className="font-bold text-surface-text text-base">No freelancers match your filters</h3>
              <p className="text-xs text-surface-muted max-w-sm mx-auto">
                Try widening your price range, clearing specific colleges, or searching with broader keywords.
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-brand-600 text-white rounded-xl text-xs font-bold hover:bg-brand-700 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Hire Student Modal */}
      <Modal
        isOpen={!!hiringFreelancer}
        onClose={() => setHiringFreelancer(null)}
        title={hiringFreelancer ? `Hire ${hiringFreelancer.name} with Escrow Protection` : "Hire Student"}
      >
        {hiringFreelancer && (
          <form onSubmit={handleConfirmHire} className="space-y-4">
            {/* Freelancer Header Preview */}
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-surface-border">
              <img
                src={hiringFreelancer.avatar}
                alt={hiringFreelancer.name}
                className="w-12 h-12 rounded-xl object-cover"
              />
              <div>
                <h4 className="font-bold text-xs text-surface-text">{hiringFreelancer.name}</h4>
                <p className="text-[11px] text-brand-600 font-medium">{hiringFreelancer.title}</p>
                <p className="text-[10px] text-surface-muted">{hiringFreelancer.college}</p>
              </div>
            </div>

            {/* Project Title */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-surface-muted mb-1.5">
                Project Name / Headline *
              </label>
              <input
                type="text"
                value={hireForm.projectTitle}
                onChange={(e) => setHireForm({ ...hireForm, projectTitle: e.target.value })}
                required
                placeholder="e.g. Redesign Campus Fest Booking Screen"
                className="w-full px-3 py-2 bg-slate-50 border border-surface-border rounded-xl text-xs text-surface-text focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-surface-muted mb-1.5">
                  Agreed Amount ($ USD)
                </label>
                <input
                  type="number"
                  min="20"
                  value={hireForm.agreedAmount}
                  onChange={(e) => setHireForm({ ...hireForm, agreedAmount: Number(e.target.value) })}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-surface-border rounded-xl text-xs text-surface-text focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-surface-muted mb-1.5">
                  Delivery Timeline (Days)
                </label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={hireForm.deliveryDays}
                  onChange={(e) => setHireForm({ ...hireForm, deliveryDays: Number(e.target.value) })}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-surface-border rounded-xl text-xs text-surface-text focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-surface-muted mb-1.5">
                Work Scope & Deliverables
              </label>
              <textarea
                rows={2}
                value={hireForm.scope}
                onChange={(e) => setHireForm({ ...hireForm, scope: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-surface-border rounded-xl text-xs text-surface-text focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
              />
            </div>

            {/* Escrow Guarantee Notice */}
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 space-y-1">
              <span className="font-bold block">100% Escrow Guarantee</span>
              <p className="text-[11px] leading-snug">
                Your payment of ${hireForm.agreedAmount} is held securely in escrow. Funds are only transferred after you review and approve the final deliverables.
              </p>
            </div>

            <div className="pt-3 border-t border-surface-border flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setHiringFreelancer(null)}
                className="px-4 py-2 rounded-xl border border-surface-border text-xs font-semibold hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-brand-600 text-white text-xs font-bold hover:bg-brand-700 shadow-sm"
              >
                Fund Escrow & Confirm Hire
              </button>
            </div>
          </form>
        )}
      </Modal>

    </div>
  );
};

export default ExploreFreelancers;

