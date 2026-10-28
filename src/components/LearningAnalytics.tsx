import React from 'react';
import { useEdu } from '../context/EduContext';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  ReferenceLine,
  Cell
} from 'recharts';
import { Clock, Target, CheckCircle2, TrendingUp, Calendar } from 'lucide-react';

export const LearningAnalytics: React.FC = () => {
  const { studyLogs, courses, profile } = useEdu();

  const totalWeekHours = studyLogs.reduce((acc, curr) => acc + curr.hours, 0);
  const totalLessonsDone = studyLogs.reduce((acc, curr) => acc + curr.lessonsDone, 0);
  const weeklyTarget = profile.weeklyTargetHours || 10;
  const targetPercent = Math.min(100, Math.round((totalWeekHours / weeklyTarget) * 100));

  // Custom Recharts Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#172638] text-white p-2.5 rounded-md shadow-lg border border-[#24364B] text-xs font-mono">
          <p className="text-[#C5A46D] font-semibold">{data.day} ({data.fullDate})</p>
          <p className="mt-1">Hours Logged: <span className="text-white font-bold">{data.hours} hrs</span></p>
          <p className="text-[11px] text-[#829681]">Lessons: {data.lessonsDone} finished</p>
          <p className="text-[10px] text-white/50 mt-0.5">Daily quota: {data.target} hrs</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white border border-[#E5E2DA] rounded-xl p-6 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-5 border-b border-[#E5E2DA]">
        <div>
          <h3 className="font-serif text-lg font-bold text-[#172638] tracking-tight">
            Learning Progress Analytics
          </h3>
          <p className="text-xs text-[#697586] mt-0.5">
            Weekly recitation hours, syllabus benchmarks & consistency metrics
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="text-xs font-mono font-medium text-[#47765C] bg-[#47765C]/10 px-2.5 py-1 rounded">
            Target Pace: On Track
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Activity Bar Chart (2 cols) */}
        <div className="lg:col-span-2 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#172638] uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#829681]" /> Weekly Hours Breakdown
            </span>
            <div className="flex items-center gap-4 text-[11px] text-[#697586] font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#24364B]" /> Hours Logged
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-0.5 bg-[#C5A46D]" /> Target (2.0h)
              </span>
            </div>
          </div>

          {/* Chart Viewport */}
          <div className="h-56 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={studyLogs} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis 
                  dataKey="day" 
                  stroke="#697586" 
                  fontSize={11} 
                  tickLine={false}
                  axisLine={{ stroke: '#E5E2DA' }}
                />
                <YAxis 
                  stroke="#697586" 
                  fontSize={11} 
                  tickLine={false}
                  axisLine={{ stroke: '#E5E2DA' }}
                  tickFormatter={(val) => `${val}h`}
                />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine y={2.0} stroke="#C5A46D" strokeDasharray="3 3" />
                <Bar dataKey="hours" radius={[4, 4, 0, 0]}>
                  {studyLogs.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.hours >= 4.0 ? '#24364B' : '#829681'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between text-xs text-[#697586] pt-3 border-t border-[#E5E2DA]/60 mt-3">
            <span>Weekly Total: <strong className="text-[#172638] font-mono">{totalWeekHours.toFixed(1)} hrs</strong></span>
            <span>Daily Average: <strong className="text-[#172638] font-mono">{(totalWeekHours / 7).toFixed(1)} hrs/day</strong></span>
          </div>
        </div>

        {/* Goals & Breakdown Panel (1 col) */}
        <div className="p-4 bg-[#F8F6F1] rounded-lg border border-[#E5E2DA] flex flex-col justify-between space-y-4">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#172638] mb-3">
              Weekly Target & Milestone
            </h4>

            {/* Target Gauge */}
            <div className="space-y-1.5 mb-4">
              <div className="flex justify-between text-xs">
                <span className="text-[#697586]">Weekly Goal ({weeklyTarget}h)</span>
                <span className="font-mono font-semibold text-[#172638]">{totalWeekHours.toFixed(1)} / {weeklyTarget} hrs</span>
              </div>
              <div className="w-full bg-[#E5E2DA] h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-[#47765C] h-full transition-all duration-300 rounded-full"
                  style={{ width: `${Math.min(100, targetPercent)}%` }}
                />
              </div>
              <p className="text-[11px] text-[#47765C] font-mono text-right">
                {targetPercent}% Achieved
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between p-2.5 bg-white rounded border border-[#E5E2DA] text-xs">
                <span className="flex items-center gap-1.5 text-[#263238]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#47765C]" /> Lessons Finished
                </span>
                <span className="font-mono font-bold text-[#172638]">
                  {totalLessonsDone} this week
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-white rounded border border-[#E5E2DA] text-xs">
                <span className="flex items-center gap-1.5 text-[#263238]">
                  <TrendingUp className="w-3.5 h-3.5 text-[#C5A46D]" /> Active Streak
                </span>
                <span className="font-mono font-bold text-[#172638]">
                  7 Days Continuous
                </span>
              </div>
            </div>
          </div>

          {/* Active Courses mini progress */}
          <div className="pt-3 border-t border-[#E5E2DA]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#697586] block mb-2">
              Syllabus Completion
            </span>
            <div className="space-y-2">
              {courses.slice(0, 3).map((course) => (
                <div key={course.id} className="text-xs">
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="truncate text-[#263238] max-w-[140px] font-medium">{course.title}</span>
                    <span className="font-mono text-[#829681]">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-[#E5E2DA] h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-[#24364B] h-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    />
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
