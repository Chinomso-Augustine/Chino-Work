/**Providers data type  */
 export interface Provider {
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
    profile_image_url?: string | null;
    profile_image_path?: string | null;
}

/**Availability types */
export interface AvailabilitySlot {
    day: string;
    start: string;
    end: string;
}
