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

export const INITIAL_STUDENT_PROFILE: StudentProfile = {
  name: 'Alex Morgan',
  email: 'a.morgan@edunova.edu',
  role: 'Undergraduate Scholar',
  degree: 'B.S. in Computer Science & Interactive Media',
  academicStanding: "Dean's Honor List (GPA 3.92)",
  gpa: '3.92 / 4.00',
  currentTerm: 'Fall Semester · Year III',
  studentId: 'EDU-2024-8849',
  weeklyTargetHours: 10,
  emailNotifications: true,
  classReminders: true
};

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-web-dev',
    code: 'CS 210',
    title: 'Web Development Fundamentals',
    instructor: 'Prof. Sarah Jenkins',
    instructorTitle: 'Department Chair, Web & Cloud Engineering',
    category: 'Full-Stack Engineering',
    difficulty: 'Intermediate',
    progress: 68,
    completedLessons: 17,
    totalLessons: 25,
    duration: '32 hours',
    enrolled: true,
    enrolledDate: 'Sep 2, 2026',
    nextLessonTitle: 'State Management with React Context & Hooks',
    nextLessonDuration: '24 min',
    description: 'A comprehensive study of modern web client architectures, semantic markup, responsive design systems, and component state mechanics.',
    accentColor: '#24364B',
    modules: [
      {
        id: 'm1',
        title: 'Module 1: Semantic Markup & Modern CSS Foundations',
        lessons: [
          { id: 'l1', title: 'HTML5 Semantic Tree & Accessibility Trees', duration: '20 min', completed: true, type: 'video' },
          { id: 'l2', title: 'CSS Grid & Flexbox Algorithmic Alignment', duration: '25 min', completed: true, type: 'exercise' },
          { id: 'l3', title: 'Responsive Typography & Spacing Math', duration: '18 min', completed: true, type: 'reading' }
        ]
      },
      {
        id: 'm2',
        title: 'Module 2: TypeScript & Modern JavaScript',
        lessons: [
          { id: 'l4', title: 'Asynchronous Programming with Async/Await', duration: '30 min', completed: true, type: 'video' },
          { id: 'l5', title: 'Type Narrowing, Generics, and Discriminated Unions', duration: '32 min', completed: true, type: 'exercise' },
          { id: 'l6', title: 'DOM Event Propagation & Delegations', duration: '22 min', completed: true, type: 'reading' }
        ]
      },
      {
        id: 'm3',
        title: 'Module 3: React Architecture & Component Lifecycles',
        lessons: [
          { 
            id: 'l7', 
            title: 'State Management with React Context & Hooks', 
            duration: '24 min', 
            completed: false, 
            type: 'video',
            summary: 'Explore unidirectional data flow, avoiding prop drilling, memoization via useMemo and useCallback, and building resilient custom hooks for persistent UI state.',
            contentSnippet: `// Custom Hook for persistent academic notes\nfunction useAcademicNotes(courseId: string) {\n  const [notes, setNotes] = useState(() => {\n    const saved = localStorage.getItem(\`notes_\${courseId}\`);\n    return saved ? JSON.parse(saved) : '';\n  });\n\n  useEffect(() => {\n    localStorage.setItem(\`notes_\${courseId}\`, JSON.stringify(notes));\n  }, [notes, courseId]);\n\n  return [notes, setNotes] as const;\n}`
          },
          { id: 'l8', title: 'Reducer Patterns & Complex State Transitions', duration: '28 min', completed: false, type: 'exercise' },
          { id: 'l9', title: 'Form Handling & Controlled Input Synchronization', duration: '20 min', completed: false, type: 'reading' }
        ]
      },
      {
        id: 'm4',
        title: 'Module 4: Production Builds & Server Interaction',
        lessons: [
          { id: 'l10', title: 'RESTful API Contracts & Axios Integration', duration: '35 min', completed: false, type: 'video' },
          { id: 'l11', title: 'Client Routing & Code Splitting Bundles', duration: '25 min', completed: false, type: 'video' }
        ]
      }
    ]
  },
  {
    id: 'course-python-ds',
    code: 'DS 304',
    title: 'Python for Data Science',
    instructor: 'Dr. Michael Chen',
    instructorTitle: 'Associate Professor of Computational Statistics',
    category: 'Data Science',
    difficulty: 'Advanced',
    progress: 45,
    completedLessons: 9,
    totalLessons: 20,
    duration: '28 hours',
    enrolled: true,
    enrolledDate: 'Sep 10, 2026',
    nextLessonTitle: 'Vectorized Operations & Pandas DataFrame Indexing',
    nextLessonDuration: '35 min',
    description: 'Computational data science using NumPy, Pandas, statistical distributions, hypothesis testing, and exploratory data visualization pipelines.',
    accentColor: '#47765C',
    modules: [
      {
        id: 'm1',
        title: 'Module 1: Vectorized Numerical Computing',
        lessons: [
          { id: 'l201', title: 'NumPy Arrays, Broadcasting & Strides', duration: '30 min', completed: true, type: 'video' },
          { id: 'l202', title: 'Linear Algebra Operations & Matrix Decompositions', duration: '40 min', completed: true, type: 'exercise' }
        ]
      },
      {
        id: 'm2',
        title: 'Module 2: Tabular Data Manipulation',
        lessons: [
          { 
            id: 'l203', 
            title: 'Vectorized Operations & Pandas DataFrame Indexing', 
            duration: '35 min', 
            completed: false, 
            type: 'video',
            summary: 'Learn multi-index slicing, query filtering, handling missing records, and aggregating grouped observations with custom transformation callables.',
            contentSnippet: `# Vectorized aggregations across academic cohorts\nimport pandas as pd\n\ndf = pd.read_csv('student_cohorts.csv')\nperformance = (\n    df.groupby(['department', 'standing'])\n      .agg(avg_gpa=('gpa', 'mean'), completion_rate=('credits_completed', 'median'))\n      .reset_index()\n)`
          },
          { id: 'l204', title: 'Merging, Joining, and Reshaping Tidy Datasets', duration: '25 min', completed: false, type: 'exercise' }
        ]
      }
    ]
  },
  {
    id: 'course-dbms',
    code: 'CS 320',
    title: 'Database Management Systems',
    instructor: 'Elena Rostova, M.Sc.',
    instructorTitle: 'Distinguished Fellow & Database Architect',
    category: 'Systems & Architecture',
    difficulty: 'Intermediate',
    progress: 82,
    completedLessons: 14,
    totalLessons: 17,
    duration: '24 hours',
    enrolled: true,
    enrolledDate: 'Aug 28, 2026',
    nextLessonTitle: 'B-Tree Indexing and Query Execution Plans',
    nextLessonDuration: '28 min',
    description: 'Relational database theory, relational calculus, schema normalization forms (1NF through BCNF), and storage engine internals.',
    accentColor: '#24364B',
    modules: [
      {
        id: 'm1',
        title: 'Module 1: Relational Theory & SQL Mastery',
        lessons: [
          { id: 'l301', title: 'First-Order Logic & Relational Tuple Calculus', duration: '25 min', completed: true, type: 'reading' },
          { id: 'l302', title: 'Join Algorithms: Nested Loop, Hash, & Merge', duration: '35 min', completed: true, type: 'video' },
          { id: 'l303', title: 'Schema Normalization up to Boyce-Codd Normal Form', duration: '40 min', completed: true, type: 'exercise' }
        ]
      },
      {
        id: 'm2',
        title: 'Module 2: Physical Storage & Index Structures',
        lessons: [
          { 
            id: 'l304', 
            title: 'B-Tree Indexing and Query Execution Plans', 
            duration: '28 min', 
            completed: false, 
            type: 'video',
            summary: 'Investigate how balanced search trees minimize page I/O operations, analyzing EXPLAIN ANALYZE traces, and choosing composite indexes for high-throughput queries.',
            contentSnippet: `-- Profiling query cost and index scan selectivity\nEXPLAIN (ANALYZE, BUFFERS)\nSELECT s.student_name, c.course_title, e.grade\nFROM enrollments e\nJOIN students s ON e.student_id = s.id\nJOIN courses c ON e.course_id = c.id\nWHERE e.term = 'Fall 2026' AND e.grade >= 3.5;`
          },
          { id: 'l305', title: 'ACID Guarantees & Multi-Version Concurrency (MVCC)', duration: '32 min', completed: false, type: 'reading' }
        ]
      }
    ]
  },
  {
    id: 'course-aiml',
    code: 'AI 401',
    title: 'Artificial Intelligence and Machine Learning',
    instructor: 'Prof. Marcus Vance',
    instructorTitle: 'Director of the Neural Systems Laboratory',
    category: 'Artificial Intelligence',
    difficulty: 'Beginner',
    progress: 25,
    completedLessons: 4,
    totalLessons: 16,
    duration: '36 hours',
    enrolled: true,
    enrolledDate: 'Sep 18, 2026',
    nextLessonTitle: 'Gradient Descent Optimization & Cost Functions',
    nextLessonDuration: '40 min',
    description: 'Foundations of statistical learning theory, supervised classifiers, loss landscape geometry, and backpropagation mechanics.',
    accentColor: '#C5A46D',
    modules: [
      {
        id: 'm1',
        title: 'Module 1: Foundations of Intelligent Agents',
        lessons: [
          { id: 'l401', title: 'Search Strategies: Heuristic A* and State Spaces', duration: '30 min', completed: true, type: 'video' },
          { id: 'l402', title: 'Linear Regression & Ordinary Least Squares Formulations', duration: '32 min', completed: true, type: 'exercise' }
        ]
      },
      {
        id: 'm2',
        title: 'Module 2: Optimization & Loss Minimization',
        lessons: [
          { 
            id: 'l403', 
            title: 'Gradient Descent Optimization & Cost Functions', 
            duration: '40 min', 
            completed: false, 
            type: 'video',
            summary: 'Formalize mathematical gradient descent, stochastic learning rates, momentum schedules, and overcoming saddle points in multi-dimensional loss landscapes.',
            contentSnippet: `import numpy as np\n\ndef compute_gradient_step(X, y, theta, learning_rate=0.01):\n    m = len(y)\n    predictions = X.dot(theta)\n    errors = predictions - y\n    gradient = (1/m) * X.T.dot(errors)\n    theta_updated = theta - (learning_rate * gradient)\n    return theta_updated`
          },
          { id: 'l404', title: 'Logistic Regression & Cross-Entropy Classification', duration: '35 min', completed: false, type: 'reading' }
        ]
      }
    ]
  }
];

