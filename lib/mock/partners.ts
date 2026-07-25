export type Partner = {
  name: string;
  category?: "medical" | "implementation" | "media" | "corporate";
  logo?: string;   
  url?: string;
};

export const partners: Partner[] = [
  { name: "PSMD" },
  { name: "PATH" },
  { name: "Ghana Health Service", logo: '/logo/partners/ghs-official.jpg' },
  { name: "KNUST" },
  { name: "PATH" },
  { name: "Ghana Health Service", logo: '/logo/partners/ghs-official.jpg' },
  { name: "KNUST" },
  { name: "PATH" },
  { name: "Ghana Health Service", logo: '/logo/partners/ghs-official.jpg' },
  { name: "KNUST" },
  { name: "PATH" },
  { name: "Ghana Health Service", logo: '/logo/partners/ghs-official.jpg' },
  { name: "KNUST" },
];