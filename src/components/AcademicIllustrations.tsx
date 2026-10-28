import React from 'react';

export function EduNovaLogo({ size = 36, className = '' }: { size?: number; className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div 
        className="flex items-center justify-center rounded-lg bg-[#24364B] text-[#F8F6F1] shadow-xs"
        style={{ width: size, height: size }}
      >
        <svg 
          viewBox="0 0 32 32" 
          fill="none" 
          className="w-5 h-5 text-[#C5A46D]"
          stroke="currentColor" 
          strokeWidth="1.75" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          {/* Classic open book & guiding star mark */}
          <path d="M4 22V8c0-1.1.9-2 2-2h8c2 0 4 1.5 4 1.5S20 6 22 6h4c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2h-4c-2 0-4-1.5-4-1.5S16 24 14 24H6c-1.1 0-2-.9-2-2z" fill="#24364B" stroke="#F8F6F1" />
          <path d="M16 7.5V23" stroke="#C5A46D" />
          <polygon points="16,3 17.5,6 20,6 18,7.5 19,10.5 16,8.5 13,10.5 14,7.5 12,6 14.5,6" fill="#C5A46D" stroke="#C5A46D" strokeWidth="0.5" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="font-serif text-lg font-bold tracking-tight text-[#172638] leading-none">
          EduNova
        </span>
        <span className="text-[10px] tracking-wider uppercase font-medium text-[#829681] mt-0.5">
          Academic Portal
        </span>
      </div>
    </div>
  );
}

