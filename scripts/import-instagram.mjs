#!/usr/bin/env node
/**
 * Import images (and caption when available) from an Instagram post URL.
 *
 * Requires gallery-dl: https://github.com/mikf/gallery-dl
 *   pip install gallery-dl
 *
 * Usage:
 *   npm run import:ig -- "https://www.instagram.com/p/XXXX/"
 *
 * Writes:
 *   public/vehicles/_draft-{shortcode}/
 *   content/vehicles/_draft-{shortcode}.json
 *
 * Then rename the draft slug/files and fill missing fields before publishing.
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const url = process.argv[2];

if (!url || !url.includes("instagram.com")) {
  console.error(
    'Usage: npm run import:ig -- "https://www.instagram.com/p/SHORTCODE/"',
  );
  process.exit(1);
}

const shortcodeMatch = url.match(/\/(p|reel|tv)\/([^/?#]+)/);
const shortcode = shortcodeMatch?.[2] ?? `post-${Date.now()}`;
const root = process.cwd();
const imageDir = path.join(root, "public", "vehicles", `_draft-${shortcode}`);
const jsonPath = path.join(
  root,
  "content",
  "vehicles",
  `_draft-${shortcode}.json`,
);

fs.mkdirSync(imageDir, { recursive: true });

console.log(`Downloading ${url} → ${imageDir}`);

try {
  execFileSync(
    "gallery-dl",
    [
      "--dest",
      imageDir,
      "--filename",
      "{num:>02}.{extension}",
      "--write-metadata",
      url,
    ],
    { stdio: "inherit" },
  );
} catch {
  console.error(
    "\ngallery-dl failed. Install with: pip install gallery-dl\n" +
      "Or drop images manually into:\n  " +
      imageDir,
  );
  process.exit(1);
}

function collectImages(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectImages(full));
    } else if (/\.(jpe?g|png|webp|gif)$/i.test(entry.name)) {
      files.push(full);
    }
  }
  return files.sort();
}

const downloaded = collectImages(imageDir);
const flatNames = [];

downloaded.forEach((file, i) => {
  const ext = path.extname(file).toLowerCase();
  const name = `${String(i + 1).padStart(2, "0")}${ext}`;
  const dest = path.join(imageDir, name);
  if (path.resolve(file) !== path.resolve(dest)) {
    fs.renameSync(file, dest);
  }
  flatNames.push(name);
});

// Clean nested empty dirs left by gallery-dl
for (const entry of fs.readdirSync(imageDir, { withFileTypes: true })) {
  if (entry.isDirectory()) {
    fs.rmSync(path.join(imageDir, entry.name), { recursive: true, force: true });
  }
}

let caption = "";
const metaCandidates = fs
  .readdirSync(imageDir)
  .filter((f) => f.endsWith(".json") || f.endsWith(".txt"));
for (const meta of metaCandidates) {
  try {
    const raw = fs.readFileSync(path.join(imageDir, meta), "utf8");
    if (meta.endsWith(".json")) {
      const data = JSON.parse(raw);
      caption =
        data.description ||
        data.caption ||
        data.content ||
        data.title ||
        caption;
    } else {
      caption = raw.trim() || caption;
    }
  } catch {
    /* ignore */
  }
}

const draft = {
  slug: `_draft-${shortcode}`,
  title: caption.split("\n")[0]?.slice(0, 80) || `Draft ${shortcode}`,
  make: null,
  model: null,
  year: null,
  price: null,
  mileage: null,
  mileageUnit: "km",
  bodyType: null,
  transmission: null,
  fuel: null,
  color: null,
  status: "available",
  description: caption || "Imported from Instagram — fill in vehicle details.",
  instagramUrl: url.split("?")[0],
  images: flatNames,
  featured: false,
  updatedAt: new Date().toISOString().slice(0, 10),
};

fs.writeFileSync(jsonPath, JSON.stringify(draft, null, 2) + "\n");

console.log(`\nDraft ready:`);
console.log(`  JSON:   ${jsonPath}`);
console.log(`  Images: ${imageDir} (${flatNames.length} files)`);
console.log(
  `\nNext: rename slug (remove _draft-), set make/model/year, then commit.`,
);
