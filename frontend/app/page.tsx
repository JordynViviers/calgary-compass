import Link from "next/link";

export default function Home() {

  return (

    <main className="min-h-screen p-10 flex flex-col justify-center">

      <div className="max-w-4xl">

        <h1 className="text-6xl font-bold mb-6">
          Calgary Compass
        </h1>

        <p className="text-2xl mb-10 text-gray-400">
          AI-Assisted Smart City Governance Platform
        </p>

        <p className="text-lg mb-10 leading-relaxed max-w-2xl">
          Calgary Compass helps governments,
          industry, academia, and civic leaders
          evaluate emerging smart city technologies
          using AI-powered governance analytics,
          stakeholder voting, and strategic foresight.
        </p>

        <Link href="/technologies">

          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-lg font-semibold transition">

            Explore Technologies

          </button>

        </Link>

      </div>

    </main>
  );
}