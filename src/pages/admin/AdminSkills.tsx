import React, { useState } from 'react';
import { skillsData } from '../../data/skillsData';
import { Skill, SkillCategoryType } from '../../types';
import { TechIcon } from '../../components/common/TechIcon';
import { Plus, Edit2, Trash2, Check, X } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';

export const AdminSkills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>(skillsData);
  const [editingSkill, setEditingSkill] = useState<Partial<Skill> | null>(null);
  const { success } = useToast();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill?.name) return;

    if (editingSkill.id) {
      setSkills(skills.map((s) => (s.id === editingSkill.id ? (editingSkill as Skill) : s)));
      success('Skill updated!');
    } else {
      const newSkill: Skill = {
        ...(editingSkill as Skill),
        id: `skill-${Date.now()}`,
        iconName: editingSkill.name,
      };
      setSkills([...skills, newSkill]);
      success('New skill added!');
    }
    setEditingSkill(null);
  };

  const handleDelete = (id: string) => {
    setSkills(skills.filter((s) => s.id !== id));
    success('Skill deleted.');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white light:text-slate-900">Skills & Tech Stack</h1>
          <p className="text-xs text-slate-400 light:text-slate-600">Configure technologies, proficiency levels, and categories.</p>
        </div>

        <button
          onClick={() =>
            setEditingSkill({
              name: '',
              category: 'Frontend Development',
              level: 'Advanced',
              experience: '2+ yrs',
              description: '',
            })
          }
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-glow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Technology</span>
        </button>
      </div>

      {editingSkill && (
        <div className="p-6 rounded-2xl bg-[#0b1021] light:bg-white border border-white/10 light:border-slate-300 mb-6 shadow-xl">
          <h3 className="text-sm font-bold text-white light:text-slate-900 mb-4">
            {editingSkill.id ? 'Edit Skill' : 'Add New Skill'}
          </h3>
          <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="text-slate-400 light:text-slate-700 block mb-1">Tech Name</label>
              <input
                type="text"
                required
                value={editingSkill.name || ''}
                onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 light:bg-slate-50 border border-white/10 light:border-slate-300 text-white light:text-slate-900"
              />
            </div>

            <div>
              <label className="text-slate-400 light:text-slate-700 block mb-1">Category</label>
              <select
                value={editingSkill.category || 'Frontend Development'}
                onChange={(e) =>
                  setEditingSkill({
                    ...editingSkill,
                    category: e.target.value as SkillCategoryType,
                  })
                }
                className="w-full px-3 py-2 rounded-xl bg-slate-900 light:bg-slate-50 border border-white/10 light:border-slate-300 text-white light:text-slate-900"
              >
                <option value="Frontend Development">Frontend Development</option>
                <option value="Backend Development">Backend Development</option>
                <option value="Database & Storage">Database & Storage</option>
                <option value="Development Tools">Development Tools</option>
                <option value="Concepts & Architecture">Concepts & Architecture</option>
                <option value="Other Technologies">Other Technologies</option>
                <option value="AI & Automation">AI & Automation</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 light:text-slate-700 block mb-1">Experience</label>
              <input
                type="text"
                placeholder="2+ yrs"
                value={editingSkill.experience || ''}
                onChange={(e) => setEditingSkill({ ...editingSkill, experience: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 light:bg-slate-50 border border-white/10 light:border-slate-300 text-white light:text-slate-900"
              />
            </div>

            <div className="flex items-end gap-2">
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-glow-sm"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditingSkill(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 light:bg-slate-100 text-slate-300 light:text-slate-700 hover:bg-slate-700"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Grid of All Skills */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="p-3.5 rounded-xl bg-slate-900/80 light:bg-white border border-white/5 light:border-slate-200 flex flex-col items-center justify-between text-center relative group shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
              <button
                onClick={() => setEditingSkill(skill)}
                className="p-1 rounded bg-slate-800 light:bg-slate-100 text-slate-300 light:text-slate-700 hover:text-white"
                title="Edit"
              >
                <Edit2 className="w-3 h-3" />
              </button>
              <button
                onClick={() => handleDelete(skill.id)}
                className="p-1 rounded bg-rose-950/80 light:bg-rose-100 text-rose-300 light:text-rose-700 hover:bg-rose-900"
                title="Delete"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>

            <TechIcon name={skill.name} size="md" className="my-1" />
            <div>
              <span className="text-xs font-bold text-white light:text-slate-900 block mt-1">{skill.name}</span>
              <span className="text-[10px] font-mono text-slate-400 light:text-slate-600">{skill.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
