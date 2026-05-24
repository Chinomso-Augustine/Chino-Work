import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient"
import { Link } from "react-router-dom"
import type { Provider } from "../DataTypes/types";

const DisplayInfo = () => {
    /*Storing providers fetched */
    const [providers, setProviders] = useState<Provider[]>([]);

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

    const getRating = (id: number) => {
        const ratings = [4.2, 4.4, 4.6, 4.7, 4.8, 4.9];
        return ratings[id % ratings.length];
    };

    return (
        <div className="page-shell">
            <div className="page-container">
                <div className="app-card">
                    <div className="app-badge">Browse providers</div>
                    <h1 className="mt-4 text-center text-3xl font-semibold md:text-4xl">Student Providers</h1>
                    <p className="app-subtle mt-3 text-center text-sm">
                        Meet the students offering services across campus.
                    </p>
                </div>

            <section>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {providers.length > 0 ? (
                        providers.map((p) => (
                            <div
                                key={p.id}
                                className="app-card app-card-hover border-blue-50 p-5"
                            >
                                <img src={p.profile_image_url || "/sample1.jpg"} alt="profile" className="mx-auto h-24 w-24 rounded-full border border-blue-100 object-cover" />
                                <h2 className="text-lg font-semibold text-center mt-4">
                                    {p.first_name} {p.last_name}

                                </h2>
                                <p className="app-subtle text-center text-sm">{p.service_title}</p>

                                <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                                    <span>{p.location}</span>
                                    <span>{p.price || "$20"}</span>
                                </div>
                                <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                                    <span>Rating</span>
                                    <span className="font-semibold text-slate-900">{getRating(p.id).toFixed(1)}</span>
                                </div>

                                <div className="flex justify-center py-2">
                                    <Link key={p.id} to={`/Provider/${p.id}`}>
                                    <button className="app-btn-primary rounded-full px-4 py-2 text-xs">
                                        Provider Page
                                    </button>
                                </Link>
                                <Link to={`/booking/${p.id}`} className="ml-3">
                                    <button className="app-btn-secondary rounded-full px-4 py-2 text-xs">
                                        Book
                                    </button>
                                </Link>
                                </div>
                            </div>
                        ))) : (
                        <p className="text-slate-600">No providers yet.</p>
                    )}
                </div>
            </section>
            </div>
        </div>
    );
}

export default DisplayInfo; 
