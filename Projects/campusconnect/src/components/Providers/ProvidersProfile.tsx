import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import { useParams } from "react-router-dom";
import type { Provider } from "../DataTypes/types";

const ProvidersPage = () => {
  /*───────────────────────────────────────────
    STATE MANAGEMENT
  ───────────────────────────────────────────*/
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
      const { data: { session } } = await supabase.auth.getSession();
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
    return <p className="text-white text-center mt-20">Loading...</p>;
  if (!provider)
    return <p className="text-white text-center mt-20">Provider not found.</p>;

  /*───────────────────────────────────────────
    STEP 7: RENDER
  ───────────────────────────────────────────*/
  return (
    <div className="border mt-6 bg-linear-to-b from-purple-700 via-indigo-800 to-purple-800">
      {/* ───── Header Section ───── */}
      <div
        className="flex w-full p-13 mt-10 bg-cover items-center relative"
        style={{
          backgroundImage: `url(${provider.profile_image_url || "/sample1.jpg"})`,
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative w-xs flex-shrink-0">
          <img
            src={provider.profile_image_url || "/sample1.jpg"}
            alt={`${provider.first_name} ${provider.last_name}`}
            className="h-80 w-80 rounded-full object-cover border"
          />
        </div>
        <div className="relative flex-grow flex justify-center">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl text-center p-6">
            <h1 className="text-3xl text-white md:text-5xl font-bold">
              {provider.first_name} {provider.last_name}
            </h1>
            <p className="text-2xl text-gray-100 mt-6">
              {provider.service_title} - {provider.category}
            </p>
            <p className="text-lg text-gray-100 mt-6">
              {provider.description}
            </p>
          </div>
        </div>
      </div>

      {/* ───── Main Content Section ───── */}
      <div className="backdrop-blur-sm shadow-md text-white rounded-2xl p-6">
        {/* ───── EDIT MODE ───── */}
        {editing && isOwner ? (
          <div className="bg-white/14 backdrop-blur-md shadow-md text-white text-center mb-6 rounded-2xl p-3">
            <h1 className="font-bold text-xl mb-7">Edit Your Profile</h1>

            {/* Editable Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              {/* First Name */}
              <div>
                <label>First Name</label>
                <input
                  className="text-black w-full p-2 rounded"
                  value={form.first_name || ""}
                  onChange={(e) =>
                    setForm({ ...form, first_name: e.target.value })
                  }
                />
              </div>

              {/* Last Name */}
              <div>
                <label>Last Name</label>
                <input
                  className="text-black w-full p-2 rounded"
                  value={form.last_name || ""}
                  onChange={(e) =>
                    setForm({ ...form, last_name: e.target.value })
                  }
                />
              </div>

              {/* Service Title */}
              <div>
                <label>Service Title</label>
                <input
                  className="text-black w-full p-2 rounded"
                  value={form.service_title || ""}
                  onChange={(e) =>
                    setForm({ ...form, service_title: e.target.value })
                  }
                />
              </div>

              {/* Category */}
              <div>
                <label>Category</label>
                <input
                  className="text-black w-full p-2 rounded"
                  value={form.category || ""}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                />
              </div>

              {/* Description */}
              <div className="col-span-2">
                <label>Description</label>
                <textarea
                  className="text-black w-full p-2 rounded"
                  value={form.description || ""}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </div>

              {/* Price */}
              <div>
                <label>Price</label>
                <input
                  className="text-black w-full p-2 rounded"
                  value={form.price || ""}
                  onChange={(e) =>
                    setForm({ ...form, price: e.target.value })
                  }
                />
              </div>

              {/* Location */}
              <div>
                <label>Location</label>
                <input
                  className="text-black w-full p-2 rounded"
                  value={form.location || ""}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                />
              </div>

              {/* Bio */}
              <div className="col-span-2">
                <label>Bio</label>
                <textarea
                  className="text-black w-full p-2 rounded"
                  value={form.bio || ""}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                />
              </div>

              {/* Experience */}
              <div className="col-span-2">
                <label>Experience</label>
                <textarea
                  className="text-black w-full p-2 rounded"
                  value={form.experience || ""}
                  onChange={(e) =>
                    setForm({ ...form, experience: e.target.value })
                  }
                />
              </div>

              {/* Site */}
              <div className="col-span-2">
                <label>Personal Site</label>
                <input
                  className="text-black w-full p-2 rounded"
                  value={form.site || ""}
                  onChange={(e) =>
                    setForm({ ...form, site: e.target.value })
                  }
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
                className={`font-bold rounded-xl px-6 py-3 transition ${
                  sessionUserId
                    ? "bg-white text-black hover:bg-purple-300"
                    : "bg-gray-400 text-white cursor-not-allowed opacity-70"
                }`}
              >
                {sessionUserId ? "Save" : "Login to Save"}
              </button>

              {/* CANCEL BUTTON */}
              <button
                className="bg-gray-400 text-white font-bold rounded-xl px-6 py-3 hover:bg-gray-500"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          /* ───── READ-ONLY MODE ───── */
          <div className="bg-white/14 backdrop-blur-md shadow-md text-white text-center mb-6 rounded-2xl p-3">
            <h1 className="font-bold text-xl mb-7">About</h1>
            <p className="p-2">
              <strong>Bio:</strong> {provider.bio || "No bio provided"}
            </p>
            <p className="p-2">
              <strong>Experience:</strong> {provider.experience || "N/A"}
            </p>
            <p className="p-2">
              <strong>Service Title:</strong> {provider.service_title}
            </p>
            <p className="p-2">
              <strong>Category:</strong> {provider.category}
            </p>
            <p className="p-2">
              <strong>Description:</strong> {provider.description}
            </p>
            <p className="p-2">
              <strong>Price:</strong> {provider.price}
            </p>
            <p className="p-2">
              <strong>Location:</strong> {provider.location}
            </p>
            <p className="p-2">
              <strong>Site:</strong> {provider.site}
            </p>

            {/* 🔹 EDIT BUTTON — disabled if not logged in or not owner */}
            <div className="flex justify-center mb-6 mt-4">
              <button
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
                className={`font-bold rounded-xl px-6 py-3 transition ${
                  sessionUserId && isOwner
                    ? "bg-white text-black hover:bg-purple-300"
                    : "bg-gray-400 text-white cursor-not-allowed opacity-70"
                }`}
              >
                {sessionUserId && isOwner
                  ? "Edit Profile"
                  : "Login to Edit"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProvidersPage;
