"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";


const ALLOWED = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 3 * 1024 * 1024;

export function PhotoUpload({
  photo,
  onChange,
}: {
  photo: File | null;
  onChange: (f: File | null) => void;
}) {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!photo) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPreview(null);
      return;
    }

    const url = URL.createObjectURL(photo);
    
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [photo]);

function accept(file?: File | null) {
    if (!file) return;

    if (!ALLOWED.includes(file.type)) {
      setError("That file type isn't supported. Use a JPG, PNG or WebP image.");
      return;
    }
    if (file.size > MAX_BYTES) {
      const mb = (file.size / 1024 / 1024).toFixed(1);
      setError(`That image is ${mb}MB. Choose one under 3MB.`);
      return;
    }

    setError(null);
    onChange(file);
  }

  if (preview) {
    return (
      <div className="flex items-start gap-4 rounded-xl border border-ink/10 bg-paper p-3">
        <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg">
          <Image src={preview} alt="Your photo" fill className="object-cover" sizes="80px" />
        </div>
        <div className="min-w-0 flex-1 pt-1">
          <p className="truncate text-sm font-medium text-ink">{photo?.name}</p>
          <p className="mt-0.5 text-xs text-ink/45">
            {photo && (photo.size / 1024 / 1024).toFixed(1)} MB
          </p>
        </div>
        <button
          type="button"
          onClick={() => onChange(null)}
          aria-label="Remove photo"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-ink/40 transition-colors hover:bg-ink/5 hover:text-ink"
        >
          <X size={15} />
        </button>
        {error && (
        <p role="alert" className="mt-2 text-xs text-destructive">
          {error}
        </p>
      )}
      </div>
    );
  }

  return (
    <label
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        accept(e.dataTransfer.files?.[0]);
      }}
      className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-5 py-7 text-center transition-colors ${
        dragging ? "border-navy/50 bg-navy/3" : "border-ink/15 hover:border-ink/30 hover:bg-ink/2"
      }`}
    >
      <Upload size={18} className="text-ink/35" />
      <span className="mt-3 text-sm font-medium text-ink">
        Add a passport-sized photo
      </span>
      <span className="mt-1 text-xs text-ink/45">
        Optional · JPG, PNG or WebP, under 3MB
      </span>
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="sr-only"
        onChange={(e) => accept(e.target.files?.[0])}
      />
    </label>
  );
}