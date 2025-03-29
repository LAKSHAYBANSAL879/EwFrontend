import { AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LoginError() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-red-100 p-3">
            <AlertTriangle size={32} className="text-red-600" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Login Failed</h1>
        <p className="text-gray-600 mb-6">
          We couldn't authenticate your account. Please check your email and password and try again.
        </p>
        
        <div className="flex flex-col space-y-3">
          <button
            onClick={() => navigate('/login')}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 font-medium"
          >
            Try Again
          </button>
          
          <button
            onClick={() => navigate('/forgot')}
            className="w-full px-4 py-2 bg-white text-green-600 border border-green-600 rounded-md hover:bg-green-50 font-medium"
          >
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
}