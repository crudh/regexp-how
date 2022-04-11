/// <reference types="vitest" />
import { defineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react";

const config: UserConfig = {
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
  },
};

export default defineConfig(config);
