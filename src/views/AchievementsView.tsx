import React from 'react';
import { useEdu } from '../context/EduContext';
import { Award, Flame, Star, CheckCircle2, ShieldCheck, Trophy, Sparkles } from 'lucide-react';

export const AchievementsView: React.FC = () => {
  const { achievements, stats, profile } = useEdu();

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E2DA]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#829681] mb-1">
            <Trophy className="w-4 h-4 text-[#C5A46D]" />
            <span>SCHOLASTIC HONORS & MILESTONES</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#172638] tracking-tight">
            Academic Distinctions
          </h2>
          <p className="text-xs text-[#697586] mt-0.5">
            Verified learning streaks, dean&apos;s honors, and specialization certificates
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#C5A46D]/15 border border-[#C5A46D]/30 text-xs font-semibold text-[#172638]">
          <Sparkles className="w-4 h-4 text-[#C5A46D]" />
          <span>Active Streak: {stats.streakDays} Days</span>
        </div>
      </div>

      {/* Dean's List Banner */}
      <div className="bg-gradient-to-r from-[#172638] via-[#24364B] to-[#1e3044] rounded-xl p-6 text-white border border-[#24364B] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#C5A46D]/20 text-[#C5A46D] text-[11px] font-mono uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" /> Official Transcript Verified
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#F8F6F1]">
            Dean&apos;s Honor List Standing
          </h3>
          <p className="text-xs text-[#F8F6F1]/80 leading-relaxed">
            Awarded for demonstrating scholarly excellence across Computer Science, Data Structures, and Algorithmic Analysis during the 2025–2026 academic calendar.
          </p>
          <div className="flex items-center gap-4 text-xs font-mono text-[#C5A46D] pt-1">
            <span>Cumulative GPA: {profile.gpa}</span>
            <span aria-hidden="true">·</span>
            <span>Standing: Top 3% of Class</span>
          </div>
        </div>

        <div className="shrink-0 text-center p-4 bg-white/5 border border-white/10 rounded-lg">
          <Award className="w-12 h-12 text-[#C5A46D] mx-auto mb-1" />
          <span className="text-xs font-mono text-[#F8F6F1]/70 block">FACULTY MERIT</span>
          <span className="text-sm font-serif font-bold text-[#F8F6F1]">Dean&apos;s Citation</span>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="space-y-3">
        <h3 className="font-serif text-lg font-bold text-[#172638]">
          Earned Badges & In-Progress Milestones
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-5 rounded-xl border transition-all flex flex-col justify-between ${
                ach.unlocked
                  ? 'bg-white border-[#E5E2DA] shadow-2xs hover:border-[#829681]'
                  : 'bg-[#F8F6F1]/60 border-[#E5E2DA]/60 opacity-80'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#829681]">
                    {ach.category}
                  </span>
                  {ach.unlocked ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#47765C] bg-[#47765C]/10 px-2 py-0.5 rounded">
                      <CheckCircle2 className="w-3 h-3" /> Unlocked
                    </span>
                  ) : (
                    <span className="text-[11px] font-mono text-[#697586] bg-black/5 px-2 py-0.5 rounded">
                      In Progress
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                      ach.unlocked
                        ? 'bg-[#C5A46D]/20 text-[#172638] border border-[#C5A46D]/40'
                        : 'bg-black/5 text-[#697586]'
                    }`}
                  >
                    {ach.category === 'Streak' ? (
                      <Flame className="w-5 h-5 text-[#C5A46D]" />
                    ) : (
                      <Award className="w-5 h-5 text-[#C5A46D]" />
                    )}
                  </div>
                  <h4 className="font-serif text-base font-bold text-[#172638] leading-tight">
                    {ach.title}
                  </h4>
                </div>

                <p className="text-xs text-[#697586] leading-relaxed">
                  {ach.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E5E2DA]/80 flex items-center justify-between text-[11px]">
                <span className="font-mono text-[#24364B] font-semibold">{ach.metric}</span>
                {ach.dateEarned && (
                  <span className="text-[#697586] font-mono">{ach.dateEarned}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
