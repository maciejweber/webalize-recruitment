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
  pages: {
    newsTitle: string
    newsDescription: string
    faqTitle: string
    faqDescription: string
    integrationsTitle: string
    integrationsDescription: string
    notFoundTitle: string
    notFoundHeading: string
    notFoundDescription: string
    notFoundBack: string
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
    pages: {
      newsTitle: 'Aktualności',
      newsDescription: 'Najnowsze wpisy i aktualności.',
      faqTitle: 'Często zadawane pytania',
      faqDescription: 'Odpowiedzi na najczęściej zadawane pytania.',
      integrationsTitle: 'Integracje',
      integrationsDescription: 'Sprawdź dostępne integracje.',
      notFoundTitle: 'Nie znaleziono strony',
      notFoundHeading: 'Strona nie istnieje',
      notFoundDescription: 'Przepraszamy, nie możemy znaleźć tej strony.',
      notFoundBack: 'Wróć na stronę główną',
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
    pages: {
      newsTitle: 'News',
      newsDescription: 'Latest articles and updates.',
      faqTitle: 'Frequently Asked Questions',
      faqDescription: 'Answers to the most common questions.',
      integrationsTitle: 'Integrations',
      integrationsDescription: 'Browse available integrations.',
      notFoundTitle: 'Page not found',
      notFoundHeading: 'Page does not exist',
      notFoundDescription: 'Sorry, we could not find this page.',
      notFoundBack: 'Back to home',
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
    pages: {
      newsTitle: 'Aktuelles',
      newsDescription: 'Neueste Artikel und Updates.',
      faqTitle: 'Häufig gestellte Fragen',
      faqDescription: 'Antworten auf die häufigsten Fragen.',
      integrationsTitle: 'Integrationen',
      integrationsDescription: 'Verfügbare Integrationen entdecken.',
      notFoundTitle: 'Seite nicht gefunden',
      notFoundHeading: 'Diese Seite existiert nicht',
      notFoundDescription: 'Leider konnten wir diese Seite nicht finden.',
      notFoundBack: 'Zurück zur Startseite',
    },
  },
}

export function getDictionary(locale: string): Dictionary {
  return dictionaries[locale] ?? dictionaries.en
}
