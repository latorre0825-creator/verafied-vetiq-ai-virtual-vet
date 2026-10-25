import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.verafied.vetiq',
  appName: 'VetIQ',
  webDir: 'out', // for static export; or use server.url for live web
  server: {
    // Uncomment and set this to load the live Vercel URL instead of static export
    // url: 'https://verafied-vetiq.vercel.app',
    // cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#0E3D37',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },
  },
  ios: {
    contentInset: 'automatic',
  },
  android: {
    allowMixedContent: true,
  },
};

export default config;
