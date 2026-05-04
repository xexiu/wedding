import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30_000,
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:4173"
  },
  projects: [
    {
      name: "iphone-14",
      use: { ...devices["iPhone 14"] }
    },
    {
      name: "iphone-15",
      use: { ...devices["iPhone 15"] }
    },
    {
      name: "pixel-7",
      use: { ...devices["Pixel 7"] }
    },
    {
      name: "ipad-mini",
      use: { ...devices["iPad Mini"] }
    },
    {
      name: "ipad-pro-11",
      use: { ...devices["iPad Pro 11"] }
    },
    {
      name: "small-laptop",
      use: {
        viewport: { width: 1366, height: 768 },
        userAgent:
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
      }
    }
  ],
  webServer:
    process.env.PW_MANAGED_SERVER === "0"
      ? undefined
      : {
          command: "node ./scripts/dev-e2e.mjs",
          port: 4173,
          reuseExistingServer: false,
          env: {
            NODE_OPTIONS: "",
            npm_config_localstorage_file: "",
            NPM_CONFIG_LOCALSTORAGE_FILE: "",
            LOCALSTORAGE_FILE: ""
          }
        }
});
