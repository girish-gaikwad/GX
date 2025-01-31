"use client";
import { Berkshire_Swash } from 'next/font/google';
import React, { useState, useEffect } from 'react';
import { Menu, X, Home, Users, Settings, BarChart2, Bell, Search, Sun, Moon, ShoppingBag, DollarSign, ShoppingCart, TrendingUp, Truck, FileSearch, NotepadTextDashed, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import { AnimatePresence, color, motion } from "framer-motion";
import Link from 'next/link';
import FloatingChatbot from '@/components/floatingBot';

const SIDEBAR_ITEMS = [
  {
    name: "Overview",
    icon: BarChart2,
    color: "#6366F1",
    href: "/dashboard",  // Updated href
  },
  {
    name: "Commerce",
    icon: ShoppingBag,
    color: "#EC4899",
    subItems: [
      { name: "Dashboard", href: "/dashboard/Overview" },
      { name: "Products", href: "/dashboard/products" },
      { name: "Orders", href: "/dashboard/orders" },
      { name: "Sales", href: "/dashboard/sales" },
    ]
  },
  {
    name: "Analytics",
    icon: TrendingUp,
    color: "#3B82F6",
    subItems: [
      { name: "Dashboard", href: "/dashboard/analytics" },
      { name: "Demand Forecasting", href: "/dashboard/demand-forecasting" },
    ]
  },
  {
    name: "Logistics",
    icon: Truck,
    color: "#9333EA",
    subItems: [
      { name: "Suggestions", href: "/dashboard/logistic-suggestions" },
      { name: "Quick Incentives", href: "/dashboard/Incentives" },
    ]
  },
  {
    name: "Documents",
    icon: NotepadTextDashed,
    color: "#10B981",
    subItems: [
      { name: "Doc Hub", href: "/dashboard/Docs" },
      { name: "Summarize Doc", href: "/dashboard/summarize-doc" },
      { name: "Compliance", href: "/dashboard/compliance" },
    ]
  },
  {
    name: "Management",
    icon: Users,
    color: "#8B5CF6",
    subItems: [
      { name: "Users", href: "/dashboard/users" },
      { name: "Negotiation", href: "/dashboard/negotiation" },
    ]
  },
];

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, isMobile }) => {
  const [expandedItems, setExpandedItems] = useState({});
  const pathname = usePathname();
  const { theme } = useTheme();

  const toggleExpanded = (itemName) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && isSidebarOpen && !event.target.closest('.sidebar-container')) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobile, isSidebarOpen, setIsSidebarOpen]);

  const renderSidebarItem = (item) => {
    const isExpanded = expandedItems[item.name];
    const hasSubItems = item.subItems?.length > 0;
    const isActive = !hasSubItems && pathname === item.href;
    const isGroupActive = hasSubItems && item.subItems.some(subItem => pathname === subItem.href);

    return (
      <div key={item.name}>
        <Link href={item.href || '#'}>
          <motion.div
            onClick={(e) => {
              if (hasSubItems) {
                e.preventDefault();
                toggleExpanded(item.name);
              }
            }}
            className={`
              flex items-center p-2 text-sm rounded-lg cursor-pointer
              transition-colors duration-200
              ${(isActive || isGroupActive)
                ? 'bg-[#bed3f8] text-blue-700 dark:bg-violet-900/30 dark:text-violet-300 font-medium'
                : 'text-foreground/80 hover:bg-[#d7e1f9] dark:hover:bg-violet-900/20'
              }
            `}
          >
            <item.icon size={18} className={`${isActive || isGroupActive
              ? 'text-blue-600 dark:text-violet-300'
              : `text-muted-foreground text-[${item.color}]`
              }`} />

            <AnimatePresence mode="wait">
              {isSidebarOpen && (
                <motion.div
                  className="ml-3 flex-1 flex items-center justify-between"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <span>{item.name}</span>
                  {hasSubItems && (
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </Link>

        <AnimatePresence>
          {hasSubItems && isExpanded && isSidebarOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="ml-6 mt-1 space-y-1"
            >
              {item.subItems.map((subItem) => (
                <Link
                  key={subItem.href}
                  href={subItem.href}
                  onClick={() => isMobile && setIsSidebarOpen(false)}
                >
                  <motion.div
                    className={`
                      p-2 text-sm rounded-md transition-colors
                      ${pathname === subItem.href
                        ? 'bg-[#bed3f8] text-blue-700 dark:bg-violet-900/30 dark:text-violet-300 font-medium'
                        : 'text-muted-foreground hover:bg-[#d7e1f9] dark:hover:bg-violet-900/20 hover:text-foreground'
                      }
                    `}
                  >
                    {subItem.name}
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col sidebar-container">
      <div className="h-16 border-b flex items-center px-4 justify-between dark:border-violet-800/30 border-[#bed3f8]">
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pl-3 font-semibold text-lg"
          >
            GlobalXport
          </motion.div>
        )}
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <div className="space-y-1">
          {SIDEBAR_ITEMS.map(renderSidebarItem)}
        </div>
      </nav>

      {/* Settings at bottom */}
      <div className="border-t border-[#bed3f8] dark:border-violet-800/30 p-3">
        <Link href="/dashboard/settings">
          <motion.div
            className={`
              flex items-center p-2 text-sm rounded-lg cursor-pointer
              transition-colors duration-200
              ${pathname === '/settings'
                ? 'bg-[#bed3f8] text-blue-700 dark:bg-violet-900/30 dark:text-violet-300 font-medium'
                : 'text-foreground/80 hover:bg-[#d7e1f9] dark:hover:bg-violet-900/20'
              }
            `}
          >
            <Settings size={18} className="text-muted-foreground" />
            {isSidebarOpen && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="ml-3"
              >
                Settings
              </motion.span>
            )}
          </motion.div>
        </Link>
      </div>
    </div>
  );
};

// Rest of the DashboardLayout component remains the same
const DashboardLayout = ({ children }) => {
  const { theme, setTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      setIsSidebarOpen(window.innerWidth >= 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e2e8f8] to-[#e2e8f8] dark:from-gray-950 dark:to-violet-950">
      <AnimatePresence>
        {isMobile && isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={isMobile ? { x: -280 } : false}
        animate={{
          x: isSidebarOpen ? 0 : (isMobile ? -280 : -200),
          width: isMobile ? 280 : (isSidebarOpen ? 256 : 72)
        }}
        transition={{ type: "spring", bounce: 0, duration: 0.3 }}
        className="fixed top-0 left-0 h-full bg-[#f4f7fc] dark:bg-gray-950/80 backdrop-blur-lg border-r border-[#bed3f8] dark:border-violet-900/30 z-50"
      >
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          isMobile={isMobile}
        />
      </motion.aside>

      <motion.div
        animate={{
          marginLeft: isMobile ? 0 : (isSidebarOpen ? 256 : 72)
        }}
        transition={{ type: "spring", bounce: 0, duration: 0.3 }}
      >
        <header className="h-16 border-b sticky top-0 bg-[#f4f7fc] dark:bg-gray-950/80 backdrop-blur-lg border-[#bed3f8] dark:border-violet-900/30 z-30">
          <div className="flex items-center justify-between h-full px-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>

              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="w-[300px] pl-10 bg-white/50 dark:bg-gray-900/50 border-[#bed3f8] dark:border-violet-900/30"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-blue-600 dark:bg-violet-500 rounded-full border-2 border-background"></span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost" size="icon" className="rounded-full">
                <img
                  src="/api/placeholder/32/32"
                  alt="Avatar"
                  className="rounded-full"
                />
              </Button>
            </div>
          </div>
        </header>

        <main className="p-6">
          {children}
        </main>
      </motion.div>
      <FloatingChatbot />

    </div>
  );
};

export default DashboardLayout;