/// <reference types="astro/client" />

interface FirebaseEnv {
  readonly API_KEY: string;
  readonly AUTH_DOMAIN: string;
  readonly PROJECT_ID: string;
  readonly STORAGE_BUCKET: string;
  readonly MESSAGING_SENDER_ID: string;
  readonly APP_ID: string;
  readonly MEASUREMENT_ID: string;
}

export interface ImportMeta {
  readonly env: FirebaseEnv;
}
