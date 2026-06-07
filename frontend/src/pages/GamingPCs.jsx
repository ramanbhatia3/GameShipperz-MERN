import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GamingPCs = () => {
    const [pcs, setPcs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    
    const [search, setSearch] = useState('');
    const [brandFilter, setBrandFilter] = useState('all');
    const [sort, setSort] = useState('');
    
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPCs = async () => {
            try {
                const res = await fetch("http://localhost:8080/api/pcs/get-pcs");
                const result = await res.json();
                
                if (res.ok) {
                    setPcs(result.data);
                } else {
                    setError("Failed to load gaming PCs.");
                }
            } catch (err) {
                console.error("Fetch error:", err);
                setError("Network error occurred.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchPCs();
    }, []);

    const addToCart = async (pcItem) => {
        const token = localStorage.getItem("token");
        
        if (!token) {
            alert("Please log in to add items to your cart.");
            navigate('/login');
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/cart/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    productId: pcItem._id,
                    name: pcItem.title,
                    image: pcItem.imageUrl,
                    price: pcItem.price,
                    quantity: 1
                })
            });

            const result = await response.json();
            if (response.ok) {
                alert("Gaming PC added to cart successfully!");
            } else {
                alert(result.msg || "Error adding PC to cart.");
            }
        } catch (error) {
            console.error("Cart Error:", error);
            alert("Something went wrong.");
        }
    };

    let displayedPCs = [...pcs];

    if (search) {
        displayedPCs = displayedPCs.filter(pc => pc.title.toLowerCase().includes(search.toLowerCase()));
    }
    if (brandFilter !== 'all') {
        displayedPCs = displayedPCs.filter(pc => pc.brand === brandFilter);
    }
    if (sort === 'asc') {
        displayedPCs.sort((a, b) => a.price - b.price);
    } else if (sort === 'desc') {
        displayedPCs.sort((a, b) => b.price - a.price);
    }

    if (isLoading) {
        return (
            <div className="fixed inset-0 bg-[#0f0f0f] z-50 flex flex-col justify-center items-center font-rajdhani">
                <div className="w-12 h-12 border-4 border-[#333] border-t-gs-red rounded-full animate-spin mb-4"></div>
                <p className="text-white text-xl">Loading Gaming PCs...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8 px-4 font-rajdhani">

            {/* Filtering and Sorting Bar */}
            <div className="flex flex-wrap justify-center gap-4 p-4 bg-[#1c1c1c] border-b-2 border-gs-red mb-8 rounded-lg max-w-[1200px] mx-auto">
                <input 
                    type="text" 
                    placeholder="Search PCs..." 
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
                    <option value="HP">HP</option>
                    <option value="Dell">Dell</option>
                    <option value="Lenovo">Lenovo</option>
                    <option value="ASUS">ASUS</option>
                    <option value="MSI">MSI</option>
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

            <h1 className="text-center text-3xl font-bold text-white mb-8">Available Gaming PCs</h1>

            {error && <p className="text-center text-gs-red text-xl">{error}</p>}

            {/* Responsive PC Grid */}
            <div className="flex flex-wrap gap-5 justify-center max-w-[1200px] mx-auto">
                {displayedPCs.length > 0 ? (
                    displayedPCs.map((pcItem) => (
                        <div key={pcItem._id} className="bg-[#1a1a1a] text-white rounded-xl p-3 w-full md:w-[240px] shadow-[0_4px_10px_rgba(0,0,0,0.4)] text-left md:text-center transition-transform duration-200 hover:-translate-y-1.5 flex flex-row md:flex-col">
                            <div className="shrink-0 w-[120px] md:w-full mr-4 md:mr-0 md:mb-3 flex items-center justify-center bg-white rounded-md p-2">
                                <img src={pcItem.imageUrl} alt={pcItem.title} className="w-full h-[120px] md:h-[160px] object-contain" />
                            </div>
                            
                            <div className="flex flex-col flex-grow">
                                <h3 className="text-lg font-bold mb-1 leading-tight md:leading-normal">{pcItem.title}</h3>
                                <p className="text-xs md:text-sm text-gray-400 my-0.5 md:my-1 line-clamp-2 md:line-clamp-none" title={pcItem.specs}>Specs: {pcItem.specs}</p>
                                <p className="text-xs md:text-sm text-gray-400 my-0.5 md:my-1">Brand: {pcItem.brand}</p>
                                <p className="text-sm md:text-base font-semibold my-0.5 md:my-1">Price: ₹{pcItem.price}</p>
                                <p className="text-xs md:text-sm text-gray-400 mb-3 md:mb-4">In stock: {pcItem.stock}</p>
                                
                                <button 
                                    onClick={() => addToCart(pcItem)}
                                    className="mt-auto bg-gs-red text-white py-2 rounded-md font-bold text-sm md:text-base hover:bg-[#b00610] transition-colors"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-white text-xl">No Gaming PCs found matching your criteria.</p>
                )}
            </div>
        </div>
    );
};

export default GamingPCs;