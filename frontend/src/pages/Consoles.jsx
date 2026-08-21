import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import useProducts from '../hooks/useProducts';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

const Consoles = () => {
    const { token } = useContext(AuthContext);
    const { data: consoles, isLoading, error } = useProducts('/api/consoles/get-console');
    
    const [search, setSearch] = useState('');
    const [brandFilter, setBrandFilter] = useState('all');
    const [sort, setSort] = useState('');
    
    const navigate = useNavigate();

    const addToCart = async (consoleItem) => {
        if (!token) {
            toast.error("Please log in to add items to your cart.");
            navigate('/login');
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/cart/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    productId: consoleItem._id,
                    name: `${consoleItem.title} (${consoleItem.variant})`,
                    image: consoleItem.imageUrl,
                    price: consoleItem.price,
                    quantity: 1
                })
            });

            const result = await response.json();
            if (response.ok) {
                toast.success("Console added to cart successfully!");
            } else {
                toast.error(result.msg || "Error adding console to cart.");
            }
        } catch (error) {
            console.error("Cart Error:", error);
            toast.error("Something went wrong.");
        }
    };

    let displayedConsoles = [...consoles];

    if (search) {
        displayedConsoles = displayedConsoles.filter(c => c.title.toLowerCase().includes(search.toLowerCase()));
    }
    if (brandFilter !== 'all') {
        displayedConsoles = displayedConsoles.filter(c => c.brand === brandFilter);
    }
    if (sort === 'asc') {
        displayedConsoles.sort((a, b) => a.price - b.price);
    } else if (sort === 'desc') {
        displayedConsoles.sort((a, b) => b.price - a.price);
    }

    return (
        <div className="min-h-screen py-8 px-4 font-rajdhani">
            <div className="flex flex-wrap justify-center gap-4 p-4 bg-[#1c1c1c] border-b-2 border-gs-red mb-8 rounded-lg max-w-[1200px] mx-auto">
                <input 
                    type="text" 
                    placeholder="Search consoles..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="p-2.5 text-base border-none rounded-md bg-[#333] text-white outline-none focus:ring-1 focus:ring-gs-red w-full sm:w-auto"
                />
                <select 
                    value={brandFilter} 
                    onChange={(e) => setBrandFilter(e.target.value)}
                    className="p-2.5 text-base border-none rounded-md bg-[#333] text-white outline-none cursor-pointer w-full sm:w-auto"
                >
                    <option value="all">All Brands</option>
                    <option value="Sony">Sony</option>
                    <option value="Microsoft">Microsoft</option>
                    <option value="Nintendo">Nintendo</option>
                </select>
                <select 
                    value={sort} 
                    onChange={(e) => setSort(e.target.value)}
                    className="p-2.5 text-base border-none rounded-md bg-[#333] text-white outline-none cursor-pointer w-full sm:w-auto"
                >
                    <option value="">Sort by Price</option>
                    <option value="asc">Price: Low to High</option>
                    <option value="desc">Price: High to Low</option>
                </select>
            </div>

            <h1 className="text-center text-3xl font-bold text-white mb-8">Available Consoles</h1>

            {error && <p className="text-center text-gs-red text-xl">{error}</p>}

            <div className="flex flex-wrap gap-5 justify-center max-w-[1200px] mx-auto">
                {isLoading ? (
                    <Loader text="Loading Consoles..." />
                ) : displayedConsoles.length > 0 ? (
                    displayedConsoles.map((consoleItem) => (
                        <div key={consoleItem._id} className="bg-[#1a1a1a] text-white rounded-xl p-3 w-full md:w-[240px] shadow-[0_4px_10px_rgba(0,0,0,0.4)] text-left md:text-center transition-transform duration-200 hover:-translate-y-1.5 flex flex-row md:flex-col">
                            <div className="shrink-0 w-[120px] md:w-full mr-4 md:mr-0 md:mb-3">
                                <img src={consoleItem.imageUrl} alt={consoleItem.title} className="w-full h-[140px] md:h-[180px] object-contain bg-white p-2 rounded-md" />
                            </div>
                            
                            <div className="flex flex-col flex-grow">
                                <h3 className="text-lg font-bold mb-1 leading-tight md:leading-normal">{consoleItem.title}</h3>
                                <p className="text-xs md:text-sm text-gray-400 my-0.5 md:my-1">Variant: {consoleItem.variant}</p>
                                <p className="text-xs md:text-sm text-gray-400 my-0.5 md:my-1">Brand: {consoleItem.brand}</p>
                                <p className="text-sm md:text-base font-semibold my-0.5 md:my-1">Price: ₹{consoleItem.price}</p>
                                <p className="text-xs md:text-sm text-gray-400 mb-3 md:mb-4">In stock: {consoleItem.stock}</p>
                                
                                <button 
                                    onClick={() => addToCart(consoleItem)}
                                    className="mt-auto bg-gs-red text-white py-2 rounded-md font-bold text-sm md:text-base hover:bg-[#b00610] transition-colors"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-white text-xl">No consoles found matching your criteria.</p>
                )}
            </div>
        </div>
    );
};

export default Consoles;