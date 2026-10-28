import React, { useState } from 'react';
import { useEdu } from '../context/EduContext';
import { StudentAvatar } from '../components/AcademicIllustrations';
import { Settings, User, Bell, Target, Shield, Save, RefreshCw } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { profile, updateProfile, addToast } = useEdu();

  const [formData, setFormData] = useState({
    name: profile.name,
    email: profile.email,
    degree: profile.degree,
    weeklyTargetHours: profile.weeklyTargetHours,
    emailNotifications: profile.emailNotifications,
    classReminders: profile.classReminders
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
  };

  const handleResetData = () => {
    try {
      localStorage.removeItem('edunova_courses');
      localStorage.removeItem('edunova_assignments');
      localStorage.removeItem('edunova_profile');
      window.location.reload();
    } catch {
      // fallback
    }
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl">
      {/* Header */}
      <div className="pb-4 border-b border-[#E5E2DA]">
        <div className="flex items-center gap-2 text-xs font-mono text-[#829681] mb-1">
          <Settings className="w-4 h-4 text-[#C5A46D]" />
          <span>STUDENT PREFERENCES & DOSSIER</span>
        </div>
        <h2 className="font-serif text-2xl font-bold text-[#172638] tracking-tight">
          Academic Settings
        </h2>
        <p className="text-xs text-[#697586] mt-0.5">
          Configure your weekly study commitment targets, notification frequencies, and profile dossier
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Card */}
        <div className="bg-white border border-[#E5E2DA] rounded-xl p-6 shadow-2xs space-y-5">
          <div className="flex items-center gap-4 pb-4 border-b border-[#E5E2DA]">
            <StudentAvatar name={formData.name} size={54} />
            <div>
              <h3 className="font-serif text-lg font-bold text-[#172638]">
                {formData.name}
              </h3>
              <p className="text-xs text-[#697586]">
                {profile.role} · ID: {profile.studentId}
              </p>
              <p className="text-[11px] font-mono text-[#829681] mt-0.5">
                {profile.academicStanding}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#172638] mb-1.5">
                Full Scholar Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full text-xs bg-[#F8F6F1] border border-[#E5E2DA] rounded-lg p-2.5 text-[#263238] focus:outline-hidden focus:border-[#24364B]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#172638] mb-1.5">
                Institutional Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full text-xs bg-[#F8F6F1] border border-[#E5E2DA] rounded-lg p-2.5 text-[#263238] focus:outline-hidden focus:border-[#24364B]"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-[#172638] mb-1.5">
                Degree Program & Faculty
              </label>
              <input
                type="text"
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                className="w-full text-xs bg-[#F8F6F1] border border-[#E5E2DA] rounded-lg p-2.5 text-[#263238] focus:outline-hidden focus:border-[#24364B]"
                required
              />
            </div>
          </div>
        </div>

        {/* Learning Goals */}
        <div className="bg-white border border-[#E5E2DA] rounded-xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E5E2DA]">
            <Target className="w-4 h-4 text-[#829681]" />
            <h3 className="font-serif text-base font-bold text-[#172638]">
              Weekly Recitation & Study Goal
            </h3>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-[#697586]">Target Recitation Hours per Week:</span>
              <span className="font-mono font-bold text-[#24364B] text-sm">
                {formData.weeklyTargetHours} hours / week
              </span>
            </div>
            <input
              type="range"
              min="4"
              max="25"
              step="1"
              value={formData.weeklyTargetHours}
              onChange={(e) => setFormData({ ...formData, weeklyTargetHours: Number(e.target.value) })}
              className="w-full accent-[#24364B] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#697586] font-mono mt-1">
              <span>Light Pace (4h)</span>
              <span>Recommended (10h)</span>
              <span>Intensive (25h)</span>
            </div>
            <p className="text-xs text-[#697586] mt-3">
              This target dynamically recalibrates your dashboard progress bar and the Learning Analytics chart.
            </p>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white border border-[#E5E2DA] rounded-xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E5E2DA]">
            <Bell className="w-4 h-4 text-[#829681]" />
            <h3 className="font-serif text-base font-bold text-[#172638]">
              Notification Preferences
            </h3>
          </div>

          <div className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.classReminders}
                onChange={(e) => setFormData({ ...formData, classReminders: e.target.checked })}
                className="mt-0.5 accent-[#24364B] rounded"
              />
              <div>
                <span className="text-xs font-semibold text-[#172638] block">
                  Upcoming Class Alerts
                </span>
                <span className="text-xs text-[#697586]">
                  Receive notifications 15 minutes prior to scheduled recitations and live lectures.
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.emailNotifications}
                onChange={(e) => setFormData({ ...formData, emailNotifications: e.target.checked })}
                className="mt-0.5 accent-[#24364B] rounded"
              />
              <div>
                <span className="text-xs font-semibold text-[#172638] block">
                  Grade & Feedback Announcements
                </span>
                <span className="text-xs text-[#697586]">
                  Receive instant alerts when problem sets and laboratory reports are graded.
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Save button */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={handleResetData}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#697586] hover:text-[#DC2626] transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo Data to Initial State</span>
          </button>

          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 bg-[#24364B] hover:bg-[#172638] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
          >
            <Save className="w-3.5 h-3.5 text-[#C5A46D]" />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
};
