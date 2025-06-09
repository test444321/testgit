import { useState, useEffect } from 'react';
import { NewsArticle, getTechNews, getScienceNews, getImportantNews } from '../services/newsApi';

export const useAllNews = () => {
  const [allNews, setAllNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllNews = async () => {
      try {
        setLoading(true);
        const [techNews, scienceNews, importantNews] = await Promise.all([
          getTechNews(20),
          getScienceNews(20),
          getImportantNews(20)
        ]);

        // Combine all news and remove duplicates based on URL
        const combined = [...techNews, ...scienceNews, ...importantNews];
        const unique = combined.filter((article, index, self) => 
          index === self.findIndex(a => a.url === article.url)
        );

        setAllNews(unique);
      } catch (error) {
        console.error('Error fetching all news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllNews();
  }, []);

  return { allNews, loading };
};