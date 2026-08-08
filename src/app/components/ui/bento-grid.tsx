"use client";

import React from "react";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => (
  <div className={`grid grid-cols-1 gap-5 md:grid-cols-3 ${className ?? ""}`}>
    {children}
  </div>
);

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string;
  description?: React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => (
  <article
    className={`group rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-3 text-white shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-sky-300/40 hover:bg-white/[0.09] ${className ?? ""}`}
  >
    {header}
    <div className="px-2 pb-2 pt-5 sm:px-3">
      <div className="flex items-center gap-2 text-sm font-semibold text-white">
        {icon}
        <h3>{title}</h3>
      </div>
      <div className="mt-2 text-sm leading-relaxed text-white/65">{description}</div>
    </div>
  </article>
);
