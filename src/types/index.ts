export type CourseDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  type: 'video' | 'reading' | 'exercise';
  summary?: string;
  contentSnippet?: string;
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  code: string;
  title: string;
  instructor: string;
  instructorTitle: string;
  category: string;
  difficulty: CourseDifficulty;
  progress: number; // 0-100
  completedLessons: number;
  totalLessons: number;
  duration: string;
  enrolled: boolean;
  enrolledDate?: string;
  nextLessonTitle: string;
  nextLessonDuration: string;
  description: string;
  accentColor: string;
  modules: CourseModule[];
}

export interface ScheduledClass {
  id: string;
  title: string;
  courseTitle: string;
  courseCode: string;
  instructor: string;
  date: string;
  time: string;
  status: 'Live' | 'Upcoming' | 'Completed';
  location: string;
  topicSummary: string;
}

export interface Recommendation {
  id: string;
  title: string;
  category: string;
  difficulty: CourseDifficulty;
  estimatedDuration: string;
  instructor: string;
  reason: string;
  description: string;
  rating: number;
  enrolledCount: number;
}

export interface Assignment {
  id: string;
  title: string;
  courseTitle: string;
  courseCode: string;
  dueDate: string;
  daysRemaining: number;
  status: 'In Progress' | 'Due Soon' | 'Submitted' | 'Graded';
  maxGrade: string;
  weight: string;
  instructions: string;
  submittedAt?: string;
  grade?: string;
}

export interface AcademicAchievement {
  id: string;
  title: string;
  description: string;
  dateEarned?: string;
  unlocked: boolean;
  category: 'Streak' | 'Excellence' | 'Milestone' | 'Specialization';
  metric: string;
}

export interface DailyStudyLog {
  day: string;
  fullDate: string;
  hours: number;
  target: number;
  lessonsDone: number;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timeAgo: string;
  read: boolean;
  type: 'class' | 'assignment' | 'grade' | 'streak';
}

export interface StudentProfile {
  name: string;
  email: string;
  role: string;
  degree: string;
  academicStanding: string;
  gpa: string;
  currentTerm: string;
  studentId: string;
  weeklyTargetHours: number;
  emailNotifications: boolean;
  classReminders: boolean;
}
