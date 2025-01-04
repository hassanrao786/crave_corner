"use client"

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <section className="relative bg-gray-600 dark:bg-gray-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-grid-pattern" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative pt-20 pb-16 sm:pb-24">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Text Content */}
            <motion.div 
              className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1>
                <span className="block text-sm font-semibold uppercase tracking-wide text-yellow-500 dark:text-blue-400">
                  Welcome to Crave Corner
                </span>
                <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
                  <span className="block text-white dark:text-white">Discover the World</span>
                  <span className="block text-orange-500 dark:text-blue-400">Through Food & Travel</span>
                </span>
              </h1>
              <p className="mt-3 text-base text-white dark:text-gray-400 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Explore authentic recipes, travel guides, and cultural insights from around the globe. Join our community of food lovers and adventurous travelers.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left">
                <div className="flex flex-col sm:flex-row gap-4 sm:justify-center lg:justify-start">
                  <Link 
                    href="/recipes"
                    className="inline-flex items-center justify-center px-5 py-3 border border-2 border-orange-600 text-base font-medium rounded-md bg-white text-orange-600  hover:bg-orange-600 hover:text-white transition-colors duration-200"
                  >
                    Explore Recipes
                  </Link>
                  <Link 
                    href="/blogs"
                    className="inline-flex items-center justify-center px-5 py-3 border border-2 border-orange-600 text-base font-medium rounded-md text-orange-600 bg-white transition-colors duration-200 hover:bg-orange-600 hover:text-white"
                  >
                    Read Blog Posts
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Image/Visual Content */}
            <motion.div 
              className="relative mt-12 sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                <div className="relative block w-full h-[400px] rounded-lg overflow-hidden">
                  <Image
                    src="/hero2.jpg" // Make sure to add your hero image
                    alt="Food and travel collage"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                {/* Floating Cards */}
                <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400 text-lg">🌍</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">50+ Countries</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Explored & Documented</p>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400 text-lg">🍳</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">1000+ Recipes</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">From All Cultures</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
