import { defineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import { InlineConfig } from "vitest";

type Config = UserConfig & { test?: InlineConfig };

const config: Config = {
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
  },
};

export default defineConfig(config);
