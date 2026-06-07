import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
    const [cartItems, setCartItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchCartItems = async () => {
        const token = localStorage.getItem("token")

        if (!token) {
            setIsLoading(false)
            return
        }

        try {
            const res = await fetch("http://localhost:8080/api/cart", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const data = await res.json()
            
            if (res.ok) {
                setCartItems(data.items || [])
            }
        } catch (err) {
            console.error("Cart fetch error:", err)
        } finally {
            setIsLoading(false)
        }
    };

    useEffect(() => {
        fetchCartItems()
    }, []);

    const removeItem = async (productId) => {
        const token = localStorage.getItem("token")
        try {
            const res = await fetch(`http://localhost:8080/api/cart/remove/${productId}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });
            
            if (res.ok) {
                setCartItems(prev => prev.filter(item => item.productId !== productId))
            } else {
                alert("Failed to remove item.")
            }
        } catch (err) {
            console.error("Remove error:", err)
            alert("Failed to remove item.")
        }
    };

    const totalAmount = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    const token = localStorage.getItem("token")

    if (isLoading) {
        return (
            <div className="fixed inset-0 bg-[#0f0f0f] z-50 flex flex-col justify-center items-center font-rajdhani">
                <div className="w-12 h-12 border-4 border-[#333] border-t-gs-red rounded-full animate-spin mb-4"></div>
                <p className="text-white text-xl">Loading Cart...</p>
            </div>
        );
    }

    if (!token) {
        return (
            <div className="min-h-[60vh] flex flex-col justify-center items-center font-rajdhani text-white">
                <h2 className="text-2xl font-bold mb-4">You are not logged in</h2>
                <Link to="/login" className="bg-gs-red px-6 py-2 rounded font-bold hover:bg-[#b00610] transition-colors">Log In to View Cart</Link>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-100px)] py-10 px-5 flex justify-center items-start font-rajdhani">
            <div className="w-full max-w-[800px] bg-[#1a1a1a] text-white p-10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] border border-[#333]">
                
                <h2 className="text-3xl font-bold mb-8 text-center uppercase tracking-wide border-b-2 border-gs-red pb-4 inline-block w-full">
                    Your Shopping Cart
                </h2>

                {cartItems.length === 0 ? (
                    <p className="text-center text-gray-400 text-xl py-10">Your cart is empty.</p>
                ) : (
                    <div className="flex flex-col gap-5">
                        {cartItems.map((item) => (
                            <div key={item.productId} className="flex flex-col md:flex-row items-center gap-5 py-5 border-b border-[#333] transition-colors hover:bg-[#222]">
                                <img src={item.image} alt={item.name} className="w-[100px] h-[100px] object-contain bg-white rounded-lg p-1" />
                                
                                <div className="flex-grow text-center md:text-left">
                                    <h3 className="text-2xl mb-2">{item.name}</h3>
                                    <p className="text-gray-400 text-base my-1">Price: ₹{item.price}</p>
                                    <p className="text-gray-400 text-base my-1">Quantity: {item.quantity}</p>
                                </div>

                                <button 
                                    onClick={() => removeItem(item.productId)}
                                    className="bg-transparent text-gs-red border border-gs-red px-4 py-2 rounded-md font-bold hover:bg-gs-red hover:text-white hover:shadow-[0_0_10px_rgba(229,9,20,0.5)] transition-all duration-300"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}

                        <div className="mt-8 pt-5 border-t-2 border-dashed border-[#444] flex flex-col md:items-end gap-5 text-center md:text-left">
                            <div className="text-3xl font-bold">
                                Total: <span className="text-gs-red">₹{totalAmount.toFixed(2)}</span>
                            </div>
                            <button className="w-full md:w-auto bg-gs-red text-white py-3 px-10 text-lg font-bold rounded-lg uppercase tracking-wide hover:bg-[#b00610] hover:-translate-y-1 hover:shadow-[0_6px_15px_rgba(229,9,20,0.4)] transition-all duration-300">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart