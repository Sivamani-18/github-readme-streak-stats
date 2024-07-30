// utils/dateUtils.ts
import { format, parseISO, getYear, Locale } from 'date-fns';
import { enUS, fr, es } from 'date-fns/locale';

const localeMap: Record<string, Locale> = {
  en: enUS,
  fr: fr,
  es: es,
};

export function formatDate(
  dateString: string,
  formatStr: string | null,
  locale: string
): string {
  const date = parseISO(dateString);
  const dateLocale = localeMap[locale] || enUS;
  const year = getYear(date);
  const currentYear = getYear(new Date());

  if (year === currentYear) {
    return format(date, formatStr ?? 'MMM d', { locale: dateLocale });
  } else {
    return format(date, formatStr ?? 'yyyy MMM d', { locale: dateLocale });
  }
}

export function translateDays(days: string[], locale: string): string[] {
  if (locale === 'en') {
    return days;
  }

  const dateLocale = localeMap[locale] || enUS;
  return days.map((day) =>
    format(parseISO(day), 'EEE', { locale: dateLocale })
  );
}
