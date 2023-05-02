import React from 'react'
import Image from 'next/image'
import {
    Bars3Icon,
    MagnifyingGlassIcon,
    ShoppingCartIcon,
} from "@heroicons/react/24/outline"
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { selectItems } from '../slices/basketSlice'

function Header() {

    const { data: session } = useSession()
    const router = useRouter()
    const items = useSelector(selectItems)

    return (
        <header>

            {/* Top Nav  */}
            <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
                <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
                    <Image src='https://links.papareact.com/f90'
                        width={150}
                        height={40}
                        objectFit="contain"
                        className='cursor-pointer'
                        onClick={() => router.push("/")}
                    />
                </div>

                {/* Search  */}
                <div className="flex-grow hidden sm:flex items-center h-10 rounded-md bg-yellow-400 hover:bg-yellow-500 cursor-pointer">
                    <input type="text" className='p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4' />
                    <MagnifyingGlassIcon className="h-12 p-4" />
                </div>

                {/* Right  */}
                <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
                    <div onClick={!session ? signIn : signOut} className="link">
                        <p>{session ? `Hello, ${session.user.name}` : "Sign In"}</p>
                        <p className='font-bold md:text-sm'>Account &#38; Lists</p>
                    </div>

                    <div onClick={() => router.push('/orders')} className="link">
                        <p>Returns</p>
                        <p className='font-bold md:text-sm'>&#38; Orders</p>
                    </div>

                    <div className="link relative flex items-center" onClick={() => router.push("/checkout")}>
                        <div className="relative">
                            <span className='absolute top-0 right-0 h-4 w-4 bg-yellow-400 rounded-full text-center text-black font-bold'>{items.length}</span>
                            <ShoppingCartIcon className='h-10' />
                        </div>
                        <p className='font-bold md:text-sm hidden md:inline mt-2'>Basket</p>
                    </div>
                </div>
            </div>

            {/* Bottom Nav  */}
            <div className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
                <p className='link flex items-center'>
                    <Bars3Icon className="h-6 mr-1" />
                    All
                </p>
                <p className='link'>Prime Video</p>
                <p className='link'>Amazone Business</p>
                <p className='link'>Today&#39;s Deals</p>
                <p className='link hidden lg:inline-flex'>Electronics</p>
                <p className='link hidden lg:inline-flex'>Food &#38; Grocery</p>
                <p className='link hidden lg:inline-flex'>Prime</p>
                <p className='link hidden lg:inline-flex'>Buy Again</p>
                <p className='link hidden lg:inline-flex'>Shopper Toolkit</p>
                <p className='link hidden lg:inline-flex'>Health &#38; Personal Care</p>
            </div>
        </header>
    )
}

export default Header