import { NextResponse } from "next/server";
import { Resend } from "resend";
import { writeClient } from "@/sanity/write-client";

const MAX_BYTES = 3 * 1024 * 1024; // 3MB
const ALLOWED = ["image/jpeg", "image/png", "image/webp"];

export async function POST(req: Request) {
  const form = await req.formData();
  const settings = await writeClient.fetch<{ email: string } | null>(
  `*[_type == "siteSettings"][0]{ email }`
);
const to = settings?.email ?? "Careconnectghfoundation@gmail.com";

  const data: Record<string, string> = {};
  for (const [k, v] of form.entries()) {
    if (typeof v === "string") data[k] = v;
  }

  const file = form.get("photo");
  let photoRef: { _type: "image"; asset: { _type: "reference"; _ref: string } } | undefined;

  try {
    // upload the photo first, if one was attached
    if (file instanceof File && file.size > 0) {
      if (!ALLOWED.includes(file.type)) {
        return NextResponse.json({ error: "Use a JPG, PNG or WebP image." }, { status: 400 });
      }
      if (file.size > MAX_BYTES) {
        return NextResponse.json({ error: "Image must be under 3MB." }, { status: 400 });
      }
      const asset = await writeClient.assets.upload(
        "image",
        Buffer.from(await file.arrayBuffer()),
        { filename: file.name, contentType: file.type }
      );
      photoRef = { _type: "image", asset: { _type: "reference", _ref: asset._id } };
    }

    await writeClient.create({
      _type: "submission",
      ...data,
      ...(photoRef ? { photo: photoRef } : {}),
      submittedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Submission save failed:", err, data);
    return NextResponse.json({ error: "Could not save" }, { status: 500 });
  }

  // notify by email too — best-effort, never blocks the save
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Care Connect Website <onboarding@resend.dev>",
        to: to,
        replyTo: data.email,
        subject: `${data.path === "partner" ? "Partnership" : "Volunteer"}: ${data.name}`,
        text: Object.entries(data).map(([k, v]) => `${k}: ${v}`).join("\n"),
      });
    } catch (err) {
      console.error("Notification email failed (record still saved):", err);
    }
  }

  return NextResponse.json({ ok: true });
}