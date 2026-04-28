import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Image, Send, Tag, ChevronLeft, Loader2, Save } from "lucide-react";
import { motion } from "motion/react";

export function CreateBlog() {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    title: "",
    content: "",
    excerpt: "",
    category: "Technology",
    coverImage: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const slug = formData.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({ ...formData, slug, tags: [] }),
      });

      if (!response.ok) throw new Error("Failed to create blog");
      
      navigate("/");
    } catch (err) {
      alert("Error creating blog. Make sure you are logged in as an Editor/Admin.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="mx-auto max-w-4xl px-4 pt-12 sm:px-6 lg:px-8">
        <button onClick={() => navigate(-1)} className="mb-8 flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-indigo-600">
          <ChevronLeft className="h-4 w-4" /> Back to feed
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-white p-8 shadow-xl border border-gray-100"
        >
          <div className="mb-8 border-b border-gray-100 pb-6">
            <h1 className="text-3xl font-extrabold text-gray-900">Write a new story</h1>
            <p className="mt-1 text-gray-500">Share your thoughts with the community securely.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Blog Title</label>
              <input
                type="text"
                required
                className="block w-full border-b-2 border-gray-100 py-3 text-2xl font-bold text-gray-900 placeholder-gray-300 focus:border-indigo-600 focus:outline-none transition-colors"
                placeholder="Enter a catchy title..."
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                <select
                  className="block w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm focus:border-indigo-500 focus:outline-none"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option>Technology</option>
                  <option>Security</option>
                  <option>Design</option>
                  <option>Productivity</option>
                  <option>Business</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Cover Image URL</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Image className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="url"
                    className="block w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-3 text-sm focus:border-indigo-500 focus:outline-none"
                    placeholder="https://images.unsplash.com/..."
                    value={formData.coverImage}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Short Excerpt</label>
              <textarea
                required
                rows={2}
                className="block w-full rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm focus:border-indigo-500 focus:outline-none"
                placeholder="A brief summary for the feed..."
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Content (Markdown supported)</label>
              <textarea
                required
                rows={12}
                className="block w-full rounded-xl border border-gray-200 bg-gray-50 p-4 font-mono text-sm focus:border-indigo-500 focus:outline-none"
                placeholder="Start writing your masterpiece..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-50">
              <button
                type="button"
                className="flex items-center gap-2 rounded-xl border border-gray-200 px-6 py-3 text-sm font-bold text-gray-600 hover:bg-gray-50"
              >
                <Save className="h-4 w-4" /> Save Draft
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 disabled:opacity-70"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                Publish Post
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
