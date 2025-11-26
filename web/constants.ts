export const HALLS = [
  { value: "69257f62b3c7804285f98bd8", label: "Главный Зал" },
  { value: "hall2", label: "Зал 2" },
  { value: "hall3", label: "Зал 3" },
];

export const DEFAULT_EVENT_VALUES = {
  name: { ru: "Концерт Агутина", en: "Agutin Concert", hy: "Ագուտին կոնկերտ" },
  description: {
    ru: "Концерт Агутина",
    en: "Agutin Concert",
    hy: "Ագուտին կոնկերտ",
  },
  artists: {
    ru: "Агутин, Тата Симонян",
    en: "Agutin, Tata Simonian",
    hy: "Ագուտին, Թատա Սիմոնյան",
  },
  isAdult: false,
  hall: "6924366d8f287dfaaed93cca",
  menu: [
    {
      name: { en: "Wine Selection", ru: "Подборка Вин", hy: "Գինու Ընտրանի" },
      description: {
        en: "Premium wine selection including red, white, and sparkling wines",
        ru: "Премиальная подборка вин, включая красные, белые и игристые вина",
        hy: "Պրեմիում գինու ընտրանի, ներառյալ կարմիր, սպիտակ և փրփրուն գինիներ",
      },
      price: 15000,
    },
  ],
  schema: undefined,
  timeStart: "12:00",
  deposit: "12500",
  image: "",
  capacity: 120,
  date: new Date("2025-11-29").getTime(),
};
