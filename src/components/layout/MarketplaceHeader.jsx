import { ChevronLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const titles = {
  '/product/': 'Product Details',
  '/product/:id/emi': 'Choose EMI Plan',
  '/checkout': 'Checkout',
};

export default function MarketplaceHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === '/shop' || location.pathname === '/') return null;

  let title = '1Fi Marketplace';
  if (location.pathname.includes('/emi')) title = titles['/product/:id/emi'];
  else if (location.pathname.includes('/product/')) title = titles['/product/'];
  else if (location.pathname === '/checkout') title = titles['/checkout'];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[var(--color-border)] px-4 py-3 flex items-center">
      <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Go back">
        <ChevronLeft className="w-6 h-6 text-[var(--color-text-primary)]" />
      </button>
      <h1 className="ml-2 text-lg font-semibold text-[var(--color-text-primary)]">{title}</h1>
    </header>
  );
}
