"use client";
import { cartContext } from "@/Context/CartContext";
import React, { useContext } from "react";
import Loading from "../loading";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ProductCart } from "@/types/cart.type";
import { toast } from 'sonner';
import Link from "next/link";

const Cart = () => {
  const { isLoading , products, totalCartPrice ,removeCartItem ,updateCart,clearCart} = useContext(cartContext);


async function  updateCartItem(id: string,count:number) {
    const data = await updateCart(id ,count)

if(data.status === "success"){
  toast.success("success to update this product", {
    duration:1000,
    position:"top-center"
  })
}
else{
    toast.error("faild to remove this product",{
   duration:1000,
    position:"top-center"
     })
 
}

  }

async function  removeItem(id: string) {
    const data = await removeCartItem(id)

if(data.status === "success"){
  toast.success("success to remove this product", {
    duration:1000,
    position:"top-center"
  })
}
else{
    toast.error("faild to remove this product",{
   duration:1000,
    position:"top-center"
     })
 
}

  }
if (isLoading){
  return <Loading/>
}
if (products.length == 0){
  return  <div className='flex justify-center items-center h-screen'>
        <h1 className='text-red-800 text-3xl font-bold'><i className="fa-solid fa-shopping-cart text-yellow-500"></i>Your Cart Is Empty<i className="fa-solid fa-shopping-cart text-yellow-500"></i></h1>
    </div>
}

  return (
    <div className="w-full md:w-[80%] mx-auto my-10 px-5 md:px-0 bg-slate-100">
      <div className="p-5">
        <h1 className="text-2xl font-bold">Shop Cart:</h1>
        <p className="my-3 text-green-700 font-mono">
          Total Price: {totalCartPrice} EGP
        </p>

        <Button onClick={clearCart} className="mb-10">Clear Cart</Button>
        <Button className="mb-10 ms-5">
          <Link href={"/payment"}>
          Payment
          </Link>
          </Button>

        <div className="allProducts">
          {products.map(function (product: ProductCart, idx: number) {
            return (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-9">

                  <div className="py-5">
                    <Image
                      alt="productCoverImage"
                      src={product.product.imageCover}
                      height={200}
                      width={200}
                    />
                  </div>


                  <div>

                   <h1 className="text-green-700">{product.product.title}</h1>

                   <p className="my-3 text-green-950">Price : {product.price}</p>
                  
                   <Button  onClick={()=>removeItem(product.product.id)}>Remove</Button>
                  
                  </div>



                </div>


<div className="flex items-center gap-3">
  <Button onClick={() => updateCartItem(product.product.id, product.count + 1)}>+</Button>
  <p>{product.count}</p>
  <Button onClick={() => updateCartItem(product.product.id, product.count - 1)}>-</Button>

  </div>


              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Cart;
