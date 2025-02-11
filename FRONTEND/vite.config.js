import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default {
//   cache: {
//     clear: true
//   }
// };
export default defineConfig({
  plugins: [react()],
})
