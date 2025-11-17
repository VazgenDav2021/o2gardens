import "../../globals.css";
import { Toaster } from "@/ui/toaster";

export default function LoginLayout({
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
        <Toaster />
        <main>{children}</main>
      </body>
    </html>
  );
}
