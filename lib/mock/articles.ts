export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  condition: string;        // "Hypertension", "Cholera"...
  date: string;             // ISO
  reviewedBy?: string;      // credibility: "Reviewed by Nurse Ama Owusu"
  image?: string;
};

// TEMP PREVIEW DATA — for client demo only. Replace entirely before launch.
// Reviewer names are placeholders; do NOT present these as real published articles.
export const articles: Article[] = [
  {
    slug: "know-your-blood-pressure-numbers",
    title: "Know your numbers: what your blood pressure is really telling you",
    excerpt:
      "A quick guide to reading the two numbers on a blood pressure result, what counts as high, and the simple daily habits that help keep it in a healthy range.",
    condition: "Hypertension",
    date: "2026-06-20",
    reviewedBy: "Reviewed by Nurse A. Owusu",
    image: "/images/articles/2E3A0787.jpg",
  },
  {
    slug: "spotting-early-signs-of-diabetes",
    title: "Feeling thirsty and tired often? Early signs of diabetes to watch for",
    excerpt:
      "Type 2 diabetes can build quietly for years. Learn the early signs worth a check-up, and why a simple blood sugar test at an outreach can make the difference.",
    condition: "Diabetes",
    date: "2026-05-02",
    reviewedBy: "Reviewed by Dr. K. Mensah",
    // image: "/articles/diabetes.jpg",
  },
  {
    slug: "cholera-prevention-clean-water-hands",
    title: "Cholera prevention starts at the tap: clean water and clean hands",
    excerpt:
      "During outbreaks, most cholera cases are preventable. A plain-language look at safe water, handwashing, and what to do if someone in your home falls ill.",
    condition: "Cholera",
    date: "2026-03-15",
    reviewedBy: "Reviewed by Nurse E. Boateng",
    // image: "/articles/cholera.jpg",
  },
];

export function formatArticleDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
  }).format(new Date(iso));
}