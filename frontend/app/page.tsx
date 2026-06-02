import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white text-black overflow-hidden">

      {/* Animated Compass Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

        {/* Compass Circle */}
        <div className="relative w-[700px] h-[700px] opacity-10">

          {/* Outer Ring */}
          <div className="absolute inset-0 rounded-full border-[6px] border-red-700"></div>

          {/* Inner Ring */}
          <div className="absolute inset-10 rounded-full border-2 border-red-700"></div>

          {/* Cardinal Lines */}
          <div className="absolute left-1/2 top-0 h-full w-[2px] bg-red-700 -translate-x-1/2"></div>
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-red-700 -translate-y-1/2"></div>

          {/* Diagonal Lines */}
          <div className="absolute inset-0 rotate-45">
            <div className="absolute left-1/2 top-0 h-full w-[1px] bg-red-700 -translate-x-1/2"></div>
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-red-700 -translate-y-1/2"></div>
          </div>

          {/* Compass Letters */}
          <span className="absolute top-4 left-1/2 -translate-x-1/2 text-3xl font-bold text-red-700">
            N
          </span>

          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-3xl font-bold text-red-700">
            S
          </span>

          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-3xl font-bold text-red-700">
            W
          </span>

          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-3xl font-bold text-red-700">
            E
          </span>

          {/* Animated Needle */}
          <div className="absolute inset-0 flex items-center justify-center">

            <div className="needle-container">

              {/* North Needle */}
              <div className="absolute w-0 h-0 border-l-[14px] border-r-[14px] border-b-[180px]
                              border-l-transparent border-r-transparent border-b-red-700
                              -translate-x-1/2 -translate-y-full left-1/2 top-1/2">
              </div>

              {/* South Needle */}
              <div className="absolute w-0 h-0 border-l-[14px] border-r-[14px] border-t-[180px]
                              border-l-transparent border-r-transparent border-t-gray-500
                              -translate-x-1/2 left-1/2 top-1/2">
              </div>

              {/* Center Dot */}
              <div className="absolute w-6 h-6 bg-red-700 rounded-full
                              left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="relative z-10 flex justify-between items-center px-10 py-6 border-b border-gray-200">
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
      <div className="relative z-10 flex flex-col justify-center items-center min-h-[85vh] px-10">
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

      {/* Animation Styles */}
      <style jsx>{`
        .needle-container {
          position: relative;
          width: 100%;
          height: 100%;
          animation: compassSpin 12s ease-in-out infinite;
        }

        @keyframes compassSpin {
          0% {
            transform: rotate(0deg);
          }

          20% {
            transform: rotate(45deg);
          }

          40% {
            transform: rotate(-20deg);
          }

          60% {
            transform: rotate(120deg);
          }

          80% {
            transform: rotate(75deg);
          }

          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>

    </main>
  );
}
