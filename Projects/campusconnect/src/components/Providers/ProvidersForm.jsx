import { useState, useCallback, useEffect } from "react";
import Select from "react-select";
import { User, Mail, Star, Clock, MapPin } from "lucide-react";
import { supabase } from "../../supabaseClient";
import TimeSelection from "./TimeSelection"
import ProfileImagePicker from "./ProfileImagePicker";

/*To Do
1. Add time to availability 
2. Add price to each offer listed
3. Adjust offer listed 
4. Add option for users to add links to their sites - done
5. Change category to easier names
*/
// Category and Days Data
const category = [
    "Personal Care",
    "Academic Help",
    "Tech Support",
    "Transportation Repair",
    "Creative Service",
    "Event & Lifestyle",
];

const days = [
    { id: 1, value: "Monday" },
    { id: 2, value: "Tuesday" },
    { id: 3, value: "Wednesday" },
    { id: 4, value: "Thursday" },
    { id: 5, value: "Friday" },
    { id: 6, value: "Saturday" },
    { id: 7, value: "Sunday" },
];

const ProvidersForm = () => {
    const userOptions = category.map((list) => ({ value: list, label: list }));

    {/**user storage id */ }
    const [userId, setUserId] = useState("");

    const [isUploadingImage, setIsUploadingImage] = useState(false);

    useEffect(() => {
        (async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUserId(user?.id ?? "");
        })();
    }, []);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        serviceTitle: "",
        description: "",
        site: "",
        location: "",
        price: "",
        email: "",
        phone: "",
        bio: "",
        experience: "",
        text: "",
        offers: [],
        checklist: [],
        availability: {},
        category: null,
        profileImageUrl: "",
        profileImagePath: ""

    });

    //Runs whenever a checkbox is clicked
    const handleSelect = (e) => {
        const { value, checked } = e.target;
        setFormData((prevFormData) => {
            if (checked) {
                return {
                    ...prevFormData,
                    checklist: [...prevFormData.checklist, value],
                    availability: {
                        ...prevFormData.availability,
                        [value]: prevFormData.availability[value] || { start: "09:00 AM", end: "04:00 PM" },
                    }
                };
            } else {
                return {
                    ...prevFormData, /*Keep everything the same */
                    checklist: prevFormData.checklist.filter((day) => day !== value), /*Removes day from checklist */
                    availability: Object.fromEntries(Object.entries(prevFormData.availability).filter(([k]) => k !== value)), //remove day from availability time 
                };
            }
        });
    };

    const setDayTime = (day, field, hhmm) => {
        setFormData((prev) => ({
            ...prev,
            availability: {
                ...prev.availability,
                [day]: {
                    ...(prev.availability[day] || { start: "", end: "" }),
                    [field]: hhmm,
                },
            },
        }));
    };


    // Handle service input addition
    /*if input is not empty, keep prev data, add current input prev.text, and clear input  */
    const handleService = useCallback(() => {
        if (formData.text.trim() !== "") {
            setFormData((prev) => ({
                ...prev,
                offers: [...prev.offers, { id: Date.now(), text: prev.text }],//stores offer as obj
                text: "",
            }));
        }
    }, [formData.text]);

    /**Functionality: Pass the id of the offer to be deleted into the function. 
    setFormData takes the previous form data, filters the offers array to create a new one 
    that excludes the offer with the matching id, and updates offers with this new array.
    The matching offer is removed, and all other offers remain." */
    const deleteOffer = (id) => {
        setFormData((prev) => ({
            ...prev,
            offers: prev.offers.filter((offer) => offer.id !== id),
        }));
    }


    // Handle generic input updates
    /**listen to input, then extract name and value, call setFormData with prev data then
        create new array with prev data and update the field that matches name. */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(isUploadingImage){
            alert("Please wait for the image to finish uploading");
            return; 
        }

        if(!formData.profileImagePath){
            alert("Please upload a profile image before submitting.");
            return;
        }
        // Basic validation
        if (!formData.firstName || !formData.lastName || !formData.serviceTitle ||
            !formData.category || !formData.description || !formData.location || !formData.email) {
            alert("Please fill out all required fields.");
            return;
        }
        const availabilityArr = formData.checklist.map((day) => ({
            day,
            start: formData.availability[day]?.start ?? "",
            end: formData.availability[day]?.end ?? "",
        }));


        const { error } = await supabase.from('providers').insert([
            {
                user_id: userId,
                first_name: formData.firstName,
                last_name: formData.lastName,
                service_title: formData.serviceTitle,
                category: formData.category?.label, // safe check
                description: formData.description,
                site: formData.site,
                location: formData.location,
                price: formData.price,
                email: formData.email,
                phone: formData.phone,
                bio: formData.bio,
                experience: formData.experience,
                //availability: formData.checklist.length ? formData.checklist : null,
                availability: availabilityArr.length ? availabilityArr : null,
                offers: formData.offers.length ? formData.offers : null,
                profile_image_url: formData.profileImageUrl || null,
                profile_image_path: formData.profileImagePath || null,
            },
        ]);

        if (error) {
            console.error("Supabase Insert Error:", {
                message: error.message,
                details: error.details,
                hint: error.hint,
                code: error.code,
            });
            alert(`Error creating profile!: ${error.message}`);
        } else {
            alert('Profile created successfully!');
            // Reset form
            setFormData({
                firstName: "",
                lastName: "",
                serviceTitle: "",
                description: "",
                site: "",
                location: "",
                price: "",
                email: "",
                phone: "",
                bio: "",
                experience: "",
                text: "",
                offers: [],
                checklist: [],
                availability: {},
                category: null,
                start: "",
                end: "",
                profileImageUrl: "",
                profileImagePath: "",
            });
        }
    };

    /*Form */
    return (
        <div className="bg-gradient-to-b from-purple-100 to-white py-6 px-6 mt-16 border w-full max-w-4xl mx-auto rounded-lg shadow">

            <form className="space-y-6" onSubmit={handleSubmit}>
                <HeaderInfo />

                <BasicInfo
                    userOptions={userOptions}
                    formData={formData}
                    setFormData={setFormData}
                    handleChange={handleChange}
                />
                <ProfileImagePicker
                    supabase={supabase}
                    userId={userId || ""}
                    value={formData.profileImageUrl}
                    objectPath={formData.profileImagePath}
                    onChange={(url, path) =>
                        setFormData(f => ({
                            ...f,
                            profileImageUrl: url || "",
                            profileImagePath: path || ""
                        }))
                    }
                    onUploadingChange={setIsUploadingImage}

                />

                <LocationPricing formData={formData} handleChange={handleChange} />

                <ContactInfo formData={formData} handleChange={handleChange} />

                <ServiceOffered
                    text={formData.text}
                    setText={(val) => setFormData((prev) => ({ ...prev, text: val }))}
                    offers={formData.offers}
                    handleService={handleService}
                    deleteOffer={deleteOffer}
                />
                <Availability
                    days={days}
                    checklist={formData.checklist}
                    handleSelect={handleSelect}
                    availability={formData.availability}
                    setDayTime={setDayTime}
                />
                <AboutYou formData={formData} handleChange={handleChange} />

 <CreateAccountBtn disabled={isUploadingImage} />

            </form>
        </div>
    );
};

export default ProvidersForm;

/*  SUB COMPONENTS */
const HeaderInfo = () => (
    <div className="text-center">
        <h2 className="text-lg md:text-2xl font-bold">Create Your Provider Profile</h2>
        <p className="mt-1">Tell students about your services and availability</p>
    </div>
);

const BasicInfo = ({ userOptions, formData, setFormData, handleChange }) => (
    <section>
        <div className="flex items-center gap-2 mb-2 text-lg text-purple-400">
            <User />
            <h2 className="font-semibold">Basic Information</h2>
        </div>

        <div className="flex gap-4 flex-wrap justify-center">
            <div className="flex-1 min-w-[200px]">
                <p>First name *</p>
                <input
                    className="border rounded-sm text-lg mt-1 w-full p-2"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                />
            </div>

            <div className="flex-1 min-w-[200px]">
                <p>Last name *</p>
                <input
                    className="border rounded-sm text-lg mt-1 w-full p-2"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                />
            </div>
        </div>

        <div className="flex gap-4 flex-wrap justify-center">
            <div className="flex-1 min-w-[200px]">
                <p>Service Title *</p>
                <input
                    className="border rounded-sm text-lg mt-1 w-full p-2"
                    name="serviceTitle"
                    placeholder="Ex, Haircut"
                    value={formData.serviceTitle}
                    onChange={handleChange}
                />
            </div>

            <div className="flex-1 min-w-[200px]">
                <p>Category *</p>
                <Select
                    options={userOptions}
                    placeholder="Select a category"
                    value={formData.category}
                    onChange={(option) =>
                        setFormData((prev) => ({ ...prev, category: option }))
                    }
                />
            </div>
        </div>

        <div className="mt-4">
            <p>Description*</p>
            <textarea
                rows={3}
                required
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your service in detail"
                className="border p-3 rounded-lg w-full"
            />
        </div>

        <div className="mt-4">
            <p>Link to personal site</p>
            <textarea
                rows={1}
                name="site"
                value={formData.site}
                onChange={handleChange}
                placeholder="Provide link to your personal website if you have one"
                className="border p-3 rounded-lg w-full"
            />
        </div>
    </section>
);


