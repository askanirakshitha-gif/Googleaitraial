import React from 'react';
import { Course } from '../types';
import { CourseThumbnail } from './AcademicIllustrations';
import { useEdu } from '../context/EduContext';
import { Play, BookOpen, Clock, User } from 'lucide-react';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { openLessonModal } = useEdu();

  return (
    <div className="bg-white border border-[#E5E2DA] rounded-xl shadow-2xs hover:border-[#829681] hover:shadow-xs transition-all flex flex-col overflow-hidden group">
      {/* Thumbnail Illustration (4:3 aspect ratio) */}
      <div className="h-36 sm:h-40 w-full relative">
        <CourseThumbnail 
          courseId={course.id} 
          category={course.category} 
          title={course.title} 
          className="h-full"
        />
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata: Category & Difficulty (Clean unboxed text separated by · per zero-pill discipline) */}
          <div className="flex items-center gap-2 text-[11px] text-[#697586] mb-1.5 font-medium">
            <span className="font-mono text-[#24364B] font-semibold">{course.code}</span>
            <span aria-hidden="true">·</span>
            <span>{course.category}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#829681]">{course.difficulty}</span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => openLessonModal(course)}
            className="font-serif text-base sm:text-lg font-bold text-[#172638] group-hover:text-[#24364B] transition-colors cursor-pointer leading-snug line-clamp-1"
          >
            {course.title}
          </h3>

          {/* Instructor */}
          <p className="text-xs text-[#697586] mt-1 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-[#829681] shrink-0" />
            <span className="truncate">{course.instructor}</span>
          </p>

          {/* Next Lesson snippet */}
          <p className="text-[11px] text-[#263238] mt-2 line-clamp-1 bg-[#F8F6F1] p-2 rounded border border-[#E5E2DA]/60">
            <span className="text-[#829681] font-semibold">Next:</span> {course.nextLessonTitle}
          </p>
        </div>

        {/* Progress Section */}
        <div className="mt-4 pt-3.5 border-t border-[#E5E2DA]/80">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-[#697586] text-[11px] font-mono">
              {course.completedLessons} / {course.totalLessons} lessons
            </span>
            <span className="font-semibold text-[#172638] font-mono text-[11px] tabular-nums">
              {course.progress}%
            </span>
          </div>

          {/* Progress bar using muted sage */}
          <div className="w-full bg-[#E5E2DA] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#829681] h-full transition-all duration-300 rounded-full"
              style={{ width: `${course.progress}%` }}
            />
          </div>

          {/* Action Button */}
          <button
            onClick={() => openLessonModal(course)}
            className="w-full mt-4 py-2 px-3 bg-[#24364B] hover:bg-[#172638] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 group-hover:shadow-xs"
          >
            <Play className="w-3.5 h-3.5 fill-current text-[#C5A46D]" />
            <span>Continue Learning</span>
          </button>
        </div>
      </div>
    </div>
  );
};
