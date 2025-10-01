export type Orders = Order[]
export interface Order{
    shippingAddress:ShippingAddress
    taxPrice:number
    shippingPriceType:string
    isPaid:boolean
    isDelivered:boolean
    _id:string
    user:User
    cartItems:CartItem[]
    createdAt:string
    updatedAt:string
    id:string
    __v:number
    paidAt?:string
    totalOrderPrice:string
   paymentMethodType:string
}


export interface ShippingAddress{
    details :string
    phone:string
    city:string
}

export interface User {
  _id: string;
  name:string
  email:string
  phone:string
}
export interface CartItem {
  count: number;
  _id: string;
  product: OrderProduct;
  price: number;
}

export interface OrderProduct {
  subcategory: SubCategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  id: string;
}

export interface SubCategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}
