// src/components/Footer.tsx
import Link from "next/link";
import { Mail, Film } from "lucide-react";
import { PWAInstallCard } from "@/components/pwa/PWAInstallCard";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 bg-black pt-16 pb-8 text-neutral-400">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand & Disclaimer Column */}
          <div className="col-span-1 space-y-6 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-white">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600">
                <Film size={18} className="text-white" />
              </div>
              <span className="text-xl font-black uppercase tracking-tighter">
                FIND<span className="text-red-600">MOVIE</span>
              </span>
            </Link>

            <div className="space-y-4">
              <p className="max-w-sm text-sm leading-relaxed">
                Your ultimate destination for discovering movies, TV shows, and
                actors. Explore the world of cinema with real-time data and
                high-quality trailers.
              </p>
              <PWAInstallCard />
              {/* Important Disclaimer Box */}
              <div className="rounded-xl border border-white/5 bg-neutral-900/50 p-4">
                <p className="text-[11px] font-medium leading-normal uppercase tracking-wider text-neutral-500">
                  <span className="text-red-500 font-bold block mb-1">
                    Disclaimer:
                  </span>
                  This platform is a movie browsing and discovery tool only.
                  Content cannot be watched directly on this site. All data is
                  provided via public API. We do not host any copyrighted media
                  files.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/movies"
                  className="hover:text-red-500 transition-colors"
                >
                  Movies
                </Link>
              </li>
              <li>
                <Link
                  href="/tv"
                  className="hover:text-red-500 transition-colors"
                >
                  TV Shows
                </Link>
              </li>
              <li>
                <Link
                  href="/people"
                  className="hover:text-red-500 transition-colors"
                >
                  Actors
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="hover:text-red-500 transition-colors"
                >
                  Advanced Search
                </Link>
              </li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white">
              Connect
            </h4>
            <div className="flex gap-4">
              <Link
                href="mdahmad.dev@gmail.com"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 border border-white/5 hover:bg-red-600 hover:text-white transition-all"
              >
                <Mail size={18} />
              </Link>
            </div>
            <p className="text-xs">
              Powered by{" "}
              <span className="text-white font-medium">TMDB API</span>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] uppercase tracking-widest">
            © {currentYear} FindMovie. No personal API used. Built for
            educational purposes.
          </p>
          <div className="flex gap-6 text-[11px] uppercase tracking-widest font-bold">
            <Link href="#" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
