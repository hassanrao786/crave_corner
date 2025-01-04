"use client"

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
      whileHover={{ scale: 1.03 }}
      className="relative h-[400px] rounded-xl overflow-hidden shadow-lg group"
    >
      <Image
        src={city.image}
        alt={city.name}
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="text-2xl font-bold mb-2">{city.name}</h3>
        <p className="text-sm mb-3">{city.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {city.specialties.map((specialty, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-white/20 rounded-full"
            >
              {specialty}
            </span>
          ))}
        </div>
        <Link
          href={`/cities/${city.name.toLowerCase()}`}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Explore Pakistani Cities
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Discover the unique flavors and culinary traditions of Pakistan's most famous cities
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