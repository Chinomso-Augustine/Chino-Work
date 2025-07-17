import Select from 'react-select'
import { Search, User } from "lucide-react";


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
        <div className="py-12 p-13 mt-20">
            <div>
                <h1> Create Your Provider Profile</h1>
                <p> Tell Students about your services and availability</p>
            </div>

            {/**form info */}
            <div>
                <div className="flex"> <User className="text-purple-500 " /><h1> Basic information </h1></div>
                <form action={Search} className="flex gap-10 justify-center">
                    <div>
                        <h2> Service Title * </h2>
                        <input name="query" placeholder="Ex, Haircut" className="bg-black-400 border rounded-sm text-black " />
                    </div>

                    <div>
                        <h2> Category * </h2>
                        <Select options={userOptions} placeholder="Select a category" required />
                    </div>
                </form>

            </div>

            <div>
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}>
                  
                    Upload files

                    <VisuallyHiddenInput
                        type="file"
                        onChange={(event) => console.log(event.target.files)}
                        multiple
                    />
                </Button>
            </div>
        </div>

    )
}

export default ProvidersForm; 