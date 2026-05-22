
  # Build Project

  This is a code bundle for Build Project. The original project is available at https://www.figma.com/design/DcsLaSFHvvnqTjT9urCUwk/Build-Project.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  Adding a portrait image
  -----------------------

  To integrate a real cinematic portrait for the hero section, place an optimized image at `src/assets/portrait.jpg`. Use a compressed WebP/AVIF image ~200-400KB for best performance. The code uses this path and falls back to a textual card if the image is missing.

  Suggested pipeline:
  - Resize to 1200px on the long edge and export WebP/AVIF
  - Compress with quality ~75
  - Place file at `src/assets/portrait.jpg`
  