import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { marketplaceApi, calculateEmi } from '../services/marketplaceApi';

export default function EmiSelection() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedVariant } = location.state || {};
  const [product, setProduct] = useState(null);
  const [emiPlans, setEmiPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [prodData, plansData] = await Promise.all([
        marketplaceApi.getProductById(id),
        marketplaceApi.getEmiPlans(id)
      ]);
      setProduct(prodData);
      setEmiPlans(plansData);
      setSelectedPlan(plansData.find((plan) => plan.recommended) || plansData[0] || null);
    } catch (err) {
      setError('We could not load the EMI plans. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [id]);

  if (loading) {
    return <div className="p-4 flex justify-center items-center h-[50vh]"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-primary)]" /></div>;
  }

  if (error || !product) {
    return (
      <div className="p-6 text-center">
        <p className="font-semibold text-[var(--color-text-primary)]">Couldn't load EMI plans</p>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1 mb-4">{error || 'Product not found.'}</p>
        <button onClick={fetchData} className="bg-[var(--color-primary)] text-white px-6 py-2.5 rounded-full text-sm font-semibold">Retry</button>
      </div>
    );
  }

  const finalPrice = product.price + (selectedVariant?.priceModifier || 0);

  const handleProceed = () => {
    if (!selectedPlan) return;
    navigate('/checkout', { state: { product, selectedVariant, selectedPlan } });
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-60px)] pb-24 bg-[var(--color-background)]">
      <div className="p-4 space-y-4">
        <div>
          <p className="text-xs text-[var(--color-primary)] font-semibold uppercase tracking-wider">Backed by mutual funds</p>
          <h2 className="text-xl font-bold text-[var(--color-text-primary)] mt-1">Choose your EMI plan</h2>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            Product total: <span className="font-bold text-[var(--color-text-primary)]">₹{finalPrice.toLocaleString('en-IN')}</span>
          </p>
        </div>

        <div className="space-y-3">
          {emiPlans.map(plan => {
            const monthlyAmount = calculateEmi(finalPrice, plan.interestRate, plan.tenure);
            const isSelected = selectedPlan?.id === plan.id;
            return (
              <button
                type="button"
                key={plan.id}
                onClick={() => setSelectedPlan(plan)}
                className={`w-full text-left bg-white p-4 rounded-[18px] border-2 cursor-pointer transition-all ${isSelected ? 'border-[var(--color-primary)] bg-purple-50' : 'border-transparent shadow-[var(--shadow-card)]'}`}
                aria-pressed={isSelected}
              >
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <h3 className="font-semibold text-[var(--color-text-primary)]">₹{monthlyAmount.toLocaleString('en-IN')}/month</h3>
                    <p className="text-sm text-[var(--color-text-secondary)] mt-1">{plan.tenure} months tenure</p>
                  </div>
                  {plan.isNoCost && <span className="bg-[var(--color-success)] text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">0% interest</span>}
                </div>
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                  <span className="text-xs text-[var(--color-text-muted)]">Total: ₹{(monthlyAmount * plan.tenure).toLocaleString('en-IN')}</span>
                  <span className={`text-xs font-semibold ${isSelected ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-secondary)]'}`}>{isSelected ? 'Selected' : 'Select plan'}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="fixed max-w-[532px] mx-auto bottom-0 left-0 right-0 bg-white border-t border-[var(--color-border)] p-4 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] z-40">
        <button onClick={handleProceed} disabled={!selectedPlan} className={`w-full py-3 rounded-full font-semibold transition-opacity ${selectedPlan ? 'bg-[var(--color-primary)] text-white hover:opacity-90' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
          Check Eligibility
        </button>
      </div>
    </div>
  );
}
