import Link from "next/link";

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-black">
      <div className="h-2 bg-red-700 w-full"></div>

      <div className="max-w-7xl mx-auto px-8 py-12">

        <Navbar />

        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-red-700 mb-4">
            In-Person Events
          </h1>

          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Join foresight conversations shaping Calgary&apos;s smart city
            future.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-10 text-center">
            Upcoming Events
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-2xl font-bold text-red-700 mb-3">
                Future of AI in City Services
              </h3>

              <p className="text-gray-600 mb-2">
                June 15, 2026
              </p>

              <p className="text-gray-600 mb-4">
                Calgary Central Library
              </p>

              <p className="text-gray-700 mb-6">
                Discuss opportunities and risks of AI in municipal government.
              </p>

              <button className="border-2 border-red-700 text-red-700 px-5 py-2 rounded-xl font-semibold hover:bg-red-700 hover:text-white transition">
                Learn More
              </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-2xl font-bold text-red-700 mb-3">
                Smart Mobility Discussion
              </h3>

              <p className="text-gray-600 mb-2">
                July 2, 2026
              </p>

              <p className="text-gray-600 mb-4">
                University of Calgary
              </p>

              <p className="text-gray-700 mb-6">
                Explore emerging transportation technologies and citizen
                needs.
              </p>

              <button className="border-2 border-red-700 text-red-700 px-5 py-2 rounded-xl font-semibold hover:bg-red-700 hover:text-white transition">
                Learn More
              </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-2xl font-bold text-red-700 mb-3">
                World Café: Foresight and Lunch
              </h3>

              <p className="text-gray-600 mb-2">
                July 21, 2026
              </p>

              <p className="text-gray-600 mb-4">
                Wave Technology Center
              </p>

              <p className="text-gray-700 mb-6">
                Share lunch and rotate through small-group conversations imagining Calgary&apos;s future.
              </p>

              <Link
                href="/apply"
                className="inline-block border-2 border-red-700 text-red-700 px-5 py-2 rounded-xl font-semibold hover:bg-red-700 hover:text-white transition"
              >
                Learn More
              </Link>
            </div>

          </div>
        </section>

        <section className="mb-16">
          <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center shadow-sm">
            <p className="uppercase tracking-wide text-sm text-gray-600 mb-3">
              Featured Event
            </p>

            <h2 className="text-4xl font-bold text-red-700 mb-4">
              Calgary Smart City Futures Forum
            </h2>

            <p className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto">
              A community discussion exploring emerging technologies,
              public values, and the future of city services.
            </p>

            <button className="bg-red-700 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-red-800 transition">
              Register Interest
            </button>
          </div>
        </section>

        <section>
          <h2 className="text-4xl font-bold text-center mb-10">
            Community Engagement
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">

            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <h3 className="text-3xl font-bold text-red-700 mb-2">
                Coming Soon
              </h3>
              <p className="text-gray-700">Participants</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <h3 className="text-3xl font-bold text-red-700 mb-2">
                Coming Soon
              </h3>
              <p className="text-gray-700">Events Hosted</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <h3 className="text-3xl font-bold text-red-700 mb-2">
                Coming Soon
              </h3>
              <p className="text-gray-700">Partner Organizations</p>
            </div>

          </div>
        </section>

      </div>
    </main>
  );
}
