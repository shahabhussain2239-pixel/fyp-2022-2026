import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./src/server/authRoutes";
import blogRoutes from "./src/server/blogRoutes";
import { seedMockData } from "./src/server/seed";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Seed mock data for previews if needed
  seedMockData().catch(console.error);

  app.use(express.json());
  app.use(cookieParser());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Secure Blog API is running" });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/blogs", blogRoutes);

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
