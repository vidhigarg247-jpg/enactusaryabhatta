"use client";

import Image from "next/image";
import React from "react";
import { IconAward, IconBuildingCommunity, IconTrophy } from "@tabler/icons-react";

type Achievement = {
  label: string;
  title: string;
  description: React.ReactNode;
  images?: { src: string; alt: string }[];
  icon: React.ReactNode;
};

const achievements: Achievement[] = [
  {
    label: "Global recognition · 2021",
    title: "Race 4 Oceans — Global Top 4",
    description:
      "Project Palaash represented India as a Race 4 Oceans finalist at the Enactus World Cup 2021—an international milestone for our circular flower-waste work.",
    images: [
      { src: "/achievements/race-4-oceans.jpg", alt: "Enactus Aryabhatta team celebrating the Race 4 Oceans recognition" },
      { src: "/achievements/race-award.jpg", alt: "Race 4 Oceans finalist award for Project Palaash" },
    ],
    icon: <IconTrophy className="h-5 w-5" />,
  },
  {
    label: "Community-led impact",
    title: "Building impact together",
    description:
      "Our work is built with communities, creating practical opportunities and sustainable livelihoods alongside the people at the heart of every project.",
    images: [{ src: "/achievements/community-impact.jpg", alt: "Enactus team with community members" }],
    icon: <IconBuildingCommunity className="h-5 w-5" />,
  },
  {
    label: "Business ethics grant",
    title: "KPMG Business Ethics Grant Winners",
    description:
      "Enactus Aryabhatta was recognised as a KPMG Business Ethics Grant winner—an honour that celebrates purpose-led entrepreneurship and responsible impact.",
    images: [{ src: "/achievements/team-recognition.jpg", alt: "Enactus team holding certificates" }],
    icon: <IconAward className="h-5 w-5" />,
  },
  {
    label: "Competition wins",
    title: "A growing record of excellence",
    description: (
      <ul className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
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
          <li key={win} className="flex items-center gap-2 text-sm text-white/75">
            <span aria-hidden="true" className="text-sky-300">✦</span>
            {win}
          </li>
        ))}
      </ul>
    ),
    icon: <IconAward className="h-5 w-5" />,
  },
];

function AchievementMedia({ images = [] }: { images?: Achievement["images"] }) {
  if (!images.length) {
    return (
      <div className="flex h-[15rem] items-end rounded-[1.5rem] border border-sky-300/20 bg-[radial-gradient(circle_at_15%_10%,rgba(56,189,248,0.28),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent)] p-6">
        <span className="text-xs font-bold uppercase tracking-[0.24em] text-sky-200">Together, we grow</span>
      </div>
    );
  }

  return (
    <div className={`grid h-[15rem] overflow-hidden rounded-[1.5rem] bg-neutral-950 p-2 ${images.length > 1 ? "grid-cols-2 gap-2" : "grid-cols-1"}`}>
      {images.map((image) => (
        <div key={image.src} className="relative h-full overflow-hidden rounded-[1.15rem] bg-white/5">
          <Image src={image.src} alt="" fill aria-hidden="true" priority sizes="(min-width: 1024px) 28vw, 100vw" className="scale-110 object-cover opacity-40 blur-2xl" />
          <div className="absolute inset-0 bg-black/20" />
          <Image src={image.src} alt={image.alt} fill priority sizes="(min-width: 1024px) 28vw, 100vw" className="object-contain p-3" />
        </div>
      ))}
    </div>
  );
}

export function BentoGridDemo() {
  return (
    <div className="relative mx-auto max-w-6xl lg:pl-16">
      <div aria-hidden="true" className="absolute bottom-10 left-4 top-10 hidden w-px bg-white/15 lg:block">
        <div className="h-32 w-px rounded-full bg-sky-400 shadow-[0_0_22px_rgba(56,189,248,0.9)]" />
      </div>

      <div className="space-y-6">
        {achievements.map((achievement, index) => (
          <article key={achievement.title} className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.055] p-3 shadow-2xl shadow-black/25 transition duration-300 hover:border-sky-300/40 hover:bg-white/[0.08] sm:p-4">
            <div aria-hidden="true" className="absolute left-[-3.3rem] top-10 hidden size-4 rounded-full border-4 border-black bg-sky-300 shadow-[0_0_18px_rgba(56,189,248,0.95)] lg:block" />
            <div className={`grid gap-6 lg:grid-cols-[minmax(20rem,0.88fr)_minmax(0,1.12fr)] lg:items-center ${index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <AchievementMedia images={achievement.images} />
              <div className="px-3 pb-4 sm:px-5 lg:py-8">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-300">{achievement.label}</p>
                <div className="mt-4 flex items-center gap-3 text-xl font-semibold text-white sm:text-2xl">
                  <span className="grid size-9 place-items-center rounded-full bg-sky-300/10 text-sky-200">{achievement.icon}</span>
                  <h3>{achievement.title}</h3>
                </div>
                <div className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">{achievement.description}</div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
