"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Carousel, Card } from "@/app/components/ui/apple-cards-carousel";
import { BentoGridDemo } from "@/app/components/ui/bento-grid-demo";

type ProjectPage = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageFit?: "cover" | "contain";
  imageBackground?: string;
  gallery?: ProjectGalleryImage[];
};

type ProjectGalleryImage = {
  src: string;
  alt: string;
  fit?: "cover" | "contain";
  background?: string;
};

type Project = {
  category: string;
  title: string;
  src: string;
  accent: string;
  pages: ProjectPage[];
};

function ProjectImageGallery({
  images,
  label,
}: {
  images: ProjectGalleryImage[];
  label: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];
  const hasMultipleImages = images.length > 1;

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + images.length) % images.length);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % images.length);
  };

  return (
    <div
      className="relative flex min-h-72 items-center justify-center overflow-hidden bg-neutral-100 p-3 sm:min-h-80 sm:p-5 md:min-h-full"
      style={{ backgroundColor: activeImage.background ?? "#f5f5f5" }}
    >
      <Image
        key={activeImage.src}
        src={activeImage.src}
        alt={activeImage.alt}
        fill
        sizes="(min-width: 768px) 36vw, 100vw"
        className="object-contain p-3 transition-opacity duration-300 sm:p-5"
      />

      {hasMultipleImages && (
        <div className="absolute inset-x-3 bottom-3 z-10 flex items-center justify-between sm:inset-x-5 sm:bottom-5">
          <button
            type="button"
            onClick={showPrevious}
            aria-label={`Show previous ${label} image`}
            className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white/90 text-lg font-semibold text-neutral-900 shadow-sm transition hover:scale-105 hover:bg-white focus:outline-none focus:ring-2 focus:ring-black/30"
          >
            ←
          </button>
          <span className="rounded-full bg-black/70 px-3 py-1.5 text-xs font-semibold tracking-[0.12em] text-white">
            {activeIndex + 1} / {images.length}
          </span>
          <button
            type="button"
            onClick={showNext}
            aria-label={`Show next ${label} image`}
            className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white/90 text-lg font-semibold text-neutral-900 shadow-sm transition hover:scale-105 hover:bg-white focus:outline-none focus:ring-2 focus:ring-black/30"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}

function ProjectLayout({ project }: { project: Project }) {
  return (
    <div className="space-y-5">
      {project.pages.map((page) => {
        const containsImage = page.imageFit === "contain";
        const gallery = page.gallery;

        return (
          <article
          key={page.title}
          className="overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-sm"
        >
          <div className="grid md:grid-cols-[1.15fr_0.85fr]">
            <div className="p-6 sm:p-8 md:p-10">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-neutral-500">
                {page.eyebrow}
              </p>
              <h3 className="text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">
                {page.title}
              </h3>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-700 md:text-lg">
                {page.description}
              </p>
            </div>
            {gallery ? (
              <ProjectImageGallery images={gallery} label={page.title} />
            ) : (
              <div
                className="relative min-h-48 md:min-h-full"
                style={{ backgroundColor: containsImage ? page.imageBackground ?? "#f5f5f5" : "#f5f5f5" }}
              >
                <Image
                  src={page.image}
                  alt={`${project.title}: ${page.title}`}
                  fill
                  sizes="(min-width: 768px) 36vw, 100vw"
                  className={containsImage ? "object-contain p-4 sm:p-6" : "object-cover"}
                />
                {!containsImage && <div className="absolute inset-0 bg-black/5" />}
              </div>
            )}
          </div>
        </article>
        );
      })}
    </div>
  );
}

export default function ProjectsPage() {
  const cards = projects.map((project, index) => (
    <Card
      key={project.title}
      card={{
        category: project.category,
        title: project.title,
        src: project.src,
        content: <ProjectLayout project={project} />,
      }}
      index={index}
    />
  ));

  return (
    <div className="-mt-16 min-h-screen bg-black py-12 sm:py-16">
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-600">Enactus Aryabhatta</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          Projects that turn challenges into opportunity.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
          Each project is built with communities at its centre: reducing waste, restoring ecosystems and creating dignified livelihoods.
        </p>
      </section>

      <Carousel items={cards} />

      <section aria-labelledby="achievements-heading" className="mt-12 bg-black py-16 sm:mt-16 sm:py-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-center text-xs font-bold uppercase tracking-[0.28em] text-sky-300">
            Celebrating progress
          </p>
          <h2 id="achievements-heading" className="mt-3 text-center text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Our Achievements
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-white/65 sm:text-base">
            Milestones that reflect the work, courage and collaboration behind Enactus Aryabhatta.
          </p>
          <div className="mt-10 sm:mt-14">
            <BentoGridDemo />
          </div>
        </div>
      </section>
    </div>
  );
}

const projects: Project[] = [
  {
    category: "Waste to worth",
    title: "Palaash",
    src: "/projects/palaash/aromy-incense-range.jpg",
    accent: "#f9bdff",
    pages: [
      {
        eyebrow: "Project Palaash",
        title: "A second life for every flower.",
        description: "Established in 2019, Palaash reclaims flower waste before it reaches landfills and water bodies. The project creates vegan dyes from discarded petals, supports traditional handloom practices and creates livelihood opportunities through products that keep floral waste in use for longer.",
        image: "/Projectpalaash.png",
        imageFit: "contain",
        imageBackground: "#2d1c25",
      },
      {
        eyebrow: "Utsav · Diwali",
        title: "A warmer Diwali, made with intention.",
        description: "Utsav brings flowers back into the festival of light through organic candles and mindful gift sets. It is a small, beautiful way to celebrate while honouring both the materials we use and the hands that make them.",
        image: "/projects/palaash/utsav-products.jpg",
        gallery: [
          { src: "/projects/palaash/utsav-products.jpg", alt: "Utsav organic candle collection", fit: "contain" },
          { src: "/projects/palaash/utsav-clay-candle.jpg", alt: "Utsav clay candle and gift box", fit: "contain" },
          { src: "/projects/palaash/utsav-scented-candle.jpg", alt: "Utsav scented candle and gift box", fit: "contain" },
          { src: "/projects/palaash/utsav-celebration-box.jpg", alt: "Utsav celebration box with candles and rakhis", fit: "contain" },
        ],
      },
      {
        eyebrow: "Abir · Holi",
        title: "Colour that celebrates the planet too.",
        description: "Abir makes organic gulal from repurposed flower waste, bringing vibrant colour to Holi without leaving behind the usual chemical footprint. Each packet makes room for a more conscious celebration of colour.",
        image: "/projects/palaash/abir-colour-collection.jpg",
        gallery: [
          { src: "/projects/palaash/abir-colour-collection.jpg", alt: "Abir organic colour collection", fit: "contain" },
          { src: "/projects/palaash/abir-marigold-turmeric.jpg", alt: "Abir marigold and turmeric organic colour", fit: "contain" },
          { src: "/projects/palaash/abir-beetroot-bougainvillea.jpg", alt: "Abir beetroot and bougainvillea organic colour", fit: "contain" },
          { src: "/projects/palaash/abir-marigold.jpg", alt: "Abir marigold organic colour", fit: "contain" },
          { src: "/projects/palaash/abir-spinach-fenugreek.jpg", alt: "Abir spinach and fenugreek organic colour", fit: "contain" },
          { src: "/projects/palaash/abir-full-range.jpg", alt: "Full Abir organic colour range", fit: "contain" },
          { src: "/projects/palaash/abir-team.jpg", alt: "Enactus Aryabhatta team with Abir organic colours", fit: "contain" },
        ],
      },
      {
        eyebrow: "Bandhan · Rakshabandhan",
        title: "A rakhi that grows beyond the celebration.",
        description: "Bandhan crafts organic seed rakhis that carry a promise beyond Rakshabandhan. Once the festival is over, the rakhi can be planted—turning a symbol of care into the beginning of something green.",
        image: "/projects/palaash/organic-gulal.jpg",
      },
      {
        eyebrow: "Aromy",
        title: "Floral memories, reimagined as fragrance.",
        description: "Aromy turns repurposed flower waste into hand-crafted incense cones. The result is a slower, more mindful ritual—one that carries the warmth of familiar fragrances while extending the life of every petal.",
        image: "/projects/palaash/aromy-incense-range.jpg",
        gallery: [
          { src: "/projects/palaash/aromy-incense-range.jpg", alt: "Aromy incense cone range", fit: "contain" },
          { src: "/projects/palaash/aromy-sandalwood.jpg", alt: "Aromy sandalwood incense cones", fit: "contain" },
          { src: "/projects/palaash/aromy-cones.jpg", alt: "Aromy incense cone collection", fit: "contain" },
          { src: "/projects/palaash/aromy-burning-cones.jpg", alt: "Aromy incense cones in use", fit: "contain", background: "#2a211f" },
        ],
      },
      {
        eyebrow: "Gul",
        title: "Colouring textiles with a gentler process.",
        description: "Gul gives textiles colour through organic dyes derived from flower waste. It explores a more responsible approach to dyeing—one where discarded petals find expression in fabric instead of becoming waste.",
        image: "/projects/palaash/gul-organic-dyes.jpg",
        gallery: [
          { src: "/projects/palaash/gul-organic-dyes.jpg", alt: "Gul organic dyes", fit: "contain" },
          { src: "/projects/palaash/gul-dyed-textiles.jpg", alt: "Gul naturally dyed textiles", fit: "contain", background: "#eee9df" },
          { src: "/projects/palaash/gul-natural-ingredients.jpg", alt: "Natural ingredients used for Gul dyes", fit: "contain" },
          { src: "/projects/palaash/gul-dyed-top.jpg", alt: "Naturally dyed Gul garment", fit: "contain" },
          { src: "/projects/palaash/gul-fabric-rolls.jpg", alt: "Naturally dyed Gul fabric rolls", fit: "contain" },
          { src: "/projects/palaash/gul-fabric-detail.jpg", alt: "Gul dyed fabric detail", fit: "contain" },
          { src: "/projects/palaash/gul-community.jpg", alt: "Project Palaash team with community partners", fit: "contain" },
          { src: "/projects/palaash/gul-dyeing-process.jpg", alt: "Gul artisan working with naturally dyed fabric", fit: "contain" },
          { src: "/projects/palaash/gul-community-process.jpg", alt: "Gul team displaying naturally dyed fabric", fit: "contain" },
        ],
      },
      {
        eyebrow: "Recognition",
        title: "A locally rooted idea with a global voice.",
        description: "Project Palaash was recognised as a Race 4 Oceans finalist at the Enactus World Cup 2021—encouragement to keep growing our circular approach to flower waste.",
        image: "/projects/palaash/gul-organic-dyes.jpg",
        gallery: [
          { src: "/projects/palaash/race-4-oceans-award.jpg", alt: "Race 4 Oceans award", fit: "contain" },
          { src: "/projects/palaash/race-4-oceans-celebration.jpg", alt: "Project Palaash Race 4 Oceans celebration", fit: "contain" },
        ],
      },
    ],
  },
  {
    category: "Soil restoration",
    title: "Aarazi",
    src: "/Aarazi.png",
    accent: "#98c09a",
    pages: [
      {
        eyebrow: "The challenge",
        title: "Healthy soil is the foundation of food security.",
        description: "Established in 2023, Aarazi addresses soil pollution and land degradation caused by chemical fertilisers and pesticides. It develops organic alternatives from natural ingredients to help farming communities move towards healthier, more resilient soil.",
        image: "/Aarazi.png",
        imageFit: "contain",
        imageBackground: "#233523",
      },
      {
        eyebrow: "Our solution",
        title: "Natural alternatives for resilient farms.",
        description: "We create organic pesticides and compost, alongside planting kits that make sustainable growing more accessible.",
        image: "/yellow.png",
      },
      {
        eyebrow: "Learning together",
        title: "Growing knowledge with Rise Foundation.",
        description: "Through our tie-up with Rise Foundation, we learned practical methods for making organic pesticides and compost.",
        image: "/projects/aarazi/rise-foundation-training.jpg",
        imageFit: "contain",
        imageBackground: "#f5f2e9",
      },
    ],
  },
  {
    category: "Climate innovation",
    title: "Ibtida",
    src: "/Ibtida.png",
    accent: "#737373",
    pages: [
      {
        eyebrow: "The challenge",
        title: "Every material choice carries a carbon cost.",
        description: "Started in 2021, Ibtida tackles carbon emissions through lower-impact materials and climate-conscious products. Its hemp-bag vertical, Anagha, uses a crop that needs less water and can support a cleaner, more responsible everyday choice.",
        image: "/Ibtida.png",
        imageFit: "contain",
        imageBackground: "#20201d",
      },
      {
        eyebrow: "Our vertical",
        title: "Bags made from hemp, built for a lighter footprint.",
        description: "Our hemp-based bags showcase a durable, reusable alternative to conventional materials, while opening conversations around natural fibres and responsible consumption.",
        image: "/Ibtida.png",
        gallery: [
          { src: "/projects/ibtida/hemp-bags-showcase.jpg", alt: "Ibtida hemp bags at a project showcase", fit: "contain" },
          { src: "/projects/ibtida/hemp-bags-flatlay.jpg", alt: "Ibtida hemp bags displayed outdoors", fit: "contain" },
          { src: "/projects/ibtida/hemp-bag-in-use.jpg", alt: "Ibtida hemp bag in use", fit: "contain" },
        ],
      },
    ],
  },
  {
    category: "Food circularity",
    title: "Utkarsh",
    src: "/utkarsh.png",
    accent: "#ffa56d",
    pages: [
      {
        eyebrow: "The challenge",
        title: "Good nutrition should not create more waste.",
        description: "Utkarsh addresses the value that is lost when fruit and vegetable peels are discarded. By looking at these overlooked ingredients differently, we create a more circular journey from kitchen waste to a wholesome snack.",
        image: "/Projectutkarsh.png",
        imageFit: "contain",
        imageBackground: "#24180e",
      },
      {
        eyebrow: "Our product",
        title: "Veggitos: a snack with a second story.",
        description: "Veggitos transforms nutrient-rich fruit and vegetable peels into flavourful chips. Every pack is designed to make a familiar snack choice more mindful—reducing waste while celebrating ingredients that still have plenty to offer.",
        image: "/projects/utkarsh/veggitos-sustainable-snack.jpg",
        imageFit: "contain",
        imageBackground: "#f5f5ef",
      },
      {
        eyebrow: "Community impact",
        title: "Creating work closer to home.",
        description: "Utkarsh creates earning opportunities for women in rural areas by building on the cooking skills they already have. The model connects circular food production with flexible, dignified livelihoods closer to home.",
        image: "/utkarsh.png",
      },
    ],
  },
];
