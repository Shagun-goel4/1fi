import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  // Format price to Indian Rupees
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div 
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-white rounded-[18px] p-3 shadow-[var(--shadow-card)] border border-transparent hover:border-[var(--color-primary)] transition-all cursor-pointer flex flex-col"
    >
      <div className="aspect-square bg-gray-50 rounded-xl mb-3 overflow-hidden flex items-center justify-center p-2 relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-contain mix-blend-multiply"
          loading="lazy"
        />
        {/* Mock "0% EMI" badge */}
        <div className="absolute top-2 right-2 bg-gradient-to-r from-[var(--color-primary)] to-purple-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
          0% EMI
        </div>
      </div>
      
      <div className="flex-1 flex flex-col">
        <span className="text-[10px] text-[var(--color-text-muted)] font-medium uppercase tracking-wider mb-1">
          {product.brand}
        </span>
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)] leading-tight mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <div className="mt-auto">
          {product.originalPrice > product.price && (
            <div className="text-xs text-[var(--color-text-muted)] line-through">
              {formatPrice(product.originalPrice)}
            </div>
          )}
          <div className="text-base font-bold text-[var(--color-text-primary)]">
            {formatPrice(product.price)}
          </div>
          <div className="mt-1 flex items-center justify-between gap-2">
            <div>
              <span className="block text-[10px] text-[var(--color-text-muted)]">Starting EMI</span>
              <span className="text-xs font-semibold text-[var(--color-primary)]">
                {formatPrice(product.startingEmi)}/mo
              </span>
            </div>
            <ArrowRight className="h-4 w-4 text-[var(--color-primary)]" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}
