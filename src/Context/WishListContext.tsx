"use client"

import React, { createContext, useState, useEffect, ReactNode } from "react"
import { Wishlist, WishListItem } from "@/types/wishlist.type"
import { getUserWishListAction } from "@/WishListAction/getUserWishList"

interface WishListContextType {
  isLoading: boolean
  numOfWishList: number
  products: WishListItem[]
  addToWishList: (item: WishListItem) => void
  removeProduct: (productId: string) => void
  clearWishList: () => void
  isInWishList: (id: string) => boolean
}

export const WishListContext = createContext<WishListContextType>({
  isLoading: false,
  numOfWishList: 0,
  products: [],
  addToWishList: () => {},
  removeProduct: () => {},
  clearWishList: () => {},
  isInWishList: () => false,
})

const WishListContextProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<WishListItem[]>([])
  const [numOfWishList, setNumOfWishList] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const clearWishList = () => {
    setProducts([])
    setNumOfWishList(0)
  }

  async function getUserWishList() {
    setIsLoading(true)
    try {
      const data: Wishlist = await getUserWishListAction()
      if (data && data.data) {
        setProducts(data.data as WishListItem[])
        setNumOfWishList(data.count || data.data.length || 0)
      }
    } catch (err) {
      console.error("Failed to load wishlist:", err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getUserWishList()
  }, [])

  const addToWishList = (item: WishListItem) => {
    if (!item || !item._id) {
      console.warn("Invalid item passed to addToWishList:", item)
      return
    }

    setProducts(prev => {
      if (prev.some(p => p._id === item._id)) return prev
      return [...prev, item]
    })
    setNumOfWishList(prev => prev + 1)
  }

  const removeProduct = (productId: string) => {
    const newProducts = products.filter(p => p._id !== productId)
    setProducts(newProducts)
    setNumOfWishList(newProducts.length)
  }

  const isInWishList = (id: string) => {
    return products.some(product => product._id === id)
  }

  return (
    <WishListContext.Provider
      value={{
        isLoading,
        numOfWishList,
        products,
        addToWishList,
        clearWishList,
        removeProduct,
        isInWishList,
      }}
    >
      {children}
    </WishListContext.Provider>
  )
}

export default WishListContextProvider
