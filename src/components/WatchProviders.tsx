import Image from "next/image";

import { CreditCard, ShoppingBag, Tv } from "lucide-react";

import type {
  WatchProvider,
  WatchProviderGroups,
} from "@/@types/watch-provider.types";

interface ProviderGroupProps {
  title: string;

  providers: WatchProvider[];

  icon: React.ElementType;
}

const LOGO_BASE_URL = "https://image.tmdb.org/t/p/w92";

function ProviderGroup({ title, providers, icon: Icon }: ProviderGroupProps) {
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

interface WatchProvidersProps {
  providers: WatchProviderGroups | null;
}

export function WatchProviders({ providers }: WatchProvidersProps) {
  if (!providers) {
    return null;
  }

  const hasProviders =
    providers.stream.length > 0 ||
    providers.rent.length > 0 ||
    providers.buy.length > 0 ||
    providers.free.length > 0;

  if (!hasProviders) {
    return (
      <section className="rounded-2xl border border-white/10 bg-zinc-950/40 p-5 backdrop-blur-md">
        <h2 className="text-base font-black uppercase tracking-wide text-white">
          Where to Watch
        </h2>

        <p className="mt-3 text-sm text-zinc-400">
          No streaming providers available in your region.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-6 rounded-2xl border border-white/10 bg-zinc-950/40 p-5 backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div>
          <h2 className="text-base font-black uppercase tracking-wide text-white">
            Where to Watch
          </h2>

          <p className="mt-1 text-xs text-zinc-400">
            Available streaming, rental, and purchase platforms.
          </p>
        </div>

        {providers.link && (
          <a
            href={providers.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-zinc-500 transition-colors hover:text-red-400"
          >
            TMDB ↗
          </a>
        )}
      </div>

      <div className="space-y-5">
        <ProviderGroup title="Stream" providers={providers.stream} icon={Tv} />

        <ProviderGroup
          title="Rent"
          providers={providers.rent}
          icon={CreditCard}
        />

        <ProviderGroup
          title="Buy"
          providers={providers.buy}
          icon={ShoppingBag}
        />
      </div>
    </section>
  );
}
