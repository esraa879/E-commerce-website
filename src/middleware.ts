import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

const protectedRoutes = ["/","/payment","/allorders" ,"/brands", "/categories", "/cart", "/products"];
const authPages = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = request.nextUrl;

  if (!token && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && authPages.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// ✅ هنا لازم نكتب الماتشر ثابت من غير spread
export const config = {
  matcher: [
    "/",
    "/payment",
    "/allorders",
    "/brands",
    "/categories",
    "/cart",
    "/products",
    "/login",
    "/register",
  ],
};
