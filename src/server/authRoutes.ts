import { Router } from "express";
import { getDb, COLLECTIONS } from "./db";
import { hashPassword, comparePassword, generateAccessToken, generateRefreshToken, verifyRefreshToken } from "./auth";
import { z } from "zod";

const router = Router();

const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = signupSchema.parse(req.body);
    const db = getDb();
    if (!db) return res.status(503).json({ error: "Database not configured. Please setup Firebase." });
    
    // Check if user exists
    const userSnap = await db.collection(COLLECTIONS.USERS).where("email", "==", email).get();
    if (!userSnap.empty) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = {
      name,
      email,
      password: hashedPassword,
      role: "USER", // Default role
      createdAt: new Date().toISOString(),
    };

    const userRef = await db.collection(COLLECTIONS.USERS).add(newUser);
    const userData = { id: userRef.id, name, email, role: "USER", createdAt: newUser.createdAt };
    
    const accessToken = generateAccessToken(userData as any);
    const refreshToken = generateRefreshToken(userData as any);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ user: userData, accessToken });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "Signup failed" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const db = getDb();
    if (!db) return res.status(503).json({ error: "Database not configured. Please setup Firebase." });
    
    const userSnap = await db.collection(COLLECTIONS.USERS).where("email", "==", email).get();
    if (userSnap.empty) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const userDoc = userSnap.docs[0];
    const user = { id: userDoc.id, ...userDoc.data() };

    const isMatch = await comparePassword(password, user.password as string);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const userData = { id: user.id, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt };
    const accessToken = generateAccessToken(userData as any);
    const refreshToken = generateRefreshToken(userData as any);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ user: userData, accessToken });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "Login failed" });
  }
});

router.post("/token", async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ error: "Refresh token required" });

  const payload = verifyRefreshToken(refreshToken);
  if (!payload) return res.status(403).json({ error: "Invalid refresh token" });

  try {
    const db = getDb();
    if (!db) return res.status(503).json({ error: "Database not configured." });
    const userDoc = await db.collection(COLLECTIONS.USERS).doc(payload.id).get();
    if (!userDoc.exists) return res.status(404).json({ error: "User not found" });

    const user = { id: userDoc.id, ...userDoc.data() };
    const userData = { id: user.id, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt };
    const newAccessToken = generateAccessToken(userData as any);

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(500).json({ error: "Token refresh failed" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out successfully" });
});

export default router;
