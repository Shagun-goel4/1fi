import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import ProductGrid from '../components/marketplace/ProductGrid';

const categories = ['All', 'Smartphones', 'Laptops', 'Gaming'];

export default function Shop() {
  const [activeTab, setActiveTab] = useState('marketplace');
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');

  const showMarketplace = activeTab === 'marketplace';
  const placeholder = useMemo(() => {
    if (activeTab === 'brands') return 'Search online brands...';
    if (activeTab === 'stores') return 'Search nearby stores...';
    return 'Search products, brands...';
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <div className="relative">
        <img
          src="https://cdn.1fi.in/banners/shop-page%201536x1024.webp"
          alt="Shop today, pay later using mutual funds"
          className="w-full h-auto object-cover block"
        />
      </div>

      <div className="px-4 relative z-20 space-y-4">
        <div className="bg-white rounded-full flex items-center shadow-[var(--shadow-soft)] -mt-7 relative z-20 mx-4 h-14 overflow-x-auto no-scrollbar">
          {[
            ['brands', 'Top Brands'],
            ['stores', 'Nearby Stores'],
            ['marketplace', '1Fi Marketplace'],
          ].map(([id, label]) => (
            <button
              key={id}
              className={`min-w-[110px] flex-1 h-full text-xs sm:text-sm font-medium transition-all relative whitespace-nowrap ${activeTab === id ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-secondary)]'}`}
              onClick={() => {
                setActiveTab(id);
                if (id !== 'marketplace') setSearchTerm('');
              }}
            >
              {label}
              {activeTab === id && <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-[var(--color-primary)] rounded-full" />}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
          <input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            type="search"
            className="w-full bg-white border border-[var(--color-border)] rounded-full py-3 pl-10 pr-10 text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors placeholder:text-gray-400"
            placeholder={placeholder}
            aria-label={placeholder}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100"
              aria-label="Clear search"
            >
              <X className="h-4 w-4 text-gray-500" />
            </button>
          )}
        </div>

        {showMarketplace && (
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1" aria-label="Product categories">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap border transition-colors ${category === item ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]' : 'bg-white text-[var(--color-text-secondary)] border-[var(--color-border)]'}`}
              >
                {item}
              </button>
            ))}
          </div>
        )}

        <div className="pb-8 mt-4">
          {activeTab === 'brands' && (
            <div className="bg-white rounded-[18px] p-8 text-center text-[var(--color-text-secondary)] shadow-[var(--shadow-card)] border border-[var(--color-border)]">
              Top Brands
            </div>
          )}
          {activeTab === 'stores' && (
            <div className="bg-white rounded-[18px] p-8 text-center text-[var(--color-text-secondary)] shadow-[var(--shadow-card)] border border-[var(--color-border)]">
              Nearby Stores
            </div>
          )}
          {showMarketplace && <ProductGrid searchTerm={searchTerm} category={category} />}
        </div>
      </div>
    </div>
  );
}
