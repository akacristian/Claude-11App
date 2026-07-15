import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base so the built app also works when opened from a static host subpath.
export default defineConfig({
  base: './',
  plugins: [react()],
})