const LocationPricing = ({ formData, handleChange }) => (
    <section>
        <div className="flex items-center gap-2 mb-2 text-lg text-purple-400">
            <MapPin />
            <h2 className="font-semibold">Location & Pricing</h2>
        </div>
        <div className="flex gap-5 flex-wrap">
            <div className="flex-1 min-w-[200px]">
                <p>Location *</p>
                <input
                    className="border rounded-sm text-lg mt-1 w-full p-2"
                    name="location"
                    placeholder="e.g Campus Library, Dorm"
                    value={formData.location}
                    onChange={handleChange}
                />
            </div>

            <div className="flex-1 min-w-[200px]">
                <p>Price</p>
                <input
                    className="border rounded-sm text-lg mt-1 w-full p-2"
                    name="price"
                    placeholder="e.g $20/hr"
                    value={formData.price}
                    onChange={handleChange}
                />
            </div>
        </div>
    </section>
);

const ContactInfo = ({ formData, handleChange }) => (
    <section>
        <div className="flex items-center gap-2 mb-2 text-lg text-purple-400">
            <Mail />
            <h2 className="font-semibold">Contact Information</h2>
        </div>
        <div className="flex gap-5 flex-wrap">
            <div className="flex-1 min-w-[200px]">
                <p>Email *</p>
                <input
                    className="border rounded-sm text-lg mt-1 w-full p-2"
                    name="email"
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>

            <div className="flex-1 min-w-[200px]">
                <p>Phone (Optional)</p>
                <input
                    className="border rounded-sm text-lg mt-1 w-full p-2"
                    name="phone"
                    type="tel"
                    placeholder="(242) 143 5899"
                    value={formData.phone}
                    onChange={handleChange}
                />
            </div>
        </div>
    </section>
);

const ServiceOffered = ({ text, setText, offers, handleService, deleteOffer }) => (
    <section>
        <div className="flex items-center gap-2 mb-2 text-lg text-purple-400">
            <Star />
            <h2 className="font-semibold">Services Offered</h2>
        </div>
        <div className="flex gap-4">
            <textarea
                rows={2}
                className="border w-full rounded-sm"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button
                type="button"
                className="w-12 rounded-sm bg-purple-400 cursor-pointer text-white font-bold"
                onClick={handleService}
                aria-label="Add Service"
            >
                +
            </button>
        </div>
        <ul className="mt-3 gap-3 w-lg">
            {offers.map((offer) => (
                <li
                    key={offer.id}
                    className="flex justify-between bg-purple-200 rounded mt-2  w-auto"

                >
                    <span> {offer.text} </span>

                    <button
                        type="button"
                        className="flex mt-3 font-bold text-red-500 text-[30px] cursor-pointer mr-3"
                        onClick={() => deleteOffer(offer.id)}
                    >
                        X
                    </button>
                </li>

            ))}
        </ul>
    </section>
);

const Availability = ({ days, checklist, handleSelect, availability, setDayTime }) => (
    <section>

        <div className="flex items-center gap-2 mb-2 text-lg text-purple-400">
            <Clock />
            <h2 className="font-semibold">Availability</h2>
        </div>

        {/**Days list */}
        <div className="flex gap-2 flex-wrap mb-2">
            <label className="font-medium">Selected: </label>
            {checklist.map((day, index) => (
                <span key={index} className="bg-purple-200 px-2 py-1 rounded text-sm">
                    {day}
                </span>
            ))}
        </div>

        {/*Loop through each day and create a checkbox for it */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {days.map(({ id, value: day }) => {
                const checked = checklist.includes(day);
                const times = availability[day] || { start: "", end: "" };

                return (
                    <div key={id} className="flex items-center gap-3 border rounded p-2 flex-wrap">
                        <label className="flex items-center gap-2 min-w-[120px] font-bold text-lg">
                            <input
                                type="checkbox"
                                value={day}
                                checked={checked}
                                onChange={handleSelect}
                            />
                            {day}
                        </label>

                        <TimeSelection
                            checked={checked}
                            start={times.start}
                            end={times.end}
                            onStart={(str) => setDayTime(day, "start", str)}
                            onEnd={(str) => setDayTime(day, "end", str)}
                        />
                    </div>
                );
            })}
        </div>
    </section>
);

const AboutYou = ({ formData, handleChange }) => (
    <section>
        <p>Bio *</p>
        <textarea
            rows={3}
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell students about yourself, background, experience..."
            className="border w-full rounded p-2"
        />
        <div className="mt-4">
            <p>Experience</p>
            <textarea
                rows={2}
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Describe relevant experience or achievements"
                className="border w-full rounded p-2"
            />
        </div>
    </section>
);

const CreateAccountBtn = ({disabled = false}) => (
    <div className="flex justify-end gap-4">
        <button type="button" className="px-4 py-2 border rounded">
            Cancel
        </button>
        <button
            type="submit"
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            disabled={disabled}

        >
            Create Provider Profile
        </button>
    </div>
);
