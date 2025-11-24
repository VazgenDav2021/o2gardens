"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { useToast } from "@/hooks/useToast";
import { Button } from "@/ui/button";
import { Label } from "@/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/ui/select";
import { Popover, PopoverTrigger, PopoverContent } from "@/ui/popover";
import { Calendar } from "@/ui/calendar";
import {
  CalendarIcon,
  Plus,
  Save,
  Trash2,
  Edit,
  Image as ImageIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";
import {
  getHalls,
  deleteHall,
  addSchema,
  deleteSchema,
  HallSchema,
} from "@/services/hallService";
import { getImageUrl } from "@/lib/getImageUrl";
import { Hall } from "@/types";

const HallSchemas = () => {
  const [halls, setHalls] = useState<Hall<'admin'>[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedHallId, setSelectedHallId] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [schemaDeleteDialogOpen, setSchemaDeleteDialogOpen] = useState(false);
  const [hallToDelete, setHallToDelete] = useState<Hall | null>(null);
  const [schemaToDelete, setSchemaToDelete] = useState<{
    hall: Hall;
    schema: HallSchema;
  } | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    loadHalls();
  }, []);

  const loadHalls = async () => {
    try {
      setLoading(true);
      const response = await getHalls<"admin">();
      setHalls(response.data);
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить залы",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddSchema = async () => {
    if (!selectedHallId || !startDate || !endDate) {
      toast({
        title: "Ошибка",
        description: "Заполните все поля",
        variant: "destructive",
      });
      return;
    }
    if (endDate < startDate) {
      toast({
        title: "Ошибка",
        description: "Дата окончания должна быть позже даты начала",
        variant: "destructive",
      });
      return;
    }

    try {
      await addSchema(selectedHallId, {
        dateRange: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        },
        tables: [],
        scenes: [],
      });
      toast({
        title: "Успешно",
        description: "Схема добавлена",
      });
      setSelectedHallId("");
      setStartDate(undefined);
      setEndDate(undefined);
      loadHalls();
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description:
          error?.response?.data?.message || "Не удалось добавить схему",
        variant: "destructive",
      });
    }
  };

  const handleDeleteHall = async () => {
    if (!hallToDelete?._id) return;

    try {
      await deleteHall(hallToDelete._id);
      toast({
        title: "Успешно",
        description: "Зал удален",
      });
      setDeleteDialogOpen(false);
      setHallToDelete(null);
      loadHalls();
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: error?.response?.data?.message || "Не удалось удалить зал",
        variant: "destructive",
      });
    }
  };

  const handleDeleteSchema = async () => {
    if (!schemaToDelete?.hall._id || !schemaToDelete?.schema._id) return;

    try {
      await deleteSchema(schemaToDelete.hall._id, schemaToDelete.schema._id);
      toast({
        title: "Успешно",
        description: "Схема удалена",
      });
      setSchemaDeleteDialogOpen(false);
      setSchemaToDelete(null);
      loadHalls();
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description:
          error?.response?.data?.message || "Не удалось удалить схему",
        variant: "destructive",
      });
    }
  };

  const formatDateRange = (schema: HallSchema) => {
    const start =
      schema.dateRange.startDate instanceof Date
        ? schema.dateRange.startDate
        : new Date(schema.dateRange.startDate);
    const end =
      schema.dateRange.endDate instanceof Date
        ? schema.dateRange.endDate
        : new Date(schema.dateRange.endDate);
    return `${format(start, "dd MMM yyyy", { locale: ru })} - ${format(
      end,
      "dd MMM yyyy",
      { locale: ru }
    )}`;
  };

  const getHallName = (hall: Hall, locale: "ru" | "en" | "hy" = "ru") => {
    return (
      hall.name?.[locale] ||
      hall.name?.en ||
      hall.name?.hy ||
      hall._id ||
      "Без названия"
    );
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="text-center py-12">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Залы и схемы</h2>
          <p className="text-muted-foreground mt-1">
            Управление залами и их схемами расположения столов
          </p>
        </div>
        <Button
          onClick={() => router.push("/admin-side/dashboard/halls/create")}
          className="gap-2">
          <Plus className="w-4 h-4" /> Создать зал
        </Button>
      </div>

      <Card className="shadow-[var(--shadow-card)]">
        <CardHeader>
          <CardTitle>Добавить схему к залу</CardTitle>
          <CardDescription>
            Выберите зал и интервал дат для новой схемы
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Зал *</Label>
              <Select value={selectedHallId} onValueChange={setSelectedHallId}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите зал" />
                </SelectTrigger>
                <SelectContent>
                  {halls.map((hall) => (
                    <SelectItem key={hall._id} value={hall._id || ""}>
                      {getHallName(hall)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Дата начала *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate
                      ? format(startDate, "dd MMMM yyyy", { locale: ru })
                      : "Выберите дату"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    locale={ru}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label>Дата окончания *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate
                      ? format(endDate, "dd MMMM yyyy", { locale: ru })
                      : "Выберите дату"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    locale={ru}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              onClick={handleAddSchema}
              className="gap-2"
              disabled={!selectedHallId || !startDate || !endDate}>
              <Save className="w-4 h-4" /> Добавить схему
            </Button>
          </div>
        </CardContent>
      </Card>

      {halls.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">Нет созданных залов</p>
            <Button
              onClick={() => router.push("/admin-side/dashboard/halls/create")}>
              Создать первый зал
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {halls.map((hall) => (
            <Card key={hall._id} className="shadow-md">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      {hall.image && (
                        <img
                          src={getImageUrl(hall.image)}
                          alt={getHallName(hall)}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      )}
                      <div>
                        <CardTitle className="text-2xl">
                          {getHallName(hall)}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          Вместимость: {hall.capacity} человек
                        </p>
                        {hall.description?.ru && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {hall.description.ru}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        router.push(
                          `/admin-side/dashboard/halls/${hall._id}/edit`
                        )
                      }>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setHallToDelete(hall);
                        setDeleteDialogOpen(true);
                      }}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Схемы зала:</h4>
                    {hall.schemas && hall.schemas.length > 0 ? (
                      <div className="space-y-2">
                        {hall.schemas.map((schema) => (
                          <div
                            key={schema._id}
                            className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <p className="font-medium">
                                {formatDateRange(schema)}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Столов: {schema.tables?.length || 0} | Сцен:{" "}
                                {schema.scenes?.length || 0}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                  router.push(
                                    `/admin-side/dashboard/halls/${hall._id}/schemas/${schema._id}/edit`
                                  )
                                }>
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setSchemaToDelete({ hall, schema });
                                  setSchemaDeleteDialogOpen(true);
                                }}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Нет схем для этого зала
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Удалить зал?</DialogTitle>
            <DialogDescription>
              Вы уверены, что хотите удалить зал "
              {hallToDelete ? getHallName(hallToDelete) : ""}"? Это действие
              нельзя отменить.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}>
              Отмена
            </Button>
            <Button variant="destructive" onClick={handleDeleteHall}>
              Удалить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={schemaDeleteDialogOpen}
        onOpenChange={setSchemaDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Удалить схему?</DialogTitle>
            <DialogDescription>
              Вы уверены, что хотите удалить схему из зала "
              {schemaToDelete ? getHallName(schemaToDelete.hall) : ""}"? Это
              действие нельзя отменить.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setSchemaDeleteDialogOpen(false)}>
              Отмена
            </Button>
            <Button variant="destructive" onClick={handleDeleteSchema}>
              Удалить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HallSchemas;
