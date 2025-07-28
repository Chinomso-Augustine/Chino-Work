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

    const userOptions = category.map(list => ({
        value: list,
        label: list
    }));
    {/**For storing checked itmes  */ }
    const [checklist, setCheckList] = useState([]);

    const handleSelect = (event) => {
        const value = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            {/**Add check item into checklist */ }
            setCheckList([...checklist, value]);
        }
        else {
            //remove unchecked item from the list 
            const filterList = checklist.filter((daysSelected) => daysSelected !== value)
            setCheckList(filterList);
        }
    }



    return (
        <div className="py-3 px-4 m-30 mt-25 border">
            <div>
                <h1> Create Your Provider Profile</h1>
                <p> Tell Students about your services and availability</p>
            </div>

            {/**form info */}
            <div>
                <div className="flex justify-center mb-2">
                    <User className="text-purple-500 " />
                    <h2 className='text-lg font-semibold'> Basic information </h2>
                </div>

                <form className="gap-10 justify-center">

                    {/*Basic Info */}

                    <div className='border'>
                        <div className='flex gap-4 justify-center'>
                            <div>
                                <p>Service Title *  </p>
                                <input name="serviceTitle"
                                    placeholder="Ex, Haircut"
                                    className="bg-grey-300 border rounded border-amber-200 h-9 px-5 w-full text-black mb-4" />
                            </div>

                            <div>
                                <h2> Category * </h2>
                                <Select options={userOptions}
                                    placeholder="Select a category"
                                    required
                                    className='min-w-sm' />
                            </div>
                        </div>

                        <div className="mb-4 flex flex-col items-center justify-center border p-4 rounded-md w-full max-w-md mx-auto">
                            <label className="mb-2 font-medium text-center ">Profile Picture</label>
                            <input type="file"
                                className=" w-sm text-md border text-gray-500 file:mr-4 file:py-2 file:px-7 file:rounded-full file:border-0 file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200" />
                            <button
                                type='submit'
                                className='w-sm mt-2 bg-purple-600 text-white px-3 py-2 rounded hover:bg-purple-700 cursor-pointer'>Submit Profile
                            </button>
                        </div>

                        <div>
                            <p> Description*</p>
                            <textarea
                                rows={4}
                                required
                                placeholder='Describe your service in detail '
                                className='bg-blue-400 p-3 rounded-lg w-full md:flex-1'></textarea>
                        </div>

                    </div>

                    {/**Location and pricing */}
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

                    {/**Contact */}
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

                    <div>
                        <Star />
                        <p>Services Offered</p>
                        <textarea rows={2} className='border'></textarea>
                        <button className=''>+</button>
                    </div>

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
                </form>
            </div >

        </div >

    )
}

export default ProvidersForm; 