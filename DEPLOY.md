# TAAS® – Deploy guide

## Folder contents
index.html, vercel.json, robots.txt, sitemap.xml, llms.txt, assets/

## ⚠ Add these 6 photos to /assets before going live
bedroom-before.jpg   bedroom-after.jpg
living-before.jpg    living-after.jpg
kids-before.jpg      kids-after.jpg
(Same aspect ratio per pair, ~1600px wide, under 300 KB each, compressed JPG/WebP.)
Optional: replace assets/TAAS_mark_dark.png with your final logo (512x512).

## Deploy on Vercel
Option A – Dashboard: vercel.com/new → drag-and-drop this folder → Deploy.
Option B – CLI:  npm i -g vercel  →  cd taas-deploy  →  vercel --prod
Framework preset: "Other". Build command: none. Output directory: leave blank.

## After deploy
- If your final domain is not taasinteriorstyling.in, find/replace that URL in
  index.html, robots.txt, sitemap.xml and llms.txt.
- Test the form end-to-end on a phone (WhatsApp opens with the pre-filled message).
