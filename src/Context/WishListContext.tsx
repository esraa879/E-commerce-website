"use client"

import React, { createContext, useState, useEffect, ReactNode } from "react"
import { Wishlist, Data } from "@/types/wishlist.type"
import { getUserWishListAction } from "@/WishListAction/getUserWishList"

interface WishListContextType {
  isLoading: boolean
  numOfWishList: number
  products: Data[]   // 👈 products دلوقتي Array مباشرة
  addToWishList: (item: Data) => void
  totalWishListPrice: number
  removeProduct: (productId: string) => void
  clearWishList: () => void
  isInWishList: (id: string) => boolean
}

export const WishListContext = createContext<WishListContextType>({
  isLoading: false,
  numOfWishList: 0,
  products: [],
  addToWishList: () => {},
  totalWishListPrice: 0,
  removeProduct: () => {},
  clearWishList: () => {},
  isInWishList: () => false,
})

const WishListContextProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Data[]>([])
  const [numOfWishList, setNumOfWishList] = useState(0)
  const [totalWishListPrice, setTotalWishListPrice] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const clearWishList = () => {
    setProducts([])
    setNumOfWishList(0)
    setTotalWishListPrice(0)
  }

  async function getUserWishList() {
    setIsLoading(true)
    try {
      const data: Wishlist = await getUserWishListAction()
      if (data && data.data) {
        setProducts(data.data) // 👈 Array مباشرة
        setNumOfWishList(data.count || data.data.length || 0)
        setTotalWishListPrice(data.totalWishListPrice || 0)
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

  const addToWishList = (item: Data) => {
    if (!item || item.price === undefined) {
      console.warn("Invalid item passed to addToWishList:", item)
      return
    }

    setProducts(prev => [...prev, item])
    setNumOfWishList(prev => prev + 1)
    setTotalWishListPrice(prev => prev + item.price)
  }

  const removeProduct = (productId: string) => {
    const newProducts = products.filter(p => p._id !== productId)
    const newTotalPrice = newProducts.reduce((acc, p) => acc + p.price, 0)
    const newNum = newProducts.length

    setProducts(newProducts)
    setTotalWishListPrice(newTotalPrice)
    setNumOfWishList(newNum)
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
        totalWishListPrice,
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
