import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

const Cart = () => {
    const { token } = useContext(AuthContext);
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchCartItems = async () => {
        if (!token) return;

        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/cart`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const data = await res.json();
            
            if (res.ok) {
                setCartItems(data.items || []);
            }
        } catch (err) {
            console.error("Cart fetch error:", err);
            toast.error("Failed to load cart.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, [token]);

    const removeItem = async (productId) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/cart/remove/${productId}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });
            
            if (res.ok) {
                setCartItems(prev => prev.filter(item => item.productId !== productId));
                toast.success("Item removed from cart");
            } else {
                toast.error("Failed to remove item.");
            }
        } catch (err) {
            console.error("Remove error:", err);
            toast.error("Failed to remove item.");
        }
    };

    const totalAmount = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <div className="min-h-[calc(100vh-100px)] py-10 px-5 flex justify-center items-start font-rajdhani">
            <div className="w-full max-w-[800px] bg-[#1a1a1a] text-white p-10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] border border-[#333]">
                
                <h2 className="text-3xl font-bold mb-8 text-center uppercase tracking-wide border-b-2 border-gs-red pb-4 inline-block w-full">
                    Your Shopping Cart
                </h2>

                {isLoading ? (
                    <Loader text="Loading Cart Items..." />
                ) : cartItems.length === 0 ? (
                    <p className="text-center text-gray-400 text-xl py-10">Your cart is empty.</p>
                ) : (
                    <div className="flex flex-col gap-5">
                        {cartItems.map((item) => (
                            <div key={item.productId} className="flex flex-col md:flex-row items-center gap-5 py-5 border-b border-[#333] transition-colors">
                                <img src={item.image} alt={item.name} className="w-[100px] h-[100px] object-contain bg-white rounded-lg p-1" />
                                
                                <div className="flex-grow text-center md:text-left">
                                    <h3 className="text-2xl mb-2">{item.name}</h3>
                                    <p className="text-gray-400 text-base my-1">Price: ₹{item.price}</p>
                                    <p className="text-gray-400 text-base my-1">Quantity: {item.quantity}</p>
                                </div>

                                <button 
                                    onClick={() => removeItem(item.productId)}
                                    className="bg-transparent text-gs-red border border-gs-red px-4 py-2 rounded-md font-bold hover:bg-gs-red hover:text-white cursor-pointer hover:shadow-[0_0_10px_rgba(229,9,20,0.5)] transition-all duration-300"
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

export default Cart;