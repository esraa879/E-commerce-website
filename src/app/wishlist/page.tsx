"use client";

import React, { useContext } from "react";
import { WishListContext } from "@/Context/WishListContext";
import Loading from "@/app/loading";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { toast } from "sonner";
import { Heart } from "lucide-react";

const WishListPage = () => {
  const {
    products,
    totalWishListPrice,
    isLoading,
    clearWishList,
    removeProduct,
    isInWishList,
    addToWishList,
  } = useContext(WishListContext);

  if (isLoading) return <Loading />;

  return (
    <div className="w-full md:w-[80%] mx-auto my-10 px-5 md:px-0">
      <h1 className="text-2xl font-bold mb-5 "> 
        My Wishlist 
                <i className="fa-solid fa-heart text-red-600 px-2"></i>
    
        </h1>
      {/* <p className="mb-5 text-lg font-semibold">Total Price: {totalWishListPrice} EGP</p> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 ">
        {products.length === 0 && <p>Your wishlist is empty.</p>}

        {products.map((product) => (
          <div key={product._id} className="border p-3 rounded shadow">
            <Image
              src={product.imageCover}
              alt={product.title}
              width={300}
              height={300}
              className="mb-2"
            />
           
            <h2 className="font-bold line-clamp-1">{product.title}</h2>
             <div className="flex justify-between">
            <p className="text-green-600 font-semibold">{product.price} EGP</p>

            {isInWishList(product._id) ? (
              <Heart
                size={24}
                fill="red"
                className="text-red-500 cursor-pointer"
                onClick={() => {
                  removeProduct(product._id);
                  toast.error("Product removed from wishlist", {
                    duration: 1000,
                    position: "top-center",
                  });
                }}
              />
            ) : (
              <Heart
                size={24}
                className="cursor-pointer text-gray-500"
                onClick={() => {
                  addToWishList(product);
                  toast.success("Product added to wishlist successfully", {
                    duration: 1000,
                    position: "top-center",
                  });
                }}
              />
            )}
          </div>
          </div>
        ))}
      </div>
      

      {products.length > 0 && (
        <div className="mt-5">
          <Button
            variant="destructive"
            onClick={() => {
              clearWishList();
              toast.success("Wishlist cleared", {
                duration: 1000,
                position: "top-center",
              });
            }}
          >
            Clear Wishlist
          </Button>
        </div>
      )}
    </div>
  );
};

export default WishListPage;
