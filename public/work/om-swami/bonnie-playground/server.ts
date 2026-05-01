import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Store the latest AI action for the local bridge to poll
  let latestAction = {
    ls_x: 0,
    ls_y: 0,
    btn_a: false,
    btn_b: false,
    trigger_r: 0
  };

  // API route for the frontend to update actions
  app.post("/api/actions", (req, res) => {
    latestAction = req.body;
    res.json({ status: "ok" });
  });

  // API route for the local Python bridge to poll
  app.get("/api/actions", (req, res) => {
    res.json(latestAction);
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
