import React from 'react';
import { useEdu, NavTab } from '../context/EduContext';
import { EduNovaLogo, StudentAvatar } from './AcademicIllustrations';
import { 
  LayoutDashboard, 
  BookOpen, 
  Compass, 
  CalendarDays, 
  FileCheck2, 
  Award, 
  Settings, 
  X
} from 'lucide-react';

interface SidebarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onCloseMobile }) => {
  const { activeTab, setActiveTab, courses, assignments, profile } = useEdu();

  const navItems: { id: NavTab; label: string; icon: React.FC<{ className?: string }>; badge?: number | string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'courses', label: 'My Courses', icon: BookOpen, badge: courses.length },
    { id: 'explore', label: 'Explore Courses', icon: Compass },
    { id: 'calendar', label: 'Learning Calendar', icon: CalendarDays },
    { 
      id: 'assignments', 
      label: 'Assignments', 
      icon: FileCheck2, 
      badge: assignments.filter((a) => a.status !== 'Graded').length 
    },
    { id: 'achievements', label: 'Achievements', icon: Award, badge: '7d' },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleSelectTab = (tab: NavTab) => {
    setActiveTab(tab);
    onCloseMobile();
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#172638] text-[#F8F6F1] border-r border-[#24364B]">
      {/* Brand Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#24364B]">
        <EduNovaLogo />
        {/* Mobile close button */}
        <button
          onClick={onCloseMobile}
          className="lg:hidden p-1.5 text-[#829681] hover:text-[#F8F6F1] rounded transition-colors"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Navigation Links */}
      <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
        <p className="px-3 mb-2 text-[10px] font-bold tracking-widest uppercase text-[#829681]/90 font-mono">
          Academic Navigation
        </p>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all group ${
                isActive
                  ? 'bg-[#24364B] text-[#F8F6F1] shadow-xs'
                  : 'text-[#F8F6F1]/75 hover:text-[#F8F6F1] hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon 
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-[#C5A46D]' : 'text-[#829681] group-hover:text-[#C5A46D]'
                  }`} 
                />
                <span className="whitespace-nowrap">{item.label}</span>
              </div>

              {item.badge !== undefined && (
                <span
                  className={`text-[11px] font-mono font-medium px-2 py-0.5 rounded ${
                    isActive
                      ? 'bg-[#C5A46D] text-[#172638]'
                      : 'bg-white/10 text-[#F8F6F1]/80'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Academic Term Info Card */}
      <div className="mx-3 mb-3 p-3.5 rounded-lg bg-[#24364B]/60 border border-[#24364B] text-xs">
        <div className="flex items-center justify-between text-[11px] text-[#829681] font-mono mb-1">
          <span>TERM STANDING</span>
          <span className="text-[#C5A46D]">ACTIVE</span>
        </div>
        <p className="font-serif text-sm font-semibold text-[#F8F6F1] truncate">
          {profile.academicStanding}
        </p>
        <p className="text-[11px] text-[#F8F6F1]/70 mt-0.5 font-mono">
          GPA: {profile.gpa}
        </p>
      </div>

      {/* User Profile at bottom */}
      <div className="p-3 border-t border-[#24364B] bg-[#172638]">
        <button
          onClick={() => handleSelectTab('settings')}
          className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors text-left group"
        >
          <StudentAvatar name={profile.name} size={36} />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-[#F8F6F1] group-hover:text-[#C5A46D] transition-colors truncate">
              {profile.name}
            </p>
            <p className="text-[11px] text-[#829681] truncate">
              {profile.role}
            </p>
          </div>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop static sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 h-screen sticky top-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile drawer backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 transform transition-transform duration-200 ease-in-out lg:hidden ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
};
