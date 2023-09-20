import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import ProductDetails from './ProductDetails'
import { EURO_CURRENCY } from '../utils/constants'
import { removeFromCart, increaseProductQuantity, decreaseProductQuantity } from '../features/cart/cartSlice'

const Checkout = () => {

    const dispatch = useDispatch()

    const { products, productsNumber } = useSelector(state => state.cart)
    const subtotal = useSelector(state => state.cart.products.reduce((subtotal, product) => (
        subtotal + product.price * product.quantity
    ), 0))

    return (
        <div className='h-screen bg-amazonclone-background'>
            <div className='min-w-[1000px] max-w-[1500px] m-auto pt-8'>
                <div className='grid grid-cols-8 gap-10'>
                    {/* Products */}
                    <div className="col-span-6 bg-white">
                        <div className="text-2xl xl:text-3xl m-4">Shopping Cart</div>
                        {products.map((product) => (
                            <div key={product.id}>
                                <div className='grid grid-cols-12 divide-y divide-gray-400 mr-4'>
                                    <div className='col-span-10 grid grid-cols-8 divide-y divide-gray-400'>
                                        <div className="col-span-2">
                                            <Link to={`/product/${product.id}`}>
                                                <img src={product.image_small} className='p-4 m-auto' />
                                            </Link>
                                        </div>
                                        <div className="col-span-6">
                                            <div className="font-medium text-black mt-2">
                                                <Link to={`/product/${product.id}`}>
                                                    <ProductDetails product={product} ratings={false} />
                                                </Link>
                                            </div>
                                            <div>
                                                <button onClick={() => dispatch(removeFromCart(product.id))} className='text-sm xl:text-base font-semibold rounded
                                                text-blue-500 mt-2 mb-1'>Delete</button>
                                            </div>
                                            <div className='grid grid-cols-3 w-20 text-center'>
                                                <div onClick={() => dispatch(decreaseProductQuantity(product.id))} className='text-xl xl:text-2xl bg-gray-400 rounded cursor-pointer'>-</div>
                                                <div className='text-lg xl:text-xl bg-gray-200'>{product.quantity}</div>
                                                <div onClick={() => dispatch(increaseProductQuantity(product.id))} className='text-xl xl:text-2xl bg-gray-400 rounded cursor-pointer'>+</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <div className='text-lg xl:text-xl mt-2 mr-4 font-semibold'>{EURO_CURRENCY.format(product.price)}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className='text-lg xl:text-xl text-right mb-4 mr-4'>Subtotal({productsNumber} items):
                            <span className='font-semibold'> {EURO_CURRENCY.format(subtotal)}</span>
                        </div>
                    </div>
                    {/* Checkout */}
                    <div className="col-span-2 bg-white rounded h-[250px] p-7">
                        <div className='text-xs xl:text-sm text-green-800 mb-2'>Your order qualifies for
                            <span className=' font-bold'> FREE DELIVERY</span>.
                            Delivery Details</div>
                        <div className='text-base xl:text-lg mb-4'>Subtotal({productsNumber} items):
                            <span className='font-semibold'>{EURO_CURRENCY.format(subtotal)}</span>
                        </div>
                        <button className='btn'>Proceed to Checkout</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Checkout