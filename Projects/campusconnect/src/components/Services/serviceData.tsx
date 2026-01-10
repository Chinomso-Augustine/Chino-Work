import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import { Link } from "react-router-dom";
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

export default function DisplayInfo() {
    const [providers, setProviders] = useState<Provider[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedAvailability, setExpandedAvailability] = useState<Record<string, boolean>>({});

    {/**Current day */ }
    const currentDay = getCurrentDate();

    useEffect(() => {
        (async () => {
            const { data, error } = await supabase
                .from<Provider>("providers_public")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) {
                console.error("Error fetching Providers:", error);
            }
            setProviders(data ?? []);
            setLoading(false);
        })();
    }, []);

    if (loading) {
        return <p className="text-white text-center mt-20">Loading...</p>;
    }
    {/**.some = check if something appears at least once
    1. filter through providers and store inside p
    2. Access availability inside providers ie p through p.availability
    3. .some((a)=>a.day ===currentDay) checks if any provider's availability matches today
    
    */}

    const availableToday = providers.filter((p) =>
        p.availability?.some((a) => a.day === currentDay)
    );

    {/* similar thing but only store unavailable days*/ }
    const unavailableToday = providers.filter((p) => !p.availability?.some((a) => a.day === currentDay))

    return (
        <div className="mt-6 bg-gradient-to-b from-purple-700 via-indigo-800 to-purple-800">
            {/**Header */}
            <div className="h-auto py-12 p-12 mt-20">
                <h1 className="text-3xl text-white md:text-5xl text-center font-bold">
                    Find our Providers
                </h1>
                <p className="text-xl text-gray-100 text-center mt-9 mb-9">
                    Connect with talented students offering various services on campus
                </p>
            </div>


            {/**Currently available */}
            <section>
                <div className="h-auto">
                    <h3 className="text-2xl text-white md:text-3xl text-center font-bold mb-4">
                        Available Today
                    </h3>
                </div>

                {/**Loop through availableToday and if not available, I leave message */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                    {availableToday.length > 0 ? (
                        availableToday.map((p) => (
                            <div
                                key={p.id}
                                className="bg-white/14 backdrop-blur-sm shadow-md text-white rounded-2xl p-3 max-w-xs mx-auto duration-300 ease-in hover:shadow-lg hover:-translate-y-1 border border-amber-600"
                            >
                                <img
                                    src={p.profile_image_url || '/sample1.jpg'}
                                    alt="profile"
                                    className="w-28 h-28 object-cover rounded-full mx-auto border"
                                />
                                <h2 className="text-sm font-bold text-center">
                                    {p.first_name} {p.last_name}
                                </h2>
                                <p className="text-xs font-bold text-center">
                                    {p.service_title}
                                </p>

                                <div className="font-sans text-xs flex pt-2">
                                    <p>Location: {p.location}</p>
                                    <p>Price: {p.price}</p>
                                </div>

                                <div className="text-center">
                                    <h2 className="text-xs font-semibold mt-2">Availability</h2>
                                    <h3>
                                        {p.availability && p.availability.length ? (
                                            <div>
                                                {(expandedAvailability[String(p.id)] ? p.availability : p.availability.slice(0, 3)).map((a, index) => (
                                                    <p className="m-2 flex justify-center text-xs" key={index}>
                                                        {formatDay(a.day)}: {a.start} - {a.end}
                                                    </p>
                                                ))}
                                                {p.availability.length > 3 && (
                                                    <button
                                                        className="text-xs text-blue-300 hover:underline mt-1"
                                                        onClick={() => setExpandedAvailability(prev => ({ ...prev, [String(p.id)]: !prev[String(p.id)] }))}
                                                    >
                                                        {expandedAvailability[String(p.id)] ? "View less" : `View ${p.availability.length - 3} more`}
                                                    </button>
                                                )}
                                            </div>
                                        ) : (
                                            <p>N/A</p>
                                        )}
                                    </h3>
                                </div>

                                <div className="flex justify-center py-2">
                                    <Link key={p.id} to={`/Provider/${p.id}`}>
                                        <button className="bg-white/8 backdrop-blur-md shadow-md text-white px-3 py-2 text-sm rounded-lg hover:bg-purple-800">
                                            Provider Page
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-white">No providers yet</p>
                    )}
                </div>

            </section>



            {/**Unavailable */}
            <section>
                <div className="h-auto py-12 p-12 mt-20">
                    <h2 className="text-2xl text-white md:text-3xl text-center font-bold">
                        Unavailable Today
                    </h2>

                </div>
                <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6 w-full pl-3 border border-amber-300 justify-center text-center">
                    {unavailableToday.length > 0 ? (
                        unavailableToday.map((p) => (
                            <div
                                key={p.id}
                                className="bg-white/14 backdrop-blur-sm shadow-md text-white rounded-2xl p-3 max-w-xs mx-auto duration-300 ease-in hover:shadow-lg hover:-translate-y-1 border border-amber-600"

                            >
                                <img src={p.profile_image_url || "/sample1.jpg"} alt="profile" className="w-28 h-28 object-cover rounded-full mx-auto border " />

                                <h2 className="text-sm font-bold text-center">
                                    {p.first_name} {p.last_name}

                                </h2>
                                <p className=" text-xs font-bold text-center">{p.service_title} </p>

                                <div className="font-sans text-xs flex pt-2">
                                    <p>Location: {p.location} </p>
                                    <p>Price: {p.price} </p>
                                </div>
                                {/*
                                <div className="text-center">
                                    <h2 className="text-sm font-bold mt-2">Availability</h2>
                                    
                                  <h3>
                                        {p.availability && p.availability.length ? (<div> {p.availability.map((a, index) => (
                                            <p className="m-2 flex justify-center text-sm" key={index}>
                                                {formatDay(a.day)}: {a.start} - {a.end} </p>
                                        ))}
                                        </div>) : (<p> "N/A"</p>)}
                                    </h3>
                                   
                                </div>
                                */}

                                <div className="flex justify-center py-2">
                                    <Link key={p.id} to={`/Provider/${p.id}`}>
                                        <button className="bg-white/8 backdrop-blur-md shadow-md text-white px-3 py-2 text-sm rounded-lg hover:bg-purple-800">
                                            Provider Page
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))) : (
                        <p className="w-xl text-xl text-white md:text-lg font-bold flex justify-center border ">All Providers are unavailable today</p>
                    )}
                </div>
            </section>
        </div>

    );
}
