import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

import Games from './pages/Games';
import Cart from './pages/Cart';
import Consoles from "./pages/Consoles";
import GamingPCs from "./pages/GamingPCs";

function App() {
    return (
        <Router>
            <div className="min-h-screen flex flex-col bg-[#0d0d0d] text-white">
                <Navbar />
                
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />

                        <Route path="/consoles" element={<Consoles />} />
                        <Route path="/gamingpcs" element={<GamingPCs />} />
                        <Route path="/games" element={<Games />} />
                        <Route path="/cart" element={<Cart />} />
                    </Routes>
                </main>

                <Footer />
            </div>
        </Router>
    );
}

export default App;
