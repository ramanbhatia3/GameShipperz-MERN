import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token")

        if (token) {
            setIsAuthenticated(true)
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token")
        setIsAuthenticated(false)
        setIsMenuOpen(false)
        alert("You have been logged out.")
        navigate("/")
    };

    const closeMenu = () => setIsMenuOpen(false)

    return (
        <header className="relative z-50 w-full bg-gs-dark py-4 px-8 shadow-[0_2px_10px_rgba(0,0,0,0.6)] font-rajdhani text-white">
            <div className="flex justify-between items-center">
                <div
                    className="flex items-center text-2xl font-bold gap-2.5 cursor-pointer"
                    onClick={() => {
                        navigate("/");
                        closeMenu();
                    }}
                >
                    <img
                        src="/logo.png"
                        alt="GameShipperz Logo"
                        className="h-[30px] w-[30px] object-contain"
                    />
                    GameShipperz
                </div>

                <button
                    className="block md:hidden focus:outline-none text-white hover:text-gs-red transition-colors duration-200"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-8 h-8"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-8 h-8"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 12h18M3 6h18M3 18h18"
                            />
                        </svg>
                    )}
                </button>

                <nav className="hidden md:block">
                    <ul className="flex items-center gap-4 list-none text-base font-semibold">
                        <li>
                            <Link to="/articles" className="hover:text-gs-red transition-colors duration-200">
                                Articles
                            </Link>
                        </li>
                        <li>
                            <Link to="/consoles" className="hover:text-gs-red transition-colors duration-200">
                                Consoles
                            </Link>
                        </li>
                        <li>
                            <Link to="/gamingpcs" className="hover:text-gs-red transition-colors duration-200">
                                Gaming PCs
                            </Link>
                        </li>
                        <li>
                            <Link to="/games" className="hover:text-gs-red transition-colors duration-200">
                                Games
                            </Link>
                        </li>

                        {isAuthenticated ? (
                            <>
                                <li>
                                    <Link to="/cart" className="hover:text-gs-red transition-colors duration-200">
                                        Cart
                                    </Link>
                                </li>
                                <li
                                    onClick={handleLogout}
                                    className="cursor-pointer hover:text-gs-red transition-colors duration-200"
                                >
                                    LogOut
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link to="/login" className="hover:text-gs-red transition-colors duration-200">
                                    Login
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>

            {isMenuOpen && (
                <nav className="absolute top-full left-0 w-full bg-[#161616] border-t border-[#333] shadow-lg pb-4 pt-2 md:hidden">
                    <ul className="flex flex-col items-center gap-4 list-none text-lg font-medium">
                        <li>
                            <Link to="/articles" onClick={closeMenu} className="hover:text-gs-red transition-colors duration-200">
                                Articles
                            </Link>
                        </li>
                        <li>
                            <Link to="/consoles" onClick={closeMenu} className="hover:text-gs-red transition-colors duration-200">
                                Consoles
                            </Link>
                        </li>
                        <li>
                            <Link to="/gamingpcs" onClick={closeMenu} className="hover:text-gs-red transition-colors duration-200">
                                Gaming PCs
                            </Link>
                        </li>
                        <li>
                            <Link to="/games" onClick={closeMenu} className="hover:text-gs-red transition-colors duration-200">
                                Games
                            </Link>
                        </li>

                        {isAuthenticated ? (
                            <>
                                <li>
                                    <Link to="/cart" onClick={closeMenu} className="hover:text-gs-red transition-colors duration-200">
                                        Cart
                                    </Link>
                                </li>
                                <li
                                    onClick={handleLogout}
                                    className="cursor-pointer text-gs-red hover:text-white transition-colors duration-200"
                                >
                                    LogOut
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link to="/login" onClick={closeMenu} className="hover:text-gs-red transition-colors duration-200">
                                    LogIn
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>
            )}
        </header>
    );
};

export default Navbar;