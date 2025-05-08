import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'co.edu.uco.burstcar.frontend',
  appName: 'burstcar-app',
  webDir: 'www',
  server: {
    url: 'http://10.0.2.2:8889',
    cleartext: true
  }
};

export default config;
