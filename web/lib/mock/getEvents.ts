import { EventType } from "@/types";

type Mode = "normal" | "empty" | "error";

export const getMockEvents = async (mode: Mode = "normal"): Promise<EventType[]> => {
  if (mode === "error") {
    throw new Error("Ошибка при загрузке мероприятий");
  }

  if (mode === "empty") {
    return [];
  }

  return [
    {
      id: "event-1",
      title: "Джазовый вечер",
      date: "5 ноября 2025",
      dateISO: "2025-11-05",
      time: "19:00 - 23:00",
      hall: "Основной зал",
      hallId: "hall-1",
      capacity: 150,
      description:
        "Насладитесь живой джазовой музыкой в исполнении лучших артистов города",
      artists: ["Джон Смит", "Мария Иванова", "Александр Петров"],
      deposit: 15000,
      image: "/event-jazz.jpg",
      status: "available",
      timeEnd: "23:00",
      timeStart: "19:00",
    },
    {
      id: "event-2",
      title: "Классическая музыка",
      date: "10 ноября 2025",
      dateISO: "2025-11-10",
      time: "20:00 - 22:30",
      hall: "VIP зал",
      hallId: "hall-2",
      capacity: 50,
      description: "Вечер классической музыки с симфоническим оркестром",
      artists: ["Симфонический оркестр", "Анна Сергеева"],
      deposit: 20000,
      image: "/event-classical.jpg",
      status: "available",
       timeEnd: "23:00",
      timeStart: "19:00",
    },
    {
      id: "event-3",
      title: "Караоке вечер",
      date: "15 ноября 2025",
      dateISO: "2025-11-15",
      time: "18:00 - 00:00",
      hall: "Терраса",
      hallId: "hall-3",
      capacity: 100,
      description: "Пойте ваши любимые песни в отличной компании",
      artists: ["DJ Максим", "Ведущий Артем"],
      deposit: 12000,
      image: "/event-karaoke.jpg",
      status: "available",
      timeEnd: "23:00",
      timeStart: "19:00",
    },
    {
      id: "event-4",
      title: "Рок концерт",
      date: "20 ноября 2025",
      dateISO: "2025-11-20",
      time: "21:00 - 02:00",
      hall: "Основной зал",
      hallId: "hall-1",
      capacity: 150,
      description: "Зажигательный рок-концерт с участием популярных групп",
      artists: ["Группа 'Ветер'", "Группа 'Огонь'"],
      deposit: 18000,
      image: "/event-classical.jpg",
      status: "available",
      timeEnd: "23:00",
      timeStart: "19:00",
    },
    {
      id: "event-5",
      title: "Электронная музыка",
      date: "25 ноября 2025",
      dateISO: "2025-11-25",
      time: "22:00 - 04:00",
      hall: "Основной зал",
      hallId: "hall-1",
      capacity: 150,
      description: "Ночь электронной музыки с лучшими диджеями",
      artists: ["DJ Alex", "DJ Marina"],
      deposit: 16000,
      image: "/event-karaoke.jpg",
      status: "available",
      timeEnd: "23:00",
      timeStart: "19:00",
    },
  ];
};
