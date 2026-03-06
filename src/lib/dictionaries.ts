export interface Dictionary {
  common: {
    all: string
    learnMore: string
    minRead: string
    seeAllPosts: string
    seeAllFaq: string
    backToNews: string
    previous: string
    next: string
  }
}

const dictionaries: Record<string, Dictionary> = {
  pl: {
    common: {
      all: 'Wszystkie',
      learnMore: 'Dowiedz się więcej',
      minRead: 'min czytania',
      seeAllPosts: 'Zobacz wszystkie wpisy',
      seeAllFaq: 'Zobacz wszystkie pytania',
      backToNews: 'Wróć do newsów',
      previous: 'Poprzednia',
      next: 'Następna',
    },
  },
  en: {
    common: {
      all: 'All',
      learnMore: 'Learn more',
      minRead: 'min read',
      seeAllPosts: 'See all posts',
      seeAllFaq: 'See all FAQ',
      backToNews: 'Back to news',
      previous: 'Previous',
      next: 'Next',
    },
  },
  de: {
    common: {
      all: 'Alle',
      learnMore: 'Mehr erfahren',
      minRead: 'Min. Lesezeit',
      seeAllPosts: 'Alle Beiträge anzeigen',
      seeAllFaq: 'Alle Fragen anzeigen',
      backToNews: 'Zurück zu den News',
      previous: 'Zurück',
      next: 'Weiter',
    },
  },
}

export function getDictionary(locale: string): Dictionary {
  return dictionaries[locale] ?? dictionaries.pl
}
