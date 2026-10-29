export interface ApiProduct {
  productName: string
  descriptionShort: string
  photo: string
  price: number
}

export interface ProductsResponse {
  success: boolean
  products: ApiProduct[]
}

export interface Product extends ApiProduct {
  id: string
  slug: string
}

export interface CartItem {
  productId: string
  quantity: number
}
