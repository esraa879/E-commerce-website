"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"

interface Category {
  _id: string
  name: string
  image: string
}

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories")
        const data = await res.json()
        setCategories(data.data)
      } catch (err) {
        console.error("Failed to fetch categories:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (loading) return <p>Loading...</p>

  return (
    <div className="w-full md:w-[80%] mx-auto my-10">
      <h1 className="text-2xl font-bold mb-5 text-center">Our Categories</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-5">
        {categories.map((category) => (
          <div
            key={category._id}
            className="p-4 border rounded shadow flex flex-col items-center justify-center"
          >
            <Image
              src={category.image}
              alt={category.name}
              width={150}
              height={150}
              className="object-contain h-[100px] w-[100px]"
            />
            <p className="mt-2 text-sm font-semibold text-center">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoriesPage
