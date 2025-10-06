import { useState } from "react";
import { updateTable } from "../api/tables";
import toast, { Toaster } from "react-hot-toast";

export default function ReservationModal({ table, onClose, onUpdate }) {
  const [editMode, setEditMode] = useState(false);
  const reservation = table.reservation || {};

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    try {
      const updatedData = {
        isBooked: true,
        reservation: {
          name: form.get("name"),
          phone: form.get("phone"),
          comment: form.get("comment"),
          guests: form.get("guests") || table.guests,
          date: new Date(),
          isActive: true,
        },
      };

      await updateTable(table._id, updatedData);
      toast.success(`${table.name} ամրագրվել է հաջողությամբ`);
      setTimeout(() => {
        onUpdate?.();
        onClose();
      }, 2000);
    } catch (error) {
      toast.error("Չհաջողվեց պահպանել փոփոխությունները");
      console.error(error);
    }
  };

  const handleCancelReservation = async () => {
    const confirmed = window.confirm(
      "Դուք իսկապես ուզում եք չեղարկել ամրագրումը?"
    );
    if (!confirmed) return;

    try {
      const updatedData = {
        isBooked: false,
        reservation: {
          name: "",
          phone: "",
          comment: "",
          guests: null,
          date: null,
          isActive: false,
        },
      };

      await updateTable(table._id, updatedData);
      toast("Ամրագրումը չեղարկվեց");
      onUpdate?.();
      onClose();
    } catch (error) {
      toast.error("Չհաջողվեց չեղարկել ամրագրումը");
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg relative p-6">
        <h2 className="text-xl font-bold mb-4">Սեղան - {table.name}</h2>

        {table.isBooked && !editMode ? (
          <div className="space-y-3">
            <div>
              <strong>Անուն:</strong> {reservation.name || "-"}
            </div>
            <div>
              <strong>Հեռախոս:</strong> {reservation.phone || "-"}
            </div>
            <div>
              <strong>Հյուրերի քանակ:</strong> {reservation.guests || "-"}
            </div>
            <div>
              <strong>Մեկնաբանություն:</strong> {reservation.comment || "-"}
            </div>
            <div>
              <strong>Ամսաթիվ:</strong>{" "}
              {reservation.date
                ? new Date(reservation.date).toLocaleString("hy-AM")
                : "-"}
            </div>

            <div className="flex gap-2 mt-4">
              <button
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                onClick={() => setEditMode(true)}>
                Խմբագրել
              </button>
              <button
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                onClick={handleCancelReservation}>
                Չեղարկել
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Անուն</label>
              <input
                name="name"
                defaultValue={reservation.name}
                required
                className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Հեռախոս</label>
              <input
                name="phone"
                defaultValue={reservation.phone}
                required
                className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Հյուրերի քանակ</label>
              <input
                type="number"
                name="guests"
                defaultValue={reservation.guests || table.guests}
                min={1}
                max={table.guests}
                className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Մեկնաբանություն</label>
              <textarea
                name="comment"
                defaultValue={reservation.comment}
                rows={3}
                className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                {table.isBooked
                  ? "Պահպանել փոփոխությունները"
                  : "Հաստատել ամրագրումը"}
              </button>
              {table.isBooked && (
                <button
                  type="button"
                  className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
                  onClick={() => setEditMode(false)}>
                  Չեղարկել խմբագրումը
                </button>
              )}
            </div>
          </form>
        )}

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black transition text-xl font-bold">
          ✕
        </button>
      </div>
    </div>
  );
}
