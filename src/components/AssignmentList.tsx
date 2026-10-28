import React from 'react';
import { useEdu } from '../context/EduContext';
import { Assignment } from '../types';
import { Clock, FileText, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';

export const AssignmentList: React.FC = () => {
  const { assignments, openAssignmentModal } = useEdu();

  return (
    <div className="bg-white border border-[#E5E2DA] rounded-xl p-6 shadow-2xs">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E5E2DA]">
        <div>
          <h3 className="font-serif text-lg font-bold text-[#172638] tracking-tight">
            Upcoming Deadlines & Deliverables
          </h3>
          <p className="text-xs text-[#697586] mt-0.5">
            Problem sets, laboratory artifacts, and term papers
          </p>
        </div>
        <span className="text-[11px] font-mono text-[#829681] hidden sm:block">
          {assignments.filter((a) => a.status !== 'Graded').length} Pending Submissions
        </span>
      </div>

      <div className="space-y-3">
        {assignments.map((item) => {
          const isUrgent = item.status === 'In Progress' || item.daysRemaining <= 1;
          const isGraded = item.status === 'Graded';
          const isSubmitted = item.status === 'Submitted';

          return (
            <div
              key={item.id}
              className={`p-4 rounded-lg border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isUrgent && !isGraded && !isSubmitted
                  ? 'bg-[#F8F6F1] border-[#C5A46D]/60'
                  : 'bg-white border-[#E5E2DA] hover:border-[#829681]/60'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className="shrink-0 mt-1">
                  {isGraded ? (
                    <div className="w-8 h-8 rounded-lg bg-[#47765C]/10 text-[#47765C] flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  ) : isSubmitted ? (
                    <div className="w-8 h-8 rounded-lg bg-[#24364B]/10 text-[#24364B] flex items-center justify-center">
                      <FileText className="w-4 h-4" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-lg bg-[#C5A46D]/20 text-[#172638] flex items-center justify-center">
                      <Clock className="w-4 h-4" />
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-mono font-semibold text-[#829681]">
                      {item.courseCode}
                    </span>
                    <span aria-hidden="true" className="text-[#697586]">·</span>
                    <span className="text-xs text-[#697586]">
                      {item.courseTitle}
                    </span>
                    <span aria-hidden="true" className="text-[#697586]">·</span>
                    <span className="text-[11px] font-mono text-[#697586]">
                      {item.weight}
                    </span>
                  </div>

                  <h4 className="text-sm font-semibold text-[#172638] leading-snug">
                    {item.title}
                  </h4>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#697586]">
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#C5A46D]" /> Due: {item.dueDate}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>Max: {item.maxGrade}</span>
                    {item.grade && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-[#47765C] font-semibold">Grade: {item.grade}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Status and Action */}
              <div className="shrink-0 flex items-center gap-3 self-end sm:self-center">
                <span
                  className={`text-xs font-mono px-2.5 py-1 rounded font-medium ${
                    isGraded
                      ? 'bg-[#47765C]/10 text-[#47765C]'
                      : isSubmitted
                      ? 'bg-[#24364B]/10 text-[#24364B]'
                      : isUrgent
                      ? 'bg-[#C5A46D]/20 text-[#172638] font-bold'
                      : 'bg-[#829681]/15 text-[#263238]'
                  }`}
                >
                  {item.status}
                </span>

                <button
                  onClick={() => openAssignmentModal(item)}
                  className="px-3.5 py-2 bg-white hover:bg-[#F8F6F1] text-[#24364B] border border-[#E5E2DA] hover:border-[#24364B] rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors shadow-2xs"
                >
                  <span>{isGraded ? 'Review Feedback' : 'View Assignment'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#829681]" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
