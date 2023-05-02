import React from 'react'
import Header from '../components/Header'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'

function Success() {
    const router = useRouter()
    return (
        <div className='bg-gray-100 h-screen'>
            <Header />

            <main className='max-w-screen-lg mx-auto'>
                <div className="flex flex-col p-10 bg-white">
                    <div className="flex items-center space-x-2 mb-5">
                        <CheckCircleIcon className='text-green-500 h-10' />
                        <h1 className='text-3xl'>Thank you your order has been confirmed</h1>
                    </div>
                    <p>
                        Thank you for your purchase from Amazon. Please let us know if we can do anything else for you!
                    </p>

                    <button onClick={() => router.push("/orders")} className='button mt-8'>Go to my orders</button>
                </div>
            </main>
        </div>
    )
}

export default Success