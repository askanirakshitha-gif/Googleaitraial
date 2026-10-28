import React, { useState } from 'react';
import { useEdu } from '../context/EduContext';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  MapPin, 
  Video, 
  FileCheck2, 
  Radio
} from 'lucide-react';

export const CalendarView: React.FC = () => {
  const { scheduledClasses, assignments, openClassModal, openAssignmentModal } = useEdu();
  const [activeFilter, setActiveFilter] = useState<'all' | 'classes' | 'deadlines'>('all');
  const [selectedWeekDay, setSelectedWeekDay] = useState<string>('Tue');

  const daysOfWeek = [
    { key: 'Mon', dayName: 'Monday', date: 'Oct 26', eventsCount: 1 },
    { key: 'Tue', dayName: 'Tuesday (Today)', date: 'Oct 27', eventsCount: 3, isToday: true },
    { key: 'Wed', dayName: 'Wednesday', date: 'Oct 28', eventsCount: 2 },
    { key: 'Thu', dayName: 'Thursday', date: 'Oct 29', eventsCount: 2 },
    { key: 'Fri', dayName: 'Friday', date: 'Oct 30', eventsCount: 1 },
    { key: 'Sat', dayName: 'Saturday', date: 'Oct 31', eventsCount: 0 },
    { key: 'Sun', dayName: 'Sunday', date: 'Nov 01', eventsCount: 1 },
  ];

  // Schedule items for current academic week
  const scheduleEvents = [
    {
      id: 'ev-1',
      day: 'Tue',
      type: 'class' as const,
      time: '10:30 AM – 11:45 AM',
      title: 'React Fundamentals: Custom Hooks & State Sync',
      course: 'CS 210 · Web Development',
      instructor: 'Prof. Sarah Jenkins',
      location: 'Virtual Studio 3',
      isLive: true,
      classRef: scheduledClasses[0]
    },
    {
      id: 'ev-2',
      day: 'Tue',
      type: 'class' as const,
      time: '2:00 PM – 3:15 PM',
      title: 'Database Normalization: 3NF & Boyce-Codd Forms',
      course: 'CS 320 · DBMS',
      instructor: 'Elena Rostova, M.Sc.',
      location: 'Lecture Theatre 4',
      isLive: false,
      classRef: scheduledClasses[1]
    },
    {
      id: 'ev-3',
      day: 'Tue',
      type: 'deadline' as const,
      time: '11:59 PM',
      title: 'Lab 4: Building a Reusable Virtual Table Component',
      course: 'CS 210 · Web Development',
      instructor: 'Evaluation Due',
      location: 'Online Submission Portal',
      isLive: false,
      assignmentRef: assignments[0]
    },
    {
      id: 'ev-4',
      day: 'Wed',
      type: 'class' as const,
      time: '11:00 AM – 12:15 PM',
      title: 'Introduction to Machine Learning: Supervised vs Unsupervised',
      course: 'AI 401 · Neural Computing',
      instructor: 'Prof. Marcus Vance',
      location: 'Virtual Amphitheatre 1',
      isLive: false,
      classRef: scheduledClasses[2]
    },
    {
      id: 'ev-5',
      day: 'Thu',
      type: 'class' as const,
      time: '3:30 PM – 4:45 PM',
      title: 'Advanced Window Functions & CTEs in PostgreSQL',
      course: 'CS 320 · DBMS',
      instructor: 'Elena Rostova, M.Sc.',
      location: 'Computer Lab 204',
      isLive: false,
      classRef: scheduledClasses[3]
    },
    {
      id: 'ev-6',
      day: 'Fri',
      type: 'deadline' as const,
      time: '5:00 PM',
      title: 'Case Study: Schema Decomposition & BCNF Proofs',
      course: 'CS 320 · DBMS',
      instructor: 'Evaluation Due',
      location: 'Online Submission Portal',
      isLive: false,
      assignmentRef: assignments[1]
    },
    {
      id: 'ev-7',
      day: 'Sun',
      type: 'deadline' as const,
      time: '11:59 PM',
      title: 'Exploratory Data Analysis on Global Climate Indices',
      course: 'DS 304 · Data Science',
      instructor: 'Evaluation Due',
      location: 'Online Submission Portal',
      isLive: false,
      assignmentRef: assignments[2]
    }
  ];

  const filteredEvents = scheduleEvents.filter((ev) => {
    const matchesDay = ev.day === selectedWeekDay;
    const matchesType = 
      activeFilter === 'all' || 
      (activeFilter === 'classes' && ev.type === 'class') ||
      (activeFilter === 'deadlines' && ev.type === 'deadline');
    return matchesDay && matchesType;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E2DA]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#829681] mb-1">
            <CalendarIcon className="w-4 h-4 text-[#C5A46D]" />
            <span>ACADEMIC TIMETABLE</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#172638] tracking-tight">
            Learning Calendar
          </h2>
          <p className="text-xs text-[#697586] mt-0.5">
            Recitations, office recitations, lectures, and deliverable deadlines
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-1.5 self-start sm:self-center">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
              activeFilter === 'all'
                ? 'bg-[#24364B] text-white border-[#24364B]'
                : 'bg-white text-[#697586] border-[#E5E2DA] hover:bg-[#F8F6F1]'
            }`}
          >
            All Sessions
          </button>
          <button
            onClick={() => setActiveFilter('classes')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
              activeFilter === 'classes'
                ? 'bg-[#24364B] text-white border-[#24364B]'
                : 'bg-white text-[#697586] border-[#E5E2DA] hover:bg-[#F8F6F1]'
            }`}
          >
            Live & Recitations
          </button>
          <button
            onClick={() => setActiveFilter('deadlines')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
              activeFilter === 'deadlines'
                ? 'bg-[#24364B] text-white border-[#24364B]'
                : 'bg-white text-[#697586] border-[#E5E2DA] hover:bg-[#F8F6F1]'
            }`}
          >
            Deadlines Only
          </button>
        </div>
      </div>

      {/* Week Selector Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
        {daysOfWeek.map((d) => {
          const isSelected = selectedWeekDay === d.key;
          return (
            <button
              key={d.key}
              onClick={() => setSelectedWeekDay(d.key)}
              className={`p-3 rounded-lg border text-left transition-all ${
                isSelected
                  ? 'bg-[#24364B] text-white border-[#24364B] shadow-xs'
                  : 'bg-white text-[#263238] border-[#E5E2DA] hover:border-[#829681]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-mono uppercase tracking-wider ${isSelected ? 'text-[#C5A46D]' : 'text-[#829681]'}`}>
                  {d.key}
                </span>
                {d.isToday && (
                  <span className={`text-[9px] px-1 py-0.2 rounded font-mono ${isSelected ? 'bg-white/20 text-white' : 'bg-[#47765C]/15 text-[#47765C]'}`}>
                    Today
                  </span>
                )}
              </div>
              <p className={`font-serif text-sm font-semibold mt-1 ${isSelected ? 'text-white' : 'text-[#172638]'}`}>
                {d.date}
              </p>
              <p className={`text-[11px] mt-1 ${isSelected ? 'text-white/70' : 'text-[#697586]'}`}>
                {d.eventsCount} {d.eventsCount === 1 ? 'session' : 'sessions'}
              </p>
            </button>
          );
        })}
      </div>

      {/* Events List for selected day */}
      <div className="bg-white border border-[#E5E2DA] rounded-xl p-6 shadow-2xs">
        <h3 className="font-serif text-base font-bold text-[#172638] pb-3 mb-4 border-b border-[#E5E2DA]">
          Agenda for {daysOfWeek.find((d) => d.key === selectedWeekDay)?.dayName} ({daysOfWeek.find((d) => d.key === selectedWeekDay)?.date})
        </h3>

        {filteredEvents.length > 0 ? (
          <div className="space-y-3">
            {filteredEvents.map((ev) => (
              <div
                key={ev.id}
                className="p-4 rounded-lg bg-[#F8F6F1] border border-[#E5E2DA] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <div className="shrink-0 text-center w-14 py-2 bg-white border border-[#E5E2DA] rounded">
                    <Clock className="w-4 h-4 text-[#829681] mx-auto mb-1" />
                    <span className="text-[10px] font-mono text-[#697586] block">
                      {ev.time.split(' – ')[0]}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono font-semibold text-[#829681]">
                        {ev.course}
                      </span>
                      {ev.isLive && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#DC2626] bg-[#DC2626]/10 px-2 py-0.2 rounded font-mono uppercase">
                          <Radio className="w-3 h-3 animate-pulse" /> Live Now
                        </span>
                      )}
                      {ev.type === 'deadline' && (
                        <span className="text-[10px] font-mono text-[#C5A46D] bg-[#24364B] px-1.5 py-0.2 rounded">
                          Deliverable
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-semibold text-[#172638]">
                      {ev.title}
                    </h4>

                    <div className="flex items-center gap-3 text-xs text-[#697586]">
                      <span>{ev.instructor}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#829681]" /> {ev.location}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="self-end sm:self-center">
                  {ev.type === 'class' && ev.classRef ? (
                    <button
                      onClick={() => openClassModal(ev.classRef!)}
                      className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${
                        ev.isLive
                          ? 'bg-[#24364B] text-white hover:bg-[#172638]'
                          : 'bg-white text-[#24364B] border border-[#E5E2DA] hover:bg-[#F8F6F1]'
                      }`}
                    >
                      {ev.isLive ? <Video className="w-3.5 h-3.5 text-[#C5A46D]" /> : null}
                      <span>{ev.isLive ? 'Join Lecture' : 'Session Details'}</span>
                    </button>
                  ) : ev.type === 'deadline' && ev.assignmentRef ? (
                    <button
                      onClick={() => openAssignmentModal(ev.assignmentRef!)}
                      className="px-4 py-2 rounded-lg text-xs font-semibold bg-white text-[#24364B] border border-[#E5E2DA] hover:bg-[#F8F6F1] flex items-center gap-1.5"
                    >
                      <FileCheck2 className="w-3.5 h-3.5 text-[#829681]" />
                      <span>View Rubric & Submit</span>
                    </button>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-xs text-[#697586]">
            No classes or deadlines scheduled for this day. You can use this time for asynchronous reading or problem set preparation.
          </div>
        )}
      </div>
    </div>
  );
};
