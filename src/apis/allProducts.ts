// export default async function getAllProducts(){

// import { getMyToken } from "@/utilities/token";

//     const response = await fetch("http://localhost:3000/api/v1/users")


//      const {data} = await response.json()
 
// return data
// }

// export default async function getAllProducts() {
//   const token = await getMyToken();
//   const res = await fetch(`${process.env.API}/products`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

//   if (!res.ok) {
//     const text = await res.text();
//     console.error("API error:", text);
//     return []; // رجع array فاضي بدل undefined
//   }

//   const json = await res.json();
//   console.log("Fetched data:", json);
//   return json.data || []; // رجع array حتى لو data مش موجودة
// }
import { getMyToken } from "@/utilities/token";
import { Product } from "../types/product.type";

export default async function getAllProducts(): Promise<Product[]> {
  try {
    const token = await getMyToken();

    const res = await fetch(`${process.env.API}/products`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("API error:", text);
      return [];
    }

    const json = await res.json();
    console.log("Server Fetched data:", json);

    return json.data || []; // array مباشرة
  } catch (err) {
    console.error("Fetch failed:", err);
    return [];
  }
}
