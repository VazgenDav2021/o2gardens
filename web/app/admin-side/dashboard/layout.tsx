import "../../globals.css";
import { Toaster } from "@/ui/toaster";
import { AdminDashboardNavbar } from "@/components/admin/AdminDashboardNavbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="/logo_o2garden.png"
        />
      </head>
      <body>
        <div className="min-h-screen flex flex-col w-full">
          <AdminDashboardNavbar />
          <main className="flex-1 p-6 bg-gradient-to-br from-background via-muted/20 to-background">
            {children}
          </main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
