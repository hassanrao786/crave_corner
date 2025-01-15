'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

// Define TypeScript interfaces for our data structure
interface City {
  id: number
  name: string
  image: string
  description: string
  specialties: string[]
}

interface CityCardProps {
  city: City
}

// City data array
const cities: City[] = [
  {
    id: 1,
    name: 'Karachi',
    image: '/cities/karachi.jpg',
    description: 'The city of lights, known for its diverse culinary scene',
    specialties: ['Biryani', 'Nihari', 'BBQ'],
  },
  {
    id: 2,
    name: 'Lahore',
    image: '/cities/lahore.jpg',
    description: 'The heart of Punjab, famous for its rich food culture',
    specialties: ['Butter Chicken', 'Chapli Kebab', 'Lassi'],
  },
  {
    id: 3,
    name: 'Peshawar',
    image: '/cities/peshawar.jpg',
    description: 'Known for its traditional Pashtun cuisine',
    specialties: ['Chapli Kebab', 'Kabuli Pulao', 'Peshawari Karahi'],
  },
  {
    id: 4,
    name: 'Multan',
    image: '/cities/multan.jpg',
    description: 'The city of saints with unique local delicacies',
    specialties: ['Sohan Halwa', 'Multani Biryani', 'Seet Pitte'],
  },
  {
    id: 5,
    name: 'Quetta',
    image: '/cities/quetta.jpg',
    description: 'Famous for its traditional Balochi cuisine',
    specialties: ['Sajji', 'Dumba Karahi', 'Kahwa'],
  },
]

// CityCard component
const CityCard = ({ city }: CityCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative h-[400px] rounded-xl overflow-hidden shadow-xl group transition-transform duration-300 bg-white dark:bg-gray-800"
    >
      <Image
        src={city.image}
        alt={`Image of ${city.name}`}
        fill
        className="object-cover group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="text-3xl font-extrabold mb-2">{city.name}</h3>
        <p className="text-sm mb-3">{city.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {city.specialties.map((specialty, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-white/30 rounded-full"
            >
              {specialty}
            </span>
          ))}
        </div>
        <Link
          href={`/recipes/`}
          className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-3 rounded-lg transition-colors duration-300 shadow-lg"
        >
          Explore Recipes
        </Link>
      </div>
    </motion.div>
  )
}

// Main page component
export default function CitiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-white to-gray-100 dark:from-gray-800 dark:via-gray-900 dark:to-black py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-500 text-white py-20 px-4 text-center shadow-lg rounded-lg mb-12">
        <h1 className="text-5xl font-extrabold mb-6">
          Discover Pakistan  Culinary Gems
        </h1>
        <p className="text-lg max-w-3xl mx-auto">
          Journey through the flavors of Pakistan, where each city tells its own
          unique culinary story. Explore our curated collection of recipes and
          specialties.
        </p>
      </div>

      {/* City Cards Section */}
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Explore Pakistani Cities
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Discover the unique flavors and culinary traditions of Pakistan
            most famous cities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cities.map((city, index) => (
            <motion.div
              key={city.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CityCard city={city} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
