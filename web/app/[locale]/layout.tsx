import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "../globals.css";
import Footer from "@/components/client/Footer";
import Header from "@/components/client/Header";
import { Toaster } from "@/ui/toaster";
import type { Metadata } from "next";
import { Locale } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const { locale } = params;

  const titles = {
    hy: "O2 Gardens | Միջոցառումների կազմակերպում Երևանում",
    ru: "O2 Gardens | Организация мероприятий в Ереване",
    en: "O2 Gardens | Event Organization in Yerevan",
  };

  const descriptions = {
    hy: "Կազմակերպեք անմոռանալի միջոցառումներ Երևանում՝ O2 Gardens-ի հետ։ Հարսանիքներ, ծննդյան օրեր, կորպորատիվ միջոցառումներ և ավելին։",
    ru: "Организуйте незабываемые мероприятия в Ереване с O2 Gardens: свадьбы, дни рождения, корпоративы и многое другое.",
    en: "Organize unforgettable events in Yerevan with O2 Gardens — weddings, birthdays, corporate parties and more.",
  };

  const title = titles[locale];
  const description = descriptions[locale];

  return {
    title,
    description,
    keywords: [
      "O2 Gardens",
      "Yerevan",
      "events",
      "organization",
      "wedding",
      "birthday",
      "restaurant",
    ],
    openGraph: {
      title,
      description,
      url: `https://o2gardens.am/${locale}`,
      siteName: "O2 Gardens",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "O2 Gardens",
        },
      ],
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.jpg"],
    },
    icons: {
      icon: "/favicon.ico",
    },
    alternates: {
      canonical: `https://o2gardens.am/${locale}`,
      languages: {
        en: "https://o2gardens.am/en",
        ru: "https://o2gardens.am/ru",
        hy: "https://o2gardens.am/hy",
      },
    },
  };
}

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
