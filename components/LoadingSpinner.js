// components/LoadingSpinner.js
export default function LoadingSpinner() {
    return (
      <div className="flex justify-center items-center space-x-2">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-400"></div>
        <span className="text-gray-400">Loading...</span>
      </div>
    );
  }