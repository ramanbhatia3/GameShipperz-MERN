import Hero from '../components/Hero'
import PopularGames from '../components/PopularGames'
import LatestArticles from '../components/LatestArticles'

const Home = () => {
    return (
        <div className="w-full">
            <Hero />
            <PopularGames />
            <LatestArticles />
        </div>
    );
};

export default Home;