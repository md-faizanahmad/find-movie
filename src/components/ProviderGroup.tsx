import { WatchProvider } from "@/@types/watch-provider.types";
import Image from "next/image";

interface ProviderGroupProps {
  title: string;
  providers: WatchProvider[];
  icon: React.ElementType;
}

const LOGO_BASE_URL = "https://image.tmdb.org/t/p/w92";

export function ProviderGroup({
  title,
  providers,
  icon: Icon,
}: ProviderGroupProps) {
  if (!providers.length) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-zinc-300">
        <Icon className="h-4 w-4 text-red-500" />

        <h3 className="text-xs font-bold uppercase tracking-wider">{title}</h3>
      </div>

      <div className="flex flex-wrap gap-3">
        {providers.map((provider) => (
          <div key={provider.id} className="group relative">
            <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-white/10 bg-zinc-900/60 transition-transform duration-300 hover:scale-105">
              <Image
                src={`${LOGO_BASE_URL}${provider.logoPath}`}
                alt={provider.name}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>

            <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-max -translate-x-1/2 rounded-md border border-white/10 bg-zinc-950 px-2 py-1 text-[10px] font-medium text-white opacity-0 shadow-xl transition-opacity group-hover:opacity-100">
              {provider.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
