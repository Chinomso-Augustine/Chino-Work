import {
  useCallback,
  useEffect,
  useState,
  type ChangeEvent,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from "react";
import Select from "react-select";
import { Clock, Mail, MapPin, Star, User } from "lucide-react";
import { supabase } from "../../supabaseClient";
import ProfileImagePicker from "./ProfileImagePicker";
import TimeSelection from "./TimeSelection";

type CategoryOption = {
  value: string;
  label: string;
};

type Day = {
  id: number;
  value: string;
};

type Offer = {
  id: number;
  text: string;
};

type DayAvailability = {
  start: string;
  end: string;
};

type AvailabilityMap = Record<string, DayAvailability>;

type ProviderFormData = {
  firstName: string;
  lastName: string;
  serviceTitle: string;
  description: string;
  site: string;
  location: string;
  price: string;
  email: string;
  phone: string;
  bio: string;
  experience: string;
  text: string;
  offers: Offer[];
  checklist: string[];
  availability: AvailabilityMap;
  category: CategoryOption | null;
  profileImageUrl: string;
  profileImagePath: string;
};

const category = [
  "Personal Care",
  "Academic Help",
  "Tech Support",
  "Transportation Repair",
  "Creative Service",
  "Event & Lifestyle",
];

const days: Day[] = [
  { id: 1, value: "Monday" },
  { id: 2, value: "Tuesday" },
  { id: 3, value: "Wednesday" },
  { id: 4, value: "Thursday" },
  { id: 5, value: "Friday" },
  { id: 6, value: "Saturday" },
  { id: 7, value: "Sunday" },
];

const createInitialFormData = (): ProviderFormData => ({
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
  profileImagePath: "",
});

const ProvidersForm = () => {
  const userOptions: CategoryOption[] = category.map((list) => ({ value: list, label: list }));
  const [userId, setUserId] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [formData, setFormData] = useState<ProviderFormData>(createInitialFormData());

  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserId(user?.id ?? "");
    })();
  }, []);

  const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prevFormData) => {
      if (checked) {
        return {
          ...prevFormData,
          checklist: [...prevFormData.checklist, value],
          availability: {
            ...prevFormData.availability,
            [value]: prevFormData.availability[value] || { start: "09:00 AM", end: "04:00 PM" },
          },
        };
      }

      return {
        ...prevFormData,
        checklist: prevFormData.checklist.filter((day) => day !== value),
        availability: Object.fromEntries(
          Object.entries(prevFormData.availability).filter(([key]) => key !== value),
        ) as AvailabilityMap,
      };
    });
  };

  const setDayTime = (day: string, field: "start" | "end", hhmm: string) => {
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

  const handleService = useCallback(() => {
    if (formData.text.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        offers: [...prev.offers, { id: Date.now(), text: prev.text }],
        text: "",
      }));
    }
  }, [formData.text]);

  const deleteOffer = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      offers: prev.offers.filter((offer) => offer.id !== id),
    }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isUploadingImage) {
      alert("Please wait for the image to finish uploading");
      return;
    }

    if (!formData.profileImagePath) {
      alert("Please upload a profile image before submitting.");
      return;
    }

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.serviceTitle ||
      !formData.category ||
      !formData.description ||
      !formData.location ||
      !formData.email
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    const availabilityArr = formData.checklist.map((day) => ({
      day,
      start: formData.availability[day]?.start ?? "",
      end: formData.availability[day]?.end ?? "",
    }));

    const { error } = await supabase.from("providers").insert([
      {
        user_id: userId,
        first_name: formData.firstName,
        last_name: formData.lastName,
        service_title: formData.serviceTitle,
        category: formData.category.label,
        description: formData.description,
        site: formData.site,
        location: formData.location,
        price: formData.price,
        email: formData.email,
        phone: formData.phone,
        bio: formData.bio,
        experience: formData.experience,
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
      alert("Profile created successfully!");
      setFormData(createInitialFormData());
    }
  };

  return (
    <div className="bg-white py-6 px-6 mt-20 border border-amber-200/60 w-full max-w-4xl mx-auto rounded-2xl shadow-sm">
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
            setFormData((prev) => ({
              ...prev,
              profileImageUrl: url || "",
              profileImagePath: path || "",
            }))
          }
          onUploadingChange={setIsUploadingImage}
        />

        <LocationPricing formData={formData} handleChange={handleChange} />

        <ContactInfo formData={formData} handleChange={handleChange} />

        <ServiceOffered
          text={formData.text}
          setText={(value) => setFormData((prev) => ({ ...prev, text: value }))}
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

const HeaderInfo = () => (
  <div className="text-center">
    <h2 className="text-lg md:text-2xl font-bold">Create Your Provider Profile</h2>
    <p className="mt-1">Tell students about your services and availability</p>
  </div>
);

type BasicInfoProps = {
  userOptions: CategoryOption[];
  formData: ProviderFormData;
  setFormData: Dispatch<SetStateAction<ProviderFormData>>;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

const BasicInfo = ({ userOptions, formData, setFormData, handleChange }: BasicInfoProps) => (
  <section>
    <div className="flex items-center gap-2 mb-2 text-lg text-purple-700">
      <User />
      <h2 className="font-semibold">Basic Information</h2>
    </div>

    <div className="flex gap-4 flex-wrap justify-center">
      <div className="flex-1 min-w-[200px]">
        <p>First name *</p>
        <input
          className="border border-purple-200/60 rounded-lg text-sm mt-1 w-full p-2"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </div>

      <div className="flex-1 min-w-[200px]">
        <p>Last name *</p>
        <input
          className="border border-purple-200/60 rounded-lg text-sm mt-1 w-full p-2"
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
          className="border border-purple-200/60 rounded-lg text-sm mt-1 w-full p-2"
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
          onChange={(option) => setFormData((prev) => ({ ...prev, category: option as CategoryOption | null }))}
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
        className="border border-purple-200/60 p-3 rounded-lg w-full text-sm"
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
        className="border border-purple-200/60 p-3 rounded-lg w-full text-sm"
      />
    </div>
  </section>
);

type SharedSectionProps = {
  formData: ProviderFormData;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

const LocationPricing = ({ formData, handleChange }: SharedSectionProps) => (
  <section>
    <div className="flex items-center gap-2 mb-2 text-lg text-purple-700">
      <MapPin />
      <h2 className="font-semibold">Location & Pricing</h2>
    </div>
    <div className="flex gap-5 flex-wrap">
      <div className="flex-1 min-w-[200px]">
        <p>Location *</p>
        <input
          className="border border-purple-200/60 rounded-lg text-sm mt-1 w-full p-2"
          name="location"
          placeholder="e.g Campus Library, Dorm"
          value={formData.location}
          onChange={handleChange}
        />
      </div>

      <div className="flex-1 min-w-[200px]">
        <p>Price</p>
        <input
          className="border border-purple-200/60 rounded-lg text-sm mt-1 w-full p-2"
          name="price"
          placeholder="e.g $20/hr"
          value={formData.price}
          onChange={handleChange}
        />
      </div>
    </div>
  </section>
);

const ContactInfo = ({ formData, handleChange }: SharedSectionProps) => (
  <section>
    <div className="flex items-center gap-2 mb-2 text-lg text-purple-700">
      <Mail />
      <h2 className="font-semibold">Contact Information</h2>
    </div>
    <div className="flex gap-5 flex-wrap">
      <div className="flex-1 min-w-[200px]">
        <p>Email *</p>
        <input
          className="border border-purple-200/60 rounded-lg text-sm mt-1 w-full p-2"
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
          className="border border-purple-200/60 rounded-lg text-sm mt-1 w-full p-2"
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

type ServiceOfferedProps = {
  text: string;
  setText: (value: string) => void;
  offers: Offer[];
  handleService: () => void;
  deleteOffer: (id: number) => void;
};

const ServiceOffered = ({ text, setText, offers, handleService, deleteOffer }: ServiceOfferedProps) => (
  <section>
    <div className="flex items-center gap-2 mb-2 text-lg text-purple-700">
      <Star />
      <h2 className="font-semibold">Services Offered</h2>
    </div>
    <div className="flex gap-4">
      <textarea
        rows={2}
        className="border border-purple-200/60 w-full rounded-lg text-sm p-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="button"
        className="w-12 rounded-lg bg-purple-700 cursor-pointer text-white font-bold hover:bg-purple-800"
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
          className="flex justify-between bg-purple-100 rounded-lg mt-2 w-auto px-3 py-2 text-sm"
        >
          <span>{offer.text}</span>

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

type AvailabilityProps = {
  days: Day[];
  checklist: string[];
  handleSelect: (e: ChangeEvent<HTMLInputElement>) => void;
  availability: AvailabilityMap;
  setDayTime: (day: string, field: "start" | "end", hhmm: string) => void;
};

const Availability = ({ days, checklist, handleSelect, availability, setDayTime }: AvailabilityProps) => (
  <section>
    <div className="flex items-center gap-2 mb-2 text-lg text-purple-700">
      <Clock />
      <h2 className="font-semibold">Availability</h2>
    </div>

    <div className="flex gap-2 flex-wrap mb-2">
      <label className="font-medium">Selected: </label>
      {checklist.map((day, index) => (
        <span key={index} className="bg-purple-100 px-2 py-1 rounded text-sm">
          {day}
        </span>
      ))}
    </div>

    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
      {days.map(({ id, value: day }) => {
        const checked = checklist.includes(day);
        const times = availability[day] || { start: "", end: "" };

        return (
          <div key={id} className="flex items-center gap-3 border border-purple-200/60 rounded-lg p-2 flex-wrap">
            <label className="flex items-center gap-2 min-w-[120px] font-semibold text-sm">
              <input type="checkbox" value={day} checked={checked} onChange={handleSelect} />
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

const AboutYou = ({ formData, handleChange }: SharedSectionProps) => (
  <section>
    <p>Bio *</p>
    <textarea
      rows={3}
      name="bio"
      value={formData.bio}
      onChange={handleChange}
      placeholder="Tell students about yourself, background, experience..."
      className="border border-purple-200/60 w-full rounded-lg p-2 text-sm"
    />
    <div className="mt-4">
      <p>Experience</p>
      <textarea
        rows={2}
        name="experience"
        value={formData.experience}
        onChange={handleChange}
        placeholder="Describe relevant experience or achievements"
        className="border border-purple-200/60 w-full rounded-lg p-2 text-sm"
      />
    </div>
  </section>
);

const CreateAccountBtn = ({ disabled = false }: { disabled?: boolean }) => (
  <div className="flex justify-end gap-4">
    <button type="button" className="px-4 py-2 border border-purple-200/60 rounded-lg text-sm text-slate-600">
      Cancel
    </button>
    <button
      type="submit"
      className="px-4 py-2 bg-purple-700 text-white rounded-lg text-sm hover:bg-purple-800"
      disabled={disabled}
    >
      Create Provider Profile
    </button>
  </div>
);
