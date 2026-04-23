import React from 'react';

export default function FormSection({ formData, onChange, errors = {}, onGenerate, isGenerating, onEnhanceField, enhancingFields = {} }) {
  const inputBaseStyle = "w-full border border-gray-300 rounded-xl shadow-sm px-4 py-2.5 transition-all duration-200 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400";
  const headingStyle = "text-xl font-bold text-gray-800 mb-4 border-l-4 border-blue-500 pl-3";
  const labelStyle = "block text-sm font-semibold text-gray-700 mb-1.5";
  
  const renderEnhanceButton = (field) => (
    <button
      type="button"
      onClick={() => onEnhanceField(field)}
      disabled={enhancingFields[field]}
      className={`ml-2 inline-flex items-center text-xs font-semibold px-2 py-1 flex-shrink-0 rounded-md transition-colors ${
        enhancingFields[field] 
          ? 'bg-indigo-100 text-indigo-400 cursor-not-allowed' 
          : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
      }`}
      title={`Enhance ${field} with AI`}
    >
      {enhancingFields[field] ? "✨ Enhancing..." : "✨ AI Enhance"}
    </button>
  );

  return (
    <div className="w-full">
      <form className="space-y-8">
        {/* Personal Details */}
        <div>
          <h2 className={headingStyle}>Personal Details</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className={labelStyle}>
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={onChange}
                className={`${inputBaseStyle} ${errors.name ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                placeholder="John Doe"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className={labelStyle}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={onChange}
                  className={`${inputBaseStyle} ${errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="phone" className={labelStyle}>
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={onChange}
                  className={`${inputBaseStyle} ${errors.phone ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                  placeholder="+1 234 567 890"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="role" className={labelStyle}>
                Target Role / Job Title
              </label>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={onChange}
                className={inputBaseStyle}
                placeholder="Software Engineer"
              />
            </div>
          </div>
        </div>

        {/* Education */}
        <div>
          <h2 className={headingStyle}>Education</h2>
          <div className="flex items-center mb-1.5">
            <label htmlFor="education" className={`${labelStyle} mb-0`}>
              Education Background
            </label>
            {renderEnhanceButton('education')}
          </div>
          <textarea
            id="education"
            name="education"
            value={formData.education}
            onChange={onChange}
            rows={3}
            className={`${inputBaseStyle} resize-none`}
            placeholder="University of XYZ, B.S. in Computer Science (2020-2024)"
          />
        </div>

        {/* Experience */}
        <div>
          <h2 className={headingStyle}>Experience</h2>
          <div className="flex items-center mb-1.5">
            <label htmlFor="experience" className={`${labelStyle} mb-0`}>
              Work Experience
            </label>
            {renderEnhanceButton('experience')}
          </div>
          <textarea
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={onChange}
            rows={4}
            className={`${inputBaseStyle} resize-none`}
            placeholder={`Software Engineer at TechCorp\n- Key achievement...`}
          />
        </div>

        {/* Projects */}
        <div>
          <h2 className={headingStyle}>Projects</h2>
          <div className="flex items-center mb-1.5">
            <label htmlFor="projects" className={`${labelStyle} mb-0`}>
              Key Projects
            </label>
            {renderEnhanceButton('projects')}
          </div>
          <textarea
            id="projects"
            name="projects"
            value={formData.projects}
            onChange={onChange}
            rows={4}
            className={`${inputBaseStyle} resize-none`}
            placeholder={`E-commerce Application\n- Built using React & Node.js...`}
          />
        </div>

        {/* Skills */}
        <div>
          <h2 className={headingStyle}>Skills</h2>
          <div className="flex items-center mb-1.5">
            <label htmlFor="skills" className={`${labelStyle} mb-0`}>
              Core Skills (comma separated)
            </label>
          </div>
          <input
            type="text"
            id="skills"
            name="skills"
            value={formData.skills}
            onChange={onChange}
            className={inputBaseStyle}
            placeholder="JavaScript, React, Node.js, Tailwind CSS"
          />
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
          <button
            type="button"
            onClick={onGenerate}
            disabled={isGenerating}
            className={`w-full font-bold py-3 px-6 rounded-xl shadow-md transition-colors duration-200 flex items-center justify-center gap-2 ${isGenerating ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
          >
            {isGenerating ? (
              <>
                 <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                 Generating...
              </>
            ) : "Generate Resume PDF"}
          </button>
        </div>
      </form>
    </div>
  );
}
