import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vitejs.dev/config/
// export default {
//   cache: {
//     clear: true
//   }
// };
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
})
