export default function ResumePreview({ data }) {
  const hasData = data && Object.values(data).some((value) => value.trim() !== '');

  if (!hasData) {
    return (
      <div className="bg-white rounded-2xl shadow-lg min-h-[600px] md:min-h-[800px] flex flex-col items-center justify-center text-gray-400 w-full p-8 border border-gray-100 transition-all">
        <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h2 className="text-xl font-medium mb-2 text-gray-500">Live Preview</h2>
        <p className="text-sm">Start typing on the left to see your resume appear here.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-2xl w-full min-h-[800px] overflow-hidden flex flex-col font-serif transition-all duration-300 print:shadow-none border border-gray-200 text-gray-800 p-8 md:p-12">
      {/* Simple Header */}
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold uppercase tracking-wider mb-1 text-gray-900">
          {data.name || 'Your Name'}
        </h1>
        {data.role && <div className="text-sm text-gray-700 font-semibold uppercase tracking-widest mb-2">{data.role}</div>}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[13px] font-medium text-gray-600">
          {data.email && <span>{data.email}</span>}
          {(data.email && data.phone) && <span>|</span>}
          {data.phone && <span>{data.phone}</span>}
        </div>
      </div>



      {/* Education */}
      {data.education && (
        <div className="mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider mt-3 mb-1 text-gray-900 border-b-2 border-gray-800 pb-1">
            Education
          </h2>
          <div className="text-[13px] whitespace-pre-wrap leading-tight text-gray-800 mt-2">
            {data.education}
          </div>
        </div>
      )}

      {/* Experience */}
      {data.experience && (
        <div className="mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider mt-3 mb-1 text-gray-900 border-b-2 border-gray-800 pb-1">
            Experience
          </h2>
          <div className="text-[13px] whitespace-pre-wrap leading-tight text-gray-800 mt-2">
            {data.experience}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects && (
        <div className="mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider mt-3 mb-1 text-gray-900 border-b-2 border-gray-800 pb-1">
            Projects
          </h2>
          <div className="text-[13px] whitespace-pre-wrap leading-tight text-gray-800 mt-2">
            {data.projects}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills && (
        <div className="mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider mt-3 mb-1 text-gray-900 border-b-2 border-gray-800 pb-1">
            Skills
          </h2>
          <div className="text-[13px] leading-tight text-gray-800 mt-2">
            {data.skills}
          </div>
        </div>
      )}
    </div>
  );
}
