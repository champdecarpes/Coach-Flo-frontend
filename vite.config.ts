// Import Vite plugins and Node.js path module
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import tailwindcss from '@tailwindcss/vite'

// Vite configuration
export default defineConfig({
  // Enable React plugin with SWC for fast compilation
  plugins: [
    react({
      // Configure SWC to support React with automatic JSX runtime
      jsxImportSource: "react",
    }),
    tailwindcss(),
  ],
  // Define server settings for development
  server: {
    port: 3000,
    host: "0.0.0.0",
    open: true,
    hmr: true, // Enable hot module replacement
  },
  // Resolve aliases for module imports
  resolve: {
    alias: {
      // Aliases for easier imports
      src: path.resolve("/src"),
      sass: path.resolve("src/sass"),
      dev: path.resolve("src/dev"),
      assets: path.resolve("/src/assets"),
    },
  },
  // Build configuration
  build: {
    outDir: "frontend/webpack_bundles", // Match previous output directory
    assetsDir: "static", // Store assets in static folder
    sourcemap: true, // Generate source maps
    rollupOptions: {
      // Define entry points
      input: {
        main: path.resolve(__dirname, "frontend/src/index.tsx"),
        previews: path.resolve(__dirname, "frontend/dev/previews.tsx"),
      },
    },
  },
});
