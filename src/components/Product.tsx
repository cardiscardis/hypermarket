import React from 'react';
import Image from 'next/image';
import {StarIcon} from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import {useSelector} from "react-redux";
import { useRouter } from "next/router";
import { NextPage } from "next";
import cogoToast from 'cogo-toast';

import { addToBasket, selectItems } from "../slices/basketSlice";
import { Product } from 'src/app/types'
import { useAppDispatch } from 'src/app/store'


const Product: NextPage<Product> = ({id, title, price, description, category, image, rating}) => {
    
    const router = useRouter();

    const items: Product[] = useSelector(selectItems);

    const dispatch  = useAppDispatch();

    //const MAX_RATING: number = 5;
    //const MIN_RATING: number = 1;

    const ratingRange: number = Math.floor(rating.rate)// * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING    
    const hasPrime: boolean = ratingRange < 3

    const product: Product = {
        id, 
        title, 
        price, 
        description, 
        category,
        image, 
        rating, 
        hasPrime
    };


    const addItemToBasket = (): void => {

        const isProductChosenAlready: Product = items.find((item: Product) => item.id === id)
        if (isProductChosenAlready?.id) {
            cogoToast.warn('Product already added to basket!')
            return
        }

        if (Object.keys(product).length) {
            dispatch(addToBasket(product))
            cogoToast.success('Product added!')
        }
    };

    return (
        <div className="relative flex flex-col m-4 bg-white z-30 p-10">
        <p className="absolute top-2 right-2 text-xs italic text-gray-400">{category}</p>

        <Image onClick = {() => router.replace(`/productdetail?product=${product}`)} src={image} height={200} width={200} style={{objectFit:"contain"}} alt={`product ${id}`} />

        <h4 className="my-3 font-bold">{title}</h4>

        <div className="flex">
            {[...Array(ratingRange).keys()].map((_, i) => (
                <StarIcon key={i} className="h-dd text-yellow-500" />                
            ))}           
        </div>

        <p className="text-ss mt-2 my-2 line-clamp-2">{description}</p>

        <div className="mb-5 font-bold">
            <Currency quantity={price} currency="GBP" />
        </div>    

        {hasPrime && 
            <div className="flex items-center space-x-2 -mt-5">
                <img src="/prime.png"  className="w-12" />
                <p className="text-xs text-gray-500">FREE Next-Day Delivery</p>
            </div>
        } 

        <button onClick={addItemToBasket} className="mt-auto button">Add to Basket</button>

    </div>
       
    )
}


export default Product