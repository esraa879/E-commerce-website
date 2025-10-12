export interface Wishlist {
  status: string
  count: number
  data: Data[]
}

export interface Data {
  sold: number
  images: string[]
  subcategory: Subcategory[]
  ratingsQuantity: number
  _id: string
  title: string
  slug: string
  description: string
  quantity: number
  price: number
  numOfWishList:number
  products:string
  imageCover: string
  category: Category
  brand: Brand
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  __v: number
  id: string
}

export interface Subcategory {
  _id: string
  name: string
  slug: string
  category: string
}

export interface Category {
  _id: string
  name: string
  slug: string
  image: string
}

export interface Brand {
  _id: string
  name: string
  slug: string
  image: string
}
export interface WishListItem {
  _id: string
  title: string
  price: number
  imageCover: string
  category: Category
  ratingsAverage: number
}