export function CourseThumbnail({ 
  courseId, 
  category, 
  title, 
  className = '' 
}: { 
  courseId: string; 
  category: string; 
  title: string; 
  className?: string; 
}) {
  const getIllustration = () => {
    switch (courseId) {
      case 'course-web-dev':
      case 'rec-react-adv':
        return (
          <div className="relative w-full h-full bg-[#172638] p-4 flex flex-col justify-between overflow-hidden">
            {/* Subtle architectural grid pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
              backgroundImage: 'radial-gradient(#C5A46D 1px, transparent 1px)',
              backgroundSize: '16px 16px'
            }} />
            <div className="flex justify-between items-center z-10">
              <span className="text-[11px] font-mono text-[#829681] tracking-wide">CS.210 // CLIENT ARCH</span>
              <span className="text-[11px] font-mono text-[#C5A46D]">v19.0</span>
            </div>
            {/* Schematic vector layout */}
            <div className="my-auto py-2 z-10 flex items-center justify-center">
              <div className="w-full max-w-[210px] bg-[#24364B]/80 border border-[#E5E2DA]/20 rounded-md p-3 backdrop-blur-xs">
                <div className="flex items-center gap-1.5 mb-2.5 pb-1.5 border-b border-[#E5E2DA]/15">
                  <div className="w-2 h-2 rounded-full bg-[#C5A46D]/80" />
                  <div className="w-2 h-2 rounded-full bg-[#829681]/80" />
                  <div className="w-2 h-2 rounded-full bg-[#E5E2DA]/40" />
                  <span className="text-[10px] font-mono text-[#F8F6F1]/60 ml-auto">App.tsx</span>
                </div>
                <div className="space-y-1.5 font-mono text-[10px]">
                  <div className="text-[#829681]">const [state, dispatch] = useReducer(...)</div>
                  <div className="text-[#C5A46D] pl-3">&lt;LectureCanvas stream=&#123;live&#125; /&gt;</div>
                  <div className="text-[#F8F6F1]/50 pl-6">&lt;NotesSync session=&#123;id&#125; /&gt;</div>
                </div>
              </div>
            </div>
            <div className="z-10 flex items-center justify-between text-[11px] text-[#F8F6F1]/70 border-t border-[#E5E2DA]/15 pt-2">
              <span>Full-Stack Engineering</span>
              <span className="text-[#C5A46D] font-medium">Standard Edition</span>
            </div>
          </div>
        );

      case 'course-python-ds':
        return (
          <div className="relative w-full h-full bg-[#1b2b3a] p-4 flex flex-col justify-between overflow-hidden">
            <div className="absolute inset-0 opacity-15 pointer-events-none" style={{
              backgroundImage: 'linear-gradient(to right, #829681 1px, transparent 1px), linear-gradient(to bottom, #829681 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }} />
            <div className="flex justify-between items-center z-10">
              <span className="text-[11px] font-mono text-[#C5A46D] tracking-wide">DS.304 // MATRIX COMPUTE</span>
              <span className="text-[11px] font-mono text-[#829681]">N(μ, σ²)</span>
            </div>
            {/* Elegant bell curve & scatter plot simulation */}
            <div className="my-auto py-1 z-10 flex items-center justify-center">
              <svg viewBox="0 0 200 80" className="w-full max-w-[220px] h-20 text-[#829681]">
                {/* Bell curve */}
                <path 
                  d="M 10 70 Q 60 70 85 45 T 100 15 T 115 45 Q 140 70 190 70" 
                  fill="none" 
                  stroke="#C5A46D" 
                  strokeWidth="2.5" 
                />
                <line x1="100" y1="15" x2="100" y2="70" stroke="#829681" strokeDasharray="3 3" strokeWidth="1.5" />
                <circle cx="85" cy="45" r="3" fill="#F8F6F1" />
                <circle cx="100" cy="15" r="4" fill="#C5A46D" />
                <circle cx="115" cy="45" r="3" fill="#F8F6F1" />
                <circle cx="65" cy="62" r="2.5" fill="#829681" />
                <circle cx="135" cy="62" r="2.5" fill="#829681" />
                <circle cx="45" cy="68" r="2" fill="#F8F6F1" opacity="0.6" />
                <circle cx="155" cy="68" r="2" fill="#F8F6F1" opacity="0.6" />
              </svg>
            </div>
            <div className="z-10 flex items-center justify-between text-[11px] text-[#F8F6F1]/70 border-t border-[#E5E2DA]/15 pt-2">
              <span>Statistical Inference</span>
              <span className="text-[#829681] font-mono font-medium">p &lt; 0.001</span>
            </div>
          </div>
        );

      case 'course-dbms':
      case 'rec-sql-opt':
        return (
          <div className="relative w-full h-full bg-[#182635] p-4 flex flex-col justify-between overflow-hidden">
            <div className="flex justify-between items-center z-10">
              <span className="text-[11px] font-mono text-[#829681] tracking-wide">CS.320 // RELATIONAL CORE</span>
              <span className="text-[11px] font-mono text-[#C5A46D]">BCNF Verified</span>
            </div>
            {/* Relational B-Tree / Database cylinder schematic */}
            <div className="my-auto py-2 z-10 flex items-center justify-center">
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-6 rounded-t-md bg-[#24364B] border border-[#C5A46D]/60 flex items-center justify-center text-[10px] font-mono text-[#C5A46D]">
                    ROOT [40]
                  </div>
                  <div className="w-0.5 h-3 bg-[#829681]" />
                  <div className="flex gap-2">
                    <div className="w-12 h-5 rounded bg-[#24364B]/80 border border-[#E5E2DA]/30 flex items-center justify-center text-[9px] font-mono text-[#F8F6F1]">
                      10..39
                    </div>
                    <div className="w-12 h-5 rounded bg-[#24364B]/80 border border-[#E5E2DA]/30 flex items-center justify-center text-[9px] font-mono text-[#F8F6F1]">
                      41..99
                    </div>
                  </div>
                </div>
                <div className="w-px h-14 bg-[#E5E2DA]/20" />
                <div className="space-y-1 text-[10px] font-mono text-[#829681]">
                  <div>INDEX SCAN</div>
                  <div className="text-[#C5A46D]">COST: 0.28..8.4</div>
                  <div className="text-[#F8F6F1]/60">BUFFERS: 3 hit</div>
                </div>
              </div>
            </div>
            <div className="z-10 flex items-center justify-between text-[11px] text-[#F8F6F1]/70 border-t border-[#E5E2DA]/15 pt-2">
              <span>ACID Storage Engine</span>
              <span className="text-[#C5A46D] font-mono">WAL Logged</span>
            </div>
          </div>
        );

      case 'course-aiml':
      case 'rec-gen-ai':
      default:
        return (
          <div className="relative w-full h-full bg-[#1e2f42] p-4 flex flex-col justify-between overflow-hidden">
            <div className="flex justify-between items-center z-10">
              <span className="text-[11px] font-mono text-[#C5A46D] tracking-wide">AI.401 // NEURAL TOPOLOGY</span>
              <span className="text-[11px] font-mono text-[#829681]">∇L(θ) → 0</span>
            </div>
            {/* Neural network graph schematic */}
            <div className="my-auto py-1 z-10 flex items-center justify-center">
              <svg viewBox="0 0 180 75" className="w-full max-w-[200px] h-18">
                {/* Node layers */}
                <line x1="30" y1="20" x2="90" y2="15" stroke="#829681" strokeWidth="1" opacity="0.6" />
                <line x1="30" y1="20" x2="90" y2="40" stroke="#C5A46D" strokeWidth="1.5" opacity="0.8" />
                <line x1="30" y1="20" x2="90" y2="65" stroke="#829681" strokeWidth="1" opacity="0.6" />
                
                <line x1="30" y1="55" x2="90" y2="15" stroke="#829681" strokeWidth="1" opacity="0.6" />
                <line x1="30" y1="55" x2="90" y2="40" stroke="#829681" strokeWidth="1" opacity="0.6" />
                <line x1="30" y1="55" x2="90" y2="65" stroke="#C5A46D" strokeWidth="1.5" opacity="0.8" />

                <line x1="90" y1="15" x2="150" y2="38" stroke="#829681" strokeWidth="1" opacity="0.7" />
                <line x1="90" y1="40" x2="150" y2="38" stroke="#C5A46D" strokeWidth="2" opacity="0.9" />
                <line x1="90" y1="65" x2="150" y2="38" stroke="#829681" strokeWidth="1" opacity="0.7" />

                {/* Input nodes */}
                <circle cx="30" cy="20" r="5" fill="#24364B" stroke="#F8F6F1" strokeWidth="1.5" />
                <circle cx="30" cy="55" r="5" fill="#24364B" stroke="#F8F6F1" strokeWidth="1.5" />

                {/* Hidden layer nodes */}
                <circle cx="90" cy="15" r="5" fill="#24364B" stroke="#829681" strokeWidth="1.5" />
                <circle cx="90" cy="40" r="6" fill="#C5A46D" stroke="#F8F6F1" strokeWidth="1.5" />
                <circle cx="90" cy="65" r="5" fill="#24364B" stroke="#829681" strokeWidth="1.5" />

                {/* Output node */}
                <circle cx="150" cy="38" r="6" fill="#24364B" stroke="#C5A46D" strokeWidth="2" />
              </svg>
            </div>
            <div className="z-10 flex items-center justify-between text-[11px] text-[#F8F6F1]/70 border-t border-[#E5E2DA]/15 pt-2">
              <span>Deep Architecture</span>
              <span className="text-[#C5A46D] font-mono">Loss: 0.042</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`w-full overflow-hidden rounded-t-lg select-none ${className}`}>
      {getIllustration()}
    </div>
  );
}

export function StudentAvatar({ 
  name = 'Alex Morgan', 
  size = 40,
  className = '' 
}: { 
  name?: string; 
  size?: number; 
  className?: string; 
}) {
  return (
    <div 
      className={`relative inline-flex items-center justify-center rounded-full bg-[#24364B] text-[#F8F6F1] font-semibold border-2 border-[#C5A46D]/60 shadow-xs select-none ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.38 }}
      aria-label={`Avatar for ${name}`}
    >
      <span>AM</span>
      <span className="sr-only">{name}</span>
    </div>
  );
}
