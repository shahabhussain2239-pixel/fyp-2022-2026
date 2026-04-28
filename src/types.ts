export type UserRole = "ADMIN" | "EDITOR" | "USER";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  authorId: string;
  authorName: string;
  category: string;
  tags: string[];
  status: "DRAFT" | "PENDING" | "PUBLISHED";
  views: number;
  likes: number;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  blogId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
