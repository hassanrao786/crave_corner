"use client";

import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center justify-between py-20 lg:py-18">
          {/* Text Content */}
          <div className="lg:w-1/2">
            <h1 className="text-5xl font-extrabold leading-tight sm:text-6xl lg:text-7xl">
              <span className="block">Enjoy Our</span>
              <span className="block text-yellow-400">Delicious Meal</span>
            </h1>
            <p className="mt-6 text-lg text-gray-300 leading-relaxed">
            Discover mouthwatering recipes, culinary secrets, and the rich traditions behind every dish. Join us in celebrating the art of food from around the globe.
            </p>
            <div className="mt-8">
              <Link
                href="/recipes"
                className="px-6 py-3 text-lg font-semibold rounded-full bg-yellow-500 text-gray-900 shadow-lg hover:bg-yellow-400 transition duration-300"
              >
                Book a Recipe
              </Link>
            </div>
          </div>

          {/* Image Content */}
          <div className="lg:w-1/2 mt-12 lg:mt-0">
            <div className="relative">
              <div className="relative w-full h-[300px] lg:h-[400px] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/hero2.jpg" // Replace with your food image
                  alt="Delicious grilled food"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
