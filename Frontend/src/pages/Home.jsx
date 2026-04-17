import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-2xl mx-auto">
      <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
        Build a Professional Resume in <span className="text-blue-600">Minutes</span>
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Create a standout resume tailored to your dream job. Follow our simple builder, drop in your details, and instantly preview the result.
      </p>
      <button 
        onClick={() => navigate("/builder")}
        className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition rounded-lg shadow-sm"
      >
        Start Building Now
      </button>
    </div>
  );
}
