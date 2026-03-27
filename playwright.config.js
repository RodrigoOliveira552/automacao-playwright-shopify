// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true, // Agora podemos paralelizar sem medo do Anti-Bot
  forbidOnly: !!process.env.CI,
  retries: 1, 
  workers: process.env.CI ? 1 : undefined, 
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure', // Gera evidência apenas se der erro (mais rápido)
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        contextOptions: {
          permissions: ['clipboard-read', 'clipboard-write'],
        },
      },
    },
  ],
});