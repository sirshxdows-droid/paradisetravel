import express from "express";
import { createServer } from "http";
import path from "path";
import fs from "fs";

const app = express();
const httpServer = createServer(app);

// Parse JSON + URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Simple logging helper
function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

(async () => {
  // PRODUCTION: serve built Vite client
  if (process.env.NODE_ENV === "production") {
    const distPath = path.resolve(process.cwd(), "dist/public");

    if (!fs.existsSync(distPath)) {
      throw new Error(
        `Could not find client build at: ${distPath}. Did you run the build?`
      );
    }

    // Serve static assets
    app.use(express.static(distPath));

    // SPA fallback → always return index.html
    app.use("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // DEVELOPMENT: use Vite middleware
  else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  // Start server
  const port = parseInt(process.env.PORT || "5000", 10);

  httpServer.listen(
    {
      port,
      host: "0.0.0.0",
      reusePort: true,
    },
    () => {
      log(`serving on port ${port}`);
    }
  );
})();
