import ResumePreview from '../components/ResumePreview';

export default function Builder() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
      {/* Left Column: Form Placeholder */}
      <div className="border p-6 rounded-lg shadow-sm bg-white min-h-[600px] flex flex-col items-center justify-center">
        <h2 className="text-xl font-medium text-gray-500">Form Section</h2>
      </div>

      {/* Right Column: Resume Preview */}
      <div>
        <ResumePreview />
      </div>
    </div>
  );
}
