import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { siteBase } from './src/siteConfig.ts'

export default defineConfig({
  base: siteBase,
  plugins: [react()],
})
