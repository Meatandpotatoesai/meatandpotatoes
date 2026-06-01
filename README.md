# Meat & Potatoes — How to Run This Site

## Your folder structure

```
site/
├── index.html          ← Homepage. Don't edit this much.
├── article.html        ← Article template. Don't edit this at all.
├── style.css           ← All design. Edit here to change the look everywhere.
├── components.js       ← Nav + footer. Edit here to change nav everywhere.
├── articles.js         ← MASTER ARTICLE LIST. You edit this every time.
└── articles/           ← One file per article (just the body content)
    ├── what-is-ai.html
    ├── will-ai-take-my-job.html
    └── ...
```

---

## How to publish a new article (3 steps)

### Step 1 — Write the article content
Create a new file in the `articles/` folder.
Name it with a "slug" — short, lowercase, hyphens instead of spaces.
Example: `articles/how-chatgpt-works.html`

Write just the body content using simple HTML:
```html
<p>Your first paragraph here.</p>

<h2>A section heading</h2>

<p>More text here.</p>

<blockquote>A pull quote if you want one.</blockquote>
```

### Step 2 — Add it to the master list
Open `articles.js` and add a new entry to the ARTICLES array:

```javascript
{
  slug: "how-chatgpt-works",        // must match your filename exactly
  title: "How ChatGPT Actually Works",
  subtitle: "A plain-language walkthrough of what happens when you press send.",
  tag: "The Basics",                // displayed tag label
  tagColor: "red",                  // red / green / blue / mustard
  date: "2026-06-15",               // YYYY-MM-DD format
  featured: false                   // set true on ONE article to feature it
},
```

Tag colors:
- `red` → The Basics
- `green` → Work & Jobs  
- `blue` → In Practice
- `mustard` → In Depth / Featured

### Step 3 — Upload both files to Cloudflare
Upload:
- `articles/how-chatgpt-works.html`  (the new article)
- `articles.js`  (the updated master list)

The homepage rebuilds itself automatically. Done.

---

## How to change the nav

Open `components.js`. Find the nav HTML. Change whatever you need.
Upload `components.js`. Every page on the site updates immediately.

---

## How to change the design

Open `style.css`. Everything is labeled with comments.
Upload `style.css`. Every page on the site updates immediately.

---

## To feature a different article on the homepage

In `articles.js`, set `featured: false` on the current featured article,
and set `featured: true` on the one you want to feature.
Upload `articles.js`. Homepage updates automatically.

---

## Article URL format

Every article lives at:
`https://meatandpotatoes.ai/article.html?slug=your-slug-here`

Example: `https://meatandpotatoes.ai/article.html?slug=what-is-ai`

---

## Files you should NEVER need to edit
- `index.html` — builds itself from articles.js
- `article.html` — serves every article automatically
