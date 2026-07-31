"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Reveal } from "@/components/reveal";

// 1. Added lqip to the type definition
type GalleryImage = { url: string; alt?: string; lqip?: string };

export function Gallery({ images, community }: { images: GalleryImage[]; community: string }) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const prev = useCallback(
    () => setOpen((i) => (i === null ? i : (i - 1 + images.length) % images.length)),
    [images.length]
  );
  const next = useCallback(
    () => setOpen((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length]
  );

  // keyboard nav + lock scroll while open
  useEffect(() => {
    if (open === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, prev, next]);

  return (
    <>
      {/* grid of tiles */}
      <Reveal className="grid gap-4 sm:grid-cols-2">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setOpen(i)}
            className="group relative aspect-4/3 overflow-hidden rounded-xl bg-ink/3"
            aria-label={`View photo ${i + 1}`}
          >
            <Image
              src={img.url}
              alt={img.alt ?? `${community} outreach`}
              fill
              unoptimized // <-- Bypass Next.js double optimization
              placeholder={img.lqip ? "blur" : "empty"} // <-- Trigger blur
              blurDataURL={img.lqip} // <-- Pass Sanity's base64 string
              priority={i === 0} // <-- Prioritize the first image
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width:768px) 100vw, 50vw"
            />
          </button>
        ))}
      </Reveal>

      {/* lightbox */}
      {open !== null && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-ink/95 backdrop-blur"
          onClick={close}
        >
          {/* close */}
          <button
            onClick={close}
            aria-label="Close"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X size={22} />
          </button>

          {/* prev */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous"
              className="absolute left-3 flex h-12 w-12 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white md:left-6"
            >
              <ChevronLeft size={26} />
            </button>
          )}

          {/* image */}
          <div
            className="relative mx-16 h-[75vh] w-[85vw] max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              key={open}
              src={images[open].url}
              alt={images[open].alt ?? `${community} outreach`}
              fill
              unoptimized // <-- Bypass Next.js double optimization
              placeholder={images[open].lqip ? "blur" : "empty"} // <-- Trigger blur
              blurDataURL={images[open].lqip} // <-- Pass Sanity's base64 string
              className="object-contain"
              sizes="85vw"
              priority
            />
          </div>

          {/* next */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next"
              className="absolute right-3 flex h-12 w-12 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white md:right-6"
            >
              <ChevronRight size={26} />
            </button>
          )}

          {/* counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
            <span className="type-caption rounded-full bg-white/10 px-4 py-2 text-white/80">
              {open + 1} / {images.length}
            </span>
          </div>
        </div>
      )}
    </>
  );
}