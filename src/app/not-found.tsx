import Link from "next/link";
import { MoveLeft, Film, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative h-screen w-full flex items-center justify-center bg-black overflow-hidden">
      {/* 1. Background Visual Effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-red-900/20 via-black to-black" />
        {/* Animated Static/Grain Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://media.giphy.com/media/oEI9uWUicGLeU/giphy.gif')]" />
      </div>

      {/* 2. Content Container */}
      <div className="relative z-10 text-center px-6">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Film
              className="w-24 h-24 text-red-600 animate-pulse"
              strokeWidth={1.5}
            />
            <span className="absolute -top-2 -right-2 bg-white text-black text-xs font-black px-2 py-1 rounded">
              404
            </span>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic mb-4">
          Lost the <span className="text-red-600">Plot?</span>
        </h1>

        <p className="text-neutral-400 text-lg md:text-xl max-w-md mx-auto mb-10 leading-relaxed">
          The scene you&apos;re looking for was cut from the final edit or never
          existed.
        </p>

        {/* 3. Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold transition-transform hover:scale-105 active:scale-95"
          >
            <Home size={20} />
            Go Home
          </Link>
          {/* 
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-8 py-4 bg-neutral-900 text-white rounded-full font-bold border border-white/10 transition-colors hover:bg-neutral-800"
          >
            <MoveLeft size={20} />
            Go Back
          </button> */}
        </div>
      </div>

      {/* 4. Decorative Vignette */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,1)]" />
    </main>
  );
}
