"use client";

export default function CompassLoader() {
  return (
    <div className="flex flex-col items-center justify-center py-20">

      <div className="relative w-40 h-40">

        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-red-700" />

        {/* Inner Ring */}
        <div className="absolute inset-6 rounded-full border border-red-300" />

        {/* Compass Lines */}
        <div className="absolute left-1/2 top-0 h-full w-px bg-red-200 -translate-x-1/2" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-red-200 -translate-y-1/2" />

        <div className="absolute inset-0 rotate-45">
          <div className="absolute left-1/2 top-0 h-full w-px bg-red-100 -translate-x-1/2" />
          <div className="absolute top-1/2 left-0 w-full h-px bg-red-100 -translate-y-1/2" />
        </div>

        {/* N E S W */}
        <span className="absolute top-1 left-1/2 -translate-x-1/2 text-red-700 font-bold">
          N
        </span>

        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-red-700 font-bold">
          S
        </span>

        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-red-700 font-bold">
          W
        </span>

        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-red-700 font-bold">
          E
        </span>

        {/* Rotating Needle */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            animation: "compass-spin 1.8s linear infinite",
          }}
        >
          <div className="relative w-20 h-20">

            <div
              className="
                absolute
                left-1/2
                top-0
                w-0
                h-0
                border-l-[8px]
                border-r-[8px]
                border-b-[40px]
                border-l-transparent
                border-r-transparent
                border-b-red-700
                -translate-x-1/2
              "
            />

            <div
              className="
                absolute
                left-1/2
                bottom-0
                w-0
                h-0
                border-l-[8px]
                border-r-[8px]
                border-t-[40px]
                border-l-transparent
                border-r-transparent
                border-t-gray-400
                -translate-x-1/2
              "
            />

            <div className="absolute left-1/2 top-1/2 w-4 h-4 bg-red-700 rounded-full -translate-x-1/2 -translate-y-1/2" />

          </div>
        </div>

      </div>

      <p className="mt-6 text-gray-600 font-medium">
        Loading...
      </p>


    </div>
  );
}
