import React from 'react';
import { useEdu } from '../context/EduContext';
import { WelcomeSection } from '../components/WelcomeSection';
import { StatsCardOverview } from '../components/StatsCard';
import { CourseCard } from '../components/CourseCard';
import { UpcomingClasses } from '../components/UpcomingClasses';
import { RecommendedCourses } from '../components/RecommendedCourses';
import { LearningAnalytics } from '../components/LearningAnalytics';
import { AssignmentList } from '../components/AssignmentList';
import { BookOpen, Search, Filter, Compass } from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { 
    courses, 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory,
    setActiveTab 
  } = useEdu();

  const categories = ['All', 'Full-Stack Engineering', 'Data Science', 'Systems & Architecture', 'Artificial Intelligence'];

  // Filter courses based on category and live search query
  const filteredCourses = courses.filter((c) => {
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesSearch = 
      !searchQuery ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* C. Welcome Section */}
      <section aria-label="Academic Welcome Banner">
        <WelcomeSection />
      </section>

      {/* D. Learning Overview Summary Cards */}
      <section aria-label="Key Performance Indicators">
        <StatsCardOverview />
      </section>

      {/* E. My Courses Section */}
      <section aria-label="Enrolled Courses" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#172638] tracking-tight">
              My Courses
            </h2>
            <p className="text-xs text-[#697586] mt-0.5">
              Active curriculum courses, recitations, and progress tracking
            </p>
          </div>

          <button
            onClick={() => setActiveTab('courses')}
            className="text-xs font-semibold text-[#24364B] hover:text-[#172638] flex items-center gap-1 self-start sm:self-center"
          >
            <span>View Full Curriculum</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>

        {/* Functional Interactive Category Filters (Segmented tab buttons) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#24364B] text-white shadow-2xs'
                    : 'bg-white text-[#697586] hover:text-[#172638] border border-[#E5E2DA]'
                }`}
              >
                {cat === 'All' ? 'All Disciplines' : cat}
              </button>
            );
          })}
        </div>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-[#E5E2DA] rounded-xl p-8 text-center">
            <Search className="w-8 h-8 text-[#829681] mx-auto mb-2" />
            <h3 className="font-serif text-base font-bold text-[#172638]">
              No matching courses found
            </h3>
            <p className="text-xs text-[#697586] mt-1 max-w-sm mx-auto">
              No enrolled courses matched &quot;{searchQuery}&quot; in the &quot;{selectedCategory}&quot; category.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-3 px-3.5 py-1.5 text-xs font-semibold bg-[#24364B] text-white rounded-md hover:bg-[#172638] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* F & I: Upcoming Classes & Upcoming Deadlines in balanced 2-column layout */}
      <section aria-label="Schedule & Deliverables" className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <UpcomingClasses />
        <AssignmentList />
      </section>

      {/* H. Learning Progress Analytics */}
      <section aria-label="Weekly Learning Analytics">
        <LearningAnalytics />
      </section>

      {/* G. Personalized Learning Recommendations */}
      <section aria-label="Personalized Recommendations">
        <RecommendedCourses />
      </section>
    </div>
  );
};
