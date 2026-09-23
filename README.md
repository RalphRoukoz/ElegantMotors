# Elegant Motors

Inventory website for [Elegant Motors](https://www.instagram.com/elegantmotors.lb/) — browse cars in stock, contact via WhatsApp or phone.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Vehicle data as JSON in `content/vehicles/`
- Images in `public/vehicles/{slug}/`

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Update phone / WhatsApp / location in [`content/site.json`](content/site.json).

## Import an Instagram post

1. Install [gallery-dl](https://github.com/mikf/gallery-dl): `pip install gallery-dl`
2. Run:

```bash
npm run import:ig -- "https://www.instagram.com/p/SHORTCODE/"
```

3. This creates `_draft-*` files under `content/vehicles/` and `public/vehicles/`.
4. Rename the slug (drop `_draft-`), fill make/model/year/specs, set `status: "available"`, then commit and push.

If download fails (Instagram rate limits / login), drop the post images manually into `public/vehicles/{slug}/` and create the JSON by hand using a sample file as a template.

## Deploy

Connected to Vercel via GitHub. Push to `main` to deploy.
