export default function Forbidden() {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white">
        <h1 className="text-4xl font-bold text-red-600 mb-4">403 - Forbidden</h1>
        <p className="text-lg text-gray-700">You do not have permission to access this page.</p>
      </div>
    );
  }