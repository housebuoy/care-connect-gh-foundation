"use client";
import { PhotoUpload } from "./photo-upload";
import { useMemo, useState } from "react";
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
import {
  formFields,
  ways,
  type FormField,
  type Way,
} from "@/lib/mock/get-involved";

const PATHS = ways.filter((w) => w.id !== "donate").map((w) => w.id);

function buildSchema(fields: FormField[]) {
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const f of fields) {
    if (f.type === "file") continue;
    let base: z.ZodTypeAny =
      f.type === "email" ? z.string().email("Enter a valid email") : z.string();
    if (f.required) {
      base = (base as z.ZodString).min(
        f.type === "tel" ? 9 : 2,
        `${f.label} is required`,
      );
    }
    shape[f.name] = f.required ? base : base.optional();
  }
  return z.object(shape);
}

export function InvolveForm() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  // ?as=partner opens the partner path
  const fromUrl = params.get("as") as Way["id"] | null;
  const initial = fromUrl && PATHS.includes(fromUrl) ? fromUrl : "volunteer";

  const [path, setPath] = useState<Way["id"]>(initial);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [photo, setPhoto] = useState<File | null>(null);
  const [copied, setCopied] = useState(false);

  const activePath = fromUrl && PATHS.includes(fromUrl) ? fromUrl : path;
  const fields = useMemo(
    () =>
      formFields.filter(
        (f) => f.type !== "file" && (!f.showFor || f.showFor.includes(path)),
      ),
    [path],
  );

  function choosePath(id: Way["id"]) {
    setPath(id);
    router.replace(`${pathname}?as=${id}`, { scroll: false });
  }

  async function share() {
    const url = `${window.location.origin}${pathname}?as=${activePath}#form`;
    const title =
      activePath === "partner"
        ? "Partner with Care Connect GH"
        : "Volunteer with Care Connect GH";
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

  const schema = useMemo(() => buildSchema(fields), [fields]);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  async function onSubmit(values: Record<string, unknown>) {
    setStatus("sending");
    const body = new FormData();
    Object.entries(values).forEach(([k, v]) => {
      if (v != null && k !== "photo") body.append(k, String(v));
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
          {ways
            .filter((w) => w.id !== "donate")
            .map((w) => (
              <button
                key={w.id}
                type="button"
                onClick={() => choosePath(w.id)}
                className={`type-caption rounded-full px-4 py-2 transition-colors ${
                  activePath === w.id
                    ? "bg-ink text-white"
                    : "text-ink/55 hover:text-ink"
                }`}
              >
                {w.label}
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
      {path === "volunteer" && (
        <div className="mt-7">
          <PhotoUpload photo={photo} onChange={setPhoto} />
        </div>
      )}

      <div className="mt-6 grid gap-x-5 gap-y-6 sm:grid-cols-2">
        {fields.map((f) => (
          <div key={f.name} className={f.half ? "" : "sm:col-span-2"}>
            <Label htmlFor={f.name} className="text-sm font-medium text-ink/70">
              {f.label}
            </Label>

            <div className="mt-2">
              {f.type === "textarea" ? (
                <Textarea
                  id={f.name}
                  rows={4}
                  placeholder={f.placeholder}
                  {...register(f.name)}
                />
              ) : f.type === "select" ? (
                <Controller
                  name={f.name}
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value ?? ""}
                    >
                      <SelectTrigger id={f.name} className="w-full h-16 py-6">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent className="max-h-75">
                        {f.options?.map((o) => (
                          <SelectItem key={o} value={o} className="py-2 px-2">
                            {o}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              ) : (
                <Input
                  id={f.name}
                  type={f.type}
                  placeholder={f.placeholder}
                  className="placeholder:text-ink/35 h-12"
                  {...register(f.name)}
                />
              )}
            </div>

            {errors[f.name] && (
              <span className="type-caption mt-1.5 block text-destructive">
                {String(errors[f.name]?.message)}
              </span>
            )}
          </div>
        ))}
      </div>

      {status === "error" && (
        <p className="type-caption mt-5 text-destructive">
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
