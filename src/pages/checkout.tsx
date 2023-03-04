import React from 'react'
import Image from "next/image";
import { useSelector } from "react-redux";
import Currency from "react-currency-formatter";
import { useSession } from 'next-auth/react';
//import { groupBy } from "lodash";

import CheckoutProduct from "../components/CheckoutProduct";
import { selectItems, selectTotal, selectSubTotal } from '../slices/basketSlice';
import Header from '../components/Header';
import { Product } from 'src/app/types';


function checkout() {

    const items: Product[] = useSelector(selectItems);

    const { data: session } = useSession();

    const total: number = useSelector(selectTotal);
    const subTotal: number = useSelector(selectSubTotal)

    return (
        <div className="bg-gray-100">
           <Header />

           <main className="lg:flex max-w-screen-2xl mx-auto">
               <div className="flex-grow m-5 mt-2 shadow-sm">
                   <Image
                        src="/checkout_banner.png"
                        width = {1020}
                        height ={250}
                        style={{objectFit:"contain"}}
                        alt="checkout_banner"
                   />

                   <div className="flex flex-col p-1 space-y-10 bg-white  ">
                       <h1 className="text-xxl border-b p-2 pl-1 font-bold">
                           {items.length === 0 ? "Your Amazon Basket is empty": "Your Shopping Basket"}
                       </h1>

                       <div className="pl-9 pr-9 ">
                            {
                                items.map((item: Product, i: number) => (
                                    <CheckoutProduct
                                        key={i}
                                        id={item.id}
                                        title={item.title}
                                        rating={item.rating}
                                        price={item.price}
                                        description={item.description}
                                        category={item.category}
                                        image={item.image}
                                        hasPrime={item.hasPrime}
                                        quantity={item.quantity}
                                        total={item.total}
                                    />
                                ))
                            }
                       </div>                  

                    </div>
               </div>


                {/* Right */}
                {items.length > 0 && (
                    <div className="flex flex-col mt-5 bg-white p-10 pt-8 shadow-md">
                    
                        <>
                            <h1 className="font-bold text-xl whitespace-nowrap">Subtotal ({total} items):
                            <span className="font-bold ml-1">
                                <Currency quantity={subTotal} currency="GBP" />
                            </span>
                            </h1>

                            <button className={`button font-semibold mt-2 ${!session && "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"}`}>
                                {!session ? "Sign in to checkout" : "Proceed to checkout"}
                            </button>
                        </>
                    
               </div>
                )}
               
               
           </main>
        </div>
    )
}

export default checkout