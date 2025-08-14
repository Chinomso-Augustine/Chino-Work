import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient"
import { useParams } from "react-router-dom";

/**Providers data type  */
interface Provider {
    id: number;
    first_name: string;
    last_name: string;
    service_title: string;
    category: string;
    description: string;
    site: string;
    location: string;
    price?: string;
    email: string;
    phone?: string;
    bio?: string;
    experience?: string;
    availability?: AvailabilitySlot[] | null;
    offers?: { text: string }[];
    created_at?: string;
}

interface AvailabilitySlot {
    day: string;
    start: string;
    end: string;
}

const ProvidersPage = () => {
    /*Storing providers fetched */
    const [provider, setProvider] = useState<Provider | null>(null);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        /**fetch row data from provider in supabase */
        const fetchProvider = async () => {
            const { data, error } = await supabase
                .from("providers")
                .select("*")
                .eq("id", id) /*Fetches providers that matches selected profile  */
                .single();

            /**error handle when fetch fail  */
            if (error) console.error("Error fetching Providers:", error);
            else if (data) setProvider(data); //store fetched data in state
            setLoading(false);
        };
        if (id) fetchProvider(); //calls fun to fetch data
    }, [id])

    if (loading) return <p className="text-white text-center mt-20">Loading...</p>;
    if (!provider) return <p className="text-white text-center mt-20">Provider not found.</p>;


    return (
        <div className="border mt-6 bg-linear-to-b from-purple-700 via-indigo-800 to-purple-800">

            <div className="flex w-full p-13 mt-10 bg-[url('/sample1.jpg')] bg-cover items-center">
                <div className="w-xs flex-shrink-0">
                    <img src="../../../sample1.jpg" className="h-80 rounded-full" />
                </div>

                <div className="flex-grow flex justify-center">
                    <div className="bg-linear-to-r from-purple-900/40 to-blue-400/40 rounded-2xl text-center">
                        <h1 className="text-3xl text-white md:text-5xl font-bold">
                            {provider.first_name} {provider.last_name}
                        </h1>
                        <p className="text-2xl text-gray-100 mt-12 mb-9">
                            {provider.service_title} - {provider.category}
                        </p>
                        <p className="text-2xl text-gray-100 mt-12 mb-9">
                            {provider.description}
                        </p>
                    </div>
                </div>
            </div>

            <div className="backdrop-blur-sm shadow-md text-white rounded-2xl p-6">

                <div className="bg-white/14 backdrop-blur-md shadow-md text-white text-center mb-6 rounded-2xl p-3 duration-300 ease-in hover:shadow-lg hover:-translate-y-2">
                    <h1 className="font-bold text-xl mb-7 "> About</h1>
                    <p className="p-2"><strong>Bio:</strong> {provider.bio || "No bio provided"}</p>
                    <p className="p-2"><strong>Experience:</strong> {provider.experience || "N/A"}</p>
                    <p className="p-2"><strong>Offers:</strong> {provider.offers?.map((o) => o.text).join(", ") || "None"}</p>
                    <p className="p-2"><strong>Person Site:</strong> {provider.site || "N/A"}</p>
                </div>

                <div className="flex justify-between">
                    <div className="w-full bg-white/14 backdrop-blur-md shadow-md text-white text-left mb-6 rounded-2xl hover:shadow-lg hover:-translate-y-2 mr-4">
                        <h1 className="font-bold text-xl mb-5 mt-5">Contact Details</h1>
                        <p className="p-2"><strong>Phone:</strong> {provider.phone || "N/A"}</p>
                        <p className="p-2"><strong>Email:</strong> {provider.email}</p>
                        <p className="p-2"><strong>Location:</strong> {provider.location}</p>
                        <p className="p-2"><strong>Price:</strong> {provider.price || "N/A"}</p>
                    </div>
                    <div className="w-full bg-white/14 backdrop-blur-md shadow-md text-white text-left mb-6 rounded-2xl hover:shadow-lg hover:-translate-y-2 mr-4">
                        <h1 className="font-bold text-xl mb-5 mt-5">Availability</h1>
                        <p className="p-2">
                            {provider.availability && provider.availability.length
                                ? (<div> {provider.availability.map((a, index) => (
                                    <p className="m-2 " key={index} >
                                        {a.day}: {a.start} – {a.end}
                                    </p>
                                ))}
                                </div>

                                ) : (<p> "N/A". </p>)}
                        </p>
                    </div>


                </div>

                <div className="flex text-center justify-center w-full ">
                    <div className="w-md bg-white text-black text-center text-2xl mb-6 rounded-2xl p-3 duration-300 ease-in hover:shadow-lg hover:-translate-y-2 cursor-pointer">
                        <h1> Schedule Appointment</h1>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProvidersPage; 