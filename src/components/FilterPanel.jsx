import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';
import { sampleColleges } from '../data/mockData';

export const FilterPanel = ({
  categories = [],
  selectedCategory = 'All',
  onSelectCategory,
  selectedCollege = 'All Colleges',
  onSelectCollege,
  selectedExperience = 'All',
  onSelectExperience,
  priceRange = [0, 200],
  onPriceChange,
  sortBy = 'popular',
  onSortChange,
  onReset,
  showCollegeFilter = true,
  showExperienceFilter = true,
  showPriceFilter = true
}) => {
  return (
    <div className="bg-white rounded-2xl border border-surface-border p-5 shadow-soft space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-surface-border">
        <div className="flex items-center gap-2 font-bold text-surface-text text-sm">
          <Filter size={16} className="text-brand-600" />
          <span>Filters</span>
        </div>
        {onReset && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs text-brand-600 hover:text-brand-700 font-semibold transition-colors"
          >
            <RotateCcw size={12} />
            <span>Reset All</span>
          </button>
        )}
      </div>

      {/* Categories */}
      {categories && categories.length > 0 && (
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-surface-muted mb-2.5">
            Category
          </label>
          <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
            <button
              onClick={() => onSelectCategory('All')}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                selectedCategory === 'All'
                  ? 'bg-brand-50 text-brand-700 font-semibold'
                  : 'text-surface-text hover:bg-slate-100'
              }`}
            >
              <span>All Categories</span>
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id || cat.name}
                onClick={() => onSelectCategory(cat.name)}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                  selectedCategory === cat.name
                    ? 'bg-brand-50 text-brand-700 font-semibold'
                    : 'text-surface-text hover:bg-slate-100'
                }`}
              >
                <span className="truncate">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* College Filter */}
      {showCollegeFilter && (
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-surface-muted mb-2.5">
            University / College
          </label>
          <select
            value={selectedCollege}
            onChange={(e) => onSelectCollege(e.target.value)}
            className="w-full text-xs bg-slate-50 border border-surface-border rounded-xl px-3 py-2 text-surface-text focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
          >
            {sampleColleges.map((col) => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Experience Level */}
      {showExperienceFilter && (
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-surface-muted mb-2.5">
            Experience Level
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {['All', 'Beginner', 'Intermediate', 'Advanced', 'Expert'].map((exp) => (
              <button
                key={exp}
                onClick={() => onSelectExperience(exp)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all text-center ${
                  selectedExperience === exp
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-slate-50 text-surface-muted border border-surface-border hover:bg-slate-100'
                }`}
              >
                {exp}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Price Range Slider */}
      {showPriceFilter && onPriceChange && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold uppercase tracking-wider text-surface-muted">
              Max Budget / Price
            </label>
            <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-md">
              Up to ${priceRange[1]}
            </span>
          </div>
          <input
            type="range"
            min="20"
            max="500"
            step="10"
            value={priceRange[1]}
            onChange={(e) => onPriceChange([priceRange[0], Number(e.target.value)])}
            className="w-full accent-brand-600 cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-surface-muted mt-1">
            <span>$20</span>
            <span>$500+</span>
          </div>
        </div>
      )}

      {/* Sort By */}
      {onSortChange && (
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-surface-muted mb-2.5">
            Sort Results By
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full text-xs bg-slate-50 border border-surface-border rounded-xl px-3 py-2 text-surface-text focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
          >
            <option value="popular">Most Popular / Recommended</option>
            <option value="rating">Highest Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Recently Active</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;

