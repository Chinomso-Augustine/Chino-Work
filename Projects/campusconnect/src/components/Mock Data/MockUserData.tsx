
{/**ServiceCategory = object and each key is a string and their values are arrays of service offered */}

const ServiceCategory = {
    "Personal Care": [
        "Haircuts & Barbering",
        "Hair Braiding / Styling / Bleaching",
        "Nails / Lashes / Makeup",
        "Eyebrow Threading / Waxing",
        "Tattoo / Piercing Services",
        "Skincare / Facials",
        "Massage Therapy"
    ],

    "Academic Help": [
        "Math / STEM Tutoring",
        "Essay Proofreading",
        "Research Assistance / Literature Reviews",
        "Lab Report Editing / Help",
        "Resume /Cover Letter",
        "Mock Interviews",
        "Test Prep (MCAT/LSAT)",
        "Language Tutoring",
        "Homework Help",
    ],

    "Tech Support": [
        "Phone / Laptop Repair",
        "Software Installation",
        "WiFi / Printer Setup",
        "PC Building Help/ Setup",
        "Apple / Google Account Recovery Help",
    ],

    "Transportation Repair": [
        "Normal Bike Repair",
        "E-bike Repair",
        "Bike Installation",
        "ElectricScooter Repair",
        "Skateboard Repair",
        "Bike / Scooter Customization",
    ],

    "Creative Service": [
        "Photograph",
        "Graphic Design",
        "Video Editing",
        "Custom Art",
        "Music Album Creation",
        "Social Media Content Creator",
        "YouTube Thumbnail",
        "Blog Editing",
        "Event Posters / Flyers",
    ],

    "Event & Lifestyle": [
        "DJ",
        "MC",
        "Party Planning / Birthday Setup",
        "fitness Training",
        "Meal Prep planning",
        "Dance Choreography for Performance"
    ]
}


{/**Mock data type / structure: This declares the types of each info the user provides/   */ }
type MockDataType = {
    name: string;  //User name 
    id: string;     //user id
    service: string;  // category for user service 
    description: string;  //description of service
    profile_id: string; // ID to separate providers profile 
    contact_info: string; // users phone number of email. 
    rating: number; // User rating 
    created_at: string;  //date profile was created and store in IOS date string 
    updated_at: string;  // Last time info is updated
    service_title: string;  // Name of service offering 
    services_offered: string[]; //List of service user offers 
};


{/**mock data for providers 
MockProviders = name of the function
MocDataType[] = the type fo the information MockProviders will contain 
  MockProviders: MockDataType[] = [...] means for all the list of provider, make sure their type matches 
  the types defined in MockDataType
*/}

const MockProviders: MockDataType[] = [
  {
    name: "Chino Him",
    id: "1",
    service: "Academic Help",
    description: "I teach React and help with Computer Science and general homework.",
    profile_id: "chinoHim0001",
    contact_info: "alex.johnson@email.com",
    rating: 4.8,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
    service_title: "Math / STEM Tutoring",
    services_offered: ["Math / STEM Tutoring", "Homework Help"]
  },
  {
    id: "2",
    name: "Sarah Chen",
    service: "Event & Lifestyle",
    description: "Convenient meal prep planning for busy students. Fresh, healthy options suggested weekly.",
    profile_id: "sarah_chen_002",
    contact_info: "sarah.chen@email.com",
    rating: 4.6,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
    service_title: "Meal Prep planning",
    services_offered: ["Meal Prep planning"]
  },
  {
    id: "3",
    name: "Mike Rodriguez",
    service: "Event & Lifestyle",
    description: "Need help planning a birthday setup? I got you covered with aesthetics and smooth coordination.",
    profile_id: "mike_rodriguez_003",
    contact_info: "mike.rodriguez@email.com",
    rating: 4.7,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
    service_title: "Party Planning / Birthday Setup",
    services_offered: ["Party Planning / Birthday Setup"]
  },
  {
    id: "4",
    name: "Emma Thompson",
    service: "Academic Help",
    description: "Essay proofreading and help with academic writing, resumes, and mock interviews.",
    profile_id: "emma_thompson_004",
    contact_info: "emma.thompson@email.com",
    rating: 4.9,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
    service_title: "Essay Proofreading",
    services_offered: ["Essay Proofreading", "Resume /Cover Letter", "Mock Interviews"]
  },
  {
    id: "5",
    name: "David Park",
    service: "Tech Support",
    description: "Phone screen repair, software setup, and general tech help for students.",
    profile_id: "david_park_005",
    contact_info: "david.park@email.com",
    rating: 4.5,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
    service_title: "Phone / Laptop Repair",
    services_offered: ["Phone / Laptop Repair", "Software Installation"]
  },
  {
    id: "6",
    name: "Lisa Wang",
    service: "Personal Care",
    description: "Haircuts, braiding, and styling. Trendy, affordable, and done in your dorm.",
    profile_id: "lisa_wang_006",
    contact_info: "lisa.wang@email.com",
    rating: 4.4,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
    service_title: "Haircuts & Barbering",
    services_offered: ["Haircuts & Barbering", "Hair Braiding / Styling / Bleaching"]
  },
  {
    id: "7",
    name: "Jordan Martinez",
    service: "Creative Service",
    description: "Photography and video editing for events, flyers, and social media.",
    profile_id: "jordan_martinez_007",
    contact_info: "jordan.martinez@email.com",
    rating: 4.7,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
    service_title: "Photograph",
    services_offered: ["Photograph", "Video Editing", "Event Posters / Flyers"]
  },
  {
    id: "8",
    name: "Taylor Kim",
    service: "Transportation Repair",
    description: "Bike and scooter repair, setup, and customization services.",
    profile_id: "taylor_kim_008",
    contact_info: "taylor.kim@email.com",
    rating: 4.6,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
    service_title: "Normal Bike Repair",
    services_offered: ["Normal Bike Repair", "Bike / Scooter Customization"]
  }

]
