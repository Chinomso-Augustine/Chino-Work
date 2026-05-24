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
    <div className="page-shell">
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="app-card">
          <p className="app-badge">
            Booking
          </p>
          <h1 className="mt-3 text-3xl font-semibold">Schedule Your Appointment</h1>
          <p className="app-subtle mt-2 text-sm">
            Choose a service, pick a time slot, and send a note to the provider.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
          <div className="app-card space-y-6">
            <div>
              <h2 className="text-lg font-semibold">Service Selection</h2>
              <p className="app-subtle text-sm">
                Pick the service you want to book.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {services.map((service) => (
                  <button
                    key={service}
                    type="button"
                    onClick={() => setSelectedService(service)}
                    className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
                      selectedService === service
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-[var(--google-border)] bg-white text-slate-800 hover:bg-blue-50 hover:text-blue-700"
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold">Available Time Slots</h2>
              <p className="app-subtle text-sm">
                Select a time that works for you.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTime(slot)}
                    className={`rounded-full border px-3 py-2 text-sm transition ${
                      selectedTime === slot
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-[var(--google-border)] bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold">Message the Provider</h2>
              <p className="app-subtle text-sm">
                Share any details or questions before confirming.
              </p>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Add a note about location, preferences, or questions."
                rows={4}
                className="app-input mt-3"
              />
            </div>

            <button
              type="button"
              className="app-btn-primary w-full rounded-full"
            >
              Confirm Appointment
            </button>
          </div>

          <aside className="app-card space-y-6">
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
                <div className="rounded-2xl border border-blue-100 bg-blue-50 px-3 py-3 text-xs text-slate-600">
                  You will receive a confirmation message once the provider accepts the booking.
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-slate-600">
              Need to browse more options?{" "}
              <Link className="app-link" to="/Services">
                Back to Services
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
