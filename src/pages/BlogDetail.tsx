import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Blog, Comment } from "../types";
import { Calendar, User, Heart, MessageSquare, Share2, ChevronLeft, Loader2, Bookmark } from "lucide-react";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import { motion } from "motion/react";

export function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = React.useState<Blog | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLiked, setIsLiked] = React.useState(false);

  React.useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blogs/${slug}`);
        const data = await response.json();
        if (response.ok) {
          setBlog(data);
        } else {
          navigate("/");
        }
      } catch (err) {
        console.error("Failed to fetch blog", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlog();
    window.scrollTo(0, 0);
  }, [slug, navigate]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!blog) return null;

  return (
    <div className="bg-white pb-20">
      {/* Article Header */}
      <header className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-indigo-600"
          >
            <ChevronLeft className="h-4 w-4" /> Back to stories
          </Link>

          <div className="flex items-center gap-2 mb-6">
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600 uppercase tracking-wider">
              {blog.category}
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-sm text-gray-500">5 min read</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl text-display mb-8">
            {blog.title}
          </h1>

          <div className="flex items-center justify-between border-y border-gray-100 py-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-indigo-100">
                <User className="h-6 w-6 text-indigo-300" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">{blog.authorName}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="h-3 w-3" />
                  {format(new Date(blog.createdAt), "MMMM d, yyyy")}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="rounded-full p-2 text-gray-400 hover:bg-gray-50 hover:text-indigo-600">
                <Share2 className="h-5 w-5" />
              </button>
              <button className="rounded-full p-2 text-gray-400 hover:bg-gray-50 hover:text-indigo-600">
                <Bookmark className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {blog.coverImage && (
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="aspect-[16/9] overflow-hidden rounded-3xl shadow-2xl"
          >
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>
      )}

      {/* Article Content */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="markdown-body prose prose-indigo prose-lg max-w-none">
          <ReactMarkdown>{blog.content}</ReactMarkdown>
        </div>

        {/* Tags */}
        <div className="mt-12 flex flex-wrap gap-2">
          {blog.tags.map(tag => (
            <span key={tag} className="rounded-lg bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-200 cursor-pointer transition-colors">
              #{tag}
            </span>
          ))}
        </div>

        {/* Interaction Footer */}
        <div className="mt-16 rounded-3xl bg-indigo-50 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-indigo-900">Enjoyed this article?</h3>
            <p className="text-indigo-700/70">Support the author by giving it a like or sharing.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={cn(
                "flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all active:scale-95 shadow-md",
                isLiked ? "bg-red-500 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
              )}
            >
              <Heart className={cn("h-5 w-5", isLiked && "fill-current")} />
              {isLiked ? blog.likes + 1 : blog.likes} Likes
            </button>
            <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95">
              <MessageSquare className="h-5 w-5" />
              Comments
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { cn } from "../lib/utils";
