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
    availability?: string[];
    offers?: { text: string }[];
    created_at?: string;
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
        <div className="mt-6 bg-linear-to-b from-purple-700 via-indigo-800 to-purple-800 h-auto">
            <div className="h-auto py-12 p-13 mt-20 border">
                <h1 className="text-3xl text-white md:text-5xl text-center font-bold">
                    {provider.first_name} {provider.last_name}
                </h1>
                <p className="text-2xl text-gray-100 text-center mt-9 mb-9">
                    {provider.service_title} - {provider.category}
                </p>
            </div>

            <div className="max-w-3xl mx-auto bg-purple-500 backdrop-blur-sm shadow-md text-white rounded-2xl p-6">
                <p><strong>Description:</strong> {provider.description}</p>
                <p><strong>Location:</strong> {provider.location}</p>
                <p><strong>Price:</strong> {provider.price || "N/A"}</p>
                <p><strong>Email:</strong> {provider.email}</p>
                <p><strong>Phone:</strong> {provider.phone || "N/A"}</p>
                <p><strong>Person Site:</strong> {provider.site || "N/A"}</p>
                <p><strong>Availability:</strong> {provider.availability?.join(", ") || "N/A"}</p>
                <p><strong>Offers:</strong> {provider.offers?.map((o) => o.text).join(", ") || "None"}</p>
                <p><strong>Bio:</strong> {provider.bio || "No bio provided"}</p>
                <p><strong>Experience:</strong> {provider.experience || "N/A"}</p>
            </div>
        </div>
    );
};

export default ProvidersPage; 