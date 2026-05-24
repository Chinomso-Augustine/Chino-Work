import { useMemo, useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import { Link, useSearchParams } from "react-router-dom";
import type { Provider } from "../DataTypes/types";

function getCurrentDate() {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDay = new Date().getDay();
    return daysOfWeek[currentDay];
}

// Format full day name into three-letter abbreviation (e.g., Monday -> Mon)
function formatDay(day: string) {
    if (!day) return day;
    const dayNormalized = day.charAt(0).toUpperCase() + day.slice(1).toLowerCase();
    const map: Record<string, string> = {
        Sunday: 'Sun',
        Monday: 'Mon',
        Tuesday: 'Tue',
        Wednesday: 'Wed',
        Thursday: 'Thu',
        Friday: 'Fri',
        Saturday: 'Sat',
    };
    return map[dayNormalized] ?? day.slice(0, 3);
}

export default function ServiceData() {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("search")?.trim() ?? "";
    const [providers, setProviders] = useState<Provider[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedAvailability, setExpandedAvailability] = useState<Record<string, boolean>>({});
    const [query, setQuery] = useState(searchQuery);
    const [category, setCategory] = useState("All");
    const [maxPrice, setMaxPrice] = useState("Any");
    const [minRating, setMinRating] = useState("Any");
    const [maxDistance, setMaxDistance] = useState("Any");

    {/**Current day */ }
    const currentDay = getCurrentDate();

    useEffect(() => {
        (async () => {
            const { data, error } = await supabase
                .from("providers_public")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) {
                console.error("Error fetching Providers:", error);
            }
            setProviders((data as Provider[] | null) ?? []);
            setLoading(false);
        })();
    }, []);

    useEffect(() => {
        setQuery(searchQuery);
    }, [searchQuery]);

    const categories = useMemo(() => {
        const set = new Set(providers.map((p) => p.category).filter(Boolean));
        return ["All", ...Array.from(set)];
    }, [providers]);

    if (loading) {
        return <p className="mt-24 text-center text-blue-600">Loading...</p>;
    }
    {/**.some = check if something appears at least once
    1. filter through providers and store inside p
    2. Access availability inside providers ie p through p.availability
    3. .some((a)=>a.day ===currentDay) checks if any provider's availability matches today
    
    */}

    const availableToday = providers.filter((p) =>
        p.availability?.some((a) => a.day === currentDay)
    );

    const unavailableToday = providers.filter(
        (p) => !p.availability?.some((a) => a.day === currentDay)
    );

    const parsePrice = (price?: string) => {
        if (!price) return 0;
        const value = Number(price.replace(/[^\d.]/g, ""));
        return Number.isFinite(value) ? value : 0;
    };

    const getRating = (id: number) => {
        const ratings = [4.2, 4.4, 4.6, 4.7, 4.8, 4.9];
        return ratings[id % ratings.length];
    };

    const getDistance = (id: number) => {
        const distances = [0.4, 0.7, 1.2, 1.6, 2.1, 2.8, 3.4];
        return distances[id % distances.length];
    };

    const filteredProviders = providers.filter((p) => {
        const matchesQuery =
            !query ||
            `${p.first_name} ${p.last_name} ${p.service_title} ${p.category}`
                .toLowerCase()
                .includes(query.toLowerCase());
        const matchesCategory = category === "All" || p.category === category;
        const priceValue = parsePrice(p.price);
        const ratingValue = getRating(p.id);
        const distanceValue = getDistance(p.id);
        const matchesPrice =
            maxPrice === "Any" || priceValue === 0 || priceValue <= Number(maxPrice);
        const matchesRating =
            minRating === "Any" || ratingValue >= Number(minRating);
        const matchesDistance =
            maxDistance === "Any" || distanceValue <= Number(maxDistance);

        return matchesQuery && matchesCategory && matchesPrice && matchesRating && matchesDistance;
    });

    return (
        <div className="page-shell">
            <div className="page-container">
                <div className="app-card">
                    <div className="app-badge">Service discovery</div>
                    <h1 className="mt-4 text-center text-3xl font-semibold md:text-4xl">
                        Service Listings
                    </h1>
                    <p className="app-subtle mt-3 text-center text-sm">
                        Browse student-led services and book directly with providers near campus.
                    </p>
                </div>

                <div className="app-card">
                    <div className="grid gap-4 md:grid-cols-5">
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search services or providers"
                            className="app-input md:col-span-2"
                        />
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="app-input"
                        >
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                        <select
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            className="app-input"
                        >
                            {["Any", "20", "40", "60"].map((price) => (
                                <option key={price} value={price}>
                                    {price === "Any" ? "Any price" : `Up to $${price}`}
                                </option>
                            ))}
                        </select>
                        <select
                            value={minRating}
                            onChange={(e) => setMinRating(e.target.value)}
                            className="app-input"
                        >
                            {["Any", "4.0", "4.5", "4.7"].map((rating) => (
                                <option key={rating} value={rating}>
                                    {rating === "Any" ? "Any rating" : `${rating}+`}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                        <span className="font-semibold text-slate-700">Distance:</span>
                        {["Any", "1", "3", "5"].map((distance) => (
                            <button
                                key={distance}
                                type="button"
                                onClick={() => setMaxDistance(distance)}
                                className={`rounded-full border px-3 py-1.5 text-sm ${
                                    maxDistance === distance
                                        ? "border-blue-600 bg-blue-600 text-white"
                                        : "border-[var(--google-border)] bg-white text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                                }`}
                            >
                                {distance === "Any" ? "Any distance" : `${distance} mi`}
                            </button>
                        ))}
                    </div>
                </div>

                <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredProviders.length > 0 ? (
                        filteredProviders.map((p) => {
                            const rating = getRating(p.id);
                            const distance = getDistance(p.id);
                            const isAvailableToday = availableToday.some((a) => a.id === p.id);
                            return (
                                <div
                                    key={p.id}
                                    className="app-card app-card-hover border-blue-50 p-5"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <p className="text-xs uppercase tracking-[0.2em] text-blue-600">
                                                {p.category}
                                            </p>
                                            <h2 className="mt-2 text-lg font-semibold text-slate-900">
                                                {p.service_title}
                                            </h2>
                                            <p className="text-sm text-slate-600">
                                                {p.first_name} {p.last_name}
                                            </p>
                                        </div>
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                isAvailableToday
                                                    ? "bg-emerald-50 text-emerald-700"
                                                    : "bg-blue-50 text-blue-600"
                                            }`}
                                        >
                                            {isAvailableToday ? "Available today" : "Next available"}
                                        </span>
                                    </div>
                                    <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-slate-600">
                                        <div className="rounded-2xl bg-blue-50 px-3 py-3">
                                            <p className="text-blue-500">Price</p>
                                            <p className="font-semibold text-slate-900">{p.price || "$20"}</p>
                                        </div>
                                        <div className="rounded-2xl bg-blue-50 px-3 py-3">
                                            <p className="text-blue-500">Rating</p>
                                            <p className="font-semibold text-slate-900">{rating.toFixed(1)}</p>
                                        </div>
                                        <div className="rounded-2xl bg-blue-50 px-3 py-3">
                                            <p className="text-blue-500">Distance</p>
                                            <p className="font-semibold text-slate-900">{distance} mi</p>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                                        <span>{p.location}</span>
                                        <button
                                            className="text-slate-700 hover:text-slate-900"
                                            onClick={() =>
                                                setExpandedAvailability((prev) => ({
                                                    ...prev,
                                                    [String(p.id)]: !prev[String(p.id)],
                                                }))
                                            }
                                        >
                                            {expandedAvailability[String(p.id)] ? "Hide availability" : "View availability"}
                                        </button>
                                    </div>

                                    {expandedAvailability[String(p.id)] && (
                                        <div className="mt-3 space-y-1 text-xs text-slate-600">
                                            {p.availability && p.availability.length ? (
                                                p.availability.map((a, index) => (
                                                    <p key={index}>
                                                        {formatDay(a.day)}: {a.start} - {a.end}
                                                    </p>
                                                ))
                                            ) : (
                                                <p>No availability listed.</p>
                                            )}
                                        </div>
                                    )}

                                    <div className="mt-5 flex items-center gap-3">
                                        <Link to={`/Provider/${p.id}`} className="app-link">
                                            View Profile
                                        </Link>
                                        <Link to={`/booking/${p.id}`}>
                                        <button className="app-btn-primary rounded-full px-4 py-2 text-xs">
                                            Quick Booking
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            );
                        })
                    ) : (
                        <div className="app-card sm:col-span-2 lg:col-span-3">
                            <h2 className="text-xl font-semibold text-slate-900">
                                Service is unavailable
                            </h2>
                            <p className="app-subtle mt-2 text-sm">
                                {query.trim()
                                    ? `We couldn't find a service for "${query.trim()}". Try a different search or browse all services.`
                                    : "We couldn't find any services right now. Please try again later."}
                            </p>
                        </div>
                    )}
                </section>

                <section className="app-card">
                    <h3 className="text-lg font-semibold">Currently Unavailable</h3>
                    <p className="app-subtle mt-2 text-sm">
                        Providers with no availability listed for {currentDay}.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                        {unavailableToday.length > 0 ? (
                            unavailableToday.map((p) => (
                                <span
                                    key={p.id}
                                    className="app-chip"
                                >
                                    {p.first_name} {p.last_name} · {p.service_title}
                                </span>
                            ))
                        ) : (
                            <p className="text-xs text-slate-500">All providers are available today.</p>
                        )}
                    </div>
                </section>
            </div>
        </div>

    );
}
