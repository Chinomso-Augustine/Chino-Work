import { Star, User, Clock } from "lucide-react";
import { Link } from "react-router-dom"

function Home() {

    /*Stats for stat section  */ 
    const stats = [
        { value: "500+", label: "Active Students" },
        { value: "4.5", label: "Average Rating", icon: <Star className="inline w-8 h-7 ml-1" /> },
        { value: "2000+", label: "Services Completed" },
    ];

    {/**Info for reason to chose us section */ }
    const reason = [
        { icon: <User className="w-6 h-6" />, value: "Student-to-Student", label: "Connect directly with fellow students who understand your needs and schedule. " },
        { icon: <Star className="w-6 h-6" />, value: "Trusted Review", label: "Read reviews from other students to find the best service providers." },
        { icon: <Clock className="w-6 h-6" />, value: "Flexible scheduling", label: "Book services that fit your busy student schedule." }
    ]


    return (
        <div>
            {/** Header section */}
            <section className="bg-gradient-to-br from-purple-700 via-indigo-800  to-purple-700 text-white h-auto py-12 p-13 mt-20">
                <h1 className="text-3xl  md:text-6xl text-center font-bold ">Connect with <span className="text-purple-300"> Campus Services</span>
                </h1>

                <p className="text-2xl text-center mt-9 mb-9">Find tutoring, tech support, creative services, and more from fellow students on campus.
                    Quality services at student-friendly prices. </p>

                <div className="flex flex-col md:flex-row justify-center items-center gap-4">

                    <Link to="/Services">
                        <button className="bg-gradient-to-r from bg-purple-500 via-pink-400px to-pink-500 text-center px-6 py-3 m-5 rounded-2xl text-lg font-semibold shadow-lg hover:scale-105 transition-transform">
                            Browse Services </button> 
                    </Link>
                    
                    <Link to="/Providers">
                    <button className="border text-center px-6 py-3 m-3 rounded-2xl text-lg font-semibold shadow-lg transition-transform hover:scale-105 hover:bg-purple-200 hover:text-purple-600">
                        View All Providers
                    </button>
                    </Link>
                </div>
            </section>

            {/*Stats section */}
            <section className="bg-gradient-to-r from-purple-800 to-indigo-800 py-10 flex flex-wrap items-center md:flex-row  sm:flex-row justify-center gap-3 ">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-white/8 backdrop-blur-md rounded-1xl py-5 m-3 text-center shadow-md text-white w-lg md:w-56 rounded-2xl"
                    >
                        <div className="text-3xl font-bold">
                            {stat.value}
                            {stat.icon && stat.icon}
                        </div>

                        {/*Displaying text under numbers */}
                        <div className="text-sm mt-2 text-purple-100">
                            {stat.label}
                        </div>

                    </div>
                ))}

            </section>

            {/**Reason to choose CampusConnect section */}
            <section className="bg-gradient-to-b from-purple-50 to-white py-16 px-4" >
                <h3 className="text-3xl font-bold text-center mb-4 text-gray-900">Why Choose CampusConnect?</h3>
                <p className="text-lg text-center text-gray-600 mb-12 max-w-2xl mx-auto">We make it easy to find trusted services from fellow students on your campus </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">

                    {reason.map((whyUs, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-lg shadow-sm transition-shadow duration-100 ease-in hover:shadow-lg">

                            <div className="flex gap-3"> 
                            <div className="bg-gradient-to-r from-purple-500  to-indigo-500 w-12 h-12 text-white text-center rounded-lg flex items-center justify-center">{whyUs.icon}</div>
                            <div className="text-lg  font-semibold text-gray-900 mb-2 mt-3">{whyUs.value}</div>
                            </div>
                            <div className="text-sm text-gray-600 mt-4">{whyUs.label}</div>

                        </div>
                    ))}
                </div>
            </section>

            <footer className="bg-gradient-to-r from-purple-800 to-indigo-800 py-12">
                <h2 className="text-3xl font-bold text-center mb-4 text-white">Ready to Connect?</h2>

                <p className="text-gray-300 text-lg font-semibold flex text-center justify-center m-4 ">Join our community of students helping students. Find the services you need or offer your skills to others.</p>

                <div className="flex lg:flex-row md:flex-row justify-center gap-6 flex-wrap font-bold mt-9 mb-7">

                    <Link to="/Services">
                        <button className="bg-white text-purple-800 text-lg rounded-lg p-4  cursor-pointer">
                            Find Services
                        </button>
                    </Link>

                    <Link to="/Providers">
                        <button className="border text-white text-lg rounded-lg p-4 hover:bg-white hover:text-purple-800 cursor-pointer">
                            Browse Providers
                        </button>
                    </Link>

                </div>
            </footer >
        </div >
    )
}
export default Home; 