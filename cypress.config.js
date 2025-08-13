const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://kanban-dusky-five.vercel.app',
    viewportWidth: 1920,   
    viewportHeight: 1080
  }
});