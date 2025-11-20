import { EventType, Locale } from "@/types";

type Mode = "normal" | "empty" | "error";

/**
 * Fetches mock event data.
 */
export const getMockEvents = async (
  mode: Mode = "normal",
  lang: Locale = "ru"
): Promise<EventType[]> => {
  if (mode === "error") {
    throw new Error(
      lang === "ru"
        ? "Ошибка при загрузке мероприятий"
        : lang === "en"
        ? "Failed to load events"
        : "Միջոցառումները բեռնել հնարավոր չէր"
    );
  }

  if (mode === "empty") return [];

  const baseEvents = [
    {
      id: "event-1",
      title: {
        ru: "Джазовый вечер",
        en: "Jazz Evening",
        hy: "Ջազային երեկո",
      },
      dateISO: "2025-11-05",
      timeStart: "19:00",
      timeEnd: "23:00",
      hall: {
        ru: "Основной зал",
        en: "Main Hall",
        hy: "Հիմնական սրահ",
      },
      hallId: "hall-1",
      capacity: 150,
      description: {
        ru: "Насладитесь живой джазовой музыкой в исполнении лучших артистов города",
        en: "Enjoy live jazz music performed by the city's best artists",
        hy: "Վայելեք կենդանի ջազ երաժշտություն՝ քաղաքի լավագույն արտիստների կատարմամբ",
      },
      artists: {
        ru: ["Джон Смит", "Мария Иванова", "Александр Петров"],
        en: ["John Smith", "Maria Ivanova", "Alexander Petrov"],
        hy: ["Ջոն Սմիթ", "Մարիա Իվանովա", "Ալեքսանդր Պետրով"],
      },
      deposit: 15000,
      image: "/event-jazz.jpg",
      status: "available",
    },
    {
      id: "event-2",
      title: {
        ru: "Классическая музыка",
        en: "Classical Music",
        hy: "Կլասիկական երաժշտություն",
      },
      dateISO: "2025-11-10",
      timeStart: "20:00",
      timeEnd: "22:30",
      hall: {
        ru: "VIP зал",
        en: "VIP Hall",
        hy: "VIP սրահ",
      },
      hallId: "hall-2",
      capacity: 50,
      description: {
        ru: "Вечер классической музыки с симфоническим оркестром",
        en: "An evening of classical music with a symphony orchestra",
        hy: "Կլասիկական երաժշտության երեկո՝ սիմֆոնիկ նվագախմբի հետ",
      },
      artists: {
        ru: ["Симфонический оркестр", "Анна Сергеева"],
        en: ["Symphony Orchestra", "Anna Sergeeva"],
        hy: ["Սիմֆոնիկ նվագախումբ", "Աննա Սերգեևա"],
      },
      deposit: 20000,
      image: "/event-classical.jpg",
      status: "available",
    },
    {
      id: "event-3",
      title: {
        ru: "Караоке вечер",
        en: "Karaoke Night",
        hy: "Կարաոկե երեկո",
      },
      dateISO: "2025-11-15",
      timeStart: "18:00",
      timeEnd: "00:00",
      hall: {
        ru: "Терраса",
        en: "Terrace",
        hy: "Տերասա",
      },
      hallId: "hall-3",
      capacity: 100,
      description: {
        ru: "Пойте ваши любимые песни в отличной компании",
        en: "Sing your favorite songs in a great company",
        hy: "Երգեք ձեր սիրելի երգերը լավ ընկերակցությամբ",
      },
      artists: {
        ru: ["DJ Максим", "Ведущий Артем"],
        en: ["DJ Maxim", "Host Artem"],
        hy: ["DJ Մաքսիմ", "Մեկնաբան Արտեմ"],
      },
      deposit: 12000,
      image: "/event-karaoke.jpg",
      status: "available",
    },
    {
      id: "event-4",
      title: {
        ru: "Рок концерт",
        en: "Rock Concert",
        hy: "Ռոք համերգ",
      },
      dateISO: "2025-11-20",
      timeStart: "21:00",
      timeEnd: "02:00",
      hall: {
        ru: "Основной зал",
        en: "Main Hall",
        hy: "Հիմնական սրահ",
      },
      hallId: "hall-1",
      capacity: 150,
      description: {
        ru: "Зажигательный рок-концерт с участием популярных групп",
        en: "An energetic rock concert with popular bands",
        hy: "Էներգետիկ ռոք համերգ՝ հայտնի խմբերի մասնակցությամբ",
      },
      artists: {
        ru: ["Группа 'Ветер'", "Группа 'Огонь'"],
        en: ["Band 'Wind'", "Band 'Fire'"],
        hy: ["Խումբ 'Ձմեռ'", "Խումբ 'Կրակ'"],
      },
      deposit: 18000,
      image: "/event-classical.jpg",
      status: "available",
    },
    {
      id: "event-5",
      title: {
        ru: "Электронная музыка",
        en: "Electronic Music",
        hy: "Էլեկտրոնային երաժշտություն",
      },
      dateISO: "2025-11-25",
      timeStart: "22:00",
      timeEnd: "04:00",
      hall: {
        ru: "Основной зал",
        en: "Main Hall",
        hy: "Հիմնական սրահ",
      },
      hallId: "hall-1",
      capacity: 150,
      description: {
        ru: "Ночь электронной музыки с лучшими диджеями",
        en: "A night of electronic music with top DJs",
        hy: "Էլեկտրոնային երաժշտության գիշեր՝ լավագույն DJ-ների հետ",
      },
      artists: {
        ru: ["DJ Alex", "DJ Marina"],
        en: ["DJ Alex", "DJ Marina"],
        hy: ["DJ Ալեքս", "DJ Մարինա"],
      },
      deposit: 16000,
      image: "/event-karaoke.jpg",
      status: "available",
    },
  ];

  const events = baseEvents.map((event) => ({
    id: event.id,
    title: event.title[lang],
    date: new Date(event.dateISO).getTime(),
    dateISO: event.dateISO,
    time: `${event.timeStart} - ${event.timeEnd}`,
    hall: event.hall[lang],
    hallId: event.hallId,
    capacity: event.capacity,
    description: event.description[lang],
    artists: event.artists[lang],
    deposit: event.deposit,
    image: event.image,
    status: event.status,
    timeStart: event.timeStart,
    timeEnd: event.timeEnd,
  }));

  return events;
};

/**
 * Fetches a single mock event by ID.
 */
export const getEventById = async (
  id: string,
  lang: Locale = "ru"
): Promise<EventType | null> => {
  const events = await getMockEvents("normal", lang);
  return events.find((event) => event.id === id) || null;
};
