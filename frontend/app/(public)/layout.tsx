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
        <select
          className="
            border
            border-gray-300
            rounded-lg
            px-3
            py-2
            text-sm
            shadow-sm
          "
        >
          <option>English</option>
          <option>Français canadien</option>
          <option>Español latinoamericano</option>
          <option>العربية</option>
          <option>हिन्दी</option>
          <option>한국어</option>
          <option>简体中文</option>
          <option>繁體中文</option>
          <option>Русский</option>
          <option>Українська</option>
          <option>Tiếng Việt</option>
          <option>Filipino</option>
          <option>ਪੰਜਾਬੀ</option>
        </select>
      </div>

      {children}
    </>
  );
}
