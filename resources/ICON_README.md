# VetIQ App Icon & Splash Screen

**Brand colors**
- Background: `#0E3D37`
- Paw: `#8FE3C8`
- Cross: `#F96A4B`

## Source files (included)
- `icon.svg` — 1024×1024 source
- `splash.svg` — 2732×2732 source

## Generate all native sizes (recommended)
After installing Capacitor assets tool:

```bash
npm install -D @capacitor/assets
npx @capacitor/assets generate \
  --iconBackgroundColor '#0E3D37' \
  --splashBackgroundColor '#0E3D37'
```

This creates every iOS and Android icon + splash size automatically from the SVGs/PNGs in this folder.

## Manual sizes (if needed)
- iOS icon: 1024×1024
- Android adaptive: 432×432 (foreground) + background
- Splash: 2732×2732

Owner: Tiffaney Latorre — VeRaFIED Studios
