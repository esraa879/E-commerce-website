import { AddToCartAction } from '@/CartActions/addToCart'
import { clearCartAction } from '@/CartActions/clearCart'
import { getUserCartAction } from '@/CartActions/getUserCart'
import { removeCartItemAction } from '@/CartActions/removeCartItem'
import { updateCartAction } from '@/CartActions/updateCart'
import { Cart, ProductCart } from '@/types/cart.type'
import React, { createContext, useEffect, useState } from 'react'

interface CartContextType {
  isLoading: boolean
  numOfCartItems: number
  products: ProductCart[]
  totalCartPrice: number
  cartId: string
  addProductToCart: (id: string) => Promise<any>
  removeCartItem: (id: string) => Promise<any>
  updateCart: (id: string, count: number) => Promise<any>
  clearCart: () => Promise<any>
  afterPayment: () => void
}

// ✅ إنشاء الـ context بالتايب الصحيح
export const cartContext = createContext<CartContextType>({
  isLoading: false,
  numOfCartItems: 0,
  products: [],
  totalCartPrice: 0,
  cartId: "",
  addProductToCart: async () => {},
  removeCartItem: async () => {},
  updateCart: async () => {},
  clearCart: async () => {},
  afterPayment: () => {},
})

const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [numOfCartItems, setNumOfCartItems] = useState(0)
  const [products, setProducts] = useState<ProductCart[]>([])
  const [totalCartPrice, setTotalCartPrice] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [cartId, setCartId] = useState("")

  async function addProductToCart(id: string) {
    try {
      const data = await AddToCartAction(id)
      getUserCart()
      console.log(data)
      return data
    } catch (error) {
      console.log(error)
    }
  }

  async function updateCart(id: string, count: number) {
    try {
      const data = await updateCartAction(id, count)
      setNumOfCartItems(data.numOfCartItems)
      setProducts(data.data.products)
      setTotalCartPrice(data.data.totalCartPrice)
      return data
    } catch (error) {
      console.log(error)
    }
  }

  async function clearCart() {
    try {
      const data = await clearCartAction()
      setNumOfCartItems(0)
      setProducts([])
      setTotalCartPrice(0)
      return data
    } catch (error) {
      console.log(error)
    }
  }

  async function removeCartItem(id: string) {
    try {
      const data: Cart = await removeCartItemAction(id)
      setNumOfCartItems(data.numOfCartItems)
      setProducts(data.data.products)
      setTotalCartPrice(data.data.totalCartPrice)
      return data
    } catch (error) {
      console.log(error)
    }
  }

  async function getUserCart() {
    setIsLoading(true)
    try {
      const data: Cart = await getUserCartAction()
      setNumOfCartItems(data.numOfCartItems)
      setProducts(data.data.products)
      setTotalCartPrice(data.data.totalCartPrice)
      setCartId(data.cartId)
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getUserCart()
  }, [])

  function afterPayment() {
    setCartId("")
    setNumOfCartItems(0)
    setTotalCartPrice(0)
    setProducts([])
  }

  return (
    <cartContext.Provider
      value={{
        isLoading,
        numOfCartItems,
        products,
        totalCartPrice,
        addProductToCart,
        removeCartItem,
        updateCart,
        clearCart,
        cartId,
        afterPayment,
      }}
    >
      {children}
    </cartContext.Provider>
  )
}

export default CartContextProvider
