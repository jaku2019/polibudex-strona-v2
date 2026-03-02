# Polibudex – Strona Organizacji Studenckiej

Statyczna strona internetowa organizacji studenckiej **Polibudex**, zbudowana przy użyciu [Eleventy (11ty)](https://www.11ty.dev/) i hostowana na GitHub Pages. Treść zarządzana przez [Pages CMS](https://pagescms.org/).

## 🌐 Demo

Strona dostępna pod adresem: https://jaku2019.github.io/polibudex-strona-v2

## 📋 Struktura strony

- **`/`** – Strona główna: hero, O nas, najnowsze posty, odnogi organizacji
- **`/kolo/`** – Koło Naukowe: opis, zespół, projekty, rekrutacja
- **`/posty/`** – Blog: lista postów z filtrami tagów
- **`/posty/tag/{tag}/`** – Posty filtrowane po tagach

## 🛠 Uruchomienie lokalne

### Wymagania

- [Node.js](https://nodejs.org/) >= 18

### Instalacja i uruchomienie

```bash
# Klonuj repozytorium
git clone https://github.com/jaku2019/polibudex-strona-v2.git
cd polibudex-strona-v2

# Zainstaluj zależności
npm install

# Uruchom lokalnie (z auto-przeładowaniem)
npm start
# Strona dostępna pod: http://localhost:8080

# Lub zbuduj bez serwera
npm run build
# Wyniki w katalogu _site/
```

## ✍️ Zarządzanie treścią (Pages CMS)

Treść strony edytowana jest przez [Pages CMS](https://pagescms.org/) bez konieczności znajomości kodu.

### Konfiguracja Pages CMS

1. Wejdź na [app.pagescms.org](https://app.pagescms.org)
2. Zaloguj się przez GitHub
3. Wybierz repozytorium `jaku2019/polibudex-strona-v2`
4. Konfiguracja jest automatycznie wczytywana z pliku `.pages.yml`

### Co można edytować z CMS

| Sekcja | Opis |
|--------|------|
| **Posty bloga** | Tworzenie i edycja postów Markdown (tytuł, data, autor, tagi, cover, treść) |
| **Ustawienia globalne** | Nazwa strony, opis, email, social media |
| **Strona główna** | Hero (tytuł, slogan, CTA), sekcja O nas, odnogi organizacji |
| **Koło Naukowe** | Opis, członkowie zespołu, projekty, sekcja rekrutacji |
| **Zdjęcia** | Upload zdjęć do katalogu `src/assets/images/` |

## 🚀 Deploy na GitHub Pages

Deploy odbywa się automatycznie przez GitHub Actions po każdym push do gałęzi `main`.

### Konfiguracja GitHub Pages (jednorazowa)

1. Przejdź do **Settings → Pages** w repozytorium
2. W **Source** wybierz **GitHub Actions**
3. Przy następnym push na `main` strona zostanie automatycznie wdrożona

### Ręczny deploy

```bash
git add .
git commit -m "Aktualizacja treści"
git push origin main
# GitHub Actions automatycznie zbuduje i wdroży stronę
```

## 📁 Struktura plików

```
/
├── .pages.yml              # Konfiguracja Pages CMS
├── .eleventy.js            # Konfiguracja Eleventy
├── package.json            # Zależności npm
├── .gitignore
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions – deploy na GitHub Pages
└── src/
    ├── _includes/
    │   ├── layouts/        # Bazowe layouty (base, post, page)
    │   └── components/     # Komponenty (navbar, footer, post-card, …)
    ├── _data/              # Dane JSON (konfiguracja treści)
    │   ├── site.json       # Globalne ustawienia
    │   ├── homepage.json   # Dane strony głównej
    │   ├── kolo.json       # Dane koła naukowego
    │   └── navigation.json # Menu nawigacyjne
    ├── assets/
    │   ├── css/style.css   # Główny arkusz stylów
    │   ├── js/main.js      # JavaScript (hamburger menu)
    │   └── images/         # Zdjęcia i ikony
    ├── posty/              # Posty bloga (Markdown)
    ├── index.njk           # Strona główna
    ├── kolo.njk            # Koło Naukowe
    ├── posty.njk           # Blog
    └── tagi.njk            # Strony tagów (generowane dynamicznie)
```

## 🎨 Design

- Motyw kolorystyczny inspirowany GitHubem (granatowy + jasnoniebieski)
- Minimalistyczny, czytelny interfejs
- Responsive design (mobile-first)
- Dostępność (semantic HTML, ARIA labels, alt texts)
- Bez zewnętrznych bibliotek CSS/JS – czysty, szybki kod
