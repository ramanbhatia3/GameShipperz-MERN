import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Games = () => {
    const [games, setGames] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    
    const [search, setSearch] = useState('')
    const [platform, setPlatform] = useState('all')
    const [sort, setSort] = useState('')
    
    const navigate = useNavigate()

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const res = await fetch("http://localhost:8080/api/games/get-games");
                const result = await res.json()
                
                if (res.ok) {
                    setGames(result.data)
                } else {
                    setError("Failed to load games.")
                }
            } catch (err) {
                console.error("Fetch error:", err)
                setError("Network error occurred.")
            } finally {
                setIsLoading(false)
            }
        };

        fetchGames()
    }, []);

    const addToCart = async (game) => {
        const token = localStorage.getItem("token")
        
        if (!token) {
            alert("Please log in to add items to your cart.")
            navigate('/login')
            return
        }

        try {
            const response = await fetch("http://localhost:8080/api/cart/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    productId: game._id,
                    name: game.title,
                    image: game.imageUrl,
                    price: game.price,
                    quantity: 1
                })
            })

            const result = await response.json()
            if (response.ok) {
                alert("Game added to cart successfully!")
            } else {
                alert(result.msg || "Error adding game to cart.")
            }
        } catch (error) {
            console.error("Cart Error:", error)
            alert("Something went wrong.")
        }
    };

    let displayedGames = [...games];

    if (search) {
        displayedGames = displayedGames.filter(g => g.title.toLowerCase().includes(search.toLowerCase()))
    }
    if (platform !== 'all') {
        displayedGames = displayedGames.filter(g => g.platform === platform)
    }
    if (sort === 'asc') {
        displayedGames.sort((a, b) => a.price - b.price)
    } else if (sort === 'desc') {
        displayedGames.sort((a, b) => b.price - a.price)
    }

    if (isLoading) {
        return (
            <div className="fixed inset-0 bg-[#0f0f0f] z-50 flex flex-col justify-center items-center font-rajdhani">
                <div className="w-12 h-12 border-4 border-[#333] border-t-gs-red rounded-full animate-spin mb-4"></div>
                <p className="text-white text-xl">Loading Games...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8 px-4 font-rajdhani">

            <div className="flex flex-wrap justify-center gap-4 p-4 bg-[#1c1c1c] border-b-2 border-gs-red mb-8 rounded-lg max-w-[1200px] mx-auto">
                <input 
                    type="text" 
                    placeholder="Search by title..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="p-2.5 text-base border-none rounded-md bg-[#333] text-white outline-none focus:ring-1 focus:ring-gs-red w-full sm:w-auto"
                />
                <select 
                    value={platform} 
                    onChange={(e) => setPlatform(e.target.value)}
                    className="p-2.5 text-base border-none rounded-md bg-[#333] text-white outline-none cursor-pointer w-full sm:w-auto"
                >
                    <option value="all">All Platforms</option>
                    <option value="PS5">PS5</option>
                    <option value="PS4">PS4</option>
                    <option value="PS3">PS3</option>
                    <option value="Xbox One">Xbox One</option>
                    <option value="Nintendo Switch">Nintendo Switch</option>
                </select>
                <select 
                    value={sort} 
                    onChange={(e) => setSort(e.target.value)}
                    className="p-2.5 text-base border-none rounded-md bg-[#333] text-white outline-none cursor-pointer w-full sm:w-auto"
                >
                    <option value="">Sort by</option>
                    <option value="asc">Price: Low to High</option>
                    <option value="desc">Price: High to Low</option>
                </select>
            </div>

            <h1 className="text-center text-3xl font-bold text-white mb-8">Available Games</h1>

            {error && <p className="text-center text-gs-red text-xl">{error}</p>}

            <div className="flex flex-wrap gap-5 justify-center max-w-[1200px] mx-auto">
                {displayedGames.length > 0 ? (
                    displayedGames.map((game) => (
                        <div 
                            key={game._id}
                            className="bg-[#1a1a1a] text-white rounded-xl p-3 w-full md:w-[240px] shadow-[0_4px_10px_rgba(0,0,0,0.4)] text-left md:text-center transition-transform duration-200 hover:-translate-y-1.5 flex flex-row md:flex-col"
                        >
                            <div className="shrink-0 w-[120px] md:w-full mr-4 md:mr-0 md:mb-3">
                                <img 
                                    src={game.imageUrl} 
                                    alt={game.title} 
                                    className="w-full h-[140px] md:h-[180px] object-contain bg-white p-2 rounded-md" 
                                />
                            </div>
                            
                            <div className="flex flex-col flex-grow">
                                <h3 className="text-lg font-bold mb-1 leading-tight md:leading-normal">{game.title}</h3>
                                <p className="text-xs md:text-sm text-gray-400 my-0.5 md:my-1">Platform: {game.platform}</p>
                                <p className="text-xs md:text-sm text-gray-400 my-0.5 md:my-1">Genre: {game.genre}</p>
                                <p className="text-sm md:text-base font-semibold my-0.5 md:my-1">Price: ₹{game.price}</p>
                                <p className="text-xs md:text-sm text-gray-400 mb-3 md:mb-4">In stock: {game.stock}</p>
                                
                                <button 
                                    onClick={() => addToCart(game)}
                                    className="mt-auto bg-gs-red text-white py-2 rounded-md font-bold text-sm md:text-base hover:bg-[#b00610] transition-colors"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-white text-xl">No games found matching your criteria.</p>
                )}
            </div>
        </div>
    );
};

export default Games;