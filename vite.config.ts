import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8000,
  },
  preview: {
    port: 8000,
    // 允许通过公网域名 / IP 访问（否则仅 localhost 可用）
    allowedHosts: [".ningxin.net.cn", "ningxin.net.cn", ".menganhealth.cn", "menganhealth.cn"],
  },
});
