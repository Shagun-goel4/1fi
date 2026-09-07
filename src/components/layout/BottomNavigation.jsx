import { Home, ShoppingBag, FileText, BarChart2, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

export default function BottomNavigation() {
  const location = useLocation();
  const navigate = useNavigate();

  const isMainTab = ['/shop', '/emi-dues', '/limit', '/profile'].includes(location.pathname) || location.pathname === '/';
  if (!isMainTab) return null;

  const tabs = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Shop', icon: ShoppingBag, path: '/shop' },
    { name: 'EMI Dues', icon: FileText, path: '/emi-dues' },
    { name: 'Limit', icon: BarChart2, path: '/limit' },
    { name: 'Profile', icon: User, path: '/profile' },
  ];

  return (
    <div className="fixed max-w-[500px] w-[calc(100%-32px)] mx-auto bottom-6 left-0 right-0 bg-white px-2 py-3 flex justify-between items-center z-50 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-gray-100">
      {tabs.map((tab) => {
        const isActive = location.pathname.startsWith(tab.path) && tab.path !== '/' || (tab.path === '/' && location.pathname === '/');
        const Icon = tab.icon;
        return (
          <button
            key={tab.name}
            onClick={() => navigate(tab.path)}
            className="flex flex-col items-center justify-center p-1.5 flex-1 relative"
          >
            {isActive && (
              <div className="absolute top-[-12px] left-1/2 -translate-x-1/2 w-8 h-[3px] bg-[var(--color-primary)] rounded-b-md"></div>
            )}
            
            <div className="relative mb-1">
              {isActive && (
                <div className="absolute inset-0 bg-[var(--color-primary)] blur-md opacity-25 rounded-full scale-150"></div>
              )}
              <Icon 
                className={clsx("w-6 h-6 relative z-10", isActive ? "text-[var(--color-primary)]" : "text-[var(--color-text-muted)]")} 
                strokeWidth={isActive ? 2.5 : 2}
              />
            </div>
            
            <span className={clsx("text-[10px] font-semibold whitespace-nowrap", isActive ? "text-[var(--color-primary)]" : "text-[var(--color-text-muted)]")}>
              {tab.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}
