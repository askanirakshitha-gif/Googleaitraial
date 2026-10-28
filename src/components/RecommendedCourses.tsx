import React from 'react';
import { useEdu } from '../context/EduContext';
import { CourseThumbnail } from './AcademicIllustrations';
import { Compass, Clock, Star, Users, Check, ArrowRight } from 'lucide-react';

export const RecommendedCourses: React.FC = () => {
  const { recommendations, enrollInCourse } = useEdu();

  if (recommendations.length === 0) {
    return (
      <div className="bg-white border border-[#E5E2DA] rounded-xl p-6 text-center shadow-2xs">
        <Compass className="w-8 h-8 text-[#829681] mx-auto mb-2" />
        <h3 className="font-serif text-base font-bold text-[#172638]">
          All Recommended Courses Enrolled
        </h3>
        <p className="text-xs text-[#697586] mt-1">
          Explore additional electives and specializations in the Explore Courses catalog.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-serif text-lg font-bold text-[#172638] tracking-tight">
            Recommended for You
          </h3>
          <p className="text-xs text-[#697586] mt-0.5">
            Curated electives based on your active degree pathway & course completion
          </p>
        </div>
        <span className="text-[11px] font-mono text-[#829681] hidden sm:block">
          {recommendations.length} Suggestions Available
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="bg-white border border-[#E5E2DA] rounded-xl shadow-2xs hover:border-[#829681] hover:shadow-xs transition-all flex flex-col justify-between overflow-hidden group"
          >
            {/* Visual Header */}
            <div className="h-28 w-full relative">
              <CourseThumbnail
                courseId={rec.id}
                category={rec.category}
                title={rec.title}
                className="h-full"
              />
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                {/* Recommendation Reason Tag (Subtle unboxed typography with Warm Gold highlight) */}
                <div className="text-[11px] font-medium text-[#C5A46D] mb-1.5 flex items-center gap-1">
                  <span>★ {rec.reason}</span>
                </div>

                <h4 className="font-serif text-base font-bold text-[#172638] group-hover:text-[#24364B] transition-colors leading-snug">
                  {rec.title}
                </h4>

                <p className="text-xs text-[#697586] mt-2 line-clamp-2 leading-relaxed">
                  {rec.description}
                </p>

                {/* Metadata */}
                <div className="flex items-center gap-3 text-[11px] text-[#697586] mt-3 font-medium">
                  <span className="text-[#829681]">{rec.difficulty}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3 text-[#829681]" /> {rec.estimatedDuration}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1 text-[#24364B] font-mono">
                    <Star className="w-3 h-3 text-[#C5A46D] fill-[#C5A46D]" /> {rec.rating}
                  </span>
                </div>
              </div>

              {/* Action: 1-click enroll */}
              <div className="mt-5 pt-3 border-t border-[#E5E2DA]/80">
                <button
                  onClick={() => enrollInCourse(rec.id)}
                  className="w-full py-2 px-3 bg-white hover:bg-[#F8F6F1] text-[#24364B] hover:text-[#172638] text-xs font-semibold rounded-lg border border-[#E5E2DA] hover:border-[#24364B] transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <span>Explore Course & Enroll</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#829681]" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
