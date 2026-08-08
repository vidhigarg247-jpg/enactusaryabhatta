"use client";

import Image from "next/image";
import React from "react";
import {
  IconAward,
  IconBuildingCommunity,
  IconTrophy,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { BentoGrid, BentoGridItem } from "./bento-grid";

type Achievement = {
  title: string;
  description: React.ReactNode;
  images?: { src: string; alt: string }[];
  className: string;
  icon: React.ReactNode;
};

const achievements: Achievement[] = [
  {
    title: "Race 4 Oceans — Global Top 4",
    description:
      "Project Palaash represented India as a Race 4 Oceans finalist at the Enactus World Cup 2021—an international milestone for our circular flower-waste work.",
    images: [
      {
        src: "/achievements/race-4-oceans.jpg",
        alt: "Enactus Aryabhatta team celebrating the Race 4 Oceans recognition",
      },
      {
        src: "/achievements/race-award.jpg",
        alt: "Race 4 Oceans finalist award for Project Palaash",
      },
    ],
    className: "md:col-span-2",
    icon: <IconTrophy className="h-4 w-4 text-amber-300" />,
  },
  {
    title: "Community Impact",
    description:
      "Building sustainable livelihoods alongside the communities we work with.",
    images: [{ src: "/achievements/community-impact.jpg", alt: "Enactus team with community members" }],
    className: "md:col-span-1",
    icon: <IconBuildingCommunity className="h-4 w-4 text-sky-300" />,
  },
  {
    title: "Campus Recognition",
    description:
      "Our teams have consistently earned recognition across student entrepreneurship platforms.",
    images: [{ src: "/achievements/team-recognition.jpg", alt: "Enactus team holding certificates" }],
    className: "md:col-span-1",
    icon: <IconAward className="h-4 w-4 text-violet-300" />,
  },
  {
    title: "Inter-College Wins",
    description: (
      <ul className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
        {[
          "Rajdhani College — 1st place",
          "DTU — 1st place",
          "Maitreyi College — 1st place",
          "CVS — 1st place",
          "BML Munjal — 2nd place",
          "JEMTEC — 1st place",
          "ARSD — 1st place",
          "JMC — 2nd place",
          "SLC — 1st place",
          "SRCC — 3rd place",
        ].map((win) => (
          <li key={win} className="flex items-center gap-2">
            <span aria-hidden="true" className="text-amber-300">✦</span>
            {win}
          </li>
        ))}
      </ul>
    ),
    className: "md:col-span-3",
    icon: <IconAward className="h-4 w-4 text-sky-300" />,
  },
];

export function BentoGridDemo() {
  return (
    <BentoGrid className="mx-auto max-w-6xl">
      {achievements.map((achievement, index) => (
        <BentoGridItem
          key={achievement.title}
          title={achievement.title}
          description={achievement.description}
          header={
            achievement.images ? (
              <div className={`grid h-56 overflow-hidden rounded-2xl bg-black p-2 ${achievement.images.length > 1 ? "grid-cols-2 gap-2" : "grid-cols-1"}`}>
                {achievement.images.map((image) => (
                  <div key={image.src} className="relative min-w-0 overflow-hidden rounded-xl bg-white/5">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      priority={index < 2}
                      sizes="(min-width: 768px) 20vw, 50vw"
                      className="object-contain p-1.5 transition duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex min-h-24 items-end overflow-hidden rounded-2xl border border-sky-300/20 bg-[radial-gradient(circle_at_15%_10%,rgba(56,189,248,0.28),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent)] p-5">
                <span className="text-xs font-bold uppercase tracking-[0.22em] text-sky-200">Together, we grow</span>
              </div>
            )
          }
          className={cn(achievement.className)}
          icon={achievement.icon}
        />
      ))}
    </BentoGrid>
  );
}
