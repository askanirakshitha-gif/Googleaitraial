import React, { useState } from 'react';
import { useEdu } from '../context/EduContext';
import { CourseThumbnail } from '../components/AcademicIllustrations';
import { Compass, Clock, Star, Users, Check, Sparkles, Search } from 'lucide-react';

export const ExploreCoursesView: React.FC = () => {
  const { recommendations, enrollInCourse, courses } = useEdu();
  const [filterDifficulty, setFilterDifficulty] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Extended catalog items
  const catalogElectives = [
    ...recommendations,
    {
      id: 'cat-crypto',
      title: 'Applied Cryptography & Network Security',
      category: 'Systems & Architecture',
      difficulty: 'Advanced' as const,
      estimatedDuration: '22 hours',
      instructor: 'Prof. Nathan Reed',
      reason: 'Department Elective',
      description: 'Symmetric and asymmetric ciphers, zero-knowledge proofs, elliptic curve arithmetic, and TLS protocol verification.',
      rating: 4.89,
      enrolledCount: 840
    },
    {
      id: 'cat-ux-design',
      title: 'Human-Centered Design Systems',
      category: 'Full-Stack Engineering',
      difficulty: 'Beginner' as const,
      estimatedDuration: '16 hours',
      instructor: 'Claire Dupont',
      reason: 'General Elective',
      description: 'Typography geometry, WCAG accessibility constraints, design tokens, micro-interactions, and component architecture.',
      rating: 4.93,
      enrolledCount: 1750
    }
  ];

  const filteredElectives = catalogElectives.filter((item) => {
    const matchesDiff = filterDifficulty === 'All' || item.difficulty === filterDifficulty;
    const matchesSearch = 
      !searchTerm ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDiff && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E2DA]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#829681] mb-1">
            <Compass className="w-4 h-4 text-[#C5A46D]" />
            <span>ACADEMIC ELECTIVES & CATALOG</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#172638] tracking-tight">
            Explore Courses & Specializations
          </h2>
          <p className="text-xs text-[#697586] mt-0.5">
            Discover faculty-approved electives to expand your computational foundations
          </p>
        </div>

        {/* Filter by difficulty */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="text-xs text-[#697586] font-medium">Difficulty:</span>
          {['All', 'Beginner', 'Intermediate', 'Advanced'].map((diff) => (
            <button
              key={diff}
              onClick={() => setFilterDifficulty(diff)}
              className={`px-2.5 py-1 text-xs rounded-md border transition-all ${
                filterDifficulty === diff
                  ? 'bg-[#24364B] text-white border-[#24364B]'
                  : 'bg-white text-[#697586] border-[#E5E2DA] hover:bg-[#F8F6F1]'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredElectives.map((item) => {
          const isAlreadyEnrolled = courses.some(
            (c) => c.title.toLowerCase() === item.title.toLowerCase()
          );

          return (
            <div
              key={item.id}
              className="bg-white border border-[#E5E2DA] rounded-xl shadow-2xs hover:border-[#829681] hover:shadow-xs transition-all flex flex-col justify-between overflow-hidden group"
            >
              <div className="h-32 w-full relative">
                <CourseThumbnail
                  courseId={item.id}
                  category={item.category}
                  title={item.title}
                  className="h-full"
                />
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-[#697586] mb-1.5">
                    <span className="font-medium text-[#829681]">{item.category}</span>
                    <span className="text-[#C5A46D] font-mono font-medium">{item.reason}</span>
                  </div>

                  <h3 className="font-serif text-base font-bold text-[#172638] group-hover:text-[#24364B] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#697586] mt-2 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex items-center gap-3 text-[11px] text-[#697586] mt-3 font-medium">
                    <span>{item.difficulty}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 text-[#829681]" /> {item.estimatedDuration}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1 text-[#24364B] font-mono">
                      <Star className="w-3 h-3 text-[#C5A46D] fill-[#C5A46D]" /> {item.rating}
                    </span>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-[#E5E2DA]/80">
                  {isAlreadyEnrolled ? (
                    <div className="w-full py-2 px-3 bg-[#47765C]/10 text-[#47765C] text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5">
                      <Check className="w-3.5 h-3.5" /> Enrolled in Curriculum
                    </div>
                  ) : (
                    <button
                      onClick={() => enrollInCourse(item.id)}
                      className="w-full py-2 px-3 bg-[#24364B] hover:bg-[#172638] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                    >
                      <span>Enroll in Course</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
