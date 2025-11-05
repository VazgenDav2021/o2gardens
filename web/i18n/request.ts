import { getRequestConfig } from "next-intl/server";
import { locales } from "@/navigation";

function mergeMessages(...messages: Record<string, unknown>[]) {
  return Object.assign({}, ...messages);
}

export default getRequestConfig(async ({ locale }) => {
  const normalizedLocale = locales.includes(locale) ? locale : "en";

  const [contact, home, about, common, events] = await Promise.all([
    import(`../messages/${normalizedLocale}/home.json`),
    import(`../messages/${normalizedLocale}/contact.json`),
    import(`../messages/${normalizedLocale}/about.json`),
    import(`../messages/${normalizedLocale}/common.json`),
    import(`../messages/${normalizedLocale}/events.json`),
  ]);

  return {
    locale: normalizedLocale,
    messages: mergeMessages(
      contact.default,
      home.default,
      about.default,
      common.default,
      events.default
    ),
  };
});
