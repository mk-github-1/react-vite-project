import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // resolveを追加
  resolve: {
    alias: {
      '@/': `${__dirname}/src/`
    }
  },
  // ホットリロード設定
  server: {
    watch: {
      usePolling: true
    }
  }
})
