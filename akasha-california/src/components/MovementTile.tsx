"use client";

import Link from "next/link";
import type { Movement } from "@/lib/data";

interface MovementTileProps {
  movement: Movement;
  size?: "default" | "large";
}

export function MovementTile({ movement, size = "default" }: MovementTileProps) {
  const isLarge = size === "large";

  return (
    <Link
      href={`/movement/${movement.id}`}
      className="movement-tile group block relative rounded-sm overflow-hidden"
      style={{ aspectRatio: isLarge ? "4/5" : "3/4" }}
    >
      <img
        src={movement.image}
        alt={movement.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
        <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
          <h3 className="text-white text-2xl lg:text-3xl font-display font-medium mb-1">
            {movement.name}
          </h3>
          <p className="text-white/80 text-sm lg:text-base mb-3">
            {movement.tagline}
          </p>
          <span className="inline-flex items-center text-white text-sm font-medium">
            Explore
            <svg
              className="ml-2 w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
