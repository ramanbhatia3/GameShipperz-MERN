import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="w-full bg-[#0a0a0a] text-gray-400 border-t border-[#333] font-rajdhani pt-12 pb-6 px-6 shadow-[0_-2px_10px_rgba(0,0,0,0.6)]">
            <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
                
                <div>
                    <div className="flex items-center justify-center md:justify-start text-2xl font-bold text-white gap-2 mb-4">
                        <img src="/logo.png" alt="Logo" className="h-[30px] w-[30px] object-contain" />
                        GameShipperz
                    </div>
                    <p className="text-sm leading-relaxed max-w-[300px] mx-auto md:mx-0">
                        Your premier destination for next-gen consoles, high-performance PCs, and the latest gaming titles. 
                        We don't just ship games; we deliver the ultimate gaming experience straight to your doorstep.
                    </p>
                </div>

                <div className="flex flex-col items-center md:items-start">
                    <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
                    <ul className="flex flex-col gap-2">
                        <li><Link to="/articles" className="hover:text-gs-red transition-colors duration-200">Gaming Articles</Link></li>
                        <li><Link to="/consoles" className="hover:text-gs-red transition-colors duration-200">Shop Consoles</Link></li>
                        <li><Link to="/gamingpcs" className="hover:text-gs-red transition-colors duration-200">Shop Gaming PCs</Link></li>
                        <li><Link to="/games" className="hover:text-gs-red transition-colors duration-200">Buy Games</Link></li>
                    </ul>
                </div>

                <div className="flex flex-col items-center md:items-start">
                    <h3 className="text-white text-lg font-bold mb-4">Support</h3>
                    <ul className="flex flex-col gap-2">
                        <li><Link to="/cart" className="hover:text-gs-red transition-colors duration-200">View Cart</Link></li>
                        <li><Link to="/login" className="hover:text-gs-red transition-colors duration-200">My Account</Link></li>
                        <li><span className="hover:text-gs-red cursor-pointer transition-colors duration-200">Shipping Policy</span></li>
                        <li><span className="hover:text-gs-red cursor-pointer transition-colors duration-200">Contact Us</span></li>
                    </ul>
                </div>

            </div>

            <div className="text-center text-sm pt-6 border-t border-[#222]">
                <p>&copy; {new Date().getFullYear()} GameShipperz. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer