"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Calendar, LayoutGrid, Menu } from "lucide-react";
import { Button } from "@/ui/button";

const menuItems = [
  { title: "Главная страница", url: "/admin-side/dashboard/hero", icon: Home },
  { title: "События", url: "/admin-side/dashboard/events/create", icon: Calendar },
  {
    title: "Схемы залов",
    url: "/admin-side/dashboard/hall-schemas",
    icon: LayoutGrid,
  },
];

export const AdminDashboardNavbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="h-16 border-b bg-card flex items-center px-6 shadow-sm justify-between">
      <Link href="/" className="flex items-center gap-2 group">
        <div className="text-2xl font-bold text-primary">Админ Панел</div>
      </Link>

      <nav className="hidden md:flex items-center gap-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.url;

          return (
            <Link
              key={item.title}
              href={item.url}
              className={`flex items-center gap-2 px-3 py-2 rounded-md font-medium transition-colors ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "hover:bg-sidebar-accent/20 text-foreground"
              }`}>
              <item.icon className="w-4 h-4" />
              {item.title}
            </Link>
          );
        })}
      </nav>

      <div className="md:hidden">
        <Button variant="outline" size="icon" onClick={() => setOpen(!open)}>
          <Menu className="w-5 h-5" />
        </Button>
      </div>

      {open && (
        <div className="absolute top-16 left-0 right-0 bg-card border-b shadow-md flex flex-col md:hidden">
          {menuItems.map((item) => {
            const isActive = pathname === item.url;

            return (
              <Link
                key={item.title}
                href={item.url}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2 px-4 py-3 border-b last:border-b-0 font-medium transition-colors ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "hover:bg-sidebar-accent/20 text-foreground"
                }`}>
                <item.icon className="w-4 h-4" />
                {item.title}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
