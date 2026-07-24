"use client";

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, Link2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PhotoUpload } from "./photo-upload";
import { roleOptions, partnerOptions } from "@/lib/mock/get-involved";

type Path = "volunteer" | "partner";
const PATHS: Path[] = ["volunteer", "partner"];

const shared = {
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(9, "Phone is required"),
  location: z.string().min(2, "Let us know where you're based"),
  message: z.string().optional(),
};

const volunteerSchema = z.object({
  ...shared,
  role: z.string().min(1, "Pick where you'd like to help"),
});

const partnerSchema = z.object({
  ...shared,
  organisation: z.string().min(2, "Organisation is required"),
  partnerType: z.string().min(1, "Pick how you'd like to partner"),
});

type Values = z.infer<typeof volunteerSchema> &
  Partial<z.infer<typeof partnerSchema>>;

export function InvolveForm() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const fromUrl = params.get("as") as Path | null;
  const path: Path = fromUrl && PATHS.includes(fromUrl) ? fromUrl : "volunteer";

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [photo, setPhoto] = useState<File | null>(null);
  const [copied, setCopied] = useState(false);

  const isVolunteer = path === "volunteer";

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(
      isVolunteer ? volunteerSchema : partnerSchema,
    ) as never,
  });

  function choosePath(id: Path) {
    reset();
    setPhoto(null);
    router.replace(`${pathname}?as=${id}`, { scroll: false });
  }

  async function share() {
    const url = `${window.location.origin}${pathname}?as=${path}#form`;
    const title = isVolunteer
      ? "Volunteer with Care Connect GH"
      : "Partner with Care Connect GH";
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        /* cancelled */
      }
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function onSubmit(values: Values) {
    setStatus("sending");
    const body = new FormData();
    Object.entries(values).forEach(([k, v]) => {
      if (v != null && v !== "") body.append(k, String(v));
    });
    body.append("path", path);
    if (photo) body.append("photo", photo);

    try {
      const res = await fetch("/api/get-involved", { method: "POST", body });
      if (!res.ok) throw new Error();
      setStatus("sent");
      reset();
      setPhoto(null);
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-ink/10 bg-white p-8">
        <p className="type-caption text-tally">Received</p>
        <h3 className="mt-3 font-display text-2xl font-semibold text-ink">
          Thanks — we&rsquo;ll be in touch.
        </h3>
        <p className="type-body mt-3 text-ink/70">
          Someone from the team will reach out before the next outreach.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="type-caption mt-6 text-navy underline-offset-4 hover:underline"
        >
          Send another response
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-ink/10 bg-white p-6 md:p-8"
    >
      {/* path switch + share */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-full border border-ink/10 bg-paper p-1">
          {PATHS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => choosePath(p)}
              className={`type-caption rounded-full px-4 py-2 capitalize transition-colors ${
                path === p ? "bg-ink text-white" : "text-ink/55 hover:text-ink"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={share}
          className="type-caption inline-flex items-center gap-2 rounded-full border border-ink/15 px-3.5 py-2 text-ink/60 transition-colors hover:border-navy/40 hover:text-navy"
        >
          {copied ? <Check size={14} /> : <Link2 size={14} />}
          {copied ? "Link copied" : "Share"}
        </button>
      </div>

      {isVolunteer && (
        <div className="mt-7">
          <PhotoUpload photo={photo} onChange={setPhoto} />
        </div>
      )}

      <div className="mt-6 grid gap-x-5 gap-y-6 sm:grid-cols-2">
        <Field label="Name" error={errors.name?.message}>
          <Input
            id="name"
            placeholder="Your full name"
            className="h-12 placeholder:text-ink/35"
            {...register("name")}
          />
        </Field>

        <Field label="Email" error={errors.email?.message}>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="h-12 placeholder:text-ink/35"
            {...register("email")}
          />
        </Field>

        <Field label="Phone" error={errors.phone?.message}>
          <Input
            id="phone"
            type="tel"
            placeholder="055 000 0000"
            className="h-12 placeholder:text-ink/35"
            {...register("phone")}
          />
        </Field>

        <Field label="Where you're based" error={errors.location?.message}>
          <Input
            id="location"
            placeholder="Kumasi"
            className="h-12 placeholder:text-ink/35"
            {...register("location")}
          />
        </Field>

        {!isVolunteer && (
          <Field
            className="sm:col-span-2"
            label="Organisation"
            error={errors.organisation?.message}
          >
            <Input
              id="organisation"
              placeholder="Your school, clinic or company"
              className="h-12 placeholder:text-ink/35"
              {...register("organisation")}
            />
          </Field>
        )}

        <Field
          className="sm:col-span-2"
          label={
            isVolunteer
              ? "Where you'd like to help"
              : "How you'd like to partner"
          }
          error={
            isVolunteer ? errors.role?.message : errors.partnerType?.message
          }
        >
          <Controller
            name={isVolunteer ? "role" : "partnerType"}
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value ?? ""}>
                <SelectTrigger className="h-16 w-full py-6">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent className="max-h-75">
                  {(isVolunteer ? roleOptions : partnerOptions).map((o) => (
                    <SelectItem key={o} value={o} className="px-2 py-2">
                      {o}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>

        <Field className="sm:col-span-2" label="Anything else (optional)">
          <Textarea
            id="message"
            rows={4}
            placeholder="Your background, availability, questions…"
            className="placeholder:text-ink/35"
            {...register("message")}
          />
        </Field>
      </div>

      {status === "error" && (
        <p className="mt-5 text-xs text-destructive">
          That didn&rsquo;t send. Try again, or message us on WhatsApp.
        </p>
      )}

      <Button
        type="submit"
        disabled={status === "sending"}
        className="type-label mt-7 w-full rounded-full bg-tally px-10 py-6 text-ink hover:bg-tally/90 sm:w-auto"
      >
        {status === "sending" ? "Sending…" : "Send"}
      </Button>
    </form>
  );
}

function Field({
  label,
  error,
  className = "",
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <Label className="text-sm font-medium text-ink/70">{label}</Label>
      <div className="mt-2.5">{children}</div>
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}
