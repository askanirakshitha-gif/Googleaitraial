import React from 'react';
import { useEdu } from '../context/EduContext';
import { Play, Sparkles, Compass, ArrowRight } from 'lucide-react';

export const WelcomeSection: React.FC = () => {
  const { courses, openLessonModal, setActiveTab } = useEdu();

  // Find active course with lowest completion to continue or first course
  const activeCourse = courses.find((c) => c.progress > 0 && c.progress < 100) || courses[0];

  const handleContinueLearning = () => {
    if (activeCourse) {
      openLessonModal(activeCourse);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#172638] via-[#24364B] to-[#1e3247] text-[#F8F6F1] border border-[#24364B] p-6 sm:p-8 shadow-sm">
      {/* Subtle classical architectural grid overlay */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#C5A46D 1.2px, transparent 1.2px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Decorative celestial compass / academic watermark ring */}
      <div className="absolute -right-12 -bottom-16 w-64 h-64 border border-[#C5A46D]/15 rounded-full pointer-events-none flex items-center justify-center">
        <div className="w-48 h-48 border border-[#829681]/20 rounded-full" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#C5A46D]/15 border border-[#C5A46D]/30 text-[#C5A46D] text-[11px] font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Academic Term 2026 · Week 7</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F8F6F1] leading-tight text-balance">
            Your learning journey, beautifully organized.
          </h2>

          <p className="mt-2.5 text-xs sm:text-sm text-[#F8F6F1]/80 leading-relaxed max-w-xl">
            You have maintained a 7-day study streak and completed 84% of this month’s target. 
            Pick up precisely where you left off in {activeCourse ? activeCourse.title : 'your active courses'}.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={handleContinueLearning}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C5A46D] text-[#172638] font-semibold text-xs rounded-lg hover:bg-[#d6b780] active:scale-98 transition-all shadow-sm group"
            >
              <Play className="w-3.5 h-3.5 fill-current transition-transform group-hover:scale-110" />
              <span>Continue Learning</span>
              <span className="text-[11px] font-mono text-[#172638]/70 font-normal">
                ({activeCourse?.code})
              </span>
            </button>

            <button
              onClick={() => setActiveTab('explore')}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/15 text-[#F8F6F1] font-medium text-xs rounded-lg border border-white/15 transition-all"
            >
              <Compass className="w-3.5 h-3.5 text-[#829681]" />
              <span>Explore Curriculum</span>
              <ArrowRight className="w-3 h-3 text-[#F8F6F1]/60" />
            </button>
          </div>
        </div>

        {/* Right side teaser box for active lesson */}
        {activeCourse && (
          <div className="shrink-0 w-full md:w-72 bg-white/5 backdrop-blur-xs border border-white/10 rounded-lg p-4 text-xs">
            <span className="text-[10px] font-mono text-[#829681] uppercase tracking-wider block mb-1">
              Next Up in Sequence
            </span>
            <p className="font-serif text-sm font-semibold text-[#F8F6F1] line-clamp-1">
              {activeCourse.nextLessonTitle}
            </p>
            <p className="text-[11px] text-[#F8F6F1]/70 mt-0.5">
              {activeCourse.instructor} · {activeCourse.nextLessonDuration}
            </p>

            <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px]">
              <span className="text-[#829681]">Course Progress</span>
              <span className="font-mono text-[#C5A46D] font-medium">{activeCourse.progress}%</span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-1.5">
              <div 
                className="bg-[#C5A46D] h-full transition-all duration-300"
                style={{ width: `${activeCourse.progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