export const INITIAL_RECOMMENDATIONS: Recommendation[] = [
  {
    id: 'rec-react-adv',
    title: 'Advanced React Development',
    category: 'Full-Stack Engineering',
    difficulty: 'Advanced',
    estimatedDuration: '14 hours',
    instructor: 'David K. Miller',
    reason: 'Based on your current courses',
    description: 'Architecting large-scale applications with modern concurrency primitives, Server Components, suspense boundaries, and resilient state machines.',
    rating: 4.95,
    enrolledCount: 1420
  },
  {
    id: 'rec-sql-opt',
    title: 'SQL Query Optimization',
    category: 'Systems & Architecture',
    difficulty: 'Advanced',
    estimatedDuration: '8 hours',
    instructor: 'Elena Rostova, M.Sc.',
    reason: 'Strengthen your SQL skills',
    description: 'Dissect the PostgreSQL cost optimizer, understand sequential vs bitmap index scans, tune cache buffers, and eliminate slow joins.',
    rating: 4.88,
    enrolledCount: 980
  },
  {
    id: 'rec-gen-ai',
    title: 'Introduction to Generative AI',
    category: 'Artificial Intelligence',
    difficulty: 'Beginner',
    estimatedDuration: '10 hours',
    instructor: 'Dr. Priya Patel',
    reason: 'Complements your Machine Learning track',
    description: 'Explore the mechanics of modern transformer self-attention, token embeddings, retrieval-augmented systems, and evaluation benchmarks.',
    rating: 4.91,
    enrolledCount: 2310
  }
];

