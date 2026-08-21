import { useState, useEffect } from 'react';

const useProducts = (endpoint) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}${endpoint}`);
                const result = await res.json();
                
                if (res.ok) {
                    setData(result.data);
                } else {
                    setError("Failed to load data.");
                }
            } catch (err) {
                console.error("Fetch error:", err);
                setError("Network error occurred.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [endpoint]);

    return { data, isLoading, error };
};

export default useProducts;