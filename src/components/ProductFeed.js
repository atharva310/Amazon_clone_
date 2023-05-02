import Image from 'next/image'
import React, { useState } from 'react'
import { StarIcon } from "@heroicons/react/24/solid";
import Currency from 'react-currency-formatter';
import { useDispatch } from 'react-redux';
import { addToBasket } from '../slices/basketSlice';

const Product = ({ product }) => {
    const { id, title, price, description, category, image, rating } = product

    const { rate, count } = rating

    const [hasPrime] = useState(Math.random() < 0.5)
    const dispatch = useDispatch()

    const addItemToBasket = () => {
        dispatch(addToBasket({ ...product, hasPrime }))
    }

    return (
        <div className="relative flex-col flex m-5 z-30 p-10 bg-white" key={id}>
            <p className='absolute top-2 right-2 text-xs italic text-gray-400'>{category}</p>
            <Image src={image} height={200} width={200} objectFit="cover" />
            <h4>{title}</h4>
            <div className="flex items-center space-x-1">
                {
                    Array(Math.round(rate)).fill().map((_, i) => {
                        return <StarIcon className='h-5 text-yellow-500' key={i} />
                    })
                }
                <p>{count}</p>
            </div>
            <p className='text-xs my-2 line-clamp-2'>{description}</p>

            <div className="mb-5">
                <Currency quantity={price} currency="INR" />
            </div>

            {
                hasPrime && (
                    <div className="flex items-center space-x-2 -mt-5">
                        <Image src="https://links.papareact.com/fdw" alt="prime" height={48} width={48} />
                        <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
                    </div>
                )
            }

            <button onClick={addItemToBasket} className='mt-auto button'>Add to basket</button>
        </div>
    )
}

function ProductFeed({ products }) {
    return (
        <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-40 mx-auto'>
            {
                products?.slice(0, 4).map((product, idx) => {
                    return (
                        <Product product={product} key={idx} />
                    )
                })
            }

            <div className="relative w-full h-52 md:col-span-full">
                <Image className='' src='https://links.papareact.com/dyz' alt="add" layout='fill' />
            </div>

            <div className="md:col-span-2">
                {
                    products?.slice(4, 5).map((product, idx) => {
                        return (
                            <Product product={product} key={idx} />
                        )
                    })
                }
            </div>

            {
                products?.slice(5, products.length).map((product, idx) => {
                    return (
                        <Product product={product} key={idx} />
                    )
                })
            }
        </div>
    )
}

export default ProductFeed