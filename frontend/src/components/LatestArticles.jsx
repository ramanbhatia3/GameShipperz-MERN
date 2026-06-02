import { Link } from 'react-router-dom'

const LatestArticles = () => {
    const articlesData = [
        { id: 1, title: "Is GTA San Andreas the Best GTA Game?", image: "/images/gtaSA.jpg" },
        { id: 2, title: "Is It Worth Buying a PS5 in 2025?", image: "/images/ps5.jpeg" },
        { id: 3, title: "Know About the God of War Franchise", image: "/images/godOfWar.webp" },
        { id: 4, title: "Facts You Should Know About Gaming", image: "/images/gamingFacts.jpg" },
    ];

    return (
        <section className="bg-[#111] text-white py-10 px-5 font-rajdhani border-t border-[#222]">
            <h2 className="text-3xl md:text-4xl text-center font-bold mb-8">Latest Articles</h2>
            
            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5 max-w-[1100px] mx-auto">
                {articlesData.map((article) => (
                    <Link key={article.id} to="/articles" className="relative min-h-[135px] min-w-[240px] rounded-xl overflow-hidden shadow-[0_0_10px_rgba(0,0,0,0.3)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.9),0_0_40px_rgba(255,255,255,0.6)] group block">
                        <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105 group-hover:brightness-110" />

                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-4 text-lg font-bold opacity-0 translate-y-full transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                            {article.title}
                        </div>
                    </Link>
                ))}
            </div>

            <div className="text-center mt-10">
                <Link to="/articles" className="inline-block bg-white text-black py-3 px-6 rounded-xl font-bold shadow-[0_0_12px_rgba(255,255,255,0.6)] hover:bg-[#e0e0e0] hover:shadow-[0_0_20px_rgba(255,255,255,0.9)] transition-all duration-300">Explore More</Link>
            </div>
        </section>
    );
};

export default LatestArticles