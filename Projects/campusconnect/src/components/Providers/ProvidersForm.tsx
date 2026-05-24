import {
  useCallback,
  useEffect,
  useState,
  type ChangeEvent,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from "react";
import Select, { type StylesConfig } from "react-select";
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

const selectStyles: StylesConfig<CategoryOption, false> = {
  control: (base, state) => ({
    ...base,
    minHeight: "50px",
    borderRadius: "18px",
    borderColor: state.isFocused ? "#1a73e8" : "#dde3ea",
    backgroundColor: "rgba(255,255,255,0.92)",
    boxShadow: state.isFocused ? "0 0 0 4px rgba(26, 115, 232, 0.12)" : "none",
    "&:hover": {
      borderColor: "#1a73e8",
    },
  }),
  placeholder: (base) => ({
    ...base,
    color: "#5f6368",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#1f1f1f",
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(60, 64, 67, 0.16)",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? "#1a73e8" : state.isFocused ? "#eef3fd" : "#fff",
    color: state.isSelected ? "#fff" : "#1f1f1f",
    cursor: "pointer",
  }),
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
    <div className="page-shell">
      <form className="page-container max-w-5xl" onSubmit={handleSubmit}>
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
  <div className="app-hero text-center">
    <div className="app-badge">Become a provider</div>
    <h2 className="mt-4 text-3xl font-semibold text-slate-900 md:text-4xl">Create Your Provider Profile</h2>
    <p className="app-subtle mx-auto mt-3 max-w-2xl text-base">
      Tell students what you offer, when you’re available, and why they should book with you.
    </p>
  </div>
);

type BasicInfoProps = {
  userOptions: CategoryOption[];
  formData: ProviderFormData;
  setFormData: Dispatch<SetStateAction<ProviderFormData>>;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

const BasicInfo = ({ userOptions, formData, setFormData, handleChange }: BasicInfoProps) => (
  <section className="app-card space-y-5">
    <div className="mb-2 flex items-center gap-3 text-lg text-blue-700">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50">
        <User className="h-5 w-5" />
      </div>
      <h2 className="font-semibold">Basic Information</h2>
    </div>

    <div className="flex flex-wrap justify-center gap-4">
      <div className="flex-1 min-w-[200px]">
        <p className="mb-2 text-sm font-medium text-slate-700">First name *</p>
        <input
          className="app-input"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </div>

      <div className="flex-1 min-w-[200px]">
        <p className="mb-2 text-sm font-medium text-slate-700">Last name *</p>
        <input
          className="app-input"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>
    </div>

    <div className="flex flex-wrap justify-center gap-4">
      <div className="flex-1 min-w-[200px]">
        <p className="mb-2 text-sm font-medium text-slate-700">Service Title *</p>
        <input
          className="app-input"
          name="serviceTitle"
          placeholder="Ex, Haircut"
          value={formData.serviceTitle}
          onChange={handleChange}
        />
      </div>

      <div className="flex-1 min-w-[200px]">
        <p className="mb-2 text-sm font-medium text-slate-700">Category *</p>
        <Select
          options={userOptions}
          placeholder="Select a category"
          value={formData.category}
          styles={selectStyles}
          onChange={(option) => setFormData((prev) => ({ ...prev, category: option as CategoryOption | null }))}
        />
      </div>
    </div>

    <div>
      <p className="mb-2 text-sm font-medium text-slate-700">Description *</p>
      <textarea
        rows={3}
        required
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Describe your service in detail"
        className="app-input"
      />
    </div>

    <div>
      <p className="mb-2 text-sm font-medium text-slate-700">Link to personal site</p>
      <textarea
        rows={1}
        name="site"
        value={formData.site}
        onChange={handleChange}
        placeholder="Provide link to your personal website if you have one"
        className="app-input"
      />
    </div>
  </section>
);

type SharedSectionProps = {
  formData: ProviderFormData;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

const LocationPricing = ({ formData, handleChange }: SharedSectionProps) => (
  <section className="app-card space-y-5">
    <div className="mb-2 flex items-center gap-3 text-lg text-blue-700">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50">
        <MapPin className="h-5 w-5" />
      </div>
      <h2 className="font-semibold">Location & Pricing</h2>
    </div>
    <div className="flex flex-wrap gap-5">
      <div className="flex-1 min-w-[200px]">
        <p className="mb-2 text-sm font-medium text-slate-700">Location *</p>
        <input
          className="app-input"
          name="location"
          placeholder="e.g Campus Library, Dorm"
          value={formData.location}
          onChange={handleChange}
        />
      </div>

      <div className="flex-1 min-w-[200px]">
        <p className="mb-2 text-sm font-medium text-slate-700">Price</p>
        <input
          className="app-input"
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
  <section className="app-card space-y-5">
    <div className="mb-2 flex items-center gap-3 text-lg text-blue-700">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50">
        <Mail className="h-5 w-5" />
      </div>
      <h2 className="font-semibold">Contact Information</h2>
    </div>
    <div className="flex flex-wrap gap-5">
      <div className="flex-1 min-w-[200px]">
        <p className="mb-2 text-sm font-medium text-slate-700">Email *</p>
        <input
          className="app-input"
          name="email"
          type="email"
          placeholder="example@email.com"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="flex-1 min-w-[200px]">
        <p className="mb-2 text-sm font-medium text-slate-700">Phone (Optional)</p>
        <input
          className="app-input"
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
  <section className="app-card space-y-5">
    <div className="mb-2 flex items-center gap-3 text-lg text-blue-700">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50">
        <Star className="h-5 w-5" />
      </div>
      <h2 className="font-semibold">Services Offered</h2>
    </div>
    <div className="flex gap-4">
      <textarea
        rows={2}
        className="app-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a service offering or package detail"
      />
      <button
        type="button"
        className="app-btn-primary w-12 rounded-2xl px-0 text-lg"
        onClick={handleService}
        aria-label="Add Service"
      >
        +
      </button>
    </div>
    <ul className="w-lg gap-3">
      {offers.map((offer) => (
        <li
          key={offer.id}
          className="mt-2 flex w-auto items-center justify-between rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm"
        >
          <span>{offer.text}</span>

          <button
            type="button"
            className="mr-1 flex text-2xl font-bold text-red-500"
            onClick={() => deleteOffer(offer.id)}
          >
            ×
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
  <section className="app-card space-y-5">
    <div className="mb-2 flex items-center gap-3 text-lg text-blue-700">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50">
        <Clock className="h-5 w-5" />
      </div>
      <h2 className="font-semibold">Availability</h2>
    </div>

    <div className="mb-2 flex flex-wrap gap-2">
      <label className="font-medium text-slate-700">Selected:</label>
      {checklist.map((day, index) => (
        <span key={index} className="app-chip px-3 py-1 text-xs">
          {day}
        </span>
      ))}
    </div>

    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
      {days.map(({ id, value: day }) => {
        const checked = checklist.includes(day);
        const times = availability[day] || { start: "", end: "" };

        return (
          <div key={id} className="flex flex-wrap items-center gap-3 rounded-2xl border border-[var(--google-border)] p-3">
            <label className="flex min-w-[120px] items-center gap-2 text-sm font-semibold text-slate-700">
              <input className="h-4 w-4 accent-blue-600" type="checkbox" value={day} checked={checked} onChange={handleSelect} />
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
  <section className="app-card space-y-4">
    <div>
      <p className="mb-2 text-sm font-medium text-slate-700">Bio *</p>
    <textarea
      rows={3}
      name="bio"
      value={formData.bio}
      onChange={handleChange}
      placeholder="Tell students about yourself, background, experience..."
      className="app-input"
    />
    </div>
    <div className="mt-4">
      <p className="mb-2 text-sm font-medium text-slate-700">Experience</p>
      <textarea
        rows={2}
        name="experience"
        value={formData.experience}
        onChange={handleChange}
        placeholder="Describe relevant experience or achievements"
        className="app-input"
      />
    </div>
  </section>
);

const CreateAccountBtn = ({ disabled = false }: { disabled?: boolean }) => (
  <div className="app-card flex flex-wrap justify-end gap-4">
    <button type="button" className="app-btn-secondary">
      Cancel
    </button>
    <button
      type="submit"
      className="app-btn-primary disabled:opacity-60"
      disabled={disabled}
    >
      Create Provider Profile
    </button>
  </div>
);
