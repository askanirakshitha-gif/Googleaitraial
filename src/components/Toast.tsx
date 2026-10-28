import React from 'react';
import { useEdu } from '../context/EduContext';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useEdu();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 p-4 bg-white border border-[#E5E2DA] rounded-lg shadow-md transition-all duration-200"
          role="status"
          aria-live="polite"
        >
          <div className="shrink-0 mt-0.5">
            {toast.type === 'success' && (
              <CheckCircle2 className="w-5 h-5 text-[#47765C]" />
            )}
            {toast.type === 'info' && (
              <Info className="w-5 h-5 text-[#24364B]" />
            )}
            {toast.type === 'warning' && (
              <AlertTriangle className="w-5 h-5 text-[#C5A46D]" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-semibold text-[#172638] tracking-tight">
              {toast.title}
            </h4>
            {toast.description && (
              <p className="text-xs text-[#697586] mt-0.5 leading-relaxed">
                {toast.description}
              </p>
            )}
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="shrink-0 text-[#697586] hover:text-[#172638] transition-colors p-0.5 rounded focus-visible:outline-[#24364B]"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
