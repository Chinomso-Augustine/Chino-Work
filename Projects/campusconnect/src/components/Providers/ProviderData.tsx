import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient"

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
        <div className="mt-6">

            {/* Section title */}
            <h2 className="text-xl font-bold mb-4">Provider Profiles</h2>

            {/* Show profiles if data exists, otherwise show a message */}
            {providers.length > 0 ? (
                providers.map((p) => (
                    <div
                        key={p.id} // Unique key for each provider (required by React)
                        className="border p-4 rounded mb-4 shadow"
                    >
                        {/* Provider's Name */}
                        <h3 className="font-bold text-lg">
                            {p.first_name} {p.last_name}
                        </h3>

                        {/* Service Title and Category */}
                        <p className="text-purple-600">
                            {p.service_title} - {p.category}
                        </p>

                        {/* Description of their service */}
                        <p>{p.description}</p>

                        {/* Location */}
                        <p>
                            <strong>Location:</strong> {p.location}
                        </p>

                        {/**Price */}
                        <p>
                            {p.price}
                        </p>

                         <p>
                            {p.email}
                        </p>
                         <p>
                            {p.phone}
                        </p>
                        {/* Availability: Join array values (e.g., "Monday, Wednesday") */}
                        <p>
                            <strong>Availability:</strong>{" "}
                            {p.availability?.join(", ")}
                        </p>

                        {/* Offers: Map through JSONB array and show text for each offer */}
                        <p>
                            <strong>Offers:</strong>{" "}
                            {p.offers?.map((o) => o.text).join(", ")}
                        </p>

                         <p>
                            {p.bio}
                        </p>

                         <p>
                            {p.experience}
                        </p>
                    </div>
                ))
            ) : (
                // Message shown if no providers are in the database
                <p>No providers yet.</p>
            )}
        </div>
    );
}

export default DisplayInfo; 