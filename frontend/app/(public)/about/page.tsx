"use client";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-black px-6 py-16">
      <div className="max-w-4xl mx-auto space-y-6">

        <h1 className="text-3xl font-bold">
          About Calgary Compass
        </h1>

        <p className="text-lg leading-relaxed">
          Calgary Compass is a tool to bridge the gap between tech professionals and community members in Calgary.
          Calgary Compass provides a space where input can be given on community tech projects and pilots, while giving an opportunity for the Wave Tech Center to learn which technologies and issues may be pressing and relevant in the future.
        </p>

        <p className="text-lg leading-relaxed">
          For our AI evaluation, we source from OpenAlex and Semantic Scholar, which are peer-reviewed research article databases, ensuring that all AI evaluation is referenced to facts.
        </p>

      </div>
    </main>
  );
}
