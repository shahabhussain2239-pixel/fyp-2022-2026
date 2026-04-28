import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "./auth";
import { UserRole } from "../types";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: UserRole;
  };
}

export function authenticate(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  const payload = verifyAccessToken(token);
  if (!payload) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }

  req.user = payload;
  next();
}

export function authorize(roles: UserRole[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Access denied: insufficient permissions" });
    }

    next();
  };
}
