import React from "react";
import { BlogCard } from "../components/BlogCard";
import { Blog } from "../types";
import { Search, Rocket, TrendingUp, Sparkles } from "lucide-react";
import { cn } from "../lib/utils";

export function Home() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [blogs, setBlogs] = React.useState<Blog[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const categories = ["All", "Technology", "Security", "Design", "Productivity", "Business"];

  React.useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blogs");
        const data = await response.json();
        if (response.ok) {
          setBlogs(data);
        }
      } catch (err) {
        console.error("Failed to fetch blogs", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-indigo-600 px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/30 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-96 w-96 translate-x-1/3 translate-y-1/3 rounded-full bg-blue-500/20 blur-3xl" />
        </div>
        
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-indigo-500/30 px-4 py-1.5 text-sm font-bold text-indigo-100 backdrop-blur-sm"
          >
            <Sparkles className="h-4 w-4" />
            Discover fresh perspectives daily
          </motion.div>
          
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
            Where secure ideas meet <br /> <span className="text-indigo-200 text-display font-bold">global audiences.</span>
          </h1>
          
          <p className="mb-10 text-lg text-indigo-100/80 max-w-2xl mx-auto">
            The world's most secure platform for creators, editors, and readers. Participate in meaningful conversations with built-in protection.
          </p>
          
          <div className="relative mx-auto max-w-xl">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for topics, authors, or keywords..."
              className="w-full rounded-2xl bg-white px-12 py-4 text-gray-900 shadow-2xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-display font-bold">Featured Stories</h2>
            <p className="text-gray-500 mt-1">Handpicked quality articles from our top contributors.</p>
          </div>
          
          <div className="flex gap-2 pb-2 md:pb-0 overflow-x-auto scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "inline-flex whitespace-nowrap items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-all",
                  selectedCategory === cat 
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" 
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                )}
              >
                {cat === "All" && <Sparkles className="h-4 w-4" />}
                {cat}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
          </div>
        ) : blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.filter(b => b.title.toLowerCase().includes(searchTerm.toLowerCase())).map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
            <Rocket className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900">No stories yet</h3>
            <p className="text-gray-500">Be the first to share your thoughts!</p>
          </div>
        )}
        
        <div className="mt-16 text-center">
          <button className="rounded-full border-2 border-indigo-600 px-8 py-3 text-sm font-bold text-indigo-600 transition-all hover:bg-indigo-600 hover:text-white">
            View All Articles
          </button>
        </div>
      </section>
    </div>
  );
}

import { motion } from "motion/react";
import { Loader2 } from "lucide-react";
