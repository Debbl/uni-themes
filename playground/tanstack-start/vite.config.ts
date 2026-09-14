import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    tanstackStart(),
    // react's plugin has to come after start's
    viteReact(),
    // Turns the built handler into a server that actually listens.
    nitro(),
  ],
})
