import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "../globals.css";
import Footer from "@/components/client/Footer";
import Header from "@/components/client/Header";
import { Toaster } from "@/ui/toaster";
import dynamic from "next/dynamic";
import { Locale } from "@/types";

const CanvasSnow = dynamic(() => import("@/components/client/CanvasSnow"), {
  ssr: false,
});

const RootLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) => {
  const messages = await getMessages({ locale: params.locale });

  return (
    <html lang={params.locale}>
      <head>
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="/logo_o2garden.png"
        />
      </head>
      <NextIntlClientProvider locale={params.locale} messages={messages}>
        <body>
          {/* Анимация снега поверх всего сайта */}
          <CanvasSnow />
          <Toaster />
          <Header />
          <main>{children}</main>
          <Footer />
        </body>
      </NextIntlClientProvider>
    </html>
  );
};

export default RootLayout;
