import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import { Link } from "react-router-dom";
import type { Provider } from "../DataTypes/types";

export default function DisplayInfo() {
    const [providers, setProviders] = useState<Provider[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const { data, error } = await supabase
                .from<Provider>("providers")
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

    return (
        <div className="mt-6 bg-gradient-to-b from-purple-700 via-indigo-800 to-purple-800">
            <div className="h-auto py-12 p-12 mt-20">
                <h1 className="text-3xl text-white md:text-5xl text-center font-bold">
                    Find our Providers
                </h1>
                <p className="text-2xl text-gray-100 text-center mt-9 mb-9">
                    Connect with talented students offering various services on campus
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-5xl mx-auto cursor-pointer">
                {providers.length > 0 ? (
                    providers.map((p) => (
                        <div
                            key={p.id}
                            className="bg-white/14 backdrop-blur-sm shadow-md text-white rounded-2xl p-3 duration-300 ease-in hover:shadow-lg hover:-translate-y-2"
                        >
                            <h2 className="text-xl font-bold flex justify-center m-4 text-white">
                                {p.first_name} {p.last_name}
                            </h2>

                            <p className="text-white text-sm">{p.service_title}</p>
                            <h3 className="border">{p.category}</h3>

                            <p>
                                <strong>Location:</strong> {p.location}
                            </p>

                            {p.price && <p>{p.price}</p>}
                            {p.site && <p>{p.site}</p>}

                            <div className="flex justify-center py-4">
                                <Link key={p.id} to={`/Provider/${p.id}`}>
                                    <button className="bg-white/8 backdrop-blur-md shadow-md text-white p-3 rounded-lg hover:bg-purple-800">
                                        View Provider
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-white">No providers yet.</p>
                )}
            </div>
        </div>
    );
}
