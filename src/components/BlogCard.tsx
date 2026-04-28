import React from "react";
import { Link } from "react-router-dom";
import { Blog } from "../types";
import { Calendar, User, ArrowRight, Heart } from "lucide-react";
import { format } from "date-fns";

interface BlogCardProps {
  blog: Blog;
}

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10 active:scale-[0.98]">
      <Link to={`/blog/${blog.slug}`} className="relative aspect-[16/10] overflow-hidden">
        {blog.coverImage ? (
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-50 text-indigo-100">
            <span className="font-bold text-6xl opacity-20">B</span>
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className="rounded-xl bg-white/80 backdrop-blur-md px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-indigo-600 shadow-sm">
            {blog.category}
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <h2 className="mb-3 text-xl font-bold leading-snug text-gray-900 transition-colors group-hover:text-indigo-600 text-display">
          <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
        </h2>

        <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-500 line-clamp-2">
          {blog.excerpt}
        </p>

        <div className="flex items-center justify-between border-t border-gray-50 pt-5">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-indigo-50 flex items-center justify-center border border-indigo-100">
              <User className="h-4 w-4 text-indigo-400 font-bold" />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-900 uppercase tracking-tighter">{blog.authorName}</p>
              <p className="text-[10px] text-gray-400 leading-none">{format(new Date(blog.createdAt), "MMM d")}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
            <Heart className="h-4 w-4" />
            {blog.likes}
          </div>
        </div>
      </div>
    </article>
  );
}
