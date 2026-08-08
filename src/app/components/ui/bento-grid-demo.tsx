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
  description: string;
  image: string;
  imageAlt: string;
  className: string;
  icon: React.ReactNode;
};

const achievements: Achievement[] = [
  {
    title: "Race 4 Oceans — Global Top 4",
    description:
      "Project Palaash represented India as a finalist at the Enactus World Cup 2021.",
    image: "/achievements/race-4-oceans.jpg",
    imageAlt: "Enactus Aryabhatta team celebrating the Race 4 Oceans recognition",
    className: "md:col-span-2",
    icon: <IconTrophy className="h-4 w-4 text-amber-300" />,
  },
  {
    title: "Community Impact",
    description:
      "Building sustainable livelihoods alongside the communities we work with.",
    image: "/achievements/community-impact.jpg",
    imageAlt: "Enactus team with community members",
    className: "md:col-span-1",
    icon: <IconBuildingCommunity className="h-4 w-4 text-sky-300" />,
  },
  {
    title: "Campus Recognition",
    description:
      "Our teams have consistently earned recognition across student entrepreneurship platforms.",
    image: "/achievements/team-recognition.jpg",
    imageAlt: "Enactus team holding certificates",
    className: "md:col-span-1",
    icon: <IconAward className="h-4 w-4 text-violet-300" />,
  },
  {
    title: "Race 4 Oceans Finalist",
    description:
      "A global milestone that strengthened our commitment to circular, community-led solutions.",
    image: "/achievements/race-award.jpg",
    imageAlt: "Race 4 Oceans finalist award for Project Palaash",
    className: "md:col-span-2",
    icon: <IconTrophy className="h-4 w-4 text-amber-300" />,
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
            <div className="relative h-48 overflow-hidden rounded-2xl sm:h-56">
              <Image
                src={achievement.image}
                alt={achievement.imageAlt}
                fill
                priority={index < 2}
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
            </div>
          }
          className={cn(achievement.className)}
          icon={achievement.icon}
        />
      ))}
    </BentoGrid>
  );
}
