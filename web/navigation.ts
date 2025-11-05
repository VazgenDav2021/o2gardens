import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export type Locale = 'en' | 'ru' | 'hy';

export const locales = ['hy', 'en', 'ru'];

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({
  locales,
});
