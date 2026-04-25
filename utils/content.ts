import type { NuxtI18nCode } from '~/i18n/config';
import { i18nCodeToContent } from '~/i18n/config';

export const queryCollectionLocale = (locale: NuxtI18nCode) =>
  queryCollection(i18nCodeToContent(locale));

export const queryCollectionCategory = (
  locale: NuxtI18nCode,
  category?: string,
  limit: number = 0,
  filters?: Array<{ key: string; value: string }>
) => {
  let q = queryCollectionLocale(locale)
    .select('path', 'title', 'date')
    .where('path', 'LIKE', `/${category || ''}%`)
    .order('date', 'DESC')
    .limit(limit);

  if (filters) {
    for (const filter of filters) {
      q = q.where(filter.key, 'LIKE', filter.value);
    }
  }

  return () => q.all();
};
