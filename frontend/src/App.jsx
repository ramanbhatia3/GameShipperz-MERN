import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PopularGames from "./components/PopularGames";
import LatestArticles from "./components/LatestArticles";
import Footer from "./components/Footer";

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-[#0d0d0d] text-white">
                <Navbar />
                <Hero />
                <PopularGames />
                <LatestArticles />
                <Footer />
            </div>
        </Router>
    );
}

export default App;
