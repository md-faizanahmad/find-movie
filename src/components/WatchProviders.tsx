import { CreditCard, ShoppingBag, Tv } from "lucide-react";

import type { WatchProviderGroups } from "@/@types/watch-provider.types";
import { ProviderGroup } from "./ProviderGroup";

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
      <section className=" p-5 backdrop-blur-md">
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
    <section className="space-y-6  p-2.5 backdrop-blur-md">
      <div className="space-y-3">
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
