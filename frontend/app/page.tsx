import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">

      {/* Navigation Bar */}
      <nav className="flex justify-between items-center px-10 py-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-red-700">
          Calgary Compass
        </h1>

        <div className="flex items-center gap-8 text-lg font-medium">
          <Link
            href="/technologies"
            className="hover:text-red-700 transition"
          >
            Explore Technologies
          </Link>

          <Link
            href="/events"
            className="hover:text-red-700 transition"
          >
            In-Person Events
          </Link>

          <Link
            href="/community-input"
            className="hover:text-red-700 transition"
          >
            Community Input
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col justify-center items-center min-h-[85vh] px-10">
        <div className="max-w-4xl text-center">

          <h1 className="text-6xl font-bold mb-6">
            Calgary Compass
          </h1>

          <p className="text-2xl mb-10">
            AI-Assisted Smart City Governance Platform
          </p>

          <p className="text-lg mb-10 leading-relaxed max-w-2xl mx-auto">
            Calgary Compass helps governments, industry, academia, and civic
            leaders evaluate emerging smart city technologies using AI-powered
            governance analytics, stakeholder voting, and strategic foresight.
          </p>

          <Link href="/technologies">
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl text-lg font-semibold transition">
              Explore Technologies
            </button>
          </Link>

        </div>
      </div>

    </main>
  );
}
