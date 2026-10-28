import React, { useState, useEffect } from 'react';
import { useEdu } from '../context/EduContext';
import { 
  X, 
  MessageSquare, 
  Send, 
  Mic, 
  MicOff, 
  ChevronLeft, 
  ChevronRight, 
  Users, 
  BookOpen, 
  Save, 
  Radio
} from 'lucide-react';

export const ClassroomModal: React.FC = () => {
  const { activeClassModal, closeClassModal, addToast } = useEdu();
  const [slideIndex, setSlideIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [chatMessage, setChatMessage] = useState('');
  
  // Sample live questions
  const [questions, setQuestions] = useState([
    { id: 1, sender: 'Liam Vance', time: '10:34 AM', text: 'Does useMemo recompute if the dependency array reference remains shallowly equal?' },
    { id: 2, sender: 'Sophia Chen', time: '10:37 AM', text: 'Prof. Jenkins, will the recording for this recitation be archived before midterms?' }
  ]);

  const [notes, setNotes] = useState(() => {
    return localStorage.getItem('edunova_class_notes') || 
      'Key Theorem: Custom hooks encapsulate stateful logic without sharing internal instance state across components.\n\nRule 1: Top-level hook execution only.\nRule 2: Never call hooks inside loops or nested conditionals.';
  });

  useEffect(() => {
    localStorage.setItem('edunova_class_notes', notes);
  }, [notes]);

  if (!activeClassModal) return null;

  const slides = [
    {
      title: 'State Synchronization & Custom Hooks',
      subtitle: 'Principles of Unidirectional Data Flow in React 19',
      bulletPoints: [
        'Separating business invariants from presentation trees',
        'Composition over inheritance in UI state engines',
        'Automatic batching and event synchronization'
      ],
      codeSample: `// Custom hook pattern for synchronized study telemetry\nexport function useStudySession(sessionId: string) {\n  const [metrics, setMetrics] = useState<SessionStats>(initial);\n  \n  useEffect(() => {\n    const unsub = telemetryChannel.subscribe(sessionId, setMetrics);\n    return () => unsub();\n  }, [sessionId]);\n\n  return metrics;\n}`
    },
    {
      title: 'Memory Management & Lifecycle Teardown',
      subtitle: 'Preventing Memory Leaks in Asynchronous Effects',
      bulletPoints: [
        'Always provide cleanup functions in effects that subscribe',
        'Utilize AbortController to discard obsolete network requests',
        'Avoid stale closures by declaring complete dependency arrays'
      ],
      codeSample: `useEffect(() => {\n  const controller = new AbortController();\n  fetch(\`/api/recs/\${courseId}\`, { signal: controller.signal })\n    .then(res => res.json())\n    .then(setData)\n    .catch(err => { if (err.name !== 'AbortError') handle(err); });\n    \n  return () => controller.abort();\n}, [courseId]);`
    },
    {
      title: 'Applied Recitation Problem Set',
      subtitle: 'Lab Prompt for Hall B Virtual Cohort',
      bulletPoints: [
        'Refactor the monolithic course dashboard into 4 decoupled hooks',
        'Verify zero layout shifts upon background state invalidation',
        'Run test harness: npm test -- --coverage'
      ],
      codeSample: `describe('useEduStore', () => {\n  it('maintains 7-day streak upon lesson completion', () => {\n    const { result } = renderHook(() => useEdu());\n    act(() => result.current.completeLesson('course-web-dev', 'l7'));\n    expect(result.current.stats.streakDays).toBe(7);\n  });\n});`
    }
  ];

  const handleSendQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    setQuestions((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: 'Alex Morgan (You)',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: chatMessage.trim()
      }
    ]);

    setChatMessage('');
    addToast({
      type: 'info',
      title: 'Question Submitted',
      description: 'Your inquiry has been placed into the professor’s Q&A queue.'
    });
  };

  const handleSaveNotes = () => {
    localStorage.setItem('edunova_class_notes', notes);
    addToast({
      type: 'success',
      title: 'Recitation Notes Saved',
      description: 'Your notes are synchronized to your student profile dossier.'
    });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-[#172638]/75 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-5xl bg-white border border-[#E5E2DA] rounded-xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#172638] text-white border-b border-[#24364B]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#DC2626]/20 border border-[#DC2626]/40 text-[#DC2626] text-xs font-semibold uppercase tracking-wider">
              <Radio className="w-3.5 h-3.5 animate-pulse" /> Live Session
            </span>
            <div>
              <h2 className="font-serif text-lg font-medium leading-tight">
                {activeClassModal.title}
              </h2>
              <div className="flex items-center gap-2 text-xs text-[#F8F6F1]/70 mt-0.5">
                <span>{activeClassModal.instructor}</span>
                <span aria-hidden="true">·</span>
                <span>{activeClassModal.location}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#C5A46D]">{activeClassModal.time}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium border transition-colors ${
                isMuted 
                  ? 'bg-white/10 text-white/80 border-white/20 hover:bg-white/15' 
                  : 'bg-[#47765C] text-white border-transparent'
              }`}
            >
              {isMuted ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
              <span>{isMuted ? 'Muted' : 'Speaking'}</span>
            </button>

            <button
              onClick={closeClassModal}
              className="p-1.5 text-white/70 hover:text-white rounded hover:bg-white/10 transition-colors"
              aria-label="Leave live session"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Classroom Center Split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 flex-1 overflow-hidden">
          {/* Main Visual Presentation Stage (2 cols) */}
          <div className="lg:col-span-2 p-6 overflow-y-auto flex flex-col bg-[#F8F6F1] border-b lg:border-b-0 lg:border-r border-[#E5E2DA]">
            {/* Whiteboard / Slide Presentation */}
            <div className="bg-white border border-[#E5E2DA] rounded-lg p-6 shadow-xs flex-1 flex flex-col justify-between mb-4">
              <div>
                <div className="flex items-center justify-between border-b border-[#E5E2DA] pb-3 mb-4">
                  <div>
                    <span className="text-[11px] font-mono text-[#829681] uppercase tracking-wider">
                      Slide {slideIndex + 1} of {slides.length}
                    </span>
                    <h3 className="font-serif text-xl font-semibold text-[#172638] mt-0.5">
                      {slides[slideIndex].title}
                    </h3>
                    <p className="text-xs text-[#697586]">
                      {slides[slideIndex].subtitle}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[#C5A46D] bg-[#24364B] px-2.5 py-1 rounded">
                    {activeClassModal.courseCode}
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  <h4 className="text-xs font-semibold text-[#172638] uppercase tracking-wider">Key Principles</h4>
                  <ul className="space-y-1.5 text-xs text-[#263238]">
                    {slides[slideIndex].bulletPoints.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C5A46D] mt-1.5 shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#172638] text-[#F8F6F1] rounded-md p-3.5 border border-[#E5E2DA]/20 font-mono text-[11px] overflow-x-auto">
                  <div className="text-[#829681] text-[10px] mb-1.5 pb-1 border-b border-white/10">
                    // Live Terminal Scratchpad
                  </div>
                  <pre><code>{slides[slideIndex].codeSample}</code></pre>
                </div>
              </div>

              {/* Slide controls */}
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#E5E2DA]">
                <button
                  disabled={slideIndex === 0}
                  onClick={() => setSlideIndex(slideIndex - 1)}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded text-xs font-medium border border-[#E5E2DA] transition-colors ${
                    slideIndex === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-[#F8F6F1] text-[#263238]'
                  }`}
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Previous Slide
                </button>

                <div className="flex items-center gap-1.5">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSlideIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        idx === slideIndex ? 'bg-[#24364B]' : 'bg-[#E5E2DA]'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  disabled={slideIndex === slides.length - 1}
                  onClick={() => setSlideIndex(slideIndex + 1)}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded text-xs font-medium border border-[#E5E2DA] transition-colors ${
                    slideIndex === slides.length - 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-[#F8F6F1] text-[#263238]'
                  }`}
                >
                  Next Slide <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Student Scratchpad */}
            <div className="bg-white border border-[#E5E2DA] rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-[#172638]">
                  <BookOpen className="w-3.5 h-3.5 text-[#829681]" /> Student Recitation Scratchpad
                </span>
                <button
                  onClick={handleSaveNotes}
                  className="flex items-center gap-1 text-[11px] font-medium text-[#24364B] hover:text-[#172638] px-2 py-1 rounded bg-[#F8F6F1] border border-[#E5E2DA]"
                >
                  <Save className="w-3 h-3 text-[#C5A46D]" /> Save to Profile
                </button>
              </div>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full text-xs font-mono text-[#263238] bg-[#F8F6F1] border border-[#E5E2DA] rounded p-2.5 focus:outline-hidden focus:border-[#24364B] resize-none"
                placeholder="Type your notes during the lecture..."
              />
            </div>
          </div>

          {/* Right Column: Live Q&A Stream (1 col) */}
          <div className="p-6 bg-white flex flex-col overflow-hidden">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E5E2DA]">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#829681]" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#172638]">
                  Recitation Inquiries
                </h4>
              </div>
              <span className="flex items-center gap-1 text-[11px] font-mono text-[#697586]">
                <Users className="w-3.5 h-3.5" /> 42 scholars
              </span>
            </div>

            {/* Questions list */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 mb-4">
              {questions.map((q) => (
                <div key={q.id} className="p-3 rounded-lg bg-[#F8F6F1] border border-[#E5E2DA] text-xs">
                  <div className="flex items-center justify-between text-[11px] text-[#697586] mb-1">
                    <span className="font-semibold text-[#172638]">{q.sender}</span>
                    <span className="font-mono">{q.time}</span>
                  </div>
                  <p className="text-[#263238] leading-relaxed">{q.text}</p>
                </div>
              ))}
            </div>

            {/* Question Input Form */}
            <form onSubmit={handleSendQuestion} className="pt-2 border-t border-[#E5E2DA]">
              <div className="relative">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Ask a clarifying question..."
                  className="w-full pl-3 pr-10 py-2.5 text-xs bg-[#F8F6F1] border border-[#E5E2DA] rounded-lg focus:outline-hidden focus:border-[#24364B]"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 p-1.5 rounded-md bg-[#24364B] text-white hover:bg-[#172638] transition-colors"
                  aria-label="Submit question"
                >
                  <Send className="w-3.5 h-3.5 text-[#C5A46D]" />
                </button>
              </div>
              <p className="text-[10px] text-[#697586] mt-1.5 font-mono">
                Questions are moderated by teaching assistants.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
