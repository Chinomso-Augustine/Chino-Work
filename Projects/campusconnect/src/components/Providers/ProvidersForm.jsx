import Select from 'react-select'
import { User, Mail, Star, Clock, MapPin } from "lucide-react";
import { useState } from 'react';


const category = [
    "Personal Care",
    "Academic Help",
    "Tech Support",
    "Transportation Repair",
    "Creative Service",
    "Event & Lifestyle",
]

const days = [
    { id: 1, value: "Monday" },
    { id: 2, value: "Tuesday" },
    { id: 3, value: "Wednesday" },
    { id: 4, value: "Thursday" },
    { id: 5, value: "Friday" },
    { id: 6, value: "Saturday" },
    { id: 7, value: "Sunday" },
]

const ProvidersForm = () => {

    const userOptions = category.map(list => ({ value: list, label: list }));

    {/**Form state  to track state of inputs*/}
    const [formData, setFormData] = useState({
        serviceTitle: "",
        category: "",
        description: "",
        location: "",
        price: "",
        email: "",
        phone: "",
        bio: "",
        experience: "",

    })

    const [checklist, setCheckList] = useState([]); //monitoring user availability
    const [text, setText] = useState(""); //capture service offered from input textarea 
    const [offers, setOffers] = useState([]) //for storing offers

    {/**Input handler to update inputs in formData dynamically*/}
    const handleInputChange = (e) =>{
        const {name, value} = e.target; 
        setFormData({...formData, [name]: value }) //updates key in formData
    }

    {/**Returning object for category instead of input */}
    const handleCategoryChange = (selectedOption)=> {
        setFormData({...formData, category:selectedOption.value}); 
    }; 

    {/** Handles checking and unchecking availability */ }
    const handleSelect = (event) => {
        const value = event.target.value; //capture typed value
        const isChecked = event.target.checked; //Used for monitoring check
        if (isChecked) {
            /**Add check item into checklist */
            setCheckList([...checklist, value]);
        }
        else {
            //remove unchecked item from the list 
            setCheckList(checklist.filter((daysSelected) => daysSelected !== value));
        }
    }

    {/**Handling add service  */ }
    const handleService = (e) => {
        e.preventDefault();
        //If text is not empty, add the texts to offers and clear textarea
        if (text.trim() !== "") {
            setOffers([...offers, text]) //add to offers
            setText(""); //clear text area 
        }
    }

    {/**Form submission */}
const handleSubmit = (e)=>{
    e.preventDefault(); 
    console.log(({...formData, offers, availability: checklist})); 
}
    return (
        <div className="bg-gradient-to-b from-purple-100 to-white py-3 px-4 mt-18 border w-full">


            <form className="gap-10 justify-center" onSubmit={handleSubmit}>
                <HeaderInfo />
                <BasicInfo userOptions={userOptions} />
                <LocationPricing />
                <ContactInfo />
                <ServiceOffered text={text} setText={setText} offers={offers} handleService={handleService} />
                <Availability days={days} checklist={checklist} handleSelect={handleSelect} />
                <AboutYou />
                <CreateAccountBtn />
            </form>
        </div>
    )
}

export default ProvidersForm; 


const HeaderInfo = () => (
    <div>
         <h2 className="text-lg  md:text-2xl text-center font-bold mt-3"> Create Your Provider Profile </h2>
        <p className='text-center mt-1'> Tell Students about your services and availability</p>

    </div>
)

{/**Basic Info function  */ }
const BasicInfo = ({ userOptions }) => (
    <div>
        <h2 className="text-lg font-semibold">Basic Information</h2>
        <div className="flex gap-4 justify-center">
            <div>
                <p>Service Title *</p>
                <input
                    name="serviceTitle"
                    
                    placeholder="Ex, Haircut"
                    className="bg-grey-300 border rounded border-amber-200 h-9 px-5 w-full text-black mb-4"
                />
            </div>
            <div>
                <h2>Category *</h2>
                <Select options={userOptions} placeholder="Select a category" required className="min-w-sm" />
            </div>

        </div>
        <div className='w-full rounded-2xl'>
            <p>Description*</p>
            <textarea rows={4} required placeholder="Describe your service in detail" className="bg-blue-400 p-3 rounded-lg w-full" />
        </div>
    </div>
);

{/**Location and pricing  */ }
const LocationPricing = () => (
    <div>
        <div className='flex mt-6 mb-2 text-lg text-purple-400 justify-center'>
            <MapPin />
            <h2 className='font-semibold '> Location & Pricing</h2>
        </div>

        <div className='w-full border flex gap-5 justify-center'>
            <div className=''>
                <p>Location *</p>
                <input type='text' placeholder='e.g Campus Library, Dorm, Apartment' className='border rounded-sm text-lg mt-1'>
                </input>
            </div>
            <div className=''>
                <p>Price</p>
                <input type='text' placeholder='e.g $20/hr $15/session' className='border rounded-sm text-lg mt-1'></input>

            </div>
        </div>
    </div>
)

{/**Contact Info */ }
const ContactInfo = () => (
    <div>
        <div className='flex mt-6 mb-2 text-lg text-purple-400 justify-center'>
            <Mail />
            <h2> Contact Information</h2>
        </div>

        <div className='w-full border flex gap-5 justify-center'>
            <div className=''>
                <p>Email *</p>
                <input type='text' placeholder='e.g Campus Library, Dorm, Apartment' className='border rounded-sm text-lg mt-1'>
                </input>
            </div>

            <div className=''>
                <p>Phone (Optional)</p>
                <div className='flex'>
                    <input type='tel' placeholder='(242) 143 5899' className='border rounded-sm text-lg mt-1'></input>
                </div>
            </div>
        </div>
    </div>
)

{/**Service Offered */ }
const ServiceOffered = ({ text, setText, offers, handleService }) => (
    <div>
        <div className='flex mt-5 gap-1'>
            <Star />
            <p className='font-semibold '>Services Offered</p>
        </div>
        <div className='flex gap-4'>
            <textarea
                rows={2}
                className='border w-full rounded-sm'
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <button
                type='button'
                className='w-12 border rounded-sm bg-purple-400 cursor-pointer'
                onClick={handleService}
            >
                <p className='font-semibold text-white'> +</p>
            </button>
        </div>
        {/**Displaying text */}
        {offers.map((service, index) => (
            <p> {service}</p>
        ))}
    </div>
)

{/**Availability */ }
const Availability = ({ days, checklist, handleSelect }) => (
    <div>
        <Clock />
        <p>Availability</p>

        {/**For displaying selected days */}
        <div className='flex gap-4'>
            <label>You Selected: </label>
            {checklist.map((myDays, index) => {
                return (
                    <p className=''> {myDays} </p>
                )
            })}
        </div>
        {days.map((day) => (
            <div key={day}>
                <input
                    type='checkbox'
                    name='days'
                    id={day.id}
                    value={day.value}
                    onChange={handleSelect}
                />
                <label > {day.value} </label>

            </div>
        ))}
    </div>
)

{/**About you function */ }
const AboutYou = () => (
    <div>
        <p>Bio* </p>
        <div className='border' >
            <textarea
                rows={3}
                placeholder="Tell Students about yourself, your background, experience, and qualification"
                className='border w-full'
            />
        </div>

        <div className='mt-5'>
            <p> Experience</p>
            <textarea
                rows={2}
                className='border w-full'
                placeholder='Describe your relevant experience, qualifications, or achievement'
            />

        </div>
    </div>
)

{/**Create account btn */ }
const CreateAccountBtn = () => (
    <div>
        <button> Cancel </button>
        <button> Create Provider Profile</button>
    </div>
)
