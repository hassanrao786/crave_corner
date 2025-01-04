// src/app/about/page.tsx
'use client'

import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-orange-500 sm:text-5xl sm:tracking-tight lg:text-6xl">
              About Us
            </h1>
            <p className="max-w-4xl max-h-3 mt-5 mx-auto text-xl text-gray-700">
            Introduce Crave Corner as a platform showcasing Pakistan's diverse culinary landscape.
            Highlight the mission to bring authentic flavors from different cities to your doorstep.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="relative lg:row-start-1 lg:col-start-2">
              <div className="relative text-base mx-auto max-w-prose lg:max-w-none">
                <figure>
                  <div className="aspect-w-12 aspect-h-7 lg:aspect-none">
                    <Image
                      src="/hero2.jpg" // Add your image to public folder
                      alt="About us image"
                      width={300}
                      height={300}
                      className="rounded-lg shadow-lg object-cover object-center"
                    />
                  </div>
                </figure>
              </div>
            </div>
            <div className="mt-8 lg:mt-0">
              <div className="text-base max-w-prose mx-auto lg:max-w-none">
                <h2 className="text-3xl font-extrabold text-orange-500 tracking-tight sm:text-4xl">
                  Our Mission
                </h2>
                <p className="mt-8 text-lg text-gray-700">
                 Whether you're miles away from home or craving the taste of your hometown, we ensure that Pakistan’s culinary treasures are just a click away.
 Food is a universal language, and we aim to promote cultural exchange by sharing the unique tastes and traditions of Pakistan’s cities and regions.
 We partner with trusted local chefs and vendors to bring you dishes made from the finest, freshest ingredients.
By collaborating with small-scale businesses, we support local economies and highlight the talents of homegrown artisans.
At Crave Corner, our vision is to make every meal a celebration of flavor, culture, and community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4x text-orange-500">
              Our Team
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-700">
              Meet the people who make it all happen.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {/* Team Member 1 */}
            <div className="text-center">
              <div className="space-y-4">
                <Image
                  className="mx-auto h-40 w-40 rounded-full"
                  src="/11ff5883-097d-478c-b9d9-e2c95076354f.jfif" // Add team member image
                  alt="Team member"
                  width={160}
                  height={160}
                />
                <div className="space-y-2">
                  <div className="text-lg leading-6 font-medium space-y-1">
                    <h3 className="text-gray-900">Sania Zahid</h3>
                    <p className="text-blue-600">2022-uam-1946</p>
                  </div>
                  <div className="text-gray-500">
                    <p className="text-sm">
                      
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="text-center">
              <div className="space-y-4">
                <Image
                  className="mx-auto h-40 w-40 rounded-full"
                  src="/11ff5883-097d-478c-b9d9-e2c95076354f.jfif" // Add team member image
                  alt="Team member"
                  width={160}
                  height={160}
                />
                <div className="space-y-2">
                  <div className="text-lg leading-6 font-medium space-y-1">
                    <h3 className="text-gray-900">Alina Shahadat</h3>
                    <p className="text-blue-600">2022-uam-1919</p>
                  </div>
                  <div className="text-gray-500">
                    <p className="text-sm">
                     
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="text-center">
              <div className="space-y-4">
                <Image
                  className="mx-auto h-40 w-40 rounded-full"
                  src="/11ff5883-097d-478c-b9d9-e2c95076354f.jfif" // Add team member image
                  alt="Team member"
                  width={160}
                  height={160}
                />
                <div className="space-y-2">
                  <div className="text-lg leading-6 font-medium space-y-1">
                    <h3 className="text-gray-900">Aqsa Masood</h3>
                    <p className="text-blue-600">2022-uam-1926</p>
                  </div>
                  <div className="text-gray-500">
                    <p className="text-sm">
              
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl tracking-tight font-extrabold text-orange-500 sm:text-4xl">
              Our Values
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-700 sm:mt-4">
            Here are the core values that guide Crave Corner's operations
            </p>
          </div>
          <div className="mt-12 max-w-lg mx-auto grid gap-1 lg:grid-col-3 lg:max-w-none">
            {/* Value 1 */}
            <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <h3 className="mt-2 text-xl font-semibold text-gray-900">
                    Innovation
                  </h3>
                  <p className="mt-3 text-base text-gray-500">
                  We are pioneers, constantly experimenting with new recipes, cuisines, and cutting-edge delivery methods to redefine the culinary experience.
                  </p>
                </div>
              </div>
            </div>

            {/* Value 2 */}
            <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <h3 className="mt-2 text-xl font-semibold text-gray-900">
                    Integrity
                  </h3>
                  <p className="mt-3 text-base text-gray-500">
                  Transparency and ethics are at the heart of our operations, from sourcing premium ingredients to ensuring fair practices in every aspect of our business.
                  </p>
                </div>

              </div>
                </div>
              </div>
              {/* Value 3 */}
            <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
              <div className="flex-1 bg-white p-6 flex flex-col justify-between mt-1">
                <div className="flex-1">
                  <h3 className="mt-2 text-xl font-semibold text-gray-900">
                    Excellence
                  </h3>
                  <p className="mt-3 text-base text-gray-500">
                  Every meal, every order, and every interaction is an opportunity to deliver nothing short of perfection.
                  </p>
                </div>
              </div>
            </div>
         
        </div>
      </div>
    </div>


  )
}
