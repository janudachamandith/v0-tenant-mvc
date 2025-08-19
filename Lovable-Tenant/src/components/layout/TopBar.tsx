import { Menu, Bell, User, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface TopBarProps {
  onMenuClick: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onMenuClick }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="bg-white border-b border-[hsl(var(--border))] h-16 flex items-center justify-between px-6">
      {/* Left side - Mobile menu button */}
      <div className="flex items-center">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-[hsl(var(--sidebar-hover))]"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h2 className="hidden lg:block text-lg font-semibold text-foreground">
          Welcome back, John Doe
        </h2>
      </div>

      {/* Right side - Notifications and profile */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-[hsl(var(--sidebar-hover))]">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground rounded-full text-xs flex items-center justify-center">
            3
          </span>
        </button>

        {/* Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-[hsl(var(--sidebar-hover))]"
          >
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="hidden md:block text-sm font-medium">John Doe</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {/* Profile menu */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-modal border border-[hsl(var(--border))] z-50">
              <div className="py-1">
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-[hsl(var(--sidebar-hover))]">
                  Profile
                </button>
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-[hsl(var(--sidebar-hover))]">
                  Settings
                </button>
                <hr className="my-1 border-[hsl(var(--border))]" />
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-[hsl(var(--sidebar-hover))] text-destructive">
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};