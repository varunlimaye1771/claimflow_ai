import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';


const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { label: 'New Claim', path: '/fnol-intake-form', icon: 'Plus' },
    { label: 'Claims Dashboard', path: '/claims-adjuster-dashboard', icon: 'LayoutDashboard' }
  ];

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[1000] bg-background border-b border-border">
        <div className="h-16 px-6 flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-3 transition-smooth hover:opacity-80"
            aria-label="ClaimFlow AI Home"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name="Zap" size={24} color="var(--color-primary)" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-semibold text-foreground">ClaimFlow AI</span>
          </Link>

          <nav className="hidden md:flex items-center gap-2" aria-label="Main navigation">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium
                  transition-smooth
                  ${isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                  }
                `}
                aria-current={isActivePath(item?.path) ? 'page' : undefined}
              >
                <Icon name={item?.icon} size={18} strokeWidth={2} />
                <span>{item?.label}</span>
              </Link>
            ))}
          </nav>

          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md hover:bg-muted transition-smooth"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} strokeWidth={2} />
          </button>
        </div>
      </header>
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[1050] bg-foreground/20 backdrop-blur-sm md:hidden animate-fade-in"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}
      <aside
        className={`
          fixed top-0 right-0 bottom-0 z-[1100] w-[280px] bg-background border-l border-border
          md:hidden transform transition-transform duration-300 ease-smooth
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        aria-label="Mobile navigation"
      >
        <div className="h-16 px-6 flex items-center justify-between border-b border-border">
          <span className="text-lg font-semibold text-foreground">Menu</span>
          <button
            onClick={closeMobileMenu}
            className="p-2 rounded-md hover:bg-muted transition-smooth"
            aria-label="Close mobile menu"
          >
            <Icon name="X" size={24} strokeWidth={2} />
          </button>
        </div>

        <nav className="p-4 space-y-2" aria-label="Mobile navigation menu">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              onClick={closeMobileMenu}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-md text-base font-medium
                transition-smooth
                ${isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-muted'
                }
              `}
              aria-current={isActivePath(item?.path) ? 'page' : undefined}
            >
              <Icon name={item?.icon} size={20} strokeWidth={2} />
              <span>{item?.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Header;