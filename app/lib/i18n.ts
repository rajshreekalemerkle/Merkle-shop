

type LanguageCode = 'EN' | 'HI' | 'FR' | 'DE' | 'JA' | 'ES';

export interface I18nBase {
  language: LanguageCode;
  country: string;
}

export function getLocaleFromRequest(request: Request): I18nBase {
  const defaultLocale: I18nBase = {language: 'EN', country: 'US'};

  const cookie = request.headers.get('cookie');
  const languageMatch = cookie?.match(/language=(\w+)/);
  const language = languageMatch?.[1]?.toUpperCase();

  const supportedLanguages: LanguageCode[] = ['EN', 'ES', 'FR', 'DE', 'JA'];

  if (language && supportedLanguages.includes(language as LanguageCode)) {
    return {
      language: language as LanguageCode,
      country: 'US',
    };
  }

  return defaultLocale;
}

