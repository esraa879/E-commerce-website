"use server"

import { getMyToken } from "@/utilities/token"
import axios from "axios"
import { jwtDecode } from "jwt-decode"

interface MyToken {
  id: string
}

export async function getUserOrder() {
  const token = await getMyToken()

  if (!token) {
    throw new Error("Login First")
  }

  const decoded = jwtDecode<MyToken>(token)
  const id = decoded.id

  const { data } = await axios.get(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
  )

  return data
}
