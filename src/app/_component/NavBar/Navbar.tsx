"use client";

import Link from "next/link";
import React, { useContext } from "react";
import logo from "./../../../../public/screens/freshcart-logo.svg";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { cartContext } from "@/Context/CartContext";
import { Badge } from "@/components/ui/badge";

const Navbar = () => {
  const { data: session, status } = useSession();

  const { numOfCartItems } = useContext(cartContext);

  return (
    <div className="bg-slate-100 py-5">
      <div className="w-full md:w-[80%] mx-auto flex justify-between items-center flex-col md:flex-row text-center">
        <ul className="flex flex-col md:flex-row text-center items-center gap-6">
          {status === "authenticated" && (
            <>
              <li>
                <Link href={"/"}>
                  <Image src={logo} alt="logo" />
                </Link>
              </li>
              <li>
                <Link href={"/"}>Home</Link>
              </li>
              <li>
                <Link href={"/cart"}>
                  <Badge>{numOfCartItems}</Badge>
                  Cart{" "}
                </Link>
              </li>
              <li>
                <Link href={"/wishlist"}>
                
                Wish List
                
                </Link>
              </li>
              <li>
                <Link href={"/categories"}>Categories</Link>
              </li>
              <li>
                <Link href={"/allorders"}>All Orders</Link>
              </li>
              <li>
                <Link href={"/brands"}>Brands</Link>
              </li>
            </>
          )}

          {status === "loading" && (
            <>
              <h1> Loading</h1>
            </>
          )}

          {status === "unauthenticated" && <Image src={logo} alt="logo" />}
        </ul>

        {/* Icons &buttons */}

        <div className="flex flex-col md:flex-row text-center items-center gap-2">
          <div>
            <i className="fab  mx-2 fa-facebook-f"></i>
            <i className="fab mx-2 fa-youtube"></i>
            <i className="fab mx-2 fa-linkedin"></i>
            <i className="fab  mx-2 fa-twitter"></i>
          </div>

          {status === "authenticated" && (
            <>
              <div>
                <button
                  className="cursor-pointer"
                  onClick={() =>
                    signOut({
                      callbackUrl: "/login",
                    })
                  }
                >
                  Log Out
                </button>
              </div>

              <div>
                <h1 className=" px-2 font-bold text-emerald-500">
                  {" "}
                  Welcome {session.user.name}{" "}
                  <i className="text-amber-400 fa-solid fa-hand"></i>
                </h1>
              </div>
            </>
          )}

          {status === "unauthenticated" && (
            <>
              <div>
                <Link href="/login">Login</Link>
              </div>

              <div>
                <Link href="/register">Register</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
