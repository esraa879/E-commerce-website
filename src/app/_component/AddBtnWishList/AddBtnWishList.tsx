"use client"

import { Button } from "@/components/ui/button"
import { WishListContext } from "@/Context/WishListContext"
import React, { useContext } from "react"
import { toast } from "sonner"
import { Data } from "@/types/wishlist.type"

interface AddBtnWishListProps {
  product: Data
}

const AddBtnWishList = ({ product }: AddBtnWishListProps) => {
  const { addToWishList } = useContext(WishListContext)

  const handleAddWishList = () => {
    if (!product) {
      toast.error("Invalid product", { duration: 1000, position: "top-center" })
      return
    }

    addToWishList(product)

    toast.success("Product added to wishlist", {
      duration: 1000,
      position: "top-center"
    })
  }

  return (
    <div>
      <Button
        className="w-full"
        variant="default"
        onClick={handleAddWishList}
      >
        Add To WishList
      </Button>
    </div>
  )
}

export default AddBtnWishList
