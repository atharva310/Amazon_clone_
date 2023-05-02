import { getSession, useSession } from 'next-auth/react'
import React from 'react'
import db from '../../firebase'
import Header from '../components/Header'
import moment from 'moment'
import Currency from 'react-currency-formatter'
import Image from 'next/image'
import { collection, getDocs } from 'firebase/firestore'

function Orders({ orders }) {
    const { data: session } = useSession()

    const Order = ({ order }) => {
        const { id, amountShipping, items, timeStamp, images, amount } = order
        return (
            <div key={id} className="relative border rounded-md">
                <div className="flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600">
                    <div className="">
                        <p className='font-bold text-xs'>ORDER PLACED</p>
                        <p>{moment.unix(timeStamp).format('DD MMM YYYY')}</p>
                    </div>

                    <div className="">
                        <p className='font-bold text-xs'>TOTAL</p>
                        <p>
                            <Currency quantity={amount} currency="INR" /> - Next Day Delivery{" "}
                            <Currency quantity={amountShipping} currency="INR" />
                        </p>
                    </div>

                    <p className='text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500'>{items.length}</p>

                    <p className='absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap'>ORDER #{id}</p>
                </div>

                <div className="p-5 sm:p-10">
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                        {
                            images.map((img, idx) => {
                                return <Image src={img} key={idx} alt={`Order ${id} Image - ${idx}`} objectFit="cover" height={200} width={200} />
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div>
            <Header />
            <main className='max-w-screen-lg bg-gray-100 mx-auto p-10'>
                <h1 className='text-3xl border-b mb-2 pb-1 border-yellow-400'>Your Orders</h1>

                {
                    session ? (
                        <h2>{orders?.length} Orders</h2>
                    ) : (
                        <h2>Please sign in to see your orders</h2>
                    )
                }

                <div className="mt-5 space-y-4">
                    {
                        orders?.map((order, idx) => {
                            return <Order order={order} key={idx} />
                        })
                    }
                </div>
            </main>
        </div>
    )
}

export default Orders

export async function getServerSideProps(context) {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
    // Get users logged in credentials 
    const session = await getSession(context)

    if (!session) {
        return {
            props: {}
        }
    }

    // From Firestore 
    const userCollection = collection(db, "users", session.user.email, "orders")
    const stripeOrders = await getDocs(userCollection)

    // Stripe Orders 
    const orders = await Promise.all(
        stripeOrders.docs.map(async (order) => ({
            id: order.id,
            amount: order.data().amount,
            amountShipping: order.data().ammount_shipping,
            images: order.data().images,
            timestamp: moment(order.data().timestamp.toDate()).unix(),
            items: (
                await stripe.checkout.sessions.listLineItems(order.id, {
                    limit: 100
                })
            ).data
        }))
    )

    return {
        props: {
            orders,
        }
    }
}