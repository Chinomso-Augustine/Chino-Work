import { useState, useCallback } from "react";
import Select from "react-select";
import { User, Mail, Star, Clock, MapPin } from "lucide-react";

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

    const [formData, setFormData] = useState({
        serviceTitle: "",
        description: "",
        location: "",
        price: "",
        email: "",
        phone: "",
        bio: "",
        experience: "",
        text: "",
        offers: [],
        checklist: [],
        category: null,
    });

    //Runs whenever a checkbox is clicked
    const handleSelect = (e) => {
        const { value, checked } = e.target;
        setFormData((prevFormData) => {
            if (checked) {
                return {
                    ...prevFormData,
                    checklist: [...prevFormData.checklist, value],
                };
            } else {
                return {
                    ...prevFormData,
                    checklist: prevFormData.checklist.filter((day) => day !== value),
                };
            }
        });
    };

    // Handle service input addition
    const handleService = useCallback(() => {
        if (formData.text.trim() !== "") {
            setFormData((prev) => ({
                ...prev,
                offers: [...prev.offers, prev.text],
                text: "",
            }));
        }
    }, [formData.text]);

    // Handle generic input updates
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted Form:", formData);
    };

    

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
                <LocationPricing formData={formData} handleChange={handleChange} />
                <ContactInfo formData={formData} handleChange={handleChange} />
                <ServiceOffered
                    text={formData.text}
                    setText={(val) => setFormData((prev) => ({ ...prev, text: val }))}
                    offers={formData.offers}
                    handleService={handleService}
                />
                <Availability
                    days={days}
                    checklist={formData.checklist}
                    handleSelect={handleSelect}
                />
                <AboutYou formData={formData} handleChange={handleChange} />
                <CreateAccountBtn />
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
                rows={4}
                required
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your service in detail"
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

const ServiceOffered = ({ text, setText, offers, handleService }) => (
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
                className="w-12 border rounded-sm bg-purple-400 cursor-pointer text-white font-bold"
                onClick={handleService}
                aria-label="Add Service"
            >
                +
            </button>
        </div>
        <ul className="mt-2 list-disc pl-5 text-sm">
            {offers.map((service, index) => (
                <li key={index}>{service}</li>
            ))}
        </ul>
    </section>
);

const Availability = ({ days, checklist, handleSelect }) => (
    <section>
        <div className="flex items-center gap-2 mb-2 text-lg text-purple-400">
            <Clock />
            <h2 className="font-semibold">Availability</h2>
        </div>
        <div className="flex gap-2 flex-wrap mb-2">
            <label className="font-medium">Selected: </label>
            {checklist.map((day, index) => (
                <span key={index} className="bg-purple-200 px-2 py-1 rounded text-sm">
                    {day}
                </span>
            ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {days.map(({ id, value }) => (
                <label key={id} className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        value={value}
                        checked={checklist.includes(value)}
                        onChange={handleSelect}
                    />
                    {value}
                </label>
            ))}
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

const CreateAccountBtn = () => (
    <div className="flex justify-end gap-4">
        <button type="button" className="px-4 py-2 border rounded">
            Cancel
        </button>
        <button
            type="submit"
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
            Create Provider Profile
        </button>
    </div>
);
