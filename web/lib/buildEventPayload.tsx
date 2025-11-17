import { Event } from "@/lib/eventService";

export function buildEventPayload(form: any, date: Date, tables: any[]): Event {
  return {
    name: {
      ru: form.nameRu,
      hy: form.nameAm,
      en: form.nameEn,
    },
    depositPerPerson: Number(form.deposit || 0),
    isAdult: Number(form.minAge || 0) >= 18,
    description: {
      ru: form.descriptionRu,
      hy: form.descriptionAm,
      en: form.descriptionEn,
    },
    hall: form.hall,
    Date: date.toISOString(),
    schema: tables.map((t) => ({
      _id: t._id,
      x: t.x,
      y: t.y,
      capacity: t.capacity,
      name: t.name,
      status: "available",
    })),
    artists: {
      ru: form.artistsRu,
      hy: form.artistsAm,
      en: form.artistsEn,
    },
    Image: form.image,
    menu: [],
    totalGuestQny: tables.reduce((sum, t) => sum + t.capacity, 0),
  };
}
