import Navbar from "@/components/Navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />

      <div className="flex justify-end px-8 py-3 bg-white">
        <div className="flex items-center gap-2">

          <span className="text-sm text-gray-600">
            🌐 Language
          </span>

          <select
            className="
              border
              border-gray-300
              rounded-lg
              px-3
              py-2
              text-sm
              bg-white
              shadow-sm
              hover:border-gray-400
            "
          >
            <option>English</option>
            <option>Français canadien</option>
            <option>Español latinoamericano</option>
            <option>العربية</option>
            <option>हिन्दी</option>
            <option>한국어</option>
            <option>简体中文</option>
          </select>

        </div>
      </div>

      {children}
    </>
  );
}

      
