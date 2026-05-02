import { Search, Film, User } from "lucide-react"; // Optional: adding icons for a premium feel

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <Film className="text-white w-5 h-5" />
          </div>
          <h1 className="text-xl font-black tracking-tight text-gray-900">
            FIND<span className="text-blue-600">MOVIE</span>
          </h1>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium uppercase tracking-widest text-gray-500">
          <span className="hover:text-black transition-colors cursor-pointer">
            Trending
          </span>
          <span className="hover:text-black transition-colors cursor-pointer">
            Top Rated
          </span>
          <span className="hover:text-black transition-colors cursor-pointer">
            Upcoming
          </span>
          <span className="hover:text-black transition-colors cursor-pointer text-blue-600">
            My List
          </span>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-5">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Search className="w-5 h-5 text-gray-600" />
          </button>
          {/* <button className="hidden sm:block px-5 py-2 text-sm font-semibold text-white bg-black rounded-full hover:bg-gray-800 transition-all">
            Sign In
          </button> */}
          <div className="md:hidden p-2">
            {/* Mobile Menu Icon would go here */}
            <div className="w-6 h-0.5 bg-black mb-1"></div>
            <div className="w-6 h-0.5 bg-black"></div>
          </div>
        </div>
      </div>
    </header>
  );
}
