export interface Product {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: {
      rate?: number,
      count?: number
    },
    quantity?: number,
    hasPrime?: boolean,
    total?: number
}


export interface ProductListProps {
    products: Product[];
}
