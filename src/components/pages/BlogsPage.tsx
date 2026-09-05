import React, { useEffect, useState } from 'react';
import { Blog } from '../../types';
import { apiService } from '../../services/api';
import { BookOpen, Calendar, User, ArrowRight } from 'lucide-react';

export const BlogsPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    apiService.getBlogs().then((data) => setBlogs(data));
  }, []);

  return (
    <div className="py-12 bg-amber-50/40 dark:bg-amber-950/20 transition-colors min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 text-xs font-bold mb-2">
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
            <span>Sacred Knowledge & Travel Guides</span>
          </div>
          <h1 className="text-3xl font-extrabold font-serif text-stone-900 dark:text-amber-100">
            Gaya Pilgrimage Blog & Ritual Guides
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-amber-200/80 mt-1">
            Learn authentic Pind Daan rules, Vedic significance, Pitru Paksha dates, and Gaya travel tips.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((post) => (
            <article
              key={post.id}
              className="bg-white dark:bg-amber-950 rounded-2xl border border-amber-200/80 dark:border-amber-800/60 shadow-xs overflow-hidden flex flex-col justify-between hover:border-amber-400 transition-all"
            >
              <div>
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-3 text-[11px] text-stone-500 dark:text-amber-300">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-amber-600" /> {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-amber-600" /> {post.author}
                    </span>
                  </div>

                  <h3 className="text-base font-bold font-serif text-stone-900 dark:text-amber-100 leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-stone-600 dark:text-amber-200/80 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 border-t border-amber-100 dark:border-amber-900">
                <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 dark:text-amber-200 hover:underline cursor-pointer">
                  Read Full Article <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
