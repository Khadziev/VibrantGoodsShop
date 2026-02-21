// vite.config.ts
import { defineConfig } from "file:///D:/js/gotovie/VibrantGoodsShop/client/node_modules/vite/dist/node/index.js";
import react from "file:///D:/js/gotovie/VibrantGoodsShop/client/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "D:\\js\\gotovie\\VibrantGoodsShop\\client";
var vite_config_default = defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true
      },
      "/uploads": {
        target: "http://localhost:4000",
        changeOrigin: true
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  }
});
export {
  vite_config_default as default
};
