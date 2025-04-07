import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Brain, Home, Image, BarChart3, Info, HelpCircle, Menu, X, LogIn, UserPlus } from 'lucide-react';

export function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/login", icon: LogIn, label: "Login" },
    { to: "/register", icon: UserPlus, label: "Register" },
    { to: "/upload", icon: Image, label: "Upload" },
    { to: "/about", icon: Info, label: "About" },
    { to: "/faq", icon: HelpCircle, label: "FAQ" },
    { to: "/dashboard", icon: BarChart3, label: "Dashboard" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm sticky top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <Brain className="h-7 w-7 text-indigo-600" />
              <span className="font-semibold text-gray-900 text-lg sm:text-xl whitespace-nowrap">AI De-Smoking & De-Hazing</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-3 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;