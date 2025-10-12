"use client"
import { Button } from '@/components/ui/button'
import { cartContext } from "@/Context/CartContext";

import React, { useContext } from 'react'
import { toast } from 'sonner'

const AddBtnCart = ({id}:{id:string}) => {

const {addProductToCart} =useContext(cartContext)


async function handleAddCart() {
    const data = await addProductToCart(id)

if (
data.status === "success"){

  toast.success(data.message , {
    duration:1000 ,
    position: 'top-center'
  })
}
else{
toast.error("faild to add product to cart", {
    duration:1000 ,
    position: 'top-center'
  })


}

}




  return (
    <div>

<Button className=' md:w-full' variant="default" onClick={handleAddCart} > Add To Cart </Button>

    </div>
  )
}

export default AddBtnCart 