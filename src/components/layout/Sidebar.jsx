import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Package,
  Settings,
  BarChart3,
  ShoppingCart,
  Zap,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { toggleSidebar } from '../../store/slices/uiSlice.js';

const menuItems = [
  {
    section: 'Dashboards',
    items: [
      { id: 'overview', name: 'Overview', icon: LayoutDashboard, path: '/' },
      { id: 'analytics', name: 'Analytics', icon: BarChart3, path: '/analytics' },
      { id: 'ecommerce', name: 'E-commerce', icon: ShoppingCart, path: '/ecommerce' },
      { id: 'crypto', name: 'Crypto', icon: Zap, path: '/crypto' },
    ],
  },
  {
    section: 'General',
    items: [
      { id: 'settings', name: 'Settings', icon: Settings, path: '/settings' },
    ],
  },
  {
    section: 'Data',
    items: [
      {
        id: 'customers',
        name: 'Customers',
        icon: Users,
        path: '/customers',
        submenu: [
          { name: 'List customers', path: '/customers' },
          { name: 'Create customer', path: '/customers/create' },
          { name: 'Customer details', path: '/customers/:id' },
        ],
      },
      {
        id: 'products',
        name: 'Products',
        icon: Package,
        path: '/products',
        submenu: [
          { name: 'All Products', path: '/products' },
          { name: 'Create Product', path: '/products/create' },
        ],
      },
    ],
  },
];

function SidebarItem({ item, isOpen, isActive }) {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const hasSubmenu = item.submenu && item.submenu.length > 0;

  return (
    <div>
      <button
        onClick={() => {
          if (hasSubmenu) {
            setExpanded(!expanded);
          } else {
            navigate(item.path);
          }
        }}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
          isActive
            ? 'bg-blue-600 text-white'
            : 'text-gray-300 hover:bg-gray-700'
        }`}
      >
        <div className="flex items-center gap-3">
          <item.icon size={20} />
          {isOpen && <span className="font-medium text-sm">{item.name}</span>}
        </div>
        {isOpen && hasSubmenu && (
          expanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />
        )}
      </button>

      {isOpen && expanded && hasSubmenu && (
        <div className="ml-4 mt-2 space-y-1 pl-4 border-l-2 border-gray-600">
          {item.submenu.map((subitem) => (
            <button
              key={subitem.path}
              onClick={() => navigate(subitem.path)}
              className="w-full text-left px-4 py-2 text-sm text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded transition-colors"
            >
              {subitem.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function Sidebar() {
  const sidebarOpen = useSelector((state) => state.ui.sidebarOpen);
  const dispatch = useDispatch();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div
      className={`bg-slate-900 h-screen flex flex-col transition-all duration-300 border-r border-slate-800 ${
        sidebarOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <span className="font-bold text-white text-lg">DevKit</span>
            </div>
          )}
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-8">
        {menuItems.map((section) => (
          <div key={section.section}>
            {sidebarOpen && (
              <h3 className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {section.section}
              </h3>
            )}
            <div className="space-y-2">
              {section.items.map((item) => (
                <SidebarItem
                  key={item.id}
                  item={item}
                  isOpen={sidebarOpen}
                  isActive={isActive(item.path)}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Collapse Button */}
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="w-full flex items-center justify-center p-2 hover:bg-slate-800 rounded-lg transition-colors text-gray-400 hover:text-gray-200"
        >
          {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
    </div>
  );
}
