# Meat & Potatoes — how this site actually works

Last updated: August 2026

---

## Where things live

```
/                                  ← repo root (not served)
├── README.md                      ← this file
├── assets/                        ← originals, not served
└── site/                          ← THIS FOLDER IS THE WEBSITE
    ├── index.html                 ← homepage
    ├── what.html  why.html  how.html
    ├── where.html who.html  cookbook.html
    ├── <one .html per article>    ← 32 of them
    ├── support.js                 ← page renderer (generated — do not edit)
    ├── image-slot.js              ← image helper (generated — do not edit)
    ├── mp.css                     ← OUR shared styles (safe to edit)
    ├── mp.js                      ← OUR shared behaviour (safe to edit)
    └── assets/
        ├── kitchen-hero-web.jpg   ← homepage hero
        └── og-default.jpg         ← 1200×630 social preview image
```

**Cloudflare Pages must have its build output directory set to `site`.**
Everything outside `site/` is source material and is not published.

---

## How the pages render — read this before editing anything

These pages are **React apps**, not plain HTML.

`support.js` downloads React and ReactDOM from `unpkg.com` when the page
loads, then renders the content inside the `<x-dc>` element. Consequences
worth knowing:

- **Nothing renders if JavaScript is off or unpkg.com is unreachable.**
  A visitor behind a firewall that blocks CDNs sees a blank page.
- **Link previews still work.** Social crawlers read the `<meta>` tags in
  `<head>`, which are static, so LinkedIn and similar are unaffected.
- Hand-editing the markup inside `<x-dc>` works, but it is generated
  output — regenerating a page from Claude Design overwrites your edits.

*Improvement worth making later:* download React and ReactDOM into
`site/assets/` and point `support.js` at the local copies. That removes a
third-party dependency from every page load. Not urgent, but it is the
biggest fragility in the site.

---

## The email signup

Written **once**, in `mp.js`. It is not pasted into any HTML file.

Every page loads:

```html
<link rel="stylesheet" href="./mp.css">
<script src="./mp.js" defer></script>
```

`mp.js` then puts the signup block at the bottom of any page that has an
`<article>` element — which is every article, automatically. New articles
get it with no extra work.

| To change | Edit |
|---|---|
| The wording | `COPY` block near the top of `mp.js` |
| The colours, spacing, layout | `.mp-subscribe` rules in `mp.css` |
| Which Kit form it feeds | `KIT` block at the top of `mp.js` |

To put the signup somewhere that isn't an article — the cookbook, say —
drop this anywhere in that page's body:

```html
<div data-mp-subscribe-here></div>
```

The form goes there instead. One per page; the script will not duplicate it.

### Current Kit form
- Form ID `9821730`, UID `6fd02b8332`
- Confirmation (double opt-in) is on
- Spam protection is **off** — turn on reCAPTCHA in Kit's form settings if
  junk signups appear

---

## Publishing a new article

There is no template system. Each article is a complete, standalone HTML
file. Three steps:

**1. Add the file.** Put `your-slug.html` in `site/`. Copy an existing
article as a starting point.

**2. Check the `<head>`.** It needs, at minimum:

```html
<title>Your headline — Meat &amp; Potatoes</title>
<meta name="description" content="One or two complete sentences. Do not leave it cut off mid-word.">
<meta property="og:title" content="Your headline — Meat &amp; Potatoes">
<meta property="og:description" content="Same as the description.">
<meta property="og:type" content="article">
<meta property="og:url" content="https://meatandpotatoes.ai/your-slug">
<meta property="og:image" content="https://meatandpotatoes.ai/assets/og-default.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:site_name" content="Meat &amp; Potatoes">
<meta name="twitter:card" content="summary_large_image">
<link rel="canonical" href="https://meatandpotatoes.ai/your-slug">
<script src="./support.js"></script>
<link rel="stylesheet" href="./mp.css">
<script src="./mp.js" defer></script>
```

Swap in a custom `og:image` when you have one. Skipping these means the
piece shows up on LinkedIn as a grey box.

**3. Add it to the cookbook.** This is the step that gets forgotten.
`cookbook.html` holds its own copy of the article list inside a `<script>`
block, in `articles()`. Add an entry:

```js
{
  title: "Your headline",
  category: "AI",              // or "Blockchain"
  excerpt: "One or two sentences.",
  meta: "AUG 2026 · 12 MIN",
  href: "your-slug.html",
  at: 1786000000000            // Unix ms — controls sort order, newest first
},
```

**An article not listed in `articles()` is invisible.** There is nothing
that checks this for you.

Homepage cards are separate again, in `index.html`. Update those by hand if
the piece should be featured.

---

## Known issues

- **Eight legacy Web3 articles have meta descriptions that end mid-word**
  with an ellipsis (`crypto-trade-in-the-nft-sweatshirt`, `depin-101`,
  `reframing-the-metaverse`, `the-intersection-of-the-metaverse`,
  `the-true-cost-of-a-sh-tcoin`, `tokenization-reality-check`,
  `what-is-web3`, `why-crypto-can-t-have-a-one-size-fits-all`). They need
  descriptions written by hand.
- **The article list is duplicated** between `cookbook.html` and
  `index.html`. Changing one does not change the other.
- **The nav and footer are copied into all 39 files.** Changing the nav
  means changing 39 files. Worth consolidating if it becomes a chore.
- **`kitchen-hero-web.jpg` has a mouse cursor visible in it** — it was
  captured as a screenshot. Replace with the clean original when possible.
  It also appears in `og-default.jpg`, which is cropped from it.
- **No sitemap.xml and no robots.txt.**

---

## Deploying

Cloudflare Pages watches this repo and rebuilds on push to `main`.

Do the work on a branch. Cloudflare builds a preview URL for every branch,
so you can click through the whole site before it becomes live. Merge to
`main` only after the preview looks right.

Never delete the repo to "start clean." Branch instead — the history is the
only way back if a deploy goes wrong.
