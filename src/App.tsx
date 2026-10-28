/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { EduProvider, useEdu } from './context/EduContext';
import { Sidebar } from './components/Sidebar';
import { TopNavbar } from './components/TopNavbar';
import { DashboardView } from './views/DashboardView';
import { MyCoursesView } from './views/MyCoursesView';
import { ExploreCoursesView } from './views/ExploreCoursesView';
import { CalendarView } from './views/CalendarView';
import { AssignmentsView } from './views/AssignmentsView';
import { AchievementsView } from './views/AchievementsView';
import { SettingsView } from './views/SettingsView';
import { LessonModal } from './components/LessonModal';
import { ClassroomModal } from './components/ClassroomModal';
import { AssignmentModal } from './components/AssignmentModal';
import { ToastContainer } from './components/Toast';

const MainLayout: React.FC = () => {
  const { activeTab } = useEdu();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'courses':
        return <MyCoursesView />;
      case 'explore':
        return <ExploreCoursesView />;
      case 'calendar':
        return <CalendarView />;
      case 'assignments':
        return <AssignmentsView />;
      case 'achievements':
        return <AchievementsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#263238] flex flex-col lg:flex-row font-sans selection:bg-[#829681]/20 selection:text-[#24364B]">
      {/* A. Fixed / Collapsible Left Sidebar */}
      <Sidebar 
        isMobileOpen={isMobileMenuOpen} 
        onCloseMobile={() => setIsMobileMenuOpen(false)} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* B. Top Navigation Bar */}
        <TopNavbar onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />

        {/* Dynamic View Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {renderActiveView()}
        </main>
      </div>

      {/* Interactive Global Modals */}
      <LessonModal />
      <ClassroomModal />
      <AssignmentModal />

      {/* Global Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <EduProvider>
      <MainLayout />
    </EduProvider>
  );
}