export const INITIAL_CLASSES: ScheduledClass[] = [
  {
    id: 'class-1',
    title: 'React Fundamentals: Custom Hooks & State Sync',
    courseTitle: 'Web Development Fundamentals',
    courseCode: 'CS 210',
    instructor: 'Prof. Sarah Jenkins',
    date: 'Today',
    time: '10:30 AM – 11:45 AM',
    status: 'Live',
    location: 'Virtual Studio 3 & Hall B',
    topicSummary: 'Live interactive coding lab examining custom hook composition, clean teardown logic, and memoization.'
  },
  {
    id: 'class-2',
    title: 'Database Normalization: 3NF & Boyce-Codd Forms',
    courseTitle: 'Database Management Systems',
    courseCode: 'CS 320',
    instructor: 'Elena Rostova, M.Sc.',
    date: 'Today',
    time: '2:00 PM – 3:15 PM',
    status: 'Upcoming',
    location: 'Lecture Theatre 4',
    topicSummary: 'Decomposition proofs, calculating minimal covers of functional dependencies, and checking lossless joins.'
  },
  {
    id: 'class-3',
    title: 'Introduction to Machine Learning: Supervised vs Unsupervised',
    courseTitle: 'Artificial Intelligence and Machine Learning',
    courseCode: 'AI 401',
    instructor: 'Prof. Marcus Vance',
    date: 'Tomorrow',
    time: '11:00 AM – 12:15 PM',
    status: 'Upcoming',
    location: 'Virtual Amphitheatre 1',
    topicSummary: 'Formalizing regression vs classification tasks, inductive bias, and empirical risk minimization.'
  },
  {
    id: 'class-4',
    title: 'Advanced Window Functions & CTEs in PostgreSQL',
    courseTitle: 'Database Management Systems',
    courseCode: 'CS 320',
    instructor: 'Elena Rostova, M.Sc.',
    date: 'Thu, Oct 29',
    time: '3:30 PM – 4:45 PM',
    status: 'Upcoming',
    location: 'Computer Lab 204',
    topicSummary: 'Recursive common table expressions, PARTITION BY framing, dense rank, and running totals.'
  }
];

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg-1',
    title: 'Lab 4: Building a Reusable Virtual Table Component',
    courseTitle: 'Web Development Fundamentals',
    courseCode: 'CS 210',
    dueDate: 'Tomorrow, 11:59 PM',
    daysRemaining: 1,
    status: 'In Progress',
    maxGrade: '100 pts',
    weight: '15% of Course Grade',
    instructions: 'Implement a zero-dependency virtual table that renders 10,000 items at 60fps using windowing calculations and keyboard navigation accessibility.'
  },
  {
    id: 'asg-2',
    title: 'Case Study: Schema Decomposition & BCNF Proofs',
    courseTitle: 'Database Management Systems',
    courseCode: 'CS 320',
    dueDate: 'Friday, Oct 30',
    daysRemaining: 3,
    status: 'Due Soon',
    maxGrade: '50 pts',
    weight: '10% of Course Grade',
    instructions: 'Provide mathematical proofs of lossless join and dependency preservation for the supplied university registration relational schema.'
  },
  {
    id: 'asg-3',
    title: 'Exploratory Data Analysis on Global Climate Indices',
    courseTitle: 'Python for Data Science',
    courseCode: 'DS 304',
    dueDate: 'Sunday, Nov 1',
    daysRemaining: 5,
    status: 'Due Soon',
    maxGrade: '100 pts',
    weight: '20% of Course Grade',
    instructions: 'Clean and impute missing records from NOAA climate datasets, then compute Pearson correlation matrices across seasonal temperature anomalies.'
  },
  {
    id: 'asg-4',
    title: 'Problem Set 2: Relational Algebra & Tuple Calculus',
    courseTitle: 'Database Management Systems',
    courseCode: 'CS 320',
    dueDate: 'Oct 24, 2026',
    daysRemaining: 0,
    status: 'Graded',
    maxGrade: '100 pts',
    weight: '10% of Course Grade',
    grade: '98 / 100',
    instructions: 'Translating English analytical queries into relational algebra expressions using select, project, natural join, and set difference operators.'
  }
];

