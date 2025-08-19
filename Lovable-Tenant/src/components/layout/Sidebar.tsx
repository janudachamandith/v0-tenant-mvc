import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Search, 
  Calendar, 
  CreditCard, 
  FileText, 
  AlertCircle,
  ClipboardList,
  MessageSquare,
  Bell,
  MessageCircle,
  Settings,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Search Properties', href: '/search', icon: Search },
  { name: 'My Bookings', href: '/bookings', icon: Calendar },
  { name: 'Pay Rent', href: '/pay-rent', icon: CreditCard },
  { name: 'Agreements', href: '/agreements', icon: FileText },
  { name: 'Report Issues', href: '/report-issue', icon: AlertCircle },
  { name: 'Track Issue Status', href: '/track-issues', icon: ClipboardList },
  { name: 'My Reviews', href: '/reviews', icon: MessageSquare },
  { name: 'Notifications', href: '/notifications', icon: Bell },
  { name: 'Feedback', href: '/feedback', icon: MessageCircle },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 bg-[hsl(var(--sidebar-bg))] border-r border-[hsl(var(--sidebar-border))]">
        <div className="flex items-center justify-center h-16 border-b border-[hsl(var(--sidebar-border))]">
          <h1 className="text-xl font-bold text-gradient">TenantHub</h1>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile sidebar */}
      <div className={`lg:hidden fixed inset-y-0 left-0 z-30 w-64 bg-[hsl(var(--sidebar-bg))] border-r border-[hsl(var(--sidebar-border))] transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-[hsl(var(--sidebar-border))]">
          <h1 className="text-xl font-bold text-gradient">TenantHub</h1>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[hsl(var(--sidebar-hover))]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={onClose}
                className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};