import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import EmiSelection from './pages/EmiSelection';
import Checkout from './pages/Checkout';
import BottomNavigation from './components/layout/BottomNavigation';
import MarketplaceHeader from './components/layout/MarketplaceHeader';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex justify-center">
        <div className="w-full max-w-[532px] min-h-screen relative flex flex-col pb-16 overflow-x-hidden">
          <MarketplaceHeader />
          <main className="flex-grow">
            <Routes>
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/product/:id/emi" element={<EmiSelection />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="*" element={<Navigate to="/shop" replace />} />
            </Routes>
          </main>
          <BottomNavigation />
        </div>
      </div>
    </Router>
  );
}

export default App;
