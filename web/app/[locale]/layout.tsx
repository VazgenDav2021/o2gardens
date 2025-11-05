import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "../globals.css";
import { Locale } from "@/navigation";
import Footer from "@/components/client/Footer";
import Header from "@/components/client/Header";
import { Toaster } from "@/ui/toaster";

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
        <link rel="icon" href="/favicon.ico" />
      </head>
      <NextIntlClientProvider locale={params.locale} messages={messages}>
        <body>
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
