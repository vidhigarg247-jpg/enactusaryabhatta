"use client";

import StaggeredMenu from "@/app/components/ui/StaggeredMenu";
import TextPressure from "./components/TextPressure";
import BlurText from "./BlurText";
import InfiniteMenu from "@/app/components/ui/InfiniteMenu";
import LiquidEther from "@/app/components/ui/LiquidEther";
import Carousel from "./components/Carousel";
import FlowingMenu from "@/app/components/FlowingMenu";
import { AnimatedModalDemo } from "@/app/components/ui/AnimatedModalDemo";

export default function Home() {
  const menuItems = [
    { label: "Home", ariaLabel: "Go to home page", link: "/" },
    { label: "About", ariaLabel: "Learn about Enactus", link: "#about" },
    { label: "Projects", ariaLabel: "View our projects", link: "/projects" },
    { label: "Team", ariaLabel: "Meet our team", link: "/core-team" },
    { label: "Admin", ariaLabel: "Admin Dashboard", link: "/admin" },
    { label: "Tasks", ariaLabel: "View team tasks", link: "/admin/tasks" },
  ];

  const socialItems = [
    { label: "LinkedIn", link: "https://linkedin.com/company/enactus-aryabhatta" },
    { label: "Instagram", link: "https://instagram.com/enactusaryabhatta" },
    { label: "Twitter", link: "https://twitter.com/enactusaryabhatta" },
  ];

  const infiniteItems = [
    {
      image: "/image1.png",
      link: "https://www.instagram.com/p/CjdQKGbLncM/",
      title: "",
      description: "Jar candles",
    },
    {
      image: "/image2.png",
      link: "https://www.instagram.com/p/C-ske3TSwKY/",
      title: "Resin Rakhi",
      description: "Rakhi",
      titleSize: "2rem",
      descriptionSize: "1rem",
    },
    {
      image: "/image3.png",
      link: "https://www.instagram.com/reel/DGsNQT-x35L/",
      title: "Organic Gulaal",
      description: "Abir",
    },
    {
      image: "/image4.png",
      link: "https://www.instagram.com/reel/DGsNQT-x35L/",
      description: "Jar with Lid Candles",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-slate-100 relative -mt-16">

      {/* MENU */}
      <div className="fixed top-0 left-0 w-full z-[9999]">
        <StaggeredMenu
          isFixed
          position="right"
          items={menuItems}
          socialItems={socialItems}
          displaySocials
          displayItemNumbering
          menuButtonColor="#f8fafc"
          openMenuButtonColor="#fbbf24"
          changeMenuColorOnOpen
          colors={["#1e293b", "#0f172a", "#334155"]}
          accentColor="#fbbf24"
        />
      </div>

      {/* HERO */}
      <section className="relative w-full min-h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <LiquidEther />
        </div>
        <div className="relative z-10 flex items-center min-h-screen px-4 pt-16 pb-12 max-w-6xl mx-auto">
          <div className="w-full">
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase mb-4 font-medium">
              Enactus · Aryabhatta College · New Delhi
            </p>
            <h1 className="mb-4 font-extrabold">
              <span className="block text-6xl md:text-9xl text-white leading-none">Enactus</span>
              <span className="block text-4xl md:text-8xl text-amber-300 mt-2 leading-none">
                Aryabhatta College
              </span>
            </h1>
            <p className="max-w-xl mt-6 mb-8 text-sm md:text-base text-slate-400 font-normal leading-relaxed">
              We build student-led projects that create measurable impact for
              communities while helping members grow as leaders.
            </p>
            <Carousel baseWidth={300} autoplay={true} autoplayDelay={4000} loop={false} />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="border-t border-slate-800/60 bg-black">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-20 flex flex-col gap-12 md:gap-24">

          {/* ABOUT US HEADING */}
          <div>
            <TextPressure text="ABOUT US" textColor="#ffffff" minFontSize={60} />
          </div>

          {/* INTRO TEXT */}
          <BlurText
            text="Since 2016, we have been empowering communities through bold entrepreneurial action. From sustainability to social transformation, our work is driven by the mission to create meaningful and measurable impact."
            animateBy="words"
            direction="bottom"
            delay={35}
            stepDuration={0.4}
            className="max-w-3xl mx-auto text-slate-300 text-center text-base md:text-xl leading-relaxed tracking-wide font-light"
          />

          {/* TEXT + IMAGE */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <div>
              <div className="w-12 h-1 bg-amber-400 mb-6 rounded-full" />
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
                We are shaping leaders{" "}
                <span className="text-amber-300">through action</span>
              </h2>
              <p className="text-slate-300 text-base leading-relaxed mb-4">
                Focused on long-term systems, we design solutions that create sustainable livelihoods and responsible consumption. From value-added food products to organic colours, diyas and rakhis that make celebrations safer.
              </p>
              <p className="text-slate-500 text-sm leading-relaxed">
                We further promote natural farming alternatives like organic pesticides and climate-conscious materials made from hemp.
              </p>
            </div>
            <div className="w-full flex justify-center">
              <img
                src="/nice.jpg"
                alt="About Enactus"
                className="w-full max-w-md rounded-2xl object-cover shadow-2xl border border-slate-800"
              />
            </div>
          </section>

          {/* ENACTOPIA */}
          <section className="relative isolate overflow-hidden rounded-3xl border border-amber-300/25 bg-[#120f08] px-6 py-10 sm:px-10 sm:py-14">
            <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(251,191,36,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.08)_1px,transparent_1px)] [background-size:28px_28px]" />
            <div className="absolute -left-10 top-8 text-[5.5rem] font-black leading-none tracking-tighter text-amber-300/[0.06] sm:text-[10rem]">ENACT</div>
            <div className="absolute -right-10 bottom-0 text-[5.5rem] font-black leading-none tracking-tighter text-amber-300/[0.06] sm:text-[10rem]">TOPIA</div>

            <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-amber-300">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-amber-300" />
                  Enactus Aryabhatta annual event
                </div>
                <h2 className="mt-5 text-5xl font-black uppercase leading-[0.82] tracking-[-0.06em] text-white sm:text-7xl">
                  Enact<span className="text-amber-300">opia</span>
                </h2>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
                  Our annual sustainable business-plan competition, hosted at Aryabhatta College. Student teams from across colleges brought their ventures to the stage, pitched their ideas and turned purpose into possibility.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-amber-100">
                  {['Sustainable B-plan competition', 'Hosted at Aryabhatta', 'Annual event'].map((item) => (
                    <span key={item} className="rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2">{item}</span>
                  ))}
                </div>
                <p className="mt-7 max-w-xl border-l-2 border-amber-300 pl-4 text-sm leading-relaxed text-amber-100/90">
                  Judged by the former CFO of Enactus India and Mrs Meghna Joshi, Enactopia brought together ideas, mentorship and a shared commitment to responsible entrepreneurship.
                </p>
              </div>

              <div className="relative overflow-hidden rounded-[2rem] border-2 border-dashed border-amber-300/60 bg-amber-300 p-1 shadow-2xl shadow-amber-500/10">
                <div className="relative overflow-hidden rounded-[1.7rem] bg-[#171109] p-3 sm:p-4">
                  <div className="grid gap-3 sm:grid-cols-[1.45fr_0.85fr]">
                    <figure className="relative min-h-64 overflow-hidden rounded-2xl sm:min-h-full">
                      <img src="/enactopia/enactopia-event-moment.jpg" alt="Enactopia winners and judges on the Aryabhatta College stage" className="absolute inset-0 h-full w-full object-cover" />
                      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent px-4 pb-4 pt-12 text-xs font-semibold uppercase tracking-[0.18em] text-amber-200">Enactopia 2026 · Aryabhatta College</figcaption>
                    </figure>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-1">
                      <figure className="relative min-h-32 overflow-hidden rounded-2xl">
                        <img src="/enactopia/enactopia-project-pitch.jpg" alt="Student team presenting their project at Enactopia" className="absolute inset-0 h-full w-full object-cover" />
                      </figure>
                      <figure className="relative min-h-32 overflow-hidden rounded-2xl">
                        <img src="/enactopia/enactopia-aquaheat-pitch.jpg" alt="A student team pitching at Enactopia" className="absolute inset-0 h-full w-full object-cover" />
                      </figure>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-4 px-2 pb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-200">
                    <span>Ideas on stage</span>
                    <span>Pitch · Learn · Lead</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* MISSION + STATS */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-start">
            <div>
              <div className="w-12 h-1 bg-amber-400 mb-6 rounded-full" />
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                Our <span className="text-amber-300">mission</span>
              </h2>
              <p className="text-slate-400 text-base leading-relaxed">
                We empower students to become socially responsible leaders and changemakers.
              </p>
            </div>
            <div className="grid grid-cols-3 lg:grid-cols-1 gap-4 lg:gap-0 lg:space-y-6">
              {[
                { num: "44+", label: "Active initiatives" },
                { num: "₹1Cr+", label: "Community value generated" },
                { num: "10,000+", label: "Lives impacted" },
              ].map((stat) => (
                <div key={stat.num} className="border-l-2 border-amber-400/40 pl-4 lg:pl-6">
                  <h3 className="text-2xl md:text-5xl font-extrabold text-amber-300">{stat.num}</h3>
                  <p className="text-slate-400 text-xs md:text-base mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* PROJECTS LABEL */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-1 bg-amber-400" />
            <p className="text-amber-400 text-3xl tracking-[0.2em] uppercase font-medium">Our Projects</p>
          </div>

        </div>
      </section>

      {/* FLOWING MENU — FULL BLEED */}
      <div className="relative w-full overflow-hidden">
        <div className="h-[360px] md:h-[560px]">
          <FlowingMenu
            items={[
              { link: "/projects?project=palaash#project-cards", text: "Palaash", image: "/palaash.png" },
              { link: "/projects?project=aarazi#project-cards", text: "Aarazi", image: "/Aarazi.png" },
              { link: "/projects?project=ibtida#project-cards", text: "Ibtida", image: "/Ibtida.png" },
              { link: "/projects?project=utkarsh#project-cards", text: "Utkarsh", image: "/utkarsh.png" },
            ]}
            speed={24}
            textColor="#ffffff"
            bgColor="#060010"
            marqueeBgColor="#ffffff"
            marqueeTextColor="#060010"
            borderColor="#ffffff"
          />
        </div>
      </div>

      {/* PRODUCTS + ORDER */}
      <section className="bg-black">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-20 flex flex-col gap-8 md:gap-12">

          {/* PRODUCTS HEADER */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-1 bg-amber-400 rounded-full" />
            <h2 className="text-3xl md:text-5xl font-bold text-white">Our Products</h2>
          </div>

          {/* INFINITE MENU */}
          <div className="w-full h-[360px] md:h-[480px] overflow-hidden">
  <InfiniteMenu items={infiniteItems} scale={1.2} />
</div>

          {/* ORDER NOW */}
          <div className="flex flex-col items-center gap-4 py-10 md:py-16 border border-slate-800 rounded-2xl bg-slate-950">
            <p className="text-xs tracking-[0.3em] text-amber-400 uppercase">Place an order</p>
            <h3 className="text-2xl md:text-4xl font-bold text-white text-center">
              Support our community products
            </h3>
            <p className="text-slate-400 text-sm text-center max-w-md">
              Every purchase directly supports the communities and artisans we work with.
            </p>
            <AnimatedModalDemo />
          </div>

        </div>
      </section>

    </main>
  );
}