export const WEEKLY_STUDY_DATA: DailyStudyLog[] = [
  { day: 'Mon', fullDate: 'Oct 21', hours: 3.8, target: 2.0, lessonsDone: 3 },
  { day: 'Tue', fullDate: 'Oct 22', hours: 4.2, target: 2.0, lessonsDone: 2 },
  { day: 'Wed', fullDate: 'Oct 23', hours: 5.1, target: 2.0, lessonsDone: 4 },
  { day: 'Thu', fullDate: 'Oct 24', hours: 3.5, target: 2.0, lessonsDone: 2 },
  { day: 'Fri', fullDate: 'Oct 25', hours: 4.8, target: 2.0, lessonsDone: 3 },
  { day: 'Sat', fullDate: 'Oct 26', hours: 4.0, target: 1.5, lessonsDone: 2 },
  { day: 'Sun', fullDate: 'Oct 27', hours: 3.1, target: 1.5, lessonsDone: 1 }
];

export const INITIAL_ACHIEVEMENTS: AcademicAchievement[] = [
  {
    id: 'ach-1',
    title: '7-Day Scholar Streak',
    description: 'Maintained consecutive daily academic study activity for seven continuous days.',
    dateEarned: 'Today, Oct 27',
    unlocked: true,
    category: 'Streak',
    metric: '7 Days Continuous'
  },
  {
    id: 'ach-2',
    title: 'Relational Calculus Distinction',
    description: 'Scored 98% or higher on Problem Set 2 in Database Management Systems.',
    dateEarned: 'Oct 24, 2026',
    unlocked: true,
    category: 'Excellence',
    metric: 'Score: 98 / 100'
  },
  {
    id: 'ach-3',
    title: 'Century Study Milestone',
    description: 'Accumulated over 100 verified learning and recitation hours in the EduNova platform.',
    dateEarned: 'Oct 15, 2026',
    unlocked: true,
    category: 'Milestone',
    metric: '108.5 Total Hours'
  },
  {
    id: 'ach-4',
    title: 'Full-Stack Craftsman',
    description: 'Complete 20 lessons with verified code submissions in Web Development Fundamentals.',
    unlocked: false,
    category: 'Specialization',
    metric: '17 / 20 Lessons (85%)'
  },
  {
    id: 'ach-5',
    title: 'Neural Networks Initiate',
    description: 'Submit first validated cost-minimization algorithm in Machine Learning track.',
    unlocked: false,
    category: 'Specialization',
    metric: 'In Progress (Module 2)'
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Class is Starting Now',
    message: 'React Fundamentals: Custom Hooks & State Sync with Prof. Sarah Jenkins is now active in Virtual Studio 3.',
    timeAgo: '10m ago',
    read: false,
    type: 'class'
  },
  {
    id: 'notif-2',
    title: 'Assignment Due Tomorrow',
    message: 'Lab 4: Building a Reusable Virtual Table Component is due at 11:59 PM tomorrow.',
    timeAgo: '2h ago',
    read: false,
    type: 'assignment'
  },
  {
    id: 'notif-3',
    title: 'Grade Posted: Problem Set 2',
    message: 'Your score of 98/100 has been recorded for Database Management Systems.',
    timeAgo: '1d ago',
    read: true,
    type: 'grade'
  },
  {
    id: 'notif-4',
    title: '7-Day Learning Streak Achieved',
    message: 'Congratulations! You have completed your daily learning quota for 7 straight days.',
    timeAgo: '2d ago',
    read: true,
    type: 'streak'
  }
];
