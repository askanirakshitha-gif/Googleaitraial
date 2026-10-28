import React, { useState } from 'react';
import { useEdu } from '../context/EduContext';
import { 
  X, 
  UploadCloud, 
  FileCheck, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Award, 
  BookOpen
} from 'lucide-react';

export const AssignmentModal: React.FC = () => {
  const { activeAssignmentModal, closeAssignmentModal, submitAssignment } = useEdu();
  const [selectedFile, setSelectedFile] = useState<string | null>('VirtualTable_Submission_v1.tsx');
  const [remarks, setRemarks] = useState('');

  if (!activeAssignmentModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitAssignment(activeAssignmentModal.id, remarks);
  };

  const isGraded = activeAssignmentModal.status === 'Graded';
  const isSubmitted = activeAssignmentModal.status === 'Submitted';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-[#172638]/70 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-2xl bg-white border border-[#E5E2DA] rounded-xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#F8F6F1] border-b border-[#E5E2DA]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-medium text-[#829681] bg-white border border-[#E5E2DA] px-2 py-0.5 rounded">
              {activeAssignmentModal.courseCode}
            </span>
            <div>
              <h2 className="font-serif text-lg font-semibold text-[#172638] leading-tight">
                {activeAssignmentModal.title}
              </h2>
              <p className="text-xs text-[#697586] mt-0.5">
                {activeAssignmentModal.courseTitle}
              </p>
            </div>
          </div>
          <button
            onClick={closeAssignmentModal}
            className="p-1.5 text-[#697586] hover:text-[#172638] rounded-md hover:bg-black/5 transition-colors"
            aria-label="Close assignment modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Metadata Grid */}
          <div className="grid grid-cols-3 gap-3 p-3.5 bg-[#F8F6F1] border border-[#E5E2DA] rounded-lg text-xs">
            <div>
              <span className="text-[#697586] text-[11px] block">Due Date</span>
              <span className="font-medium text-[#172638] flex items-center gap-1 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-[#C5A46D]" /> {activeAssignmentModal.dueDate}
              </span>
            </div>
            <div>
              <span className="text-[#697586] text-[11px] block">Maximum Grade</span>
              <span className="font-medium text-[#172638] flex items-center gap-1 mt-0.5">
                <Award className="w-3.5 h-3.5 text-[#829681]" /> {activeAssignmentModal.maxGrade}
              </span>
            </div>
            <div>
              <span className="text-[#697586] text-[11px] block">Current Status</span>
              <span className="font-medium text-[#24364B] mt-0.5 block">
                {activeAssignmentModal.status}
              </span>
            </div>
          </div>

          {/* Graded banner if graded */}
          {isGraded && (
            <div className="p-4 bg-[#47765C]/10 border border-[#47765C]/30 rounded-lg flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[#47765C]">Evaluation Completed</p>
                <p className="text-xs text-[#263238] mt-0.5">Professor evaluation rubric score: {activeAssignmentModal.grade}</p>
              </div>
              <CheckCircle2 className="w-6 h-6 text-[#47765C]" />
            </div>
          )}

          {/* Instructions */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#172638]">
              Academic Instructions & Specification
            </h3>
            <p className="text-xs text-[#263238] leading-relaxed bg-white border border-[#E5E2DA] p-4 rounded-lg">
              {activeAssignmentModal.instructions}
            </p>
          </div>

          {/* Evaluation Rubrics */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#172638]">
              Grading Rubric
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center p-2.5 bg-[#F8F6F1] rounded border border-[#E5E2DA]">
                <div>
                  <span className="font-semibold text-[#172638]">Algorithmic Correctness & Time Complexity</span>
                  <p className="text-[11px] text-[#697586]">Zero memory leaks; verified execution bounds.</p>
                </div>
                <span className="font-mono font-medium text-[#24364B]">50 pts</span>
              </div>
              <div className="flex justify-between items-center p-2.5 bg-[#F8F6F1] rounded border border-[#E5E2DA]">
                <div>
                  <span className="font-semibold text-[#172638]">Type Safety & TypeScript Strictness</span>
                  <p className="text-[11px] text-[#697586]">Zero lint warnings; exhaustive edge condition handling.</p>
                </div>
                <span className="font-mono font-medium text-[#24364B]">30 pts</span>
              </div>
              <div className="flex justify-between items-center p-2.5 bg-[#F8F6F1] rounded border border-[#E5E2DA]">
                <div>
                  <span className="font-semibold text-[#172638]">Documentation & Architecture Proofs</span>
                  <p className="text-[11px] text-[#697586]">Concise inline reasoning and design trade-off notes.</p>
                </div>
                <span className="font-mono font-medium text-[#24364B]">20 pts</span>
              </div>
            </div>
          </div>

          {/* Submission Form */}
          {!isGraded && (
            <form onSubmit={handleSubmit} className="space-y-4 pt-2 border-t border-[#E5E2DA]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#172638]">
                {isSubmitted ? 'Resubmit Solution' : 'Submit Assignment Artifact'}
              </h3>

              {/* Upload Dropzone simulation */}
              <div className="border-2 border-dashed border-[#E5E2DA] hover:border-[#829681] transition-colors rounded-lg p-5 text-center bg-[#F8F6F1]">
                <UploadCloud className="w-8 h-8 text-[#829681] mx-auto mb-2" />
                <p className="text-xs font-medium text-[#172638]">
                  {selectedFile ? (
                    <span className="flex items-center justify-center gap-1.5 text-[#24364B] font-mono">
                      <FileCheck className="w-4 h-4 text-[#47765C]" /> {selectedFile}
                    </span>
                  ) : (
                    'Attach code repository archive or PDF report'
                  )}
                </p>
                <p className="text-[11px] text-[#697586] mt-1 font-mono">
                  Supported extensions: .zip, .tsx, .py, .pdf (Max 25 MB)
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedFile('EduNova_LabArtifact_Final.zip')}
                  className="mt-3 px-3 py-1.5 text-xs font-medium bg-white text-[#24364B] border border-[#E5E2DA] rounded hover:bg-[#F8F6F1] transition-colors"
                >
                  Choose Different File
                </button>
              </div>

              {/* Notes textarea */}
              <div>
                <label className="block text-xs font-semibold text-[#172638] mb-1">
                  Submission Notes for Teaching Assistant (Optional)
                </label>
                <textarea
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Mention any custom design decisions or benchmarks..."
                  rows={2}
                  className="w-full text-xs bg-white border border-[#E5E2DA] rounded-lg p-3 focus:outline-hidden focus:border-[#24364B]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeAssignmentModal}
                  className="px-4 py-2 text-xs font-medium text-[#697586] hover:text-[#172638] rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#24364B] hover:bg-[#172638] rounded-md shadow-xs transition-colors"
                >
                  {isSubmitted ? 'Update Submission' : 'Submit for Grading'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
