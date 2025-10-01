import { getUserOrder } from "@/apis/getUserOrders";
import { CartItem, Order, Orders } from "@/types/order.type";
import Image from "next/image";
import React from "react";

const AllOrders = async () => {
  const data: Orders = await getUserOrder();

  return (
    <div className="md:w-[80%] mx-auto w-full my-10 px-5 md:px-0">
      <div className="allOrders">
        {data.map(function (order: Order, idx: number) {
          return (
            <div className="bg-slate-100 mb-5 p-5" key={idx}>
              <div className="flex p-8 border-b-[3px] border-green-500 rounded-2xl gap-4">
                {order.cartItems.map(function (item: CartItem, idx: number) {
                  return (
                    <div className="w-1/6 me-3" key={idx}>
                      <Image
                        src={item.product.imageCover}
                        alt="productImage"
                        className="w-full"
                        width={200}
                        height={200}
                      />

                      <h2 className="line-clamp-1">{item.product.title}</h2>
                    </div>
                  );
                })}

               
              </div>
               <div className="mt-5 bg-emerald-100 rounded-3xl p-4">
                  <h2 className=" text-green-700">payment Method Type <i className="fa-solid fa-wallet"></i> : {order.paymentMethodType}</h2>
                                    <h2 className=" text-green-700">Total Order Price <i className="fa-solid fa-tag"></i> : {order.totalOrderPrice}</h2>

                </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllOrders;
