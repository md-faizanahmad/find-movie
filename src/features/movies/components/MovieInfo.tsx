import Image from "next/image";
import {
  Star,
  Clock,
  Calendar,
  Globe,
  Zap,
  Activity,
  Info,
} from "lucide-react";
import { WatchProviderGroups } from "@/@types/watch-provider.types";
import { WatchProviders } from "@/components/WatchProviders";

interface Props {
  title: string;
  tagline?: string | null;
  poster_path: string | null;
  overview: string;
  genres: string[];
  runtime: number;
  release_date: string;
  vote_average: number;
  status?: string;
  original_language?: string;
  popularity?: number;

  watchProviders: WatchProviderGroups | null;
}

const POSTER_BASE = "https://image.tmdb.org/t/p/w500";
const BLUR_DATA =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

export function MovieInfo({
  title,
  tagline,
  poster_path,
  overview,
  genres,
  runtime,
  release_date,
  vote_average,
  status,
  original_language,
  popularity,
  watchProviders,
}: Props) {
  return (
    <section className="flex flex-col lg:flex-row gap-8 lg:gap-16 p-6 md:p-12 bg-black text-white rounded-3xl border border-white/5 shadow-2xl">
      {/* Left Column: Poster & Quick Stats */}
      <div className="mx-auto lg:mx-0 w-full max-w-[320px] lg:max-w-95 shrink-0 space-y-6">
        {poster_path && (
          <div className="relative aspect-2/3 overflow-hidden rounded-2xl border border-white/10 shadow-2xl transition-transform duration-500 hover:scale-[1.01]">
            <Image
              src={`${POSTER_BASE}${poster_path}`}
              alt={title}
              fill
              className="object-cover"
              placeholder="blur"
              blurDataURL={BLUR_DATA}
              sizes="(max-width: 768px) 100vw, 380px"
            />
          </div>
        )}

        {/* Popularity Card - Mobile First Highlight */}
        {popularity && (
          <div className="group relative overflow-hidden rounded-2xl bg-neutral-900/50 p-4 border border-white/5 transition-colors hover:bg-red-600/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-1">
                  Trend Score
                </p>
                <p className="text-2xl font-black italic tracking-tighter text-white">
                  {Math.round(popularity).toLocaleString()}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600/10 text-red-600">
                <Zap size={24} className="fill-current" />
              </div>
            </div>
            {/* Simple visual bar for popularity impact */}
            <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-neutral-800">
              <div className="h-full bg-red-600 w-[75%]" />
            </div>
          </div>
        )}
      </div>

      {/* Right Column: Detailed Info */}
      <div className="flex-1 space-y-10">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85] italic">
            {title}
          </h1>

          {tagline && (
            <p className="text-red-600 font-bold text-lg md:text-2xl italic tracking-tight">
              &ldquo;{tagline}&rdquo;
            </p>
          )}

          {/* Core Row: Rating, Time, Year */}
          <div className="flex flex-wrap gap-4 pt-4">
            <CoreBadge
              icon={
                <Star className="fill-yellow-500 text-yellow-500" size={16} />
              }
              value={`${vote_average.toFixed(1)}`}
            />
            <CoreBadge
              icon={<Clock size={16} className="text-neutral-400" />}
              value={`${runtime} min`}
            />
            <CoreBadge
              icon={<Calendar size={16} className="text-neutral-400" />}
              value={new Date(release_date).getFullYear().toString()}
            />
          </div>
        </div>

        {/* Technical Specs Row: Status & Language */}
        <div className="flex flex-wrap gap-6 py-6 border-y border-white/5">
          <Spec
            icon={<Activity size={14} />}
            label="Production Status"
            value={status || "Released"}
          />
          <Spec
            icon={<Globe size={14} />}
            label="Original Language"
            value={original_language?.toUpperCase() || "EN"}
          />
          <Spec
            icon={<Info size={14} />}
            label="Release Date"
            value={new Date(release_date).toLocaleDateString()}
          />
        </div>

        {/* Overview */}
        <div className="space-y-4">
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-red-600">
            Overview
          </h2>
          <p className="text-neutral-400 leading-relaxed text-base md:text-xl font-light tracking-wide italic">
            {overview || "Plot summary coming soon."}
          </p>
        </div>

        {/* Genres */}
        <div className="space-y-4 pt-4">
          <div className="flex flex-wrap gap-2">
            {genres.map((name) => (
              <span
                key={name}
                className="px-4 py-2 rounded-lg bg-neutral-900 border border-white/5 text-neutral-400 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all cursor-default"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
        {watchProviders && (
          <div className="pt-6">
            <WatchProviders providers={watchProviders} />
          </div>
        )}
      </div>
    </section>
  );
}

function CoreBadge({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 border border-white/5">
      {icon}
      <span className="text-sm font-black italic uppercase">{value}</span>
    </div>
  );
}

function Spec({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-neutral-600">{icon}</div>
      <div>
        <p className="text-[9px] uppercase font-bold text-neutral-500 tracking-widest mb-0.5">
          {label}
        </p>
        <p className="text-xs font-black uppercase text-white">{value}</p>
      </div>
    </div>
  );
}
