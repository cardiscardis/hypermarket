import React from 'react'
import { NextPage } from 'next';
import Image from 'next/image';
import { Product } from 'src/app/types';


const ProductDetail: NextPage<Product> = ({id, title, price, rating, description, category, image, hasPrime}) => {



    return (
        <div>
            <p>{title}</p>
           

        </div>
    )
}

export default ProductDetail
