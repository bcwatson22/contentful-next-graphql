const filterLocales = (locales: string[]): string[] => locales.filter(item => item !== 'catchAll');

export default filterLocales;
