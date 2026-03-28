// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";
// import path from "path";

// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   resolve: {
//     alias: { "@": path.resolve(__dirname, "./src") },
//   },
// server: {
//   port: 5173,
//   strictPort: true,
//   proxy: {
//     "/api": { target: "http://localhost:3000", changeOrigin: true },
//   },
// },
// });

import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"
import path from "path"

export default defineConfig(({ mode }) => {
  // 1. Muat env file berdasarkan 'mode' (development, production, dll.)
  // npm run dev -> development, npm run build -> production
  const env = loadEnv(mode, process.cwd(), '');

  // 2. VITE_CHECK untuk periksa apakah .env berhasil di load.
  const check = env.VITE_CHECK;
  if (!check) {
    throw new Error("❌ env is not detected. Pastikan file .env sudah dibuat di folder frontend!");
  }
  
  console.log("✅ Berhasil env:", check);

  return {
    build: {
      sourcemap: true
    },
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: { '@': path.resolve(__dirname, './src') }
    },
    server: {
      port: Number(env.VITE_PORT) || 5173,
      strictPort: true,
      proxy: {
        "/api": {
          // VITE_BACKEND_URL menyesuaikan backend production di vercel/local
          target: env.VITE_BACKEND_URL || "http://localhost:3000",
          changeOrigin: true
        },
      }
    }
  }
})