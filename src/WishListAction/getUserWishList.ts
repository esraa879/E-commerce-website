"use server"

import { getMyToken } from "@/utilities/token"


export async function getUserWishListAction(){

const token = await getMyToken()


if(!token){
    throw Error ("login first")
}

const response = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist" ,{
    headers:{
        token: token as string
      }
   })

const data = await response.json()

return data
}