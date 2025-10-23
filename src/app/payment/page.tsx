// "use client";

// import React, { useRef, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// import { onlinePaymentAction } from "@/PaymentActions/onlinePayment";

// const PaymentPage = () => {
//   const details = useRef<HTMLInputElement>(null);
//   const phone = useRef<HTMLInputElement>(null);
//   const city = useRef<HTMLInputElement>(null);

//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   async function handleOnlinePayment() {
//     setLoading(true);

//     const values = {
//       shippingAddress: {
//         details: details.current?.value || "",
//         phone: phone.current?.value || "",
//         city: city.current?.value || "",
//       },
//     };

//     try {
//       const data = await onlinePaymentAction("YOUR_CART_ID", values);

//       if (data?.session?.url) {
//         toast.success("Redirecting to payment page...", {
//           duration: 1500,
//           position: "top-center",
//         });
//         router.push(data.session.url);
//       } else {
//         toast.error("Failed to start payment session");
//       }
//     } catch (error: any) {
//       toast.error(error.message || "Payment failed");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="w-full md:w-[60%] mx-auto my-10 px-5">
//       <h1 className="text-2xl font-bold mb-5">Payment Information</h1>

//       <div className="flex flex-col gap-4 mb-6">
//         <input
//           ref={details}
//           type="text"
//           placeholder="Address details"
//           className="border p-2 rounded"
//         />
//         <input
//           ref={phone}
//           type="text"
//           placeholder="Phone number"
//           className="border p-2 rounded"
//         />
//         <input
//           ref={city}
//           type="text"
//           placeholder="City"
//           className="border p-2 rounded"
//         />
//       </div>

//       <Button
//         onClick={handleOnlinePayment}
//         disabled={loading}
//         className="bg-green-600 hover:bg-green-700 text-white w-full"
//       >
//         {loading ? "Processing..." : "Pay Online"}
//       </Button>
//     </div>
//   );
// };

// export default PaymentPage;
