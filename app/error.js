'use client'

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center p-8 max-w-2xl">
        <h2 className="text-3xl font-bold text-red-400 mb-4">
          ⚠️ {error.message}
        </h2>
        <button
          onClick={reset}
          className="mt-4 px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}