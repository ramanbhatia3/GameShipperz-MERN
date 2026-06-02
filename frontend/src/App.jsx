import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from './pages/Home';

function App() {
    return (
        <Router>
            <div className="min-h-screen flex flex-col bg-[#0d0d0d] text-white">
                <Navbar />
                
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </main>

                <Footer />
            </div>
        </Router>
    );
}

export default App;
