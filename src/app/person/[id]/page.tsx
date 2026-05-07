import { notFound } from "next/navigation";
import { getPersonDetails } from "@/features/people/api/getPersonDetails";
import { PersonHero } from "@/features/people/components/PersonHero";
import { PersonBiography } from "@/features/people/components/PersonBiography";
import { PersonKnownFor } from "@/features/people/components/PersonKnownFor";
import { PersonGallery } from "@/features/people/components/PersonGallery";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function PersonPage({ params }: Props) {
  const { id } = await params;

  // Validation: IDs must be numeric strings
  if (!/^\d+$/.test(id)) {
    notFound();
  }

  const person = await getPersonDetails(id);

  if (!person) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white selection:bg-red-500/30">
      {/* 1. Impactful Hero Section */}
      <PersonHero person={person} />

      {/* 2. Structured Content Wrapper */}
      <div className="relative z-20 mx-auto max-w-7xl px-4 py-12 md:px-8 lg:px-12">
        {/* Using a Grid on Desktop to separate Main Info from Sidebar-style content if needed, 
            but keeping your current flat structure clean for now */}
        <div className="flex flex-col gap-16 md:gap-24">
          {/* Biography: Full width for readability */}
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <PersonBiography biography={person.biography} />
          </section>

          {/* Featured Works / Known For: Carousel or Grid */}
          <section className="animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-black italic uppercase tracking-tighter border-l-4 border-red-600 pl-4">
                Known For
              </h2>
              <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                {person.combined_credits?.cast?.length || 0} Credits
              </span>
            </div>
            <PersonKnownFor credits={person.combined_credits?.cast || []} />
          </section>

          {/* Photo Gallery: High contrast layout */}
          <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            <div className="mb-6">
              <h2 className="text-2xl font-black italic uppercase tracking-tighter border-l-4 border-red-600 pl-4">
                Gallery
              </h2>
            </div>
            <PersonGallery images={person.images?.profiles || []} />
          </section>
        </div>
      </div>

      {/* 3. Subtle Footer Spacing */}
      <div className="h-20" aria-hidden="true" />
    </main>
  );
}
