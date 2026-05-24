import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import { useParams, Link } from "react-router-dom";
import type { Provider } from "../DataTypes/types";

const ProvidersPage = () => {
  // STATE MANAGEMENT

  const [sessionUserId, setSessionUserId] = useState<string | null>(null); // Logged-in user id
  const [provider, setProvider] = useState<Provider | null>(null); // Provider data
  const [form, setForm] = useState<Partial<Provider>>({}); // Editable form data
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const { id } = useParams(); // Provider ID from URL

  /*───────────────────────────────────────────
    STEP 1: FETCH LOGGED-IN USER SESSION
  ───────────────────────────────────────────*/
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSessionUserId(session?.user?.id ?? null);
    };
    fetchUser();
  }, []);

  /*───────────────────────────────────────────
    STEP 2: FETCH PROVIDER DATA BY ID
  ───────────────────────────────────────────*/
  useEffect(() => {
    const fetchProvider = async () => {
      const { data, error } = await supabase
        .from("providers")
        .select("*")
        .eq("id", id)
        .single();

      if (error) console.error("Error fetching provider:", error);
      else if (data) setProvider(data);
      setLoading(false);
    };

    if (id) fetchProvider();
  }, [id]);

  /*───────────────────────────────────────────
    STEP 3: PREFILL FORM WHEN PROVIDER DATA LOADS
  ───────────────────────────────────────────*/
  useEffect(() => {
    if (provider) setForm(provider);
  }, [provider]);

  /*───────────────────────────────────────────
    STEP 4: SAVE CHANGES (ONLY FOR OWNER)
  ───────────────────────────────────────────*/
  const handleSave = async () => {
    if (!sessionUserId || !provider) return;

    const updates = {
      ...form,
      user_id: sessionUserId, // required for Supabase RLS
    };

    const { error } = await supabase
      .from("providers")
      .update(updates)
      .eq("user_id", sessionUserId); // ensures only own row updates

    if (error) {
      alert("Update failed: " + error.message);
    } else {
      alert("Profile updated!");
      setEditing(false);

      // Re-fetch updated data
      const { data } = await supabase
        .from("providers")
        .select("*")
        .eq("id", id)
        .single();
      setProvider(data);
    }
  };

  /*───────────────────────────────────────────
    STEP 5: DETERMINE IF CURRENT USER OWNS THIS PROFILE
  ───────────────────────────────────────────*/
  const isOwner = provider && sessionUserId === provider.user_id;

  /*───────────────────────────────────────────
    STEP 6: HANDLE LOADING STATES
  ───────────────────────────────────────────*/
  if (loading)
    return <p className="mt-20 text-center text-blue-600">Loading...</p>;
  if (!provider)
    return <p className="mt-20 text-center text-slate-600">Provider not found.</p>;

  /*───────────────────────────────────────────
    STEP 7: RENDER
  ───────────────────────────────────────────*/
  const portfolioImages = Array.from({ length: 4 }).map((_, idx) => ({
    id: idx,
    src: provider.profile_image_url || "/sample1.jpg",
  }));

  const reviews = [
    {
      name: "Jordan M.",
      rating: "4.8",
      text: "Fast response, clear communication, and exactly what I needed.",
    },
    {
      name: "Ava T.",
      rating: "4.7",
      text: "Great service and friendly. The booking flow was smooth.",
    },
    {
      name: "Liam P.",
      rating: "4.9",
      text: "Very professional and affordable. Will book again.",
    },
  ];

  return (
    <div className="page-shell">
      <div className="app-card mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <div className="flex-shrink-0">
            <img
              src={provider.profile_image_url || "/sample1.jpg"}
              alt={`${provider.first_name} ${provider.last_name}`}
              className="h-32 w-32 rounded-[28px] object-cover border border-blue-100"
            />
          </div>
          <div className="flex-1">
            <p className="app-badge">Provider Profile</p>
            <h1 className="mt-3 text-3xl font-semibold">
              {provider.first_name} {provider.last_name}
            </h1>
            <p className="app-subtle mt-2 text-sm">
              {provider.service_title} · {provider.category}
            </p>
            <p className="mt-4 text-sm text-slate-700">{provider.description}</p>
          </div>
          <div className="flex flex-col items-start gap-3 md:items-end">
            <p className="text-sm text-slate-500">Starting at</p>
            <p className="text-2xl font-semibold text-slate-900">{provider.price || "$20"}</p>
            <Link
              to={`/booking/${provider.id}`}
              className="app-btn-primary"
            >
              Book Appointment
            </Link>
            <button
              type="button"
              onClick={() => {
                if (!sessionUserId) {
                  alert("You must be logged in to edit.");
                  return;
                }
                if (!isOwner) {
                  alert("You can only edit your own profile.");
                  return;
                }
                setEditing(true);
              }}
              disabled={!sessionUserId || !isOwner}
              title={sessionUserId && isOwner ? "Edit profile" : "Login to edit"}
              aria-label={sessionUserId && isOwner ? "Edit profile" : "Login to edit"}
              className={`inline-flex items-center justify-center rounded-full border px-3 py-3 transition ${
                sessionUserId && isOwner
                  ? "border-[var(--google-border)] bg-white text-blue-700 hover:bg-blue-50"
                  : "border-[var(--google-border)] bg-white text-slate-300 cursor-not-allowed opacity-70"
              }`}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-6xl grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="app-card">
            <h2 className="text-lg font-semibold">Portfolio</h2>
            <p className="app-subtle mt-2 text-sm">
              Recent work and service highlights.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {portfolioImages.map((image) => (
                <img
                  key={image.id}
                  src={image.src}
                  alt="Portfolio sample"
                  className="h-32 w-full rounded-2xl object-cover border border-blue-100"
                />
              ))}
            </div>
          </div>

          <div className="app-card">
            <h2 className="text-lg font-semibold">Pricing & Services</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-700">
              <div className="flex items-center justify-between">
                <span>Base service</span>
                <span className="font-semibold text-slate-900">{provider.price || "$20"}</span>
              </div>
              {provider.offers && provider.offers.length > 0 ? (
                provider.offers.map((offer, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span>{offer.text}</span>
                    <span className="text-slate-500">Custom</span>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-between text-slate-500">
                  <span>Custom add-ons</span>
                  <span>Available upon request</span>
                </div>
              )}
            </div>
          </div>

          <div className="app-card">
            <h2 className="text-lg font-semibold">Ratings & Reviews</h2>
            <div className="mt-4 space-y-4">
              {reviews.map((review, index) => (
                <div key={index} className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-900">{review.name}</span>
                    <span className="text-blue-700">{review.rating} ★</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="app-card">
            <h2 className="text-lg font-semibold">Availability</h2>
            <p className="app-subtle mt-2 text-sm">
              Available time slots this week.
            </p>
            <div className="mt-4 space-y-2 text-sm text-slate-700">
              {provider.availability && provider.availability.length ? (
                provider.availability.map((slot, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span>{slot.day}</span>
                    <span className="font-semibold text-slate-900">
                      {slot.start} - {slot.end}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-slate-500">No availability listed.</p>
              )}
            </div>
          </div>

          <div className="app-card">
            <h2 className="text-lg font-semibold">About</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-700">
              <p>
                <strong>Bio:</strong> {provider.bio || "No bio provided"}
              </p>
              <p>
                <strong>Experience:</strong> {provider.experience || "N/A"}
              </p>
              <p>
                <strong>Location:</strong> {provider.location}
              </p>
              <p>
                <strong>Contact:</strong> {provider.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      {editing && isOwner ? (
        <div className="app-card mx-auto mt-8 max-w-6xl">
          <div className="text-center mb-6">
            <h1 className="font-semibold text-xl mb-7">Edit Your Profile</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div>
                <label className="text-sm text-slate-600">First Name</label>
                <input
                  className="app-input"
                  value={form.first_name || ""}
                  onChange={(e) =>
                    setForm({ ...form, first_name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-sm text-slate-600">Last Name</label>
                <input
                  className="app-input"
                  value={form.last_name || ""}
                  onChange={(e) =>
                    setForm({ ...form, last_name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-sm text-slate-600">Service Title</label>
                <input
                  className="app-input"
                  value={form.service_title || ""}
                  onChange={(e) =>
                    setForm({ ...form, service_title: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-sm text-slate-600">Category</label>
                <input
                  className="app-input"
                  value={form.category || ""}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                />
              </div>

              <div className="col-span-2">
                <label className="text-sm text-slate-600">Description</label>
                <textarea
                  className="app-input"
                  value={form.description || ""}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-sm text-slate-600">Price</label>
                <input
                  className="app-input"
                  value={form.price || ""}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm text-slate-600">Location </label>
                <input
                  className="app-input"
                  value={form.location || ""}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                />
              </div>

              <div className="col-span-2">
                <label className="text-sm text-slate-600">Bio</label>
                <textarea
                  className="app-input"
                  value={form.bio || ""}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                />
              </div>

              <div className="col-span-2">
                <label className="text-sm text-slate-600">Experience</label>
                <textarea
                  className="app-input"
                  value={form.experience || ""}
                  onChange={(e) =>
                    setForm({ ...form, experience: e.target.value })
                  }
                />
              </div>

              <div className="col-span-2">
                <label className="text-sm text-slate-600">Personal Site</label>
                <input
                  className="app-input"
                  value={form.site || ""}
                  onChange={(e) => setForm({ ...form, site: e.target.value })}
                />
              </div>
            </div>

            {/* Save / Cancel buttons */}
            <div className="flex justify-center gap-4 mt-6">
              {/* 🔹 SAVE BUTTON — only enabled if logged in */}
              <button
                onClick={() => {
                  if (!sessionUserId) {
                    alert("You must be logged in to save changes.");
                    return;
                  }
                  handleSave();
                }}
                disabled={!sessionUserId}
                className={`font-semibold rounded-xl px-6 py-3 transition ${
                  sessionUserId
                    ? "bg-purple-700 text-white hover:bg-purple-800"
                    : "bg-purple-200 text-white cursor-not-allowed opacity-70"
                }`}
              >
                {sessionUserId ? "Save" : "Login to Save"}
              </button>

              {/* CANCEL BUTTON */}
              <button
                className="bg-purple-100 text-purple-900 font-semibold rounded-xl px-6 py-3 hover:bg-purple-200"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProvidersPage;
