"use client"

import React, { useContext } from "react"
import { WishListContext } from "@/Context/WishListContext"
import { Category } from "@/types/product.type"
import { toast } from "sonner"

interface ProductCardProps {
  product: {
    id: string
    title: string
    price: number
    imageCover: string
    category: Category
    ratingsAverage: number
  }
}

const HomeCard = ({ product }: ProductCardProps) => {
  const { addToWishList, isInWishList, removeProduct } = useContext(WishListContext)

  const handleWishListToggle = () => {
    if (isInWishList(product.id)) {
      removeProduct(product.id)
      toast.info("تمت إزالة المنتج من المفضلة ❤️‍🔥")
    } else {
      addToWishList({
        _id: product.id,
        title: product.title,
        price: product.price,
        imageCover: product.imageCover,
        category: product.category,
        ratingsAverage: product.ratingsAverage,
      })
      toast.success("تمت إضافة المنتج إلى المفضلة 💖")
    }
  }

  return (
    <div className="p-4 rounded-2xl shadow-md bg-white">
      <img src={product.imageCover} alt={product.title} className="w-full h-48 object-cover rounded-xl" />
      <h3 className="mt-2 font-semibold text-lg">{product.title}</h3>
      <p className="text-gray-600">{product.category.name}</p>
      <p className="text-pink-600 font-bold">{product.price} EGP</p>

      <button
        onClick={handleWishListToggle}
        className="mt-3 px-4 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition"
      >
        {isInWishList(product.id) ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
      </button>
    </div>
  )
}

export default HomeCard
