import { useParams, Link } from 'react-router-dom';
import { articlesData } from '../data/articlesData.jsx';

const ArticleDetail = () => {
    const { id } = useParams();
    const article = articlesData.find(item => item.id === id);

    if (!article) {
        return (
            <div className="min-h-[60vh] flex flex-col justify-center items-center text-white font-rajdhani">
                <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
                <Link to="/articles" className="text-gs-red hover:underline">Return to Articles</Link>
            </div>
        );
    }

    return (
        <main className="max-w-[800px] mx-auto py-12 px-6 md:px-4 font-rajdhani text-white">
            <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-auto max-h-[450px] object-cover border-4 border-gs-red rounded-md mb-8 shadow-[0_0_15px_rgba(229,9,20,0.4)]"
            />
            
            <h1 className="text-4xl md:text-5xl font-bold text-gs-red mb-4">{article.title}</h1>
            
            {article.meta && (
                <p className="text-lg text-gray-300 mb-8 border-b border-[#333] pb-4">
                    {article.meta}
                </p>
            )}

            <div className="text-lg leading-relaxed text-gray-200 space-y-6 article-body">
                {article.content}
            </div>

            <div className="mt-12 pt-6 border-t border-[#333]">
                <Link to="/articles" className="inline-block text-gs-red font-bold text-lg hover:text-white hover:underline transition-colors">
                    ← Back to Articles
                </Link>
            </div>
        </main>
    );
};

export default ArticleDetail;