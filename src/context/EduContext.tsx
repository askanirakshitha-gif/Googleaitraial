import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Course, 
  ScheduledClass, 
  Recommendation, 
  Assignment, 
  AcademicAchievement, 
  DailyStudyLog, 
  AppNotification, 
  StudentProfile 
} from '../types';
import { 
  INITIAL_COURSES, 
  INITIAL_CLASSES, 
  INITIAL_RECOMMENDATIONS, 
  INITIAL_ASSIGNMENTS, 
  INITIAL_ACHIEVEMENTS, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_STUDENT_PROFILE,
  WEEKLY_STUDY_DATA 
} from '../data/mockData';

export type NavTab = 
  | 'dashboard' 
  | 'courses' 
  | 'explore' 
  | 'calendar' 
  | 'assignments' 
  | 'achievements' 
  | 'settings';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  description?: string;
}

interface EduContextType {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  
  // Data
  profile: StudentProfile;
  updateProfile: (updated: Partial<StudentProfile>) => void;
  courses: Course[];
  scheduledClasses: ScheduledClass[];
  recommendations: Recommendation[];
  assignments: Assignment[];
  achievements: AcademicAchievement[];
  notifications: AppNotification[];
  studyLogs: DailyStudyLog[];

  // Actions
  enrollInCourse: (recId: string) => void;
  completeLesson: (courseId: string, lessonId: string) => void;
  submitAssignment: (assignmentId: string, notes?: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  
  // Interactive Modals
  activeLessonModal: { course: Course; lessonId: string } | null;
  openLessonModal: (course: Course, lessonId?: string) => void;
  closeLessonModal: () => void;

  activeClassModal: ScheduledClass | null;
  openClassModal: (scheduledClass: ScheduledClass) => void;
  closeClassModal: () => void;

  activeAssignmentModal: Assignment | null;
  openAssignmentModal: (assignment: Assignment) => void;
  closeAssignmentModal: () => void;

  // Toast System
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;

  // Overview Metrics
  stats: {
    coursesInProgress: number;
    learningHoursThisMonth: number;
    completedCourses: number;
    streakDays: number;
    weeklyHoursCompleted: number;
    weeklyTarget: number;
  };
}

const EduContext = createContext<EduContextType | null>(null);

export const EduProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Load from localStorage or default
  const [profile, setProfile] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem('edunova_profile');
      return saved ? JSON.parse(saved) : INITIAL_STUDENT_PROFILE;
    } catch {
      return INITIAL_STUDENT_PROFILE;
    }
  });

  const [courses, setCourses] = useState<Course[]>(() => {
    try {
      const saved = localStorage.getItem('edunova_courses');
      return saved ? JSON.parse(saved) : INITIAL_COURSES;
    } catch {
      return INITIAL_COURSES;
    }
  });

  const [recommendations, setRecommendations] = useState<Recommendation[]>(() => {
    try {
      const saved = localStorage.getItem('edunova_recommendations');
      return saved ? JSON.parse(saved) : INITIAL_RECOMMENDATIONS;
    } catch {
      return INITIAL_RECOMMENDATIONS;
    }
  });

  const [assignments, setAssignments] = useState<Assignment[]>(() => {
    try {
      const saved = localStorage.getItem('edunova_assignments');
      return saved ? JSON.parse(saved) : INITIAL_ASSIGNMENTS;
    } catch {
      return INITIAL_ASSIGNMENTS;
    }
  });

  const [scheduledClasses] = useState<ScheduledClass[]>(INITIAL_CLASSES);
  const [achievements, setAchievements] = useState<AcademicAchievement[]>(INITIAL_ACHIEVEMENTS);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [studyLogs] = useState<DailyStudyLog[]>(WEEKLY_STUDY_DATA);

  // Modals state
  const [activeLessonModal, setActiveLessonModal] = useState<{ course: Course; lessonId: string } | null>(null);
  const [activeClassModal, setActiveClassModal] = useState<ScheduledClass | null>(null);
  const [activeAssignmentModal, setActiveAssignmentModal] = useState<Assignment | null>(null);

  // Toast stack
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('edunova_profile', JSON.stringify(profile));
    } catch {
      // storage unavailable
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem('edunova_courses', JSON.stringify(courses));
    } catch {
      // storage unavailable
    }
  }, [courses]);

  useEffect(() => {
    try {
      localStorage.setItem('edunova_assignments', JSON.stringify(assignments));
    } catch {
      // storage unavailable
    }
  }, [assignments]);

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const updateProfile = (updated: Partial<StudentProfile>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
    addToast({
      type: 'success',
      title: 'Preferences Updated',
      description: 'Your academic settings and study targets have been saved.'
    });
  };

  const completeLesson = (courseId: string, lessonId: string) => {
    setCourses((prevCourses) =>
      prevCourses.map((c) => {
        if (c.id !== courseId) return c;
        let newlyCompleted = 0;
        const updatedModules = c.modules.map((m) => {
          const updatedLessons = m.lessons.map((l) => {
            if (l.id === lessonId && !l.completed) {
              newlyCompleted += 1;
              return { ...l, completed: true };
            }
            return l;
          });
          return { ...m, lessons: updatedLessons };
        });

        const newCompletedCount = c.completedLessons + newlyCompleted;
        const newProgress = Math.min(100, Math.round((newCompletedCount / c.totalLessons) * 100));

        return {
          ...c,
          completedLessons: newCompletedCount,
          progress: newProgress,
          modules: updatedModules
        };
      })
    );

    addToast({
      type: 'success',
      title: 'Lesson Completed',
      description: 'Progress updated. Your weekly study log recorded +0.5 recitation hours.'
    });
  };

  const enrollInCourse = (recId: string) => {
    const rec = recommendations.find((r) => r.id === recId);
    if (!rec) return;

    // Create course from recommendation
    const newCourse: Course = {
      id: `course-${rec.id}`,
      code: rec.id.includes('sql') ? 'CS 325' : rec.id.includes('react') ? 'CS 220' : 'AI 410',
      title: rec.title,
      instructor: rec.instructor,
      instructorTitle: 'Guest Academic Specialist',
      category: rec.category,
      difficulty: rec.difficulty,
      progress: 0,
      completedLessons: 0,
      totalLessons: 18,
      duration: rec.estimatedDuration,
      enrolled: true,
      enrolledDate: 'Oct 27, 2026',
      nextLessonTitle: 'Lecture 1: Core Fundamentals & Methodologies',
      nextLessonDuration: '20 min',
      description: rec.description,
      accentColor: '#24364B',
      modules: [
        {
          id: 'mod-1',
          title: 'Module 1: Principles and Analytical Frameworks',
          lessons: [
            { id: `l-${Date.now()}-1`, title: 'Lecture 1: Core Fundamentals & Methodologies', duration: '20 min', completed: false, type: 'video' },
            { id: `l-${Date.now()}-2`, title: 'Applied Recitation & Problem Sets', duration: '35 min', completed: false, type: 'exercise' }
          ]
        }
      ]
    };

    setCourses((prev) => [newCourse, ...prev]);
    setRecommendations((prev) => prev.filter((r) => r.id !== recId));

    addToast({
      type: 'success',
      title: 'Enrolled Successfully',
      description: `You are now officially enrolled in "${rec.title}".`
    });
  };

  const submitAssignment = (assignmentId: string, notes?: string) => {
    setAssignments((prev) =>
      prev.map((a) => {
        if (a.id === assignmentId) {
          return {
            ...a,
            status: 'Submitted',
            submittedAt: 'Today at ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
        }
        return a;
      })
    );

    addToast({
      type: 'success',
      title: 'Assignment Submitted',
      description: 'Your solution artifact was registered for professor evaluation.'
    });

    closeAssignmentModal();
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast({
      type: 'info',
      title: 'Notifications Cleared',
      description: 'All pending announcements marked as read.'
    });
  };

  const openLessonModal = (course: Course, lessonId?: string) => {
    const targetLessonId = lessonId || course.modules[0]?.lessons[0]?.id || '';
    setActiveLessonModal({ course, lessonId: targetLessonId });
  };

  const closeLessonModal = () => {
    setActiveLessonModal(null);
  };

  const openClassModal = (scheduledClass: ScheduledClass) => {
    setActiveClassModal(scheduledClass);
  };

  const closeClassModal = () => {
    setActiveClassModal(null);
  };

  const openAssignmentModal = (assignment: Assignment) => {
    setActiveAssignmentModal(assignment);
  };

  const closeAssignmentModal = () => {
    setActiveAssignmentModal(null);
  };

  const stats = {
    coursesInProgress: courses.length,
    learningHoursThisMonth: 28.5,
    completedCourses: 12,
    streakDays: 7,
    weeklyHoursCompleted: 28.5,
    weeklyTarget: profile.weeklyTargetHours
  };

  return (
    <EduContext.Provider
      value={{
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        profile,
        updateProfile,
        courses,
        scheduledClasses,
        recommendations,
        assignments,
        achievements,
        notifications,
        studyLogs,
        enrollInCourse,
        completeLesson,
        submitAssignment,
        markNotificationRead,
        markAllNotificationsRead,
        activeLessonModal,
        openLessonModal,
        closeLessonModal,
        activeClassModal,
        openClassModal,
        closeClassModal,
        activeAssignmentModal,
        openAssignmentModal,
        closeAssignmentModal,
        toasts,
        addToast,
        removeToast,
        stats
      }}
    >
      {children}
    </EduContext.Provider>
  );
};

export const useEdu = () => {
  const context = useContext(EduContext);
  if (!context) {
    throw new Error('useEdu must be used within an EduProvider');
  }
  return context;
};
