import { Router } from "express";
import { getDb, COLLECTIONS } from "./db";
import { authenticate, authorize, AuthenticatedRequest } from "./authMiddleware";

const router = Router();

// Public: Get all published blogs
router.get("/", async (req, res) => {
  try {
    const db = getDb();
    if (!db) return res.json([]); // Return empty list if not configured
    const snap = await db.collection(COLLECTIONS.BLOGS)
      .where("status", "==", "PUBLISHED")
      .orderBy("createdAt", "desc")
      .limit(20)
      .get();
    
    const blogs = snap.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

// Public: Get single blog by slug
router.get("/:slug", async (req, res) => {
  try {
    const db = getDb();
    if (!db) return res.status(503).json({ error: "Database not configured" });
    const snap = await db.collection(COLLECTIONS.BLOGS).where("slug", "==", req.params.slug).get();
    if (snap.empty) return res.status(404).json({ error: "Blog not found" });
    
    const blog = { id: snap.docs[0].id, ...snap.docs[0].data() };
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blog" });
  }
});

// Protected: Create blog (Admin or Editor)
router.post("/", authenticate, authorize(["ADMIN", "EDITOR"]), async (req: AuthenticatedRequest, res) => {
  try {
    const db = getDb();
    if (!db) return res.status(503).json({ error: "Database not configured. Please setup Firebase." });
    const newBlog = {
      ...req.body,
      authorId: req.user!.id,
      authorName: req.user!.email.split("@")[0], // Simple mock name from email if name not provided
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: req.user!.role === "ADMIN" ? "PUBLISHED" : "PENDING",
      views: 0,
      likes: 0,
    };

    const docRef = await db.collection(COLLECTIONS.BLOGS).add(newBlog);
    res.status(201).json({ id: docRef.id, ...newBlog });
  } catch (error) {
    res.status(400).json({ error: "Failed to create blog" });
  }
});

export default router;
