import { StarIcon } from "@heroicons/react/24/solid";
import Image from 'next/image'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../components/Header'
import { addToBasket, removeFromBasket, selectItems, selectTotal } from '../slices/basketSlice'
import Currency from 'react-currency-formatter';
import { useSession } from "next-auth/react";
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios'

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

function Checkout() {
    const items = useSelector(selectItems)
    const { data: session } = useSession()
    const total = useSelector(selectTotal)

    React.useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get('canceled')) {
            console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
        }
    }, []);

    const createCheckoutSession = async () => {
        const stripe = await stripePromise

        const checkoutSession = await axios.post(
            '/api/checkout-stripe',
            { items: items, email: session.user.email }
        )

        console.log(checkoutSession)

        const res = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id,
        })
    }

    const CheckoutProduct = ({ item }) => {
        const { id, title, price, description, category, image, rating, hasPrime } = item

        const { rate, count } = rating
        const dispatch = useDispatch()

        const addItemToBasket = () => {
            dispatch(addToBasket(item))
        }

        const removeItemFromBasket = () => {
            dispatch(removeFromBasket({ id }))
        }

        return (
            <div className="grid grid-cols-5">
                <Image src={image} height={200} width={200} objectFit="contain" />

                <div className="col-span-3 mx-5">
                    <p>{title}</p>
                    <div className="flex items-center space-x-1">
                        {
                            Array(Math.round(rate)).fill().map((_, i) => {
                                return <StarIcon className='h-5 text-yellow-500' key={i} />
                            })
                        }
                        <p>{count}</p>
                    </div>

                    <p className='text-xs my-2 line-clamp-3'>{description}</p>
                    <Currency quantity={price} currency="INR" />

                    {
                        hasPrime && (
                            <div className="flex items-center space-x-2">
                                <Image src="https://links.papareact.com/fdw" alt="prime" height={48} width={48} loading="lazy" />
                                <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
                            </div>
                        )
                    }
                </div>

                <div className="flex flex-col space-y-2 my-auto justify-self-end">
                    <button className="button mt-auto" onClick={addItemToBasket}>Add to Basket</button>
                    <button onClick={removeItemFromBasket} className="button mt-auto">Remove from Basket</button>
                </div>
            </div>
        )
    }

    return (
        <div className='bg-gray-100'>
            <Header />

            <main className='lg:flex max-w-screen-2xl mx-auto'>
                <div className="flex flex-col p-5 space-y-10 bg-white">
                    <div className="flex-grow m-5 shadow-sm">
                        <Image src="https://links.papareact.com/ikj"
                            width={1020}
                            height={250}
                            objectFit="contain"
                        />
                    </div>

                    <h1 className='text-3xl border-b pb-4'>{items.length > 0 ? "Your shopping basket" : "Your shopping basket is empty"}</h1>

                    {
                        items?.map((item, idx) => {
                            return <CheckoutProduct key={idx} item={item} />
                        })
                    }
                </div>

                <div className="flex flex-col bg-white p-10 shadow-md">
                    {
                        items?.length > 0 && (
                            <div className="">
                                <h2 className="whitespace-nowrap">Subtotal {items.length} items:
                                    <span className="font-bold ml-1">
                                        <Currency quantity={total} currency="INR" />
                                    </span>
                                </h2>

                                <button onClick={createCheckoutSession} role="link" disabled={!session} className={`button mt-2 ${!session && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'}`}>
                                    {
                                        !session ? 'Sign in to checkout' : 'Proceed to checkout'
                                    }
                                </button>
                            </div>
                        )
                    }
                </div>
            </main>
        </div>
    )
}

export default Checkout