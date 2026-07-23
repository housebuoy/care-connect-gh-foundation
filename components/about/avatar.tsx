// src/components/about/avatar.tsx
import Image from "next/image";
import type { TeamMember } from "@/lib/mock/about";

export function Avatar({ person }: { person: TeamMember }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative aspect-square w-full overflow-hidden rounded-full border border-ink/10 bg-ink/[0.03]">
        {person.image ? (
          <Image src={person.image} alt={person.name} fill className="object-cover"
            sizes="(max-width:768px) 20vw, 10vw" />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="font-display text-lg text-ink/25">
              {person.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </span>
          </div>
        )}
      </div>
      <p className="type-caption mt-2 truncate normal-case tracking-normal text-ink/80 w-full">
        {person.name}
      </p>
    </div>
  );
}