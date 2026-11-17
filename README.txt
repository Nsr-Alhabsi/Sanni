SANNI SHOWCASE SITE
===================
Pages
  index.html  About the company (landing page)
  app.html    Interactive Sanni platform demo (search, filters, details, providers, saved, skills profile)

Run: double-click index.html (works offline, no install, no build step).
Hosting later: upload this whole folder to any static host (GitHub Pages, Netlify...).

FOLDER MAP
  css/base.css   Shared: fonts, colour tokens (:root), buttons, header
  css/site.css   Landing page only
  css/app.css    Demo app only
  js/site/content.js   Landing page text, Arabic + English (keys match data-i18n in index.html)
  js/site/main.js      Landing page behaviour: language switch, mobile menu, scroll reveal
  js/app/              Demo app, one job per file, loaded in this order by app.html:
    strings.js     UI text (ar/en)
    data.js        Sample programmes, providers, categories, governorates, types
    state.js       App state + localStorage save/load
    helpers.js     $, t(), esc(), formatting, toast
    filters.js     Explore search/filter logic
    components.js  Reusable HTML pieces (programme card, empty box)
    views.js       The four pages: Explore, Providers, Saved, My profile
    dialog.js      Programme details + registration form dialog
    actions.js     Things users do (save, request, add skill, change language...)
    events.js      Click/input/submit wiring (buttons use data-* attributes)
    boot.js        Starts the app

COMMON EDITS
  Team names/roles:   js/site/content.js, keys tm1n..tm5r
  Colours:            css/base.css, :root variables at the top
  Logo:               assets/logo.png (transparent), assets/logo.jpg (original)
  Instagram link:     index.html, search for "instagram.com"
  Demo programmes:    js/app/data.js
  Demo UI wording:    js/app/strings.js
  Add a new tab/page: views.js (TABS + VIEWS + a renderX function), strings.js (label)

All sample data is fictional. Saved items/requests/profile are stored only in the browser (localStorage).
