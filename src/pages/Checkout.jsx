import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { marketplaceApi } from '../services/marketplaceApi';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, selectedVariant, selectedPlan } = location.state || {};

  const [status, setStatus] = useState('checking'); // checking, eligible, error, success
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!product || !selectedPlan) return;

    const checkEligibility = async () => {
      try {
        await marketplaceApi.checkEligibility(product.id, selectedVariant?.id, selectedPlan.id);
        setStatus('eligible');
      } catch (err) {
        setStatus('error');
        setErrorMessage(err.message);
      }
    };
    checkEligibility();
  }, [product, selectedVariant, selectedPlan]);

  if (!product || !selectedPlan) {
    return <Navigate to="/shop" replace />;
  }

  const finalPrice = product.price + (selectedVariant?.priceModifier || 0);
  const monthlyAmount = Math.round((finalPrice * (1 + (selectedPlan.interestRate/100) * (selectedPlan.tenure/12))) / selectedPlan.tenure);

  const handleConfirm = () => {
    setStatus('success');
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-60px)] bg-[var(--color-background)] p-4">
      {status === 'checking' && (
        <div className="flex-1 flex flex-col items-center justify-center space-y-4">
          <Loader2 className="w-12 h-12 text-[var(--color-primary)] animate-spin" />
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Checking Eligibility...</h2>
          <p className="text-sm text-center text-[var(--color-text-secondary)] px-8">
            We are securely checking your mutual fund portfolio to determine EMI eligibility.
          </p>
        </div>
      )}

      {status === 'error' && (
        <div className="flex-1 flex flex-col items-center justify-center space-y-4">
          <XCircle className="w-16 h-16 text-[var(--color-error)]" />
          <h2 className="text-xl font-bold text-[var(--color-text-primary)]">Eligibility Failed</h2>
          <p className="text-sm text-center text-[var(--color-text-secondary)] px-8">
            {errorMessage}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-6 bg-white border border-[var(--color-primary)] text-[var(--color-primary)] font-semibold rounded-full px-8 py-3"
          >
            Go Back
          </button>
        </div>
      )}

      {status === 'eligible' && (
        <div className="flex-1 flex flex-col">
          <div className="bg-white rounded-[18px] p-6 shadow-[var(--shadow-card)] mb-6 mt-4">
            <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-100">
              <CheckCircle2 className="w-8 h-8 text-[var(--color-success)]" />
              <div>
                <h2 className="font-bold text-[var(--color-text-primary)]">You're Eligible!</h2>
                <p className="text-xs text-[var(--color-text-secondary)]">Proceed to confirm your purchase.</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-sm text-[var(--color-text-primary)]">Order Summary</h3>
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-gray-50 rounded-lg p-1 flex items-center justify-center">
                  <img src={product.image} className="max-h-full object-contain mix-blend-multiply" alt="product" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">{product.name}</div>
                  <div className="text-xs text-[var(--color-text-muted)]">{selectedVariant?.value}</div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--color-text-secondary)]">Plan</span>
                  <span className="font-medium">{selectedPlan.title}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--color-text-secondary)]">Monthly EMI</span>
                  <span className="font-bold">₹{monthlyAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--color-text-secondary)]">Processing Fee</span>
                  <span className="font-medium">₹{selectedPlan.processingFee}</span>
                </div>
              </div>
            </div>
          </div>
          
          <button
            onClick={handleConfirm}
            className="mt-auto mb-6 bg-[var(--color-primary)] text-white font-semibold rounded-full py-3.5 shadow-lg shadow-purple-500/30 w-full"
          >
            Confirm Purchase
          </button>
        </div>
      )}

      {status === 'success' && (
        <div className="flex-1 flex flex-col items-center justify-center space-y-4">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-2">
            <CheckCircle2 className="w-10 h-10 text-[var(--color-success)]" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">Purchase Successful!</h2>
          <p className="text-sm text-center text-[var(--color-text-secondary)] px-8">
            Your EMI plan for {product.name} has been activated.
          </p>
          <button
            onClick={() => navigate('/shop')}
            className="mt-8 bg-[var(--color-primary)] text-white font-semibold rounded-full px-8 py-3"
          >
            Back to Shop
          </button>
        </div>
      )}
    </div>
  );
}
