import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";

const timeSlots = [
  "9:00 AM",
  "10:30 AM",
  "12:00 PM",
  "2:00 PM",
  "3:30 PM",
  "5:00 PM",
];

const services = [
  "Haircuts",
  "Nail Services",
  "Tutoring",
  "Photography",
  "Graphic Design",
];

export default function BookingPage() {
  const { id } = useParams();
  const [selectedService, setSelectedService] = useState(services[0]);
  const [selectedTime, setSelectedTime] = useState(timeSlots[0]);
  const [message, setMessage] = useState("");

  const confirmation = useMemo(
    () => ({
      providerId: id ?? "N/A",
      service: selectedService,
      time: selectedTime,
    }),
    [id, selectedService, selectedTime]
  );

  return (
    <div className="min-h-screen bg-purple-50/40 px-6 pb-16 pt-24 text-slate-900">
      <div className="mx-auto max-w-5xl space-y-10">
        <header className="rounded-2xl border border-amber-200/60 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-500">
            Booking
          </p>
          <h1 className="mt-3 text-3xl font-semibold">Schedule Your Appointment</h1>
          <p className="mt-2 text-sm text-slate-600">
            Choose a service, pick a time slot, and send a note to the provider.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6 rounded-2xl border border-amber-200/60 bg-white p-6 shadow-sm">
            <div>
              <h2 className="text-lg font-semibold">Service Selection</h2>
              <p className="text-sm text-slate-600">
                Pick the service you want to book.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {services.map((service) => (
                  <button
                    key={service}
                    type="button"
                    onClick={() => setSelectedService(service)}
                    className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${
                      selectedService === service
                        ? "border-purple-700 bg-purple-700 text-white"
                        : "border-purple-200/60 bg-white text-slate-800 hover:border-purple-300"
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold">Available Time Slots</h2>
              <p className="text-sm text-slate-600">
                Select a time that works for you.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTime(slot)}
                    className={`rounded-lg border px-3 py-2 text-sm transition ${
                      selectedTime === slot
                        ? "border-purple-700 bg-purple-700 text-white"
                        : "border-purple-200/60 bg-white text-slate-700 hover:border-purple-300"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold">Message the Provider</h2>
              <p className="text-sm text-slate-600">
                Share any details or questions before confirming.
              </p>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Add a note about location, preferences, or questions."
                rows={4}
                className="mt-3 w-full rounded-xl border border-purple-200/60 bg-purple-50 px-4 py-3 text-sm text-slate-800 focus:border-purple-300 focus:outline-none"
              />
            </div>

            <button
              type="button"
              className="w-full rounded-xl bg-purple-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-purple-800"
            >
              Confirm Appointment
            </button>
          </div>

          <aside className="space-y-6 rounded-2xl border border-amber-200/60 bg-white p-6 shadow-sm">
            <div>
              <h2 className="text-lg font-semibold">Appointment Summary</h2>
              <div className="mt-4 space-y-3 text-sm text-slate-700">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Provider ID</span>
                  <span className="font-medium text-slate-900">{confirmation.providerId}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Service</span>
                  <span className="font-medium text-slate-900">{confirmation.service}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Time</span>
                  <span className="font-medium text-slate-900">{confirmation.time}</span>
                </div>
                <div className="rounded-xl border border-purple-200/60 bg-purple-50 px-3 py-2 text-xs text-slate-600">
                  You will receive a confirmation message once the provider accepts the booking.
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-purple-200/60 bg-purple-50 px-4 py-3 text-sm text-slate-600">
              Need to browse more options?{" "}
              <Link className="font-semibold text-purple-900" to="/Services">
                Back to Services
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
