/**
 * Доля клиентской базы (ЮЛ) со склонностью к продукту — ориентир по рыночной статистике МСБ.
 * РКО почти всем; инкассация — наличная выручка; ВЭД — валюта/трансгран; эквайринг — ритейл и т.д.
 */
window.PRODUCTS = [
  { code: "CREDIT", name: "Кредитный продукт", group: "Финансирование", inclRate: 0.24 },
  { code: "FACTORING", name: "Факторинг", group: "Финансирование", inclRate: 0.055 },
  { code: "LEASING", name: "Лизинг", group: "Финансирование", inclRate: 0.08 },
  { code: "BG", name: "Банковская гарантия", group: "Финансирование", inclRate: 0.10 },
  { code: "BIZ_CARD", name: "Бизнес-карта", group: "Расчёты", inclRate: 0.48 },
  { code: "CASH_COLL", name: "Инкассация", group: "Расчёты", inclRate: 0.045 },
  { code: "CASH_COLL_ONLINE", name: "Онлайн-инкассация", group: "Расчёты", inclRate: 0.035 },
  { code: "FX_CTRL", name: "Валютный контроль и перевод", group: "ВЭД", inclRate: 0.065 },
  { code: "PAYROLL", name: "Зарплатный проект", group: "Расчёты", inclRate: 0.32 },
  { code: "RKO", name: "Расчетный счет (РКО)", group: "Расчёты", inclRate: 0.92 },
  { code: "ACQ_ECOM", name: "Интернет-эквайринг", group: "Эквайринг", inclRate: 0.09 },
  { code: "ACQ_POS", name: "Торговый эквайринг", group: "Эквайринг", inclRate: 0.14 },
  { code: "SBP", name: "Система быстрых платежей", group: "Эквайринг", inclRate: 0.26 },
  { code: "FX_CONV", name: "Конвертация валюты (ВЭД)", group: "ВЭД", inclRate: 0.055 },
  { code: "DEPOSIT", name: "Депозит", group: "Размещение", inclRate: 0.16 },
  { code: "FIXED_BALANCE", name: "Фиксированный остаток", group: "Размещение", inclRate: 0.18 },
  { code: "INTEREST_BALANCE", name: "Проценты на остаток по счету", group: "Размещение", inclRate: 0.28 },
  { code: "LC", name: "Аккредитив", group: "ВЭД", inclRate: 0.022 },
  { code: "HEDGE", name: "Хеджирование", group: "ВЭД", inclRate: 0.012 }
];
