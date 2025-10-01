"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"

interface Brand {
  _id: string
  name: string
  image: string
}

const BrandsPage = () => {
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands")
        const data = await res.json()
        setBrands(data.data)
      } catch (err) {
        console.error("Failed to fetch brands:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchBrands()
  }, [])

  if (loading) return <p>Loading...</p>

  return (
    <div className="w-full md:w-[80%] mx-auto my-10">
      <h1 className="text-2xl font-bold mb-5 text-center">Our Brands</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-5">
        {brands.map((brand) => (
          <div
            key={brand._id}
            className="p-4 border rounded shadow flex flex-col items-center justify-center"
          >
            <Image
              src={brand.image}
              alt={brand.name}
              width={100}
              height={100}
              className="object-contain"
            />
            <p className="mt-2 text-sm font-semibold text-center">{brand.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BrandsPage
