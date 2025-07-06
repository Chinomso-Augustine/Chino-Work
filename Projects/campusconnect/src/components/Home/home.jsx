import React, { useState } from "react";
import { Star } from "lucide-react";


function Home() {

    {/*Stats for stat section  */ }
    const stats = [
        { value: "500+", label: "Active Students" },
        { value: "4.5", label: "Average Rating", icon: <Star className="inline w-5 h-5 ml-1" /> },
        { value: "2000+", label: "Services Completed" },
    ];

    const [bodyMobileScreen, setBodyMobileScreen] = useState(false);

    return (
        <div>
            <section className="bg-gradient-to-br from-purple-700 via-indigo-800  to-purple-700 text-white h-auto py-12 p-13 ">
                <h1 className="text-6xl text-center font-bold">Connect with <span className="text-purple-300"> Campus Services</span>
                </h1>

                <p className="text-2xl text-center mt-9 mb-9">Find tutoring, tech support, creative services, and more from fellow students on campus.
                    Quality services at student-friendly prices. </p>

                <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                    <button className="bg-gradient-to-r from bg-purple-500 via-pink-400px to-pink-500 text-center px-6 py-3 m-5 rounded-2xl text-lg font-semibold shadow-lg hover:scale-105 transition-transform">
                        Browse Services </button>
                    <button className="border text-center px-6 py-3 m-3 rounded-2xl text-lg font-semibold shadow-lg transition-transform hover:scale-105 hover:bg-purple-200 hover:text-purple-600">
                        View All Providers
                    </button>
                </div>
            </section>

            <section className="bg-gradient-to-r from-purple-700 to-indigo-800 py-12 flex flex-col md:flex-row justify-center gap-6 flex-wrap">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-white/8 backdrop-blur-md rounded-1xl px-8 py-6 text-center shadow-md text-white w-full md:w-56 rounded-2xl"
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
            <section>

            </section>

            <footer>

            </footer>
        </div>
    )
}
export default Home; 