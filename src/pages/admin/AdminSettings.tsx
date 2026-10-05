import React, { useState, useEffect, useRef } from 'react';
import { api } from '../../services/api';
import { DeveloperInfo } from '../../types';
import { useToast } from '../../contexts/ToastContext';
import { 
  Save, 
  User, 
  Mail, 
  Globe, 
  Phone, 
  MapPin, 
  Sparkles, 
  FileText, 
  Upload, 
  Download, 
  CheckCircle2, 
  Trash2,
  ExternalLink
} from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState<DeveloperInfo | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { success, error } = useToast();

  useEffect(() => {
    const fetchSettings = async () => {
      const data = await api.getSettings();
      setSettings(data);
    };
    fetchSettings();
  }, []);

  const handleResumeFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      error('Please upload a valid PDF document (.pdf).');
      return;
    }

    // Limit to reasonable size e.g. 10MB
    if (file.size > 10 * 1024 * 1024) {
      error('PDF file size is too large (maximum 10MB).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result && settings) {
        const base64Data = event.target.result as string;
        setSettings({
          ...settings,
          resumeUrl: base64Data,
          resumeFileName: file.name,
          resumePdfData: base64Data,
        });
        success(`Loaded "${file.name}" (${(file.size / 1024).toFixed(1)} KB). Click "Save All Settings" to commit.`);
      }
    };
    reader.readAsDataURL(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemoveCustomResume = () => {
    if (!settings) return;
    setSettings({
      ...settings,
      resumeUrl: '/resume',
      resumeFileName: undefined,
      resumePdfData: undefined,
    });
    success('Reset resume to default dynamic template.');
  };

  const handleDownloadCurrentResume = () => {
    if (!settings?.resumeUrl) return;
    const link = document.createElement('a');
    link.href = settings.resumeUrl;
    link.download = settings.resumeFileName || `${settings.name.replace(/\s+/g, '_')}_Resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    success('Downloading exact uploaded resume...');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setIsSaving(true);
    await api.updateSettings(settings);
    setIsSaving(false);
    success('Global site settings & Resume updated successfully!');
  };

  if (!settings) return <div className="text-slate-400">Loading settings...</div>;

  const isCustomPdf = settings.resumeUrl?.startsWith('data:application/pdf') || settings.resumeUrl?.endsWith('.pdf');

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Global Site Settings</h1>
        <p className="text-xs text-slate-400">
          Modify your developer identity, coordinates, social profiles, and upload your official PDF resume.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Core Identity */}
        <div className="p-6 rounded-2xl bg-[#0a0f20]/90 border border-white/10 space-y-4 text-xs shadow-lg">
          <h2 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
            <User className="w-4 h-4 text-blue-400" />
            <span>Developer Profile Identity</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-300 font-mono block mb-1">Full Name</label>
              <input
                type="text"
                value={settings.name}
                onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-slate-300 font-mono block mb-1">Primary Role</label>
              <input
                type="text"
                value={settings.role}
                onChange={(e) => setSettings({ ...settings, role: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-300 font-mono block mb-1">Headline / Short Bio</label>
            <input
              type="text"
              value={settings.shortBio}
              onChange={(e) => setSettings({ ...settings, shortBio: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-slate-300 font-mono block mb-1">Full Biography</label>
            <textarea
              rows={3}
              value={settings.bio}
              onChange={(e) => setSettings({ ...settings, bio: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Dedicated Resume PDF Document Manager */}
        <div className="p-6 rounded-2xl bg-[#0a0f20]/90 border border-white/10 space-y-4 text-xs shadow-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-rose-400" />
              <span>Official PDF Resume Upload & Download Manager</span>
            </h2>
            <span className="text-[11px] font-mono text-slate-400">
              {isCustomPdf ? 'Custom PDF Active' : 'Default Template'}
            </span>
          </div>
          <p className="text-slate-400 text-xs">
            Upload your exact PDF resume file here. When users click <strong>"Download Resume"</strong> across the site (Navbar, Hero, About, Resume page), they will download this exact uploaded PDF file.
          </p>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold font-mono text-xs ${
                  isCustomPdf ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-slate-800 text-slate-400'
                }`}>
                  PDF
                </div>
                <div>
                  <span className="font-bold text-white block text-xs">
                    {settings.resumeFileName || (isCustomPdf ? 'Uploaded Resume PDF' : 'Standard Web Resume')}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {isCustomPdf ? 'Ready for 1-click visitor downloads' : 'Upload your custom PDF below'}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Hidden File Input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="application/pdf, .pdf"
                  onChange={handleResumeFileUpload}
                  className="hidden"
                  id="resume-pdf-upload"
                />
                <label
                  htmlFor="resume-pdf-upload"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 font-semibold cursor-pointer transition-colors"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload PDF from PC</span>
                </label>

                {isCustomPdf && (
                  <>
                    <button
                      type="button"
                      onClick={handleDownloadCurrentResume}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-semibold"
                      title="Test download of current PDF"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Test</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleRemoveCustomResume}
                      className="p-2 rounded-xl bg-rose-950/40 hover:bg-rose-900 border border-rose-500/20 text-rose-300"
                      title="Remove uploaded PDF"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Direct URL input fallback */}
            <div className="pt-2 border-t border-white/5">
              <label className="text-slate-400 font-mono block mb-1 text-[11px]">
                Or enter Direct PDF URL:
              </label>
              <input
                type="text"
                placeholder="https://.../resume.pdf or data:application/pdf;base64,..."
                value={settings.resumeUrl || ''}
                onChange={(e) => setSettings({ ...settings, resumeUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white font-mono text-[11px] focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Contact Coordinates */}
        <div className="p-6 rounded-2xl bg-[#0a0f20]/90 border border-white/10 space-y-4 text-xs shadow-lg">
          <h2 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
            <Mail className="w-4 h-4 text-emerald-400" />
            <span>Contact & Availability</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-slate-300 font-mono block mb-1">Email</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-slate-300 font-mono block mb-1">Phone</label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-slate-300 font-mono block mb-1">Base Location</label>
              <input
                type="text"
                value={settings.location}
                onChange={(e) => setSettings({ ...settings, location: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-300 font-mono block mb-1">GitHub URL</label>
              <input
                type="url"
                value={settings.github}
                onChange={(e) => setSettings({ ...settings, github: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-slate-300 font-mono block mb-1">LinkedIn URL</label>
              <input
                type="url"
                value={settings.linkedin}
                onChange={(e) => setSettings({ ...settings, linkedin: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-300 font-mono block mb-1">Availability Status Badge</label>
            <input
              type="text"
              value={settings.status}
              onChange={(e) => setSettings({ ...settings, status: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-glow-sm transition-all"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving Changes...' : 'Save All Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
