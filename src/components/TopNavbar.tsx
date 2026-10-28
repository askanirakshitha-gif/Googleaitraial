import React, { useState, useRef, useEffect } from 'react';
import { useEdu } from '../context/EduContext';
import { StudentAvatar } from './AcademicIllustrations';
import { NotificationMenu } from './NotificationMenu';
import { 
  Search, 
  Bell, 
  Menu, 
  X, 
  ChevronDown, 
  GraduationCap, 
  Settings, 
  Award, 
  BookOpen, 
  LogOut 
} from 'lucide-react';

interface TopNavbarProps {
  onOpenMobileMenu: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({ onOpenMobileMenu }) => {
  const { 
    searchQuery, 
    setSearchQuery, 
    notifications, 
    profile, 
    setActiveTab, 
    addToast 
  } = useEdu();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const unreadNotifs = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileOpen]);

  const handleSignOutDemo = () => {
    setIsProfileOpen(false);
    addToast({
      type: 'info',
      title: 'Session Locked',
      description: 'EduNova student session secured. Academic records remain saved.'
    });
  };

  return (
    <header className="sticky top-0 z-20 bg-[#F8F6F1]/95 backdrop-blur-xs border-b border-[#E5E2DA] px-4 sm:px-6 lg:px-8 py-3.5 transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger & Greeting */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 text-[#24364B] hover:bg-black/5 rounded-lg transition-colors"
            aria-label="Open sidebar menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <h1 className="font-serif text-lg sm:text-xl font-bold text-[#172638] tracking-tight leading-none">
              Good morning, {profile.name.split(' ')[0]}.
            </h1>
            <p className="text-[11px] text-[#829681] font-medium mt-1 hidden sm:block">
              {profile.currentTerm} · {profile.degree.split(' in ')[1] || 'Computer Science'}
            </p>
          </div>
        </div>

        {/* Center: Live Search Bar */}
        <div className="flex-1 max-w-md mx-2 hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 text-[#829681] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses, topics, or instructors..."
              className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-[#E5E2DA] rounded-lg text-[#263238] placeholder:text-[#697586]/70 focus:outline-hidden focus:border-[#24364B] focus:ring-1 focus:ring-[#24364B]/20 transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#697586] hover:text-[#172638] p-0.5"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Right Zone: Notification & Profile Menu */}
        <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
          {/* Notifications Button */}
          <div className="relative">
            <button
              onClick={() => {
                setIsNotifOpen(!isNotifOpen);
                setIsProfileOpen(false);
              }}
              className="relative p-2 text-[#24364B] hover:text-[#172638] hover:bg-white rounded-lg border border-[#E5E2DA] bg-[#F8F6F1] transition-colors focus-visible:outline-[#24364B]"
              aria-label={`Notifications: ${unreadNotifs} unread`}
            >
              <Bell className="w-4 h-4" />
              {unreadNotifs > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#C5A46D] ring-2 ring-white" />
              )}
            </button>

            <NotificationMenu
              isOpen={isNotifOpen}
              onClose={() => setIsNotifOpen(false)}
            />
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileMenuRef}>
            <button
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
                setIsNotifOpen(false);
              }}
              className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-lg bg-white border border-[#E5E2DA] hover:border-[#829681] transition-all group"
              aria-label="User profile menu"
            >
              <StudentAvatar name={profile.name} size={28} />
              <span className="text-xs font-semibold text-[#172638] hidden sm:inline-block max-w-[110px] truncate">
                {profile.name}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-[#829681] group-hover:text-[#172638] transition-transform duration-150" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 top-12 z-50 w-64 bg-white border border-[#E5E2DA] rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                <div className="p-4 bg-[#F8F6F1] border-b border-[#E5E2DA]">
                  <p className="text-xs font-bold text-[#172638]">
                    {profile.name}
                  </p>
                  <p className="text-[11px] text-[#697586] font-mono mt-0.5">
                    {profile.email}
                  </p>
                  <div className="mt-2.5 inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#24364B] text-[#F8F6F1] text-[10px] font-medium rounded">
                    <GraduationCap className="w-3 h-3 text-[#C5A46D]" />
                    <span>ID: {profile.studentId}</span>
                  </div>
                </div>

                <div className="p-2 divide-y divide-[#E5E2DA]/60 text-xs">
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        setActiveTab('courses');
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-[#263238] hover:bg-[#F8F6F1] rounded-md transition-colors text-left"
                    >
                      <BookOpen className="w-4 h-4 text-[#829681]" />
                      <span>Enrolled Curriculum</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        setActiveTab('achievements');
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-[#263238] hover:bg-[#F8F6F1] rounded-md transition-colors text-left"
                    >
                      <Award className="w-4 h-4 text-[#C5A46D]" />
                      <span>Academic Achievements</span>
                    </button>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        setActiveTab('settings');
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-[#263238] hover:bg-[#F8F6F1] rounded-md transition-colors text-left"
                    >
                      <Settings className="w-4 h-4 text-[#697586]" />
                      <span>Account & Study Goals</span>
                    </button>
                    <button
                      onClick={handleSignOutDemo}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-[#DC2626] hover:bg-[#DC2626]/5 rounded-md transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Lock Academic Session</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile search bar visible on mobile */}
      <div className="mt-3 md:hidden">
        <div className="relative">
          <Search className="w-4 h-4 text-[#829681] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses, topics, or instructors..."
            className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-[#E5E2DA] rounded-lg text-[#263238] placeholder:text-[#697586]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#697586] p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
