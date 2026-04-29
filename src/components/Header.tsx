import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { label: '분석하기', to: '/analyze' },
  { label: '내 도감', to: '/collection' },
  { label: '기록', to: '/history' },
];

export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-5xl mx-auto px-6 h-12 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-1.5">
          <span className="text-orange-500 font-bold text-base tracking-tight">
            동물상 테스트!
          </span>
        </NavLink>

        <nav className="flex items-center gap-1">
          {NAV_ITEMS.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  'px-3 py-1.5 rounded-lg text-sm transition-all duration-150',
                  isActive
                    ? 'text-orange-500 font-semibold bg-orange-50'
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50',
                )
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}