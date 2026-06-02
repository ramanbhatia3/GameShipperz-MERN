const Hero = () => {
    const featuresData = [
        {
            title: "Fast & Secure Delivery",
            description: "Get your gear quickly and safely with our trusted courier partners."
        },
        {
            title: "Certified Refurbished",
            description: "Save more with expertly tested and certified pre-owned products."
        },
        {
            title: "Mini Articles & News",
            description: "Stay updated with latest releases, reviews, and gaming tips."
        }
    ];

    return (
        <main className="font-rajdhani">
            <section className="text-center py-20 px-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-5 text-white">
                    Welcome to GameShipperz
                </h1>
                <p className="text-md md:text-lg font-semibold leading-relaxed max-w-[800px] mx-auto text-gray-300">
                    Your ultimate gaming destination — explore the latest consoles, legendary handhelds, 
                    powerful gaming PCs, and must-have games. Whether you're chasing frames, nostalgia, 
                    or the next big adventure, GameShipperz delivers quality, speed, and passion with every click.
                </p>
            </section>

            <section className="flex flex-wrap justify-center gap-8 mb-12 px-4">
                {
                    featuresData.map((feature, index) => (
                        <div key={index} className="bg-[#1a1a1a] rounded-xl p-6 w-[250px] text-center shadow-[0_0_10px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:-translate-y-1.5">
                            <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                            <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                        </div>
                    ))
                }
            </section>
        </main>
    )
}

export default Hero