import { Link } from 'react-router-dom';
import { articlesData } from '../data/articlesData';

const Articles = () => {
    return (
        <div className="min-h-screen py-10 px-5 font-rajdhani bg-[#0d0d0d]">
            <h1 className="text-4xl md:text-4xl text-center font-bold text-white mb-12">
                All Articles & News
            </h1>
            
            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 max-w-[1200px] mx-auto">
                {articlesData.map((article) => (
                    <Link 
                        key={article.id} 
                        to={`/articles/${article.id}`} 
                        className="relative h-[152px] w-[270px] rounded-xl overflow-hidden shadow-[0_0_10px_rgba(0,0,0,0.3)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.9),0_0_40px_rgba(255,255,255,0.6)] group block"
                    >
                        <img 
                            src={article.image} 
                            alt={article.title} 
                            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105 group-hover:brightness-110" 
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-4 text-lg font-bold opacity-0 translate-y-full transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                            {article.title}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Articles;