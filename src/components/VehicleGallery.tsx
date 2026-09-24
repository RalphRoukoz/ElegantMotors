"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type Props = {
  images: { src: string; alt: string }[];
};

export function VehicleGallery({ images }: Props) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  const next = useCallback(() => {
    setActive((i) => (i + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setActive((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, next, prev]);

  if (images.length === 0) {
    return (
      <div className="flex aspect-[16/10] items-center justify-center bg-muted text-zinc-500">
        No photos yet
      </div>
    );
  }

  const current = images[active];

  return (
    <div>
      <button
        type="button"
        className="relative block aspect-[16/10] w-full cursor-pointer overflow-hidden bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        onClick={() => setOpen(true)}
        aria-label="Open photo gallery"
      >
        <Image
          src={current.src}
          alt={current.alt}
          fill
          priority
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 1024px) 100vw, 60vw"
        />
      </button>

      {images.length > 1 ? (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setActive(i)}
              className={`relative h-16 w-24 shrink-0 cursor-pointer overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                i === active ? "ring-2 ring-accent" : "opacity-70 hover:opacity-100"
              }`}
              aria-label={`Show photo ${i + 1}`}
              aria-current={i === active}
            >
              <Image src={img.src} alt="" fill className="object-cover" sizes="96px" />
            </button>
          ))}
        </div>
      ) : null}

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Vehicle photos"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 min-h-11 cursor-pointer px-3 text-sm text-accent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            onClick={() => setOpen(false)}
            aria-label="Close gallery"
          >
            Close
          </button>
          {images.length > 1 ? (
            <>
              <button
                type="button"
                className="absolute left-3 top-1/2 min-h-11 min-w-11 -translate-y-1/2 cursor-pointer text-2xl text-accent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label="Previous photo"
              >
                ‹
              </button>
              <button
                type="button"
                className="absolute right-3 top-1/2 min-h-11 min-w-11 -translate-y-1/2 cursor-pointer text-2xl text-accent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label="Next photo"
              >
                ›
              </button>
            </>
          ) : null}
          <div
            className="relative h-[70vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
