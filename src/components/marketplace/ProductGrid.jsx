import { useState, useEffect } from 'react';
import { marketplaceApi } from '../../services/marketplaceApi';
import ProductCard from './ProductCard';

export default function ProductGrid({ searchTerm = '', category = 'All' }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await marketplaceApi.getProducts();
      setProducts(data);
    } catch (err) {
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:gap-4" aria-label="Loading products">
        {[1, 2, 3, 4].map(n => (
          <div key={n} className="bg-white rounded-[18px] h-72 animate-pulse p-3">
            <div className="bg-gray-200 h-40 rounded-xl mb-4" />
            <div className="bg-gray-200 h-3 w-1/3 mb-2 rounded" />
            <div className="bg-gray-200 h-4 w-3/4 mb-3 rounded" />
            <div className="bg-gray-200 h-4 w-1/2 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-[18px] p-7 text-center shadow-[var(--shadow-card)] border border-[var(--color-border)]">
        <p className="text-sm font-medium text-[var(--color-text-primary)] mb-1">Couldn't load products</p>
        <p className="text-xs text-[var(--color-text-secondary)] mb-4">{error}</p>
        <button
          onClick={fetchProducts}
          className="bg-[var(--color-primary)] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:opacity-90"
        >
          Retry
        </button>
      </div>
    );
  }

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredProducts = products.filter((product) => {
    const matchesSearch = !normalizedSearch ||
      `${product.name} ${product.brand} ${product.category}`.toLowerCase().includes(normalizedSearch);
    const matchesCategory = category === 'All' || product.category === category;
    return matchesSearch && matchesCategory;
  });

  if (filteredProducts.length === 0) {
    return (
      <div className="bg-white rounded-[18px] p-8 text-center shadow-[var(--shadow-card)] border border-[var(--color-border)]">
        <p className="font-semibold text-[var(--color-text-primary)]">No products found</p>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">Try a different product, brand or category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4">
      {filteredProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
