import Select from 'react-select'
import { User } from "lucide-react";


const category = [
    "Personal Care",
    "Academic Help",
    "Tech Support",
    "Transportation Repair",
    "Creative Service",
    "Event & Lifestyle",
]

const ProvidersForm = () => {

    const userOptions = category.map(list => ({
        value: list,
        label: list
    }));


    return (
        <div className="py-3 px-4 m-30 mt-25 border">
            <div>
                <h1> Create Your Provider Profile</h1>
                <p> Tell Students about your services and availability</p>
            </div>

            {/**form info */}
            <div>
                <div className="">
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


                    <div>

                    </div>
                </form>
            </div>

        </div>

    )
}

export default ProvidersForm; 