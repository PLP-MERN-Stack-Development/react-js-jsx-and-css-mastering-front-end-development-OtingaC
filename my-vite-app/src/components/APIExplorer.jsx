import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Button } from './Button';
import { Card } from './Card';

export const APIExplorer = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!response.ok) throw new Error('Failed to fetch posts');
      const data = await response.json();
      setPosts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase()) ||
    post.body.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedPosts = filteredPosts.slice(0, page * itemsPerPage);

  if (loading) {
    return (
      <Card className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="max-w-4xl mx-auto bg-red-50 dark:bg-red-900/20">
        <p className="text-red-600 dark:text-red-400 text-center py-4">Error: {error}</p>
        <Button onClick={fetchPosts} className="mx-auto block">Retry</Button>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">API Explorer</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search posts..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        {paginatedPosts.map(post => (
          <Card key={post.id} className="hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white line-clamp-2">
              {post.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
              {post.body}
            </p>
            <span className="inline-block mt-3 text-xs text-blue-600 dark:text-blue-400 font-medium">
              Post #{post.id}
            </span>
          </Card>
        ))}
      </div>

      {paginatedPosts.length < filteredPosts.length && (
        <div className="text-center">
          <Button onClick={() => setPage(page + 1)} variant="secondary">
            Load More
          </Button>
        </div>
      )}

      {filteredPosts.length === 0 && (
        <Card>
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            No posts found matching your search
          </p>
        </Card>
      )}
    </div>
  );
};