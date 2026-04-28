import { initializeApp, cert, getApp, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import path from "path";
import fs from "fs";

let dbInstance: any = null;

export function getDb() {
  const configPath = path.join(process.cwd(), "firebase-applet-config.json");
    
  if (!fs.existsSync(configPath)) {
    console.warn("Firebase not configured. Some features will be unavailable.");
    return null;
  }

  if (!dbInstance) {
    const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
    
    // In our environment, we use the local firebase-admin configuration
    if (getApps().length === 0) {
      initializeApp({
        projectId: config.projectId,
      });
    }
    
    dbInstance = getFirestore();
  }
  return dbInstance;
}

// Collections helper
export const COLLECTIONS = {
  USERS: "users",
  BLOGS: "blogs",
  COMMENTS: "comments",
  LIKES: "likes",
  AUDIT_LOGS: "audit_logs",
};
