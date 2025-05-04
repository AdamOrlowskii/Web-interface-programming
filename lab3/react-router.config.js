export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
  build: {
    client: {
      outDir: 'build/client',
      assetsDir: 'assets',
      emptyOutDir: true
    },
    server: {
      outDir: 'build/server'
    }
  }
};
