// features/people/components/PeopleGrid.tsx

import { PersonCard } from "./PersonCard";

interface Props {
  people: any[];
}

export function PeopleGrid({ people }: Props) {
  return (
    <div
      className="
        grid
        grid-cols-2
        gap-x-3
        gap-y-6

        sm:grid-cols-3
        sm:gap-x-4

        md:grid-cols-4
        md:gap-x-5

        lg:grid-cols-5

        xl:grid-cols-6
      "
    >
      {people.map((person) => (
        <PersonCard key={person.id} person={person} />
      ))}
    </div>
  );
}
