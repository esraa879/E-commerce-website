"use client"

import { SessionProvider } from 'next-auth/react'
import React from 'react'
import CartContextProvider from './Context/CartContext'
import WishListContextProvider from './Context/WishListContext'

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <CartContextProvider>
        <WishListContextProvider>
          {children}
          </WishListContextProvider>
      </CartContextProvider>
    </SessionProvider>
  )
}

export default Providers

