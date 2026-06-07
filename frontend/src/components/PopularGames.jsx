import { useRef } from 'react'
import { Link } from 'react-router-dom'

const PopularGames = () => {
    const scrollRef = useRef(null)

    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }

    const gamesData = [
        { id: 1, title: "Spider-Man 2", image: "/images/spiderman2.webp", link: "/articles/spiderman-2" },
        { id: 2, title: "Forza Horizon 5", image: "/images/forza5.jpg", link: "/articles/forza-horizon-5" },
        { id: 3, title: "Cricket 24", image: "/images/cricket24.jpg", link: "/articles/cricket-24" },
        { id: 4, title: "Cyberpunk 2077", image: "/images/cyberpunk2077.png", link: "/articles/cyberpunk-2077" },
        { id: 5, title: "The Last Of Us Part II", image: "/images/thelastofus2.webp", link: "/articles/the-last-of-us-part-ii" },
        { id: 6, title: "Forza Motorsport 8", image: "/images/forzamotorsport8png.png", link: "/articles/forza-motorsport-8" },
    ]

    return (
        <section className='bg-[#111] text-white py-10 px-5 font-rajdhani'>
            <h2 className="text-3xl md:text-4xl text-center font-bold mb-8">Popular Games</h2>

            <div className="flex items-center justify-center max-w-[1200px] mx-auto relative">
                <button onClick={scrollLeft} className='w-[45px] h-[45px] text-xl font-bold bg-gradient-to-br from-[#1f1f1f] to-[#2a2a2a] text-white rounded-xl shadow-[2px_2px_6px_#000,-2px_-2px_6px_#2e2e2e] hover:scale-110 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-200 z-10 shrink-0 mx-2'>&lt;</button>

                <div ref={scrollRef} className="flex gap-5 overflow-x-auto scroll-smooth py-5 px-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {
                        gamesData.map((game) => (
                            <Link key={game.id} to={game.link} className='relative min-h-[135px] min-w-[240px] rounded-xl overflow-hidden shadow-[0_0_10px_rgba(0,0,0,0.3)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.9),0_0_40px_rgba(255,255,255,0.6)] group block'>
                                <img src={game.image} alt={game.title} className='w-full h-full object-cover transition-transform duration-400 group-hover:scale-105 group-hover:brightness-110' />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-4 text-lg font-bold opacity-0 translate-y-full transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">{game.title}</div>
                            </Link>
                        ))
                    }
                </div>

                <button onClick={scrollRight} className='w-[45px] h-[45px] text-xl font-bold bg-gradient-to-br from-[#1f1f1f] to-[#2a2a2a] text-white rounded-xl shadow-[2px_2px_6px_#000,-2px_-2px_6px_#2e2e2e] hover:scale-110 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-200 z-10 shrink-0 mx-2'>&gt;</button>
            </div>
        </section>
    )
}

export default PopularGames