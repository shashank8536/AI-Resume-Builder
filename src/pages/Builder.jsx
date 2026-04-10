import { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import FormSection from '../components/FormSection';
import ResumePreview from '../components/ResumePreview';

export default function Builder() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    education: '',
    skills: '',
    experience: '',
    projects: ''
  });

  const [errors, setErrors] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const resumeRef = useRef();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePrint = useReactToPrint({
    contentRef: resumeRef,
    documentTitle: `${formData.name || 'Resume'}_Resume`,
    onAfterPrint: () => setIsGenerating(false),
  });

  const handleDownload = () => {
    if (validateForm()) {
      setIsGenerating(true);
      // Small timeout to show the loading state before print dialog blocks thread
      setTimeout(() => {
        handlePrint();
      }, 500);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-7xl mx-auto py-10 px-4 md:px-8">
      {/* Left Column: Form Section */}
      <div className="flex flex-col">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Build Your Resume</h1>
        <p className="text-gray-500 mb-6 font-medium">Fill in the details below to generate a professional resume instantly.</p>

        <div className="border border-gray-100 p-6 md:p-8 rounded-2xl shadow-lg bg-white">
          <FormSection 
            formData={formData} 
            onChange={handleInputChange} 
            errors={errors} 
            onGenerate={handleDownload}
            isGenerating={isGenerating}
          />
        </div>
      </div>

      {/* Right Column: Resume Preview */}
      <div className="lg:sticky lg:top-8 self-start flex flex-col gap-6">
        <div className="flex justify-end hidden md:flex">
          <button 
            onClick={handleDownload}
            disabled={isGenerating}
            className={`px-6 py-2.5 rounded-lg border font-bold shadow-md transition-colors flex items-center gap-2 ${isGenerating ? 'bg-gray-400 border-gray-400 text-white cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-700'}`}
          >
            {isGenerating ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Generating...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Download Resume
              </>
            )}
          </button>
        </div>
        
        <div ref={resumeRef}>
          <ResumePreview data={formData} />
        </div>
        
        {/* Mobile Download button (visible only on small screens) */}
        <div className="flex justify-center md:hidden">
          <button 
            onClick={handleDownload}
            disabled={isGenerating}
            className={`w-full px-6 py-3 rounded-xl border font-bold shadow-md transition-colors flex items-center justify-center gap-2 ${isGenerating ? 'bg-gray-400 border-gray-400 text-white cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-700'}`}
          >
            {isGenerating ? (
              <>
                 <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                 Generating...
              </>
             ) : (
              <>
                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                 Download Resume
              </>
             )}
          </button>
        </div>
      </div>
    </div>
  );
}
