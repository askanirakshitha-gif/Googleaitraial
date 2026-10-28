import React, { useState } from 'react';
import { useEdu } from '../context/EduContext';
import { CourseCard } from '../components/CourseCard';
import { BookOpen, Search, ArrowUpDown, Filter, Sparkles } from 'lucide-react';

export const MyCoursesView: React.FC = () => {
  const { courses, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useEdu();
  const [sortBy, setSortBy] = useState<'progress' | 'title' | 'lessons'>('progress');

  const categories = ['All', 'Full-Stack Engineering', 'Data Science', 'Systems & Architecture', 'Artificial Intelligence'];

  const filteredAndSorted = courses
    .filter((c) => {
      const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
      const matchesSearch = 
        !searchQuery ||
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.instructor.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'progress') return b.progress - a.progress;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'lessons') return b.completedLessons - a.completedLessons;
      return 0;
    });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E2DA]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#829681] mb-1">
            <BookOpen className="w-4 h-4 text-[#C5A46D]" />
            <span>ENROLLED CURRICULUM ({courses.length})</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#172638] tracking-tight">
            My Courses & Syllabi
          </h2>
          <p className="text-xs text-[#697586] mt-0.5">
            Monitor lecture progress, review problem set requirements, and access recitations
          </p>
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <ArrowUpDown className="w-3.5 h-3.5 text-[#697586]" />
          <span className="text-xs text-[#697586] font-medium">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e: any) => setSortBy(e.target.value)}
            className="text-xs bg-white border border-[#E5E2DA] rounded-lg px-2.5 py-1.5 text-[#263238] focus:outline-hidden focus:border-[#24364B]"
          >
            <option value="progress">Completion Rate (High to Low)</option>
            <option value="lessons">Lessons Finished</option>
            <option value="title">Course Title (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-[#24364B] text-white shadow-2xs'
                : 'bg-white text-[#697586] hover:text-[#172638] border border-[#E5E2DA]'
            }`}
          >
            {cat === 'All' ? 'All Disciplines' : cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filteredAndSorted.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredAndSorted.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-[#E5E2DA] rounded-xl p-10 text-center">
          <Search className="w-10 h-10 text-[#829681] mx-auto mb-3" />
          <h3 className="font-serif text-lg font-bold text-[#172638]">
            No courses match the criteria
          </h3>
          <p className="text-xs text-[#697586] mt-1 max-w-sm mx-auto">
            Try adjusting your search terms or select &quot;All Disciplines&quot;.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="mt-4 px-4 py-2 text-xs font-semibold bg-[#24364B] text-white rounded-md hover:bg-[#172638]"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};
