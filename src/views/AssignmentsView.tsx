import React, { useState } from 'react';
import { useEdu } from '../context/EduContext';
import { FileCheck2, Clock, CheckCircle2, Award, ArrowUpRight, Search } from 'lucide-react';

export const AssignmentsView: React.FC = () => {
  const { assignments, openAssignmentModal } = useEdu();
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filteredAssignments = assignments.filter((a) => {
    if (statusFilter === 'All') return true;
    if (statusFilter === 'Pending') return a.status === 'In Progress' || a.status === 'Due Soon';
    if (statusFilter === 'Submitted') return a.status === 'Submitted';
    if (statusFilter === 'Graded') return a.status === 'Graded';
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E2DA]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#829681] mb-1">
            <FileCheck2 className="w-4 h-4 text-[#C5A46D]" />
            <span>COURSE DELIVERABLES & EVALUATION</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#172638] tracking-tight">
            Assignments & Laboratory Artifacts
          </h2>
          <p className="text-xs text-[#697586] mt-0.5">
            Submit code repositories, review professor grading rubrics, and track feedback
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 self-start sm:self-center">
          {['All', 'Pending', 'Submitted', 'Graded'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                statusFilter === status
                  ? 'bg-[#24364B] text-white border-[#24364B]'
                  : 'bg-white text-[#697586] border-[#E5E2DA] hover:bg-[#F8F6F1]'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Assignments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAssignments.map((item) => {
          const isGraded = item.status === 'Graded';
          const isSubmitted = item.status === 'Submitted';
          const isUrgent = item.status === 'In Progress' || item.daysRemaining <= 1;

          return (
            <div
              key={item.id}
              className="bg-white border border-[#E5E2DA] rounded-xl p-5 shadow-2xs hover:border-[#829681] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-mono font-semibold text-[#829681]">{item.courseCode}</span>
                  <span
                    className={`font-mono text-[11px] px-2 py-0.5 rounded font-medium ${
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
                </div>

                <h3 className="font-serif text-base font-bold text-[#172638] leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-[#697586] mt-0.5">{item.courseTitle}</p>

                <p className="text-xs text-[#263238] mt-3 line-clamp-2 leading-relaxed bg-[#F8F6F1] p-3 rounded border border-[#E5E2DA]/60">
                  {item.instructions}
                </p>

                <div className="flex items-center justify-between text-[11px] text-[#697586] mt-4 pt-3 border-t border-[#E5E2DA]/80">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#C5A46D]" /> Due: {item.dueDate}
                  </span>
                  <span>Weight: {item.weight}</span>
                  {item.grade ? (
                    <span className="text-[#47765C] font-semibold font-mono">Score: {item.grade}</span>
                  ) : (
                    <span>Max: {item.maxGrade}</span>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-2">
                <button
                  onClick={() => openAssignmentModal(item)}
                  className="w-full py-2 px-3 bg-[#24364B] hover:bg-[#172638] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <span>{isGraded ? 'Review Graded Submission' : isSubmitted ? 'View Submission Artifact' : 'Open Rubric & Submit'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A46D]" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
