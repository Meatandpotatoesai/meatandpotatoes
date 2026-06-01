// ============================================================
// ARTICLES.JS — THE MASTER LIST
// ============================================================
// To add a new article:
//   1. Add a new object to the array below (copy an existing one)
//   2. Create the article content file (see articles/ folder)
//   3. Upload both files to Cloudflare
// That's it. The homepage and nav update automatically.
// ============================================================

const ARTICLES = [
  {
    slug: "what-is-ai",
    title: "What AI Actually Is — and Why Nobody Agrees",
    subtitle: "Six institutions. Six completely different definitions. The confusion isn't accidental.",
    tag: "The Basics",
    tagColor: "red",
    date: "2026-05-28",
    featured: true
  },
  {
    slug: "will-ai-take-my-job",
    title: "Will AI Take Your Job? The Honest Answer Is Complicated.",
    subtitle: "Not yes, not no. Here's how to actually think through the question for your specific situation.",
    tag: "Work & Jobs",
    tagColor: "green",
    date: "2026-05-21",
    featured: false
  },
  {
    slug: "what-ai-is-good-at",
    title: "The Four Things AI Is Genuinely Good at Right Now",
    subtitle: "Skipping the sales pitch. A grounded look at where the tools earn their keep — and where they don't.",
    tag: "In Practice",
    tagColor: "blue",
    date: "2026-05-14",
    featured: false
  },
  {
    slug: "ai-hallucinations",
    title: "What 'The AI Hallucinated' Actually Means",
    subtitle: "The word sounds dramatic. The reality is both more mundane and more important to understand.",
    tag: "The Basics",
    tagColor: "red",
    date: "2026-05-07",
    featured: false
  }
];
