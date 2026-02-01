import { i18nCodeToContent } from '~/i18n/config';
import type { NuxtI18nCode } from '~/i18n/config';

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

export const useAsyncCategoryData = async (
  locale: NuxtI18nCode,
  category?: string,
  limit?: number,
  filters?: Array<{ key: string; value: string }>
) =>
  useAsyncData(
    `${locale}:CategoryList:${category}:${limit}:${filters?.map((obj) => `${obj.key}-${obj.value}`).join('--')}`,
    queryCollectionCategory(locale, category, limit, filters)
  );
