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
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center px-2 py-2 text-gray-900">
                <Brain className="h-6 w-6 text-indigo-600" />
                <span className="ml-2 font-semibold">AI De-Smoking & De-Hazing</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="ml-2">{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center px-3 py-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="ml-2">{item.label}</span>
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