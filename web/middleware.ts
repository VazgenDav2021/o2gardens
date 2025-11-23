import createMiddleware from "next-intl/middleware";
import { locales } from "@/navigation";

export default createMiddleware({
  locales,
  defaultLocale: "en",
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..*|admin-side|admin-page).*)",
  ],
};
