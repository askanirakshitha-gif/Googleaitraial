import React, { useRef, useEffect } from 'react';
import { useEdu } from '../context/EduContext';
import { Bell, CheckCheck, Radio, Clock, Award, BookOpen, X } from 'lucide-react';

interface NotificationMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationMenu: React.FC<NotificationMenuProps> = ({ isOpen, onClose }) => {
  const { 
    notifications, 
    markNotificationRead, 
    markAllNotificationsRead, 
    openClassModal, 
    scheduledClasses,
    setActiveTab 
  } = useEdu();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNotificationClick = (id: string, type: string) => {
    markNotificationRead(id);
    onClose();

    if (type === 'class') {
      const liveClass = scheduledClasses.find((c) => c.status === 'Live') || scheduledClasses[0];
      if (liveClass) openClassModal(liveClass);
    } else if (type === 'assignment') {
      setActiveTab('assignments');
    } else if (type === 'streak') {
      setActiveTab('achievements');
    }
  };

  return (
    <div
      ref={menuRef}
      className="absolute right-0 top-12 z-50 w-80 sm:w-96 bg-white border border-[#E5E2DA] rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-100"
    >
      <div className="flex items-center justify-between px-4 py-3 bg-[#F8F6F1] border-b border-[#E5E2DA]">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-[#24364B]" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#172638]">
            Academic Announcements
          </h3>
          {unreadCount > 0 && (
            <span className="text-[10px] font-mono px-1.5 py-0.2 bg-[#C5A46D] text-[#172638] rounded-full font-bold">
              {unreadCount} new
            </span>
          )}
        </div>
        
        {unreadCount > 0 && (
          <button
            onClick={markAllNotificationsRead}
            className="flex items-center gap-1 text-[11px] font-medium text-[#47765C] hover:text-[#24364B] transition-colors"
          >
            <CheckCheck className="w-3.5 h-3.5" /> Mark all read
          </button>
        )}
      </div>

      <div className="max-h-80 overflow-y-auto divide-y divide-[#E5E2DA]">
        {notifications.length === 0 ? (
          <div className="p-6 text-center text-xs text-[#697586]">
            No announcements at this time.
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => handleNotificationClick(notif.id, notif.type)}
              className={`p-3.5 hover:bg-[#F8F6F1] cursor-pointer transition-colors flex items-start gap-3 ${
                !notif.read ? 'bg-white' : 'bg-[#F8F6F1]/50'
              }`}
            >
              <div className="shrink-0 mt-0.5">
                {notif.type === 'class' && (
                  <div className="w-7 h-7 rounded-full bg-[#DC2626]/10 text-[#DC2626] flex items-center justify-center">
                    <Radio className="w-3.5 h-3.5" />
                  </div>
                )}
                {notif.type === 'assignment' && (
                  <div className="w-7 h-7 rounded-full bg-[#C5A46D]/15 text-[#172638] flex items-center justify-center">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                )}
                {notif.type === 'grade' && (
                  <div className="w-7 h-7 rounded-full bg-[#47765C]/15 text-[#47765C] flex items-center justify-center">
                    <Award className="w-3.5 h-3.5" />
                  </div>
                )}
                {notif.type === 'streak' && (
                  <div className="w-7 h-7 rounded-full bg-[#24364B]/10 text-[#24364B] flex items-center justify-center">
                    <BookOpen className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <h4 className={`text-xs ${!notif.read ? 'font-semibold text-[#172638]' : 'font-medium text-[#263238]'}`}>
                    {notif.title}
                  </h4>
                  <span className="text-[10px] font-mono text-[#697586]">
                    {notif.timeAgo}
                  </span>
                </div>
                <p className="text-xs text-[#697586] leading-relaxed line-clamp-2">
                  {notif.message}
                </p>
              </div>

              {!notif.read && (
                <span className="w-2 h-2 rounded-full bg-[#C5A46D] shrink-0 mt-1" />
              )}
            </div>
          ))
        )}
      </div>

      <div className="p-2.5 bg-[#F8F6F1] border-t border-[#E5E2DA] text-center">
        <button
          onClick={() => {
            onClose();
            setActiveTab('calendar');
          }}
          className="text-xs font-semibold text-[#24364B] hover:text-[#172638] transition-colors"
        >
          View Academic Calendar & Deadlines
        </button>
      </div>
    </div>
  );
};
