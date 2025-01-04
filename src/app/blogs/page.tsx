"use client"

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

// Define the blog posts data
const blogPosts = [
  {
    id: 1,
    title: 'The Art of Pakistani Biryani',
    excerpt: 'Discover the secrets behind making the perfect biryani, from selecting the right rice to layering the perfect spices...',
    author: 'Sarah Ahmed',
    date: 'June 15, 2023',
    category: 'Cooking Tips',
    image: '/blogs/biryani-art.jpg',
    readTime: '5 min read',
  },
  {
    id: 2,
    title: 'Street Food Guide: Lahore Edition',
    excerpt: 'Explore the bustling streets of Lahore and its famous food spots. From Gawalmandi to Food Street...',
    author: 'Ali Khan',
    date: 'June 12, 2023',
    category: 'Food Guide',
    image: '/blogs/lahore-street-food.jpg',
    readTime: '8 min read',
  },
  {
    id: 3,
    title: 'Traditional Cooking Methods',
    excerpt: 'Learn about the traditional cooking methods that have been passed down through generations...',
    author: 'Fatima Hassan',
    date: 'June 10, 2023',
    category: 'Traditions',
    image: '/blogs/traditional-cooking.jpg',
    readTime: '6 min read',
  },
  // Add more blog posts as needed
]

// BlogCard component for individual blog posts
const BlogCard = ({ post }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg"
    >
      <div className="relative h-48">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-sm bg-blue-600 text-white rounded-full">
            {post.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {post.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {post.author}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {post.date}
              </p>
            </div>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {post.readTime}
          </span>
        </div>
        
        <Link
          href={`/blogs/${post.id}`}
          className="mt-4 inline-block text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
        >
          Read More →
        </Link>
      </div>
    </motion.div>
  )
}

// Main BlogPage component
const BlogPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Food & Travel Blog
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Stories, tips, and guides about Pakistani cuisine and culture
          </p>
        </motion.div>

        {/* Categories Section */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['All', 'Cooking Tips', 'Food Guide', 'Traditions', 'Reviews'].map((category) => (
            <button
              key={category}
              className="px-4 py-2 rounded-full text-sm font-medium 
                       bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300
                       hover:bg-blue-50 dark:hover:bg-gray-700 
                       border border-gray-200 dark:border-gray-700
                       transition-colors duration-200"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <BlogCard post={post} />
            </motion.div>
          ))}
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-lg"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Get the latest posts and recipes directly in your inbox
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default BlogPage
