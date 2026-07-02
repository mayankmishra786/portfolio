# Muscle Map — 3D Gym Anatomy Explorer

Interactive 3D muscle explorer for training smarter: click any muscle on a
realistic écorché body to learn what it does, how to *feel* it working, and
the best exercises for it — with form cues, tension/tempo tips and common
mistakes.

## Features

- **Explore** — orbit/zoom the body, hover for muscle names, click a muscle
  for its function, mind-muscle cues and exercise library (63 exercises)
- **Reverse lookup** — search any exercise and see its primary muscles glow
  red and secondary muscles amber on the body
- **Splits** — Push / Pull / Legs / Upper / Lower / Full-body day overviews
- Front/Back/Reset camera presets, mobile bottom-sheet layout,
  `prefers-reduced-motion` support

## Running

It's a fully static site with no build step. Serve the folder over HTTP
(ES modules don't load from `file://`):

```
python3 -m http.server 8000
# open http://localhost:8000/
```

### GitHub Pages

Settings → Pages → Deploy from branch → `main` / root. The app is
self-contained (three.js is vendored, the model ships in `assets/`),
so no CDN or network dependencies are needed.

## Tech

- Plain HTML/CSS/ES modules; three.js r160 vendored via importmap
- The body is a single-mesh GLB; per-muscle interaction comes from
  invisible primitive hotspot volumes aligned to the anatomy (open with
  `?debug` to see them)
- All muscle/exercise/split data lives in `js/muscle-data.js` and
  `js/exercise-data.js`

## Credits

3D model: [Anatomy male écorché](https://sketchfab.com/models/a980fd18cba241508712e193dce70da5)
via Sketchfab (optimized: textures resized/WebP, 31 MB → 1.8 MB).
three.js is © its authors, MIT license (see `vendor/LICENSE-three.txt`).
