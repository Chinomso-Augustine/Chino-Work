import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient"
import { Link } from "react-router-dom"

/**Providers data type  */
interface Provider {
    id: number;
    first_name: string;
    last_name: string;
    service_title: string;
    category: string;
    description: string;
    location: string;
    price?: string;
    email: string;
    phone?: string;
    bio?: string;
    experience?: string;
    availability?: string[];
    offers?: { text: string }[];
    created_at?: string;
}

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

    return (
        <div className="mt-6 bg-linear-to-b from-purple-700 via-indigo-800  to-purple-800">
            <div className=" h-auto py-12 p-13 mt-20">
                <h1 className="text-3xl text-white md:text-5xl text-center font-bold ">Find our Providers</h1>
                <p className="text-2xl text-gray-100 text-center mt-9 mb-9">Connect with talented students offering various services on campus
                </p>
            </div>
            <div>


            </div>

            {/* Show profiles if data exists, otherwise show a message */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-5xl  mx-auto cursor-pointer">
            {providers.length > 0 ? (
                providers.map((p) => (
                    <Link key={p.id} to={`/Provider/${p.id}`}> 
                    <div
                        className="bg-purple-500 backdrop-blur-sm shadow-md text-white rounded-2xl p-3 duration-300 ease-in hover:shadow-lg hover:-translate-y-2"
                    >
                        {/* Provider's Name */}
                        <h2 className="text-xl font-bold flex justify-center m-4 text-white">
                            {p.first_name} {p.last_name}
                        </h2>

                        {/* Service Title and Category */}
                        <p className="text-white text-sm">
                            {p.service_title} - 
                        </p>
                        <h3 className=" border ">{p.category}</h3>

                        {/* Service Title and Category */}
                        <p className="text-white text-sm">
                            {p.service_title} - 
                        </p>

                        {/* Location */}
                        <p>
                            <strong>Location:</strong> {p.location}
                        </p>

                        {/**Price */}
                        <p>
                            {p.price}
                        </p>

                        
                       {/*Offers: Map through JSONB array and show text for each offer 
                        <p>
                            <strong>Offers:</strong>{" "}
                            {p.offers?.map((o) => o.text).join(", ")}
                        </p>
                        */}
                    </div>
                    </Link>
                ))
            ) : (
                // Message shown if no providers are in the database
                <p>No providers yet.</p>
            )}
             </div>
        </div>
    );
}

export default DisplayInfo; 