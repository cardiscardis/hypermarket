import React from 'react';
import { NextPage } from "next";

import Product from "./Product";
import { ProductListProps } from 'src/app/types'




const ProductFeed: NextPage<ProductListProps> = ({products}) => {
    return (
        <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-4 md:-mt-52 mx-auto">
            {products && products.slice(0,4).map(({id, title, price, description, category, image, rating}: Product)=>(
                <Product
                    key={id} 
                    id = {id} 
                    title = {title} 
                    price={price} 
                    description = {description} 
                    category={category}
                    image={image}
                    rating={rating}
                />
            ))}

            <img className="md:col-span-full" src="./b4.jpg" />
                
            <div className="md:col-span-2">
                {products && products.slice(4,5).map(({id, title, price, description, category, image, rating}: Product)=>(
                    <Product
                        key={id} 
                        id = {id} 
                        title = {title} 
                        price={price} 
                        description = {description} 
                        category={category}
                        image={image}
                        rating={rating}
                    />
                ))}
            </div>


            {products && products.slice(5, products.length-1).map(({id, title, price, description, category, image, rating}: Product)=>(
                <Product
                    key={id} 
                    id = {id} 
                    title = {title} 
                    price={price} 
                    description = {description} 
                    category={category}
                    image={image}
                    rating={rating}
                />
            ))}

        </div>
    )
}

export default ProductFeed