const { contextBridge } = require("electron");

// Expose a minimal API to the renderer for environment detection
contextBridge.exposeInMainWorld("electronAPI", {
  isElectron: true,
});
