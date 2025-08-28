import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import { Link } from "react-router-dom";
import type { Provider } from "../DataTypes/types";

export default function DisplayInfo() {
    const [providers, setProviders] = useState<Provider[]>([]);
    const [loading, setLoading] = useState(true);

    {/**Current day */ }
    const currentDay = getCurrentDate();

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

    function getCurrentDate() {
        const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        const currentDay = new Date().getDay();
        return daysOfWeek[currentDay];
    }

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

            <div className="h-auto py-2 ">
                <h3 className="text-2xl text-white md:text-3xl text-center font-bold">
                    Available Today
                </h3>
            </div>
            {/**Profile grid */}
            <section>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-5xl mx-auto cursor-pointer">
                    {providers.length > 0 ? (
                        providers.map((p) => (
                            p.availability?.some((availability) => availability.day === currentDay) ? (
                                <div
                                    key={p.id}
                                    className="bg-white/14 backdrop-blur-sm shadow-md text-white rounded-2xl p-3 duration-300 ease-in hover:shadow-lg hover:-translate-y-2 "
                                    style={{
                                        backgroundImage: `url(${p.profile_image_url || "/sample1.jpg"})`
                                    }}
                                >
                                    <img src={p.profile_image_url || "/sample1.jpg"} alt="profile" />
                                    <h2 className="text-2xl font-bold flex justify-center m-3 text-purple-300">
                                        {p.first_name} {p.last_name}
                                    </h2>

                                    <div className="text-center font-sans text-sm m-2">
                                        <p className="font-bold text-xl pb-2">{p.service_title}</p>
                                        <p> About: {p.bio}</p>
                                        <p>Location: {p.location} </p>
                                        <p>Price: {p.price} </p>
                                    </div>
                                    <div className="text-center">
                                        <h2 className="text-xl font-semibold mt-2">Availability</h2>
                                        <h3>
                                            {p.availability && p.availability.length ? (<div> {p.availability.map((a, index) => (
                                                <p className="m-2" key={index}>
                                                    {a.day}: {a.start} - {a.end} </p>
                                            ))}
                                            </div>) : (<p> "N/A"</p>)}
                                        </h3>
                                    </div>

                                    <div className="flex justify-center py-4">
                                        <Link key={p.id} to={`/Provider/${p.id}`}>
                                            <button className="bg-white/8 backdrop-blur-md shadow-md text-white p-3 rounded-lg hover:bg-purple-800">
                                                View Provider
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            ) : <p> </p>
                        ))) : (
                        <p className="text-white">No providers yet.</p>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto ">
                    {providers.length > 0 ? (
                        providers.map((p) => (
                            <div
                                key={p.id}
                                className="bg-white/14 backdrop-blur-sm shadow-md text-white rounded-2xl p-3 duration-300 ease-in hover:shadow-lg hover:-translate-y-2 "
                                style={{
                                    backgroundImage: `url(${p.profile_image_url || "/sample1.jpg"})`,
                                    backgroundSize:`fit`,
                                    backgroundPosition: `no-repeat`
                                }}
                            >
                                <img src={p.profile_image_url || "/sample1.jpg"} alt="profile" className="rounded-4xl" />
                                <h2 className="text-2xl font-bold flex justify-center m-3 text-purple-300">
                                    {p.first_name} {p.last_name}

                                </h2>
                                <p className=" text-center font-bold text-xl pb-2">{p.service_title}</p>

                                <div className="font-sans text-sm m-2 flex gap-4 justify-between">
                                    <p>Location: {p.location} </p>
                                    <p>Price: {p.price} </p>
                                </div>
                                <div className="text-center">
                                    <h2 className="text-xl font-semibold mt-2">Availability</h2>
                                    <h3>
                                        {p.availability && p.availability.length ? (<div> {p.availability.map((a, index) => (
                                            <p className="m-2 flex justify-center text-sm" key={index}>
                                                {a.day}: {a.start} - {a.end} </p>
                                        ))}
                                        </div>) : (<p> "N/A"</p>)}
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
