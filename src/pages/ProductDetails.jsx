import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { marketplaceApi } from '../services/marketplaceApi';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await marketplaceApi.getProductById(id);
        setProduct(data);
        if (data.variants && data.variants.length > 0) {
          setSelectedVariant(data.variants[0]);
        }
      } catch (err) {
        setError('Failed to load product details.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="p-4 flex flex-col space-y-4 animate-pulse">
        <div className="w-full h-64 bg-gray-200 rounded-[18px]"></div>
        <div className="h-6 bg-gray-200 w-2/3 rounded"></div>
        <div className="h-4 bg-gray-200 w-1/3 rounded"></div>
        <div className="h-20 bg-gray-200 w-full rounded-[18px]"></div>
      </div>
    );
  }

  if (error || !product) {
    return <div className="p-4 text-center text-[var(--color-error)]">{error || "Product not found."}</div>;
  }

  const finalPrice = product.price + (selectedVariant?.priceModifier || 0);

  const handleProceed = () => {
    navigate(`/product/${id}/emi`, { state: { selectedVariant } });
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-60px)] pb-24 bg-[var(--color-background)]">
      {/* Gallery */}
      <div className="bg-white p-6 flex justify-center items-center h-72 border-b border-[var(--color-border)]">
        <img src={product.image} alt={product.name} className="max-h-full object-contain" />
      </div>

      <div className="p-4 space-y-6">
        {/* Info */}
        <div>
          <span className="text-xs text-[var(--color-primary)] font-semibold uppercase tracking-wider">
            {product.brand}
          </span>
          <h1 className="text-xl font-bold text-[var(--color-text-primary)] mt-1">{product.name}</h1>
          <div className="text-2xl font-bold text-[var(--color-text-primary)] mt-2">
            ₹{finalPrice.toLocaleString('en-IN')}
          </div>
        </div>

        {/* Highlights */}
        <div className="bg-white p-4 rounded-[18px] shadow-[var(--shadow-card)]">
          <h3 className="text-sm font-semibold mb-3">Key Highlights</h3>
          <ul className="space-y-2">
            {product.highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-center text-sm text-[var(--color-text-secondary)]">
                <span className="text-[var(--color-primary)] mr-2">•</span>
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        {/* Variants */}
        {product.variants && product.variants.length > 0 && (
          <div className="bg-white p-4 rounded-[18px] shadow-[var(--shadow-card)]">
            <h3 className="text-sm font-semibold mb-3">Select {product.variants[0].type}</h3>
            <div className="flex flex-wrap gap-3">
              {product.variants.map(variant => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariant(variant)}
                  className={`px-4 py-2 rounded-[14px] border text-sm font-medium transition-all ${
                    selectedVariant?.id === variant.id
                      ? 'border-[var(--color-primary)] bg-purple-50 text-[var(--color-primary)] shadow-sm'
                      : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-gray-300'
                  }`}
                >
                  {variant.value}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed max-w-[532px] mx-auto bottom-0 left-0 right-0 bg-white border-t border-[var(--color-border)] p-4 flex gap-4 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] z-40">
        <div className="flex-1 flex flex-col justify-center">
          <span className="text-xs text-[var(--color-text-muted)]">Total Amount</span>
          <span className="text-lg font-bold text-[var(--color-text-primary)]">
            ₹{finalPrice.toLocaleString('en-IN')}
          </span>
        </div>
        <button 
          onClick={handleProceed}
          className="flex-1 bg-[var(--color-primary)] text-white py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
        >
          Select EMI Plan
        </button>
      </div>
    </div>
  );
}
