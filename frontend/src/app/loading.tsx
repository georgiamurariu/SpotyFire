import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 flex items-center justify-center">
      <div className="relative flex items-center justify-center">
        {/* Rotating Circle Ring */}
        <div className="absolute inset-0 -m-8 border-4 border-slate-800 rounded-full w-64 h-64" />
        <div
          className="absolute inset-0 -m-8 border-t-4 border-green-500 rounded-full w-64 h-64 animate-spin"
          style={{ animationDuration: '0.5s' }}
        />

        {/* Centered Logo */}
        <Image
          src="/spotyfire-logo.png"
          alt="Loading..."
          width={192}
          height={192}
          className="relative z-10 w-48 h-48 object-contain"
          priority
        />
      </div>
    </div>
  );
}
