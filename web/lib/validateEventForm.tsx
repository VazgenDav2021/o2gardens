export function validateEventForm(form: any, date?: Date, tables?: any[]) {
  if (!form.nameRu || !form.nameAm || !form.nameEn)
    return "Введите название на всех языках";

  if (!form.hall) return "Выберите зал";

  if (!date) return "Выберите дату";

  if (!tables || tables.length === 0) return "Добавьте хотя бы один стол";

  return null;
}
