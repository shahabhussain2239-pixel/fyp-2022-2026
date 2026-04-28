import { getDb, COLLECTIONS } from "./db";

/**
 * Enhanced mock data for local fallback
 */
export const seedMockData = async () => {
  const db = getDb();
  if (!db) {
    console.warn("Seeding skipped: Database not configured.");
    return;
  }
  
  try {
    const blogsSnap = await db.collection(COLLECTIONS.BLOGS).limit(1).get();
    if (!blogsSnap.empty) return; // Already seeded

    const mockBlogs = [
      {
        title: "The Zero-Trust Architecture in 2026",
        slug: "zero-trust-2026",
        content: `
# Mastering Security in the Modern Age

In 2026, the concept of a "secure perimeter" has completely dissolved. We now live in an era of **Zero Trust**.

> "Never trust, always verify."

## Why it matters
As decentralization becomes the norm, your identity is your only firewall. Using JWTs correctly and rotating refresh tokens is just the beginning.

### Key Pillars
1. **Continuous Identity Verification**: Every request is a new handshake.
2. **Micro-segmentation**: Isolate environments at the API level.
3. **Least Privilege Access**: RBAC combined with ABAC (Attribute-Based Access Control).

\`\`\`javascript
// Example of a secure middleware check
function authorizeAdmin(req, res, next) {
  if (req.user.role !== 'ADMIN') {
    throw new Error('Access Denied');
  }
  next();
}
\`\`\`

The rise of AI-driven phishing attacks makes this more critical than ever.
        `,
        excerpt: "Why traditional firewalls are dead and how Zero-Trust is reshaping the way we build and deploy enterprise applications.",
        authorId: "system",
        authorName: "SecurityBot",
        category: "Security",
        tags: ["CyberSecurity", "Tech", "Enterprise"],
        status: "PUBLISHED",
        views: 1540,
        likes: 210,
        coverImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        title: "The Joy of Minimalist Web Design",
        slug: "minimal-design-joy",
        content: `
# Less is More

In a world filled with digital noise, minimalism is a superpower.

## Why Minimalism?
It's not just about aesthetics; it's about **focus**. When you strip away the unnecessary, the message stands out.

### Designing for 2026
- **Whitespace as a Component**: Not just "empty space".
- **Typography First**: Let the font tell the story.
- **Intentional Motion**: Use CSS animations to guide, not distract.

![Minimalism](https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=800)

*Design is not just what it looks like and feels like. Design is how it works.*
        `,
        excerpt: "Exploring how stripping away the digital noise results in better user engagement and cleaner codebase maintenance.",
        authorId: "system",
        authorName: "DesignLead",
        category: "Design",
        tags: ["UX", "Aesthetics", "WebDev"],
        status: "PUBLISHED",
        views: 3200,
        likes: 450,
        coverImage: "https://images.unsplash.com/photo-1481487196290-c152efe083f5?auto=format&fit=crop&q=80&w=1000",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    ];

    for (const blog of mockBlogs) {
      await db.collection(COLLECTIONS.BLOGS).add(blog);
    }
    
    console.log("Mock data seeded successfully");
  } catch (err) {
    console.warn("Seeding skipped (possibly due to missing DB config):", err.message);
  }
};
