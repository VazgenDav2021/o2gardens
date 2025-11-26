"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { useToast } from "@/hooks/useToast";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";
import { Plus, Edit, Trash2, Calendar, Clock, Users } from "lucide-react";
import { getEvents, deleteEvent } from "@/services";
import { Event } from "@/types";
import { getImageUrl } from "@/lib/getImageUrl";

export default function EventsPage() {
  const [events, setEvents] = useState<Event<"admin">[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<Event<"admin"> | null>(
    null
  );
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const response = await getEvents<"admin">();
      setEvents(response.data);
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить события",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async () => {
    if (!eventToDelete?._id) return;

    try {
      await deleteEvent(eventToDelete._id);
      toast({
        title: "Успешно",
        description: "Событие удалено",
      });
      setDeleteDialogOpen(false);
      setEventToDelete(null);
      loadEvents();
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description:
          error?.response?.data?.message || "Не удалось удалить событие",
        variant: "destructive",
      });
    }
  };

  const getEventName = (
    event: Event<"admin">,
    locale: "ru" | "en" | "hy" = "ru"
  ) => {
    return event.name?.[locale] || "Без названия";
  };

  const formatEventDate = (timestamp: number) => {
    return format(new Date(timestamp), "dd MMMM yyyy", { locale: ru });
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
          <h2 className="text-3xl font-bold">События</h2>
          <p className="text-muted-foreground mt-1">
            Управление событиями и мероприятиями
          </p>
        </div>
        <Button
          onClick={() => router.push("/admin-side/dashboard/events/create")}
          className="gap-2">
          <Plus className="w-4 h-4" /> Создать событие
        </Button>
      </div>

      {events.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">Нет созданных событий</p>
            <Button
              onClick={() =>
                router.push("/admin-side/dashboard/events/create")
              }>
              Создать первое событие
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {events.map((event) => (
            <Card
              key={event._id}
              className="shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() =>
                router.push(`/admin-side/dashboard/events/${event._id}/update`)
              }>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1 flex gap-4">
                    {event.image && (
                      <img
                        src={getImageUrl(event.image)}
                        alt={getEventName(event)}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2">
                        {getEventName(event)}
                      </CardTitle>
                      {event.description?.ru && (
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {event.description.ru}
                        </p>
                      )}
                      {event.artists?.ru && (
                        <p className="text-sm font-medium mb-3">
                          Артисты: {event.artists.ru}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{formatEventDate(event.date)}</span>
                        </div>
                        {event.timeStart && (
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{event.timeStart}</span>
                          </div>
                        )}
                        {event.capacity && (
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            <span>Вместимость: {event.capacity}</span>
                          </div>
                        )}
                        {event.deposit && (
                          <div>
                            <span>Депозит: {event.deposit} ₽</span>
                          </div>
                        )}
                        {event.isAdult && (
                          <div className="text-orange-500 font-medium">18+</div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    className="flex gap-2"
                    onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        router.push(
                          `/admin-side/dashboard/events/${event._id}/update`
                        )
                      }>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setEventToDelete(event);
                        setDeleteDialogOpen(true);
                      }}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Удалить событие?</DialogTitle>
            <DialogDescription>
              Вы уверены, что хотите удалить событие "
              {eventToDelete ? getEventName(eventToDelete) : ""}"? Это действие
              нельзя отменить.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}>
              Отмена
            </Button>
            <Button variant="destructive" onClick={handleDeleteEvent}>
              Удалить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
