export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-6">
        HireGen AI
      </h1>

      <p className="text-gray-400 mb-8 text-lg">
        Smart Hiring & Communication Automation
      </p>

      <a
        href="/dashboard"
        className="bg-white text-black px-6 py-3 rounded-2xl font-semibold"
      >
        Go to Dashboard
      </a>
    </div>
  );
}