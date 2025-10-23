"use client"

import React, { useContext } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Product } from "../../../types/product.type"
import AddBtnCart from "../AddBtnCart/AddBtnCart"
import { WishListContext } from "@/Context/WishListContext"
import { Heart } from "lucide-react"
import { toast } from "sonner"

const HomeCard = ({ product }: { product: Product }) => {
  const { addToWishList, removeProduct, isInWishList } =
    useContext(WishListContext)

  const inWishlist = isInWishList(product.id)

  const handleToggleWish = () => {
    if (inWishlist) {
      removeProduct(product.id)
      toast.error("Product removed from wishlist", {
        duration: 1000,
        position: "top-center",
      })
    } else {
      addToWishList({
        _id: product.id,
        title: product.title,
        price: product.price,
        imageCover: product.imageCover,
        category: product.category,
        ratingsAverage: product.ratingsAverage,
      })
      toast.success("Product added to wishlist successfully", {
        duration: 1000,
        position: "top-center",
      })
    }
  }

  return (
    <div className="w-full p-3 sm:w-1/5 md:w-1/3 xl:w-1/5 2xl:w-1/5">
      <div className="inner">
        <Card className="p-2 gap-2">
          <Link href={`/productDetails/${product.id}`}>
            <CardHeader className="p-0">
              <Image
                width={500}
                height={500}
                src={product.imageCover}
                alt={product.title}
              />
            </CardHeader>
            <CardContent className="p-0">
              <p className="font-bold text-green-500 mb-3 text-sm">
                {product.category.name}
              </p>
              <p className=" line-clamp-1 ">{product.title}</p>
            </CardContent>
            <CardFooter className="p-0">
              <div className="w-full flex justify-between items-center">
                <p>{product.price} EGP</p>
                <p>
                  {product.ratingsAverage}
                  <i className="fa-solid fa-star text-yellow-500"></i>
                </p>
              </div>
            </CardFooter>
          </Link>

          <div className="flex justify-between items-center mt-2">
            <AddBtnCart id={product.id} />

            <button onClick={handleToggleWish}>
              <Heart
                size={24}
                className={`cursor-pointer transition-colors ${
                  inWishlist ? "text-red-500 fill-red-500" : "text-gray-500"
                }`}
              />
            </button>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default HomeCard
