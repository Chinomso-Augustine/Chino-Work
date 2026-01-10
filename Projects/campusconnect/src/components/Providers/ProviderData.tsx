import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient"
import { Link } from "react-router-dom"
import type { Provider } from "../DataTypes/types";

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


const DisplayInfo = () => {
    /*Storing providers fetched */
    const [providers, setProviders] = useState<Provider[]>([]);
    const [expandedAvailability, setExpandedAvailability] = useState<Record<string, boolean>>({});

    useEffect(() => {
        /**fetch row data from provider in supabase */
        const fetchProvider = async () => {
            const { data, error } = await supabase
                .from("providers")
                .select("*")
                .order("created_at", { ascending: false })

            /**error handle when fetch fail  */
            if (error) console.error("Error fetching Providers:", error);
            else if (data) setProviders(data); //store fetched data in state
        };
        fetchProvider(); //calls fun to fetch data
    }, [])

    return (
        <div className="bg-linear-to-b from-purple-700 via-indigo-800  to-purple-800 h-auto py-12 p-13 ">
            <div className=" h-auto py-12 p-13 mt-20">
                <h1 className="text-3xl text-white md:text-5xl text-center font-bold ">Find our Providers</h1>
                <p className="text-2xl text-gray-100 text-center mt-9 mb-9">Check out our student providers
                </p>
            </div>

            {/* Show profiles if data exists, otherwise show a message */}


            <section>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto ">
                    {providers.length > 0 ? (
                        providers.map((p) => (
                            <div
                                key={p.id}
                                className="bg-white/14 backdrop-blur-sm shadow-md text-white rounded-2xl p-3 max-w-xs duration-300 ease-in hover:shadow-lg hover:-translate-y-1"
                            >
                                <img src={p.profile_image_url || "/sample1.jpg"} alt="profile" className="w-28 h-28 object-cover rounded-full mx-auto" />
                                <h2 className="text-lg font-bold flex justify-center m-2 text-purple-300">
                                    {p.first_name} {p.last_name}

                                </h2>
                                <p className=" text-center font-semibold text-sm pb-2">{p.service_title}</p>

                                <div className="font-sans text-xs m-2 flex gap-2 justify-between">
                                    <p>Location: {p.location} </p>
                                    <p>Price: {p.price} </p>
                                </div>
                                <div className="text-center">
                                    <h2 className="text-sm font-semibold mt-2">Availability</h2>
                                    <h3>
                                        {p.availability && p.availability.length ? (
                                            <div>
                                                {(expandedAvailability[String(p.id)] ? p.availability : p.availability.slice(0, 3)).map((a, index) => (
                                                    <p className="m-2 flex justify-center text-sm" key={index}>
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
                                        ) : (<p> "N/A"</p>)}
                                    </h3>
                                </div>

                                <div className="flex justify-center py-2">
                                    <Link key={p.id} to={`/Provider/${p.id}`}>
                                        <button className="bg-white/8 backdrop-blur-md shadow-md text-white p-3 rounded-lg hover:bg-purple-800">
                                            Provider Page
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))) : (
                        <p className="text-white">No providers yet.</p>
                    )}
                </div>
            </section>
        </div>
    );
}

export default DisplayInfo; 