import React, { useState } from 'react';
import { Save, Plus, X } from 'lucide-react';
import { useProfileStore } from '../hooks/useProfileStore';
import type { Profile, Skill, WorkExperience } from '../types/profile';

export const ProfileManager: React.FC = () => {
  const { profile, updateProfile } = useProfileStore();
  const [newSkill, setNewSkill] = useState<Partial<Skill>>({});
  const [newExperience, setNewExperience] = useState<Partial<WorkExperience>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Profile saved successfully!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      updateProfile({ [name]: checked });
    } else if (name.includes('.')) {
      const [parent, child] = name.split('.');
      updateProfile({
        [parent]: {
          ...((profile[parent as keyof Profile] as any) || {}),
          [child]: value
        }
      });
    } else {
      updateProfile({ [name]: value });
    }
  };

  const addSkill = () => {
    if (newSkill.name && newSkill.level) {
      updateProfile({
        skills: [...(profile.skills || []), newSkill as Skill]
      });
      setNewSkill({});
    }
  };

  const removeSkill = (index: number) => {
    updateProfile({
      skills: (profile.skills || []).filter((_, i) => i !== index)
    });
  };

  const addExperience = () => {
    if (newExperience.company && newExperience.position) {
      updateProfile({
        workExperience: [...(profile.workExperience || []), newExperience as WorkExperience]
      });
      setNewExperience({});
    }
  };

  const removeExperience = (index: number) => {
    updateProfile({
      workExperience: (profile.workExperience || []).filter((_, i) => i !== index)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-white shadow-sm rounded-lg divide-y divide-gray-200">
        {/* Personal Information */}
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={profile.firstName || ''}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={profile.lastName || ''}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={profile.email || ''}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={profile.phone || ''}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Professional Links */}
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Professional Links</h2>
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div>
              <label htmlFor="resumeUrl" className="block text-sm font-medium text-gray-700">
                Resume URL
              </label>
              <input
                type="url"
                name="resumeUrl"
                id="resumeUrl"
                value={profile.resumeUrl || ''}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="https://example.com/resume.pdf"
              />
            </div>

            <div>
              <label htmlFor="linkedinUrl" className="block text-sm font-medium text-gray-700">
                LinkedIn URL
              </label>
              <input
                type="url"
                name="linkedinUrl"
                id="linkedinUrl"
                value={profile.linkedinUrl || ''}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="https://linkedin.com/in/username"
              />
            </div>

            <div>
              <label htmlFor="portfolioUrl" className="block text-sm font-medium text-gray-700">
                Portfolio URL
              </label>
              <input
                type="url"
                name="portfolioUrl"
                id="portfolioUrl"
                value={profile.portfolioUrl || ''}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="https://portfolio.com"
              />
            </div>

            <div>
              <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700">
                GitHub URL
              </label>
              <input
                type="url"
                name="githubUrl"
                id="githubUrl"
                value={profile.githubUrl || ''}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="https://github.com/username"
              />
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills</h2>
          
          <div className="space-y-4">
            {/* Existing Skills */}
            <div className="flex flex-wrap gap-2">
              {(profile.skills || []).map((skill, index) => (
                <div
                  key={index}
                  className="inline-flex items-center bg-indigo-50 text-indigo-700 rounded-full px-3 py-1"
                >
                  <span className="text-sm">
                    {skill.name} ({skill.level})
                  </span>
                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="ml-2 text-indigo-500 hover:text-indigo-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add New Skill */}
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label htmlFor="skillName" className="block text-sm font-medium text-gray-700">
                  Skill Name
                </label>
                <input
                  type="text"
                  id="skillName"
                  value={newSkill.name || ''}
                  onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="skillLevel" className="block text-sm font-medium text-gray-700">
                  Skill Level
                </label>
                <select
                  id="skillLevel"
                  value={newSkill.level || ''}
                  onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value as Skill['level'] })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="">Select Level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
              <button
                type="button"
                onClick={addSkill}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Work Experience */}
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Work Experience</h2>
          
          {/* Existing Experience */}
          <div className="space-y-4 mb-6">
            {(profile.workExperience || []).map((exp, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg relative">
                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
                <h3 className="font-medium">{exp.position}</h3>
                <p className="text-sm text-gray-600">{exp.company}</p>
                <p className="text-sm text-gray-500">
                  {exp.startDate} - {exp.endDate}
                </p>
                <p className="text-sm mt-2">{exp.description}</p>
              </div>
            ))}
          </div>

          {/* Add New Experience */}
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2 border-t pt-4">
            <div>
              <label htmlFor="expCompany" className="block text-sm font-medium text-gray-700">
                Company
              </label>
              <input
                type="text"
                id="expCompany"
                value={newExperience.company || ''}
                onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="expPosition" className="block text-sm font-medium text-gray-700">
                Position
              </label>
              <input
                type="text"
                id="expPosition"
                value={newExperience.position || ''}
                onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="expStartDate" className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <input
                type="date"
                id="expStartDate"
                value={newExperience.startDate || ''}
                onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="expEndDate" className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                type="date"
                id="expEndDate"
                value={newExperience.endDate || ''}
                onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="expDescription" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="expDescription"
                value={newExperience.description || ''}
                onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <button
                type="button"
                onClick={addExperience}
                className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Experience
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="px-6 py-4 bg-gray-50 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Profile
          </button>
        </div>
      </div>
    </form>
  );
};