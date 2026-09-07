import { products } from '../data/products';
import { emiPlans } from '../data/emiPlans';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const calculateEmi = (principal, interestRate, tenure) => {
  if (!interestRate) return Math.round(principal / tenure);
  const monthlyRate = interestRate / 100 / 12;
  const factor = Math.pow(1 + monthlyRate, tenure);
  return Math.round((principal * monthlyRate * factor) / (factor - 1));
};

export const marketplaceApi = {
  getProducts: async () => {
    await delay(500);
    return products.map((product) => {
      const recommendedPlan = emiPlans.find((plan) => plan.recommended) || emiPlans[0];
      return {
        ...product,
        startingEmi: calculateEmi(product.price, recommendedPlan.interestRate, recommendedPlan.tenure),
        startingTenure: recommendedPlan.tenure,
      };
    });
  },

  getProductById: async (id) => {
    await delay(400);
    const product = products.find(p => p.id === id);
    if (!product) throw new Error('Product not found');
    return product;
  },

  getEmiPlans: async (productId) => {
    await delay(400);
    const product = products.find(p => p.id === productId);
    if (!product) throw new Error('Product not found');
    return emiPlans;
  },

  checkEligibility: async (productId, variantId, emiPlanId) => {
    await delay(1000);
    if (!productId || !variantId || !emiPlanId) {
      throw new Error('Please select a product, variant and EMI plan.');
    }
    return { eligible: true, message: 'You are eligible for this EMI plan!' };
  }
};
