import React from 'react';
import { useEdu } from '../context/EduContext';
import { BookOpen, Clock, Award, Flame, TrendingUp } from 'lucide-react';

export const StatsCardOverview: React.FC = () => {
  const { stats, courses } = useEdu();

  const cards = [
    {
      id: 'stat-progress',
      title: 'Courses in Progress',
      value: `${courses.length}`,
      unit: 'active courses',
      trend: '+1 enrolled recently',
      trendPositive: true,
      icon: BookOpen,
      iconBg: 'bg-[#24364B]/10',
      iconColor: 'text-[#24364B]'
    },
    {
      id: 'stat-hours',
      title: 'Learning Hours',
      value: `${stats.learningHoursThisMonth}`,
      unit: 'hours this month',
      trend: '84% of monthly target',
      trendPositive: true,
      icon: Clock,
      iconBg: 'bg-[#829681]/15',
      iconColor: 'text-[#47765C]'
    },
    {
      id: 'stat-completed',
      title: 'Completed Courses',
      value: `${stats.completedCourses}`,
      unit: 'courses verified',
      trend: 'Across 3 specializations',
      trendPositive: true,
      icon: Award,
      iconBg: 'bg-[#C5A46D]/20',
      iconColor: 'text-[#C5A46D]'
    },
    {
      id: 'stat-streak',
      title: 'Current Learning Streak',
      value: `${stats.streakDays}`,
      unit: 'consecutive days',
      trend: 'Personal best: 18 days',
      trendPositive: true,
      icon: Flame,
      iconBg: 'bg-[#C5A46D]/15',
      iconColor: 'text-[#C5A46D]'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="p-5 bg-white border border-[#E5E2DA] rounded-xl shadow-2xs hover:border-[#829681]/70 transition-all duration-150 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#697586] tracking-tight">
                {card.title}
              </span>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${card.iconBg} ${card.iconColor}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="mt-3">
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#172638] tracking-tight tabular-nums">
                  {card.value}
                </span>
                <span className="text-xs text-[#697586] font-normal">
                  {card.unit.split(' ')[0]}
                </span>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-[#E5E2DA]/60 flex items-center gap-1.5 text-[11px] text-[#697586]">
              <TrendingUp className="w-3.5 h-3.5 text-[#47765C] shrink-0" />
              <span className="truncate">{card.trend}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
