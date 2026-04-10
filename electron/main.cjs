const { app, BrowserWindow, shell, protocol, net } = require("electron");
const path = require("path");
const fs = require("fs");
const url = require("url");

/** Mobile viewport size (iPhone 14) */
const WINDOW_WIDTH = 390;
const WINDOW_HEIGHT = 844;

/** Path to the Vite build output */
const DIST_DIR = path.join(__dirname, "../dist");

/**
 * Register a custom protocol "app://" that serves files from dist/.
 * This ensures all absolute paths like "/LOGO.webp" resolve correctly
 * when the renderer loads content via this protocol.
 */
function registerAppProtocol() {
  protocol.handle("app", (request) => {
    // request.url looks like "app://./LOGO.webp" or "app://./assets/index-xxx.js"
    const requestUrl = new URL(request.url);
    // Decode URI components to handle Vietnamese filenames like "giỏ hàng icon.png"
    let filePath = decodeURIComponent(requestUrl.pathname);
    // Remove leading slash on Windows
    if (process.platform === "win32" && filePath.startsWith("/")) {
      filePath = filePath.substring(1);
    }
    const absolutePath = path.join(DIST_DIR, filePath);
    
    // Security: prevent path traversal
    if (!absolutePath.startsWith(DIST_DIR)) {
      return new Response("Forbidden", { status: 403 });
    }

    return net.fetch(url.pathToFileURL(absolutePath).toString());
  });
}

function createWindow() {
  const win = new BrowserWindow({
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    resizable: false,
    maximizable: false,
    fullscreenable: false,
    title: "NORA",
    icon: path.join(__dirname, "../public/favicon.ico"),
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // Hide menu bar for cleaner mobile-like appearance
  win.setMenuBarVisibility(false);

  // Load the app via custom protocol so all "/" paths resolve to dist/
  win.loadURL("app://./index.html");

  // Open external links (Google Form, etc.) in the default browser
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("http://") || url.startsWith("https://")) {
      shell.openExternal(url);
    }
    return { action: "deny" };
  });

  // Also catch navigation to external URLs
  win.webContents.on("will-navigate", (event, navigationUrl) => {
    // Allow local app:// navigation (hash changes, etc.)
    if (navigationUrl.startsWith("app://")) return;
    // Open external URLs in default browser
    if (navigationUrl.startsWith("http://") || navigationUrl.startsWith("https://")) {
      event.preventDefault();
      shell.openExternal(navigationUrl);
    }
  });
}

app.whenReady().then(() => {
  registerAppProtocol();
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  app.quit();
});
