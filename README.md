# Drop Drop

A drag-and-drop portfolio builder. Drop images onto the canvas to create Pinterest-style masonry cards, then edit titles, descriptions, categories, tags, and featured status — all in local state, no backend required.

## Preview in Browser

### Option 1 — Instant preview (no install)

Open **`index.html`** in your browser — double-click it in Finder or drag it into Chrome/Safari.

### Option 2 — Full Next.js dev server

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

Code is on GitHub: [github.com/nate-thousand/drop-drop](https://github.com/nate-thousand/drop-drop)

**One-click deploy** — import the repo into Vercel:

👉 **[Deploy on Vercel](https://vercel.com/new/clone?repository-url=https://github.com/nate-thousand/drop-drop)**

1. Click the link above and sign in with GitHub
2. Confirm the repo `nate-thousand/drop-drop`
3. Click **Deploy** (no env vars needed)
4. Your live URL will be something like `https://drop-drop.vercel.app`

Every `git push` to `main` will auto-redeploy.

**Or via CLI** (if you have Node.js):

```bash
npm i -g vercel
vercel login
vercel --prod
```

## Tech Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
