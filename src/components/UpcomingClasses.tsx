import React from 'react';
import { useEdu } from '../context/EduContext';
import { ScheduledClass } from '../types';
import { Radio, Calendar, Clock, MapPin, Video, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const UpcomingClasses: React.FC = () => {
  const { scheduledClasses, openClassModal } = useEdu();

  return (
    <div className="bg-white border border-[#E5E2DA] rounded-xl p-6 shadow-2xs">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E5E2DA]">
        <div>
          <h3 className="font-serif text-lg font-bold text-[#172638] tracking-tight">
            Upcoming Classes
          </h3>
          <p className="text-xs text-[#697586] mt-0.5">
            Chronological recitation schedule & virtual lectures
          </p>
        </div>
        <span className="text-[11px] font-mono text-[#829681] font-medium hidden sm:block">
          Synced with Academic Calendar
        </span>
      </div>

      <div className="space-y-3">
        {scheduledClasses.map((item) => {
          const isLive = item.status === 'Live';
          const isCompleted = item.status === 'Completed';

          return (
            <div
              key={item.id}
              className={`p-4 rounded-lg border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isLive
                  ? 'bg-[#F8F6F1] border-[#C5A46D]/60'
                  : 'bg-white border-[#E5E2DA] hover:border-[#829681]/60'
              }`}
            >
              {/* Date & Time pill-less clean column */}
              <div className="flex items-start gap-3.5">
                <div className="shrink-0 text-center w-16 py-1.5 px-2 rounded-md bg-[#24364B]/5 border border-[#E5E2DA]">
                  <span className="text-[11px] font-bold text-[#24364B] uppercase block">
                    {item.date}
                  </span>
                  <span className="text-[10px] font-mono text-[#697586] block mt-0.5">
                    {item.time.split(' – ')[0]}
                  </span>
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

                    {/* Status badge */}
                    {isLive && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#DC2626] bg-[#DC2626]/10 px-2 py-0.5 rounded font-mono uppercase">
                        <Radio className="w-3 h-3 animate-pulse" /> Live Now
                      </span>
                    )}
                    {item.status === 'Upcoming' && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#47765C] bg-[#47765C]/10 px-2 py-0.5 rounded font-mono">
                        Upcoming
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-semibold text-[#172638] leading-snug">
                    {item.title}
                  </h4>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#697586]">
                    <span>{item.instructor}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#829681]" /> {item.location}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 text-[#829681]" /> {item.time}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="shrink-0 flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={() => openClassModal(item)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs ${
                    isLive
                      ? 'bg-[#24364B] hover:bg-[#172638] text-white'
                      : 'bg-white hover:bg-[#F8F6F1] text-[#24364B] border border-[#E5E2DA]'
                  }`}
                >
                  {isLive ? (
                    <>
                      <Video className="w-3.5 h-3.5 text-[#C5A46D]" />
                      <span>Join Class</span>
                    </>
                  ) : (
                    <>
                      <span>View Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#829681]" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
