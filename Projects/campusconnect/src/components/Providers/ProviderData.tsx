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
        <div className="min-h-screen bg-purple-50/40 px-6 pb-16 pt-24 text-slate-900">
            <div className="mx-auto max-w-6xl space-y-10">
                <div className="rounded-2xl border border-amber-200/60 bg-white p-6 shadow-sm">
                    <h1 className="text-3xl md:text-4xl text-center font-semibold">Student Providers</h1>
                    <p className="text-sm text-slate-600 text-center mt-3">
                        Meet the students offering services across campus.
                    </p>
                </div>

            {/* Show profiles if data exists, otherwise show a message */}


            <section>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {providers.length > 0 ? (
                        providers.map((p) => (
                            <div
                                key={p.id}
                                className="rounded-2xl border border-amber-200/60 bg-white p-5 shadow-sm transition hover:shadow-md"
                            >
                                <img src={p.profile_image_url || "/sample1.jpg"} alt="profile" className="w-24 h-24 object-cover rounded-full mx-auto border border-amber-200/60" />
                                <h2 className="text-lg font-semibold text-center mt-4">
                                    {p.first_name} {p.last_name}

                                </h2>
                                <p className=" text-center text-sm text-slate-600">{p.service_title}</p>

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
                                    <button className="rounded-lg border border-purple-200/60 bg-purple-700 px-4 py-2 text-xs font-semibold text-white hover:bg-purple-800">
                                        Provider Page
                                    </button>
                                </Link>
                                <Link to={`/booking/${p.id}`} className="ml-3">
                                    <button className="rounded-lg border border-purple-200/60 px-4 py-2 text-xs font-semibold text-slate-700 hover:border-purple-300 hover:text-purple-900">
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
