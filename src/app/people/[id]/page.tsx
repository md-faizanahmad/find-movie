import { notFound } from "next/navigation";

import { getPersonDetails } from "@/features/people/api/getPersonDetails";
import { PersonHero } from "@/features/people/components/details/PersonHero";
import { PersonBiography } from "@/features/people/components/details/PersonBiography";
import { PersonKnownFor } from "@/features/people/components/details/PersonKnownFor";
import { PersonGallery } from "@/features/people/components/details/PersonGallery";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function PersonPage({ params }: Props) {
  const { id } = await params;

  if (!/^\d+$/.test(id)) {
    notFound();
  }

  const person = await getPersonDetails(id);

  if (!person) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <PersonHero person={person} />

      <div className="mx-auto max-w-7xl space-y-14 px-4 py-10 md:px-8 lg:px-12">
        <PersonBiography biography={person.biography} />

        <PersonKnownFor credits={person.combined_credits?.cast || []} />

        <PersonGallery images={person.images?.profiles || []} />
      </div>
    </main>
  );
}
