import React from 'react';
import Image from "next/image";
import { StarIcon} from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { NextPage } from 'next'
import {
    incrementProductQuantity, 
    decrementProductQuantity, 
    removeFromBasket
} from "../slices/basketSlice";

import { useAppDispatch } from 'src/app/store';
import { Product } from 'src/app/types'


const CheckoutProduct: NextPage<Product> = ({
    id, 
    title, 
    price, 
    rating, 
    description, 
    category, 
    image, 
    hasPrime, 
    quantity,
    total
}) => {
    const dispatch = useAppDispatch();
        
    const product: Product = {
        id, 
        title, 
        price,
        rating, 
        description, 
        category, 
        image, 
        hasPrime, 
        quantity,
        total
    }

    //const total: number = price * quantity;

    const addItemQuantity = (): void => {
        dispatch(incrementProductQuantity(product));
    }

    const minusItemQuantity = (): void => {
        dispatch(decrementProductQuantity(product));
    }

    function removeItemFromBasket(): void {
        dispatch(removeFromBasket(product));
    }

    return (
        <div className="checkout-product">
            <img src={image} height={170} width={170} style={{objectFit:"contain"}} className="mx-2" />

            <div className="checkout-product-middle ">
                <p className="font-bold">{`${title}-${rating.rate}`}</p>
                <div className="flex mt-2">
                    {[...Array(Math.floor(rating.rate))].map((_,i) => (
                        <StarIcon className="h-dd text-yellow-500" key={i} />
                    ))}
                </div>

                <p className="text-sm mt-2 my-2 line-clamp-3">{description}</p>

                <div className="font-semibold">
                    {`${price} x ${quantity} = `}
                    <Currency quantity={total} currency="GBP" />
                </div>


                {hasPrime && (
                    <div className="flex items-center space-x-2">
                        <img src="./prime.png"  className="w-12" />
                        <p className="text-xs text-gray-500">FREE Next-Day Delivery</p>
                    </div>
                )}
            </div>

            {/* Right Add and Remove button
            <div className="flex flex-col space-y-2 my-auto justify-self-end ">
                    <button className="button font-semibold" onClick={addItemToBasket}>Add to Basket</button>
                    <button className="button font-semibold" onClick={removeItemFromBasket}>Remove from Basket</button>
            </div> */}


            {/* Buttons on the right of the products */}
            <div className="flex flex-col space-y-2 my-auto justify-self-end">
                <div className="flex justify-between xs:justify-start">
                    <button
                        className="button minus-button"
                        onClick={minusItemQuantity}>
                        {/* <MinusSmIcon className="h-5 text-black" /> */}
                        <div className="minus-button-sm font-extrabold">-</div>
                    </button>
                    <div className="p-2 whitespace-normal sm:p-1 sm:whitespace-nowrap">
                        Quantity: <span className="font-bold">{quantity}</span>
                    </div>
                    <button className="button minus-button" onClick={addItemQuantity}>
                        <div className="minus-button font-extrabold">+</div>
                    </button>
                </div>
                <button className="button" onClick={removeItemFromBasket}>
                    Remove from Basket
                </button>
            </div>

        </div>
    )
}

export default CheckoutProduct
