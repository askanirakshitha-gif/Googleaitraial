import React, { useState } from 'react';
import { useEdu } from '../context/EduContext';
import { 
  X, 
  CheckCircle2, 
  Circle, 
  Play, 
  Pause, 
  FileText, 
  Code2, 
  ArrowRight, 
  ArrowLeft, 
  BookOpen, 
  Clock, 
  Check
} from 'lucide-react';

export const LessonModal: React.FC = () => {
  const { activeLessonModal, closeLessonModal, completeLesson, courses } = useEdu();
  const [isPlaying, setIsPlaying] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!activeLessonModal) return null;

  // Get current fresh course state
  const course = courses.find((c) => c.id === activeLessonModal.course.id) || activeLessonModal.course;
  
  // Find current lesson across modules
  let currentLesson = course.modules
    .flatMap((m) => m.lessons)
    .find((l) => l.id === activeLessonModal.lessonId);

  if (!currentLesson && course.modules[0]?.lessons[0]) {
    currentLesson = course.modules[0].lessons[0];
  }

  if (!currentLesson) return null;

  // Find next and previous lesson
  const allLessons = course.modules.flatMap((m) => m.lessons);
  const currentIndex = allLessons.findIndex((l) => l.id === currentLesson?.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const handleCopyCode = (snippet: string) => {
    navigator.clipboard?.writeText(snippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-[#172638]/70 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-4xl bg-white border border-[#E5E2DA] rounded-xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#F8F6F1] border-b border-[#E5E2DA]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-medium text-[#829681] bg-white border border-[#E5E2DA] px-2 py-0.5 rounded">
              {course.code}
            </span>
            <div>
              <h2 className="font-serif text-lg font-semibold text-[#172638] leading-tight">
                {course.title}
              </h2>
              <div className="flex items-center gap-2 text-xs text-[#697586] mt-0.5">
                <span>{course.instructor}</span>
                <span aria-hidden="true">·</span>
                <span>{course.category}</span>
              </div>
            </div>
          </div>
          <button
            onClick={closeLessonModal}
            className="p-1.5 text-[#697586] hover:text-[#172638] rounded-md hover:bg-black/5 transition-colors"
            aria-label="Close lesson modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 flex-1 overflow-hidden">
          {/* Main Stage (2 cols) */}
          <div className="lg:col-span-2 p-6 overflow-y-auto flex flex-col border-b lg:border-b-0 lg:border-r border-[#E5E2DA]">
            {/* Player / Visual Stage */}
            <div className="relative aspect-video w-full bg-[#172638] rounded-lg overflow-hidden flex flex-col justify-between p-4 mb-5 border border-[#E5E2DA]/20">
              <div className="flex items-center justify-between text-xs text-[#F8F6F1]/70 font-mono">
                <span>Lecture Recitation Session</span>
                <span className="text-[#C5A46D]">{currentLesson.duration}</span>
              </div>

              <div className="my-auto flex flex-col items-center justify-center text-center">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-14 h-14 rounded-full bg-[#C5A46D] text-[#172638] flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform mb-3"
                  aria-label={isPlaying ? 'Pause lecture audio' : 'Play lecture audio'}
                >
                  {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
                </button>
                <p className="text-sm font-medium text-[#F8F6F1]">
                  {currentLesson.title}
                </p>
                <p className="text-xs text-[#829681] mt-1 font-mono">
                  {isPlaying ? 'Streaming recitative audio · 44.1 kHz' : 'Click to stream academic audio notes'}
                </p>
              </div>

              {/* Scrubber simulation */}
              <div className="w-full space-y-1">
                <div className="w-full bg-[#24364B] h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#C5A46D] h-full transition-all duration-300"
                    style={{ width: isPlaying ? '64%' : currentLesson.completed ? '100%' : '18%' }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-[#F8F6F1]/50 font-mono">
                  <span>{isPlaying ? '14:28' : '00:00'}</span>
                  <span>{currentLesson.duration}</span>
                </div>
              </div>
            </div>

            {/* Lesson Information */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-[#172638]">
                    {currentLesson.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-[#697586] mt-0.5">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#829681]" /> {currentLesson.duration}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="capitalize">{currentLesson.type} assignment</span>
                  </div>
                </div>

                {currentLesson.completed ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#47765C] bg-[#47765C]/10 px-3 py-1.5 rounded-md">
                    <CheckCircle2 className="w-4 h-4" /> Completed
                  </span>
                ) : (
                  <button
                    onClick={() => completeLesson(course.id, currentLesson!.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#24364B] hover:bg-[#172638] rounded-md shadow-xs transition-colors"
                  >
                    <Check className="w-4 h-4 text-[#C5A46D]" /> Mark Lesson Complete
                  </button>
                )}
              </div>

              {/* Summary */}
              <div className="p-4 bg-[#F8F6F1] rounded-lg border border-[#E5E2DA] text-xs text-[#263238] leading-relaxed">
                <p className="font-semibold text-[#172638] mb-1">Conceptual Overview</p>
                <p>
                  {currentLesson.summary || 
                    'Examine the foundational theorem and practical patterns taught in this module. Review the code artifact below and execute local test cases to verify comprehension.'}
                </p>
              </div>

              {/* Code Snippet if provided */}
              {currentLesson.contentSnippet && (
                <div className="relative bg-[#172638] rounded-lg border border-[#E5E2DA]/30 overflow-hidden text-xs">
                  <div className="flex items-center justify-between px-4 py-2 bg-[#24364B] border-b border-[#E5E2DA]/15 text-[#829681] font-mono text-[11px]">
                    <span className="flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5 text-[#C5A46D]" /> Reference Implementation
                    </span>
                    <button
                      onClick={() => handleCopyCode(currentLesson!.contentSnippet!)}
                      className="text-[#F8F6F1]/70 hover:text-white transition-colors"
                    >
                      {copiedCode ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <pre className="p-4 text-[#F8F6F1] font-mono text-[11px] overflow-x-auto leading-relaxed">
                    <code>{currentLesson.contentSnippet}</code>
                  </pre>
                </div>
              )}
            </div>

            {/* Navigation buttons at bottom */}
            <div className="flex items-center justify-between pt-6 mt-auto border-t border-[#E5E2DA]">
              <button
                disabled={!prevLesson}
                onClick={() => {
                  if (prevLesson) {
                    useEdu().openLessonModal(course, prevLesson.id);
                  }
                }}
                className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md border border-[#E5E2DA] transition-colors ${
                  prevLesson 
                    ? 'text-[#263238] hover:bg-[#F8F6F1]' 
                    : 'text-[#697586]/40 cursor-not-allowed bg-transparent'
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Previous Lesson
              </button>

              <button
                disabled={!nextLesson}
                onClick={() => {
                  if (nextLesson) {
                    useEdu().openLessonModal(course, nextLesson.id);
                  }
                }}
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-1.5 rounded-md transition-colors ${
                  nextLesson 
                    ? 'bg-[#24364B] text-white hover:bg-[#172638]' 
                    : 'bg-[#E5E2DA] text-[#697586] cursor-not-allowed'
                }`}
              >
                Next Lesson <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Module Syllabus Sidebar (1 col) */}
          <div className="p-6 bg-[#F8F6F1] overflow-y-auto space-y-5">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-[#172638] mb-1">
                <span>Course Progress</span>
                <span className="font-mono text-[#47765C]">{course.progress}%</span>
              </div>
              <div className="w-full bg-[#E5E2DA] h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-[#829681] h-full transition-all duration-300"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
              <p className="text-[11px] text-[#697586] mt-1.5 font-mono">
                {course.completedLessons} of {course.totalLessons} lessons completed
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#697586]">
                Course Syllabus
              </h4>

              {course.modules.map((module, mIdx) => (
                <div key={module.id} className="space-y-2">
                  <p className="text-xs font-semibold text-[#172638]">
                    {module.title}
                  </p>
                  <div className="space-y-1">
                    {module.lessons.map((lesson) => {
                      const isActive = lesson.id === currentLesson?.id;
                      return (
                        <button
                          key={lesson.id}
                          onClick={() => useEdu().openLessonModal(course, lesson.id)}
                          className={`w-full flex items-center gap-2.5 p-2 rounded-md text-left text-xs transition-colors ${
                            isActive 
                              ? 'bg-[#24364B] text-white font-medium shadow-xs' 
                              : 'text-[#263238] hover:bg-white border border-transparent hover:border-[#E5E2DA]'
                          }`}
                        >
                          {lesson.completed ? (
                            <CheckCircle2 className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#C5A46D]' : 'text-[#47765C]'}`} />
                          ) : (
                            <Circle className={`w-4 h-4 shrink-0 ${isActive ? 'text-white/60' : 'text-[#697586]/60'}`} />
                          )}
                          <span className="truncate flex-1">{lesson.title}</span>
                          <span className={`text-[10px] font-mono shrink-0 ${isActive ? 'text-white/70' : 'text-[#697586]'}`}>
                            {lesson.duration}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
