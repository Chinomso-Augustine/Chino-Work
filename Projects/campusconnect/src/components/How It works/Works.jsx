
function HowItWorks() {
    return (
        <div>
            <section className="bg-gradient-to-br from-purple-700 via-indigo-800  to-purple-700 text-white h-auto py-12 p-13 mt-20">
                <h1 className="text-3xl  md:text-6xl text-center font-bold ">How CampusConnect Works</h1>
                <p className="text-2xl text-center mt-9 mb-9">Getting the services you need on campus is simple. Follow these four easy steps to connect with skilled student providers.</p>
            </section>

            {/**Step By step of how it works */}
            <section className="bg-gradient-to-r from-purple-900 to-pink-800 text-white h-auto py-10 p-13 flex-wra">
                <div className="mt-6 flex flex-col md:flex-row justify-center items-center flex-wrap gap-10">

                    <div className="bg-white/8 backdrop-blur-md py-2 shadow-md text-white rounded-2xl w-full md::w-1/2">
                        <h2 className="flex justify-center text-2xl mb-7 font-bold">Looking for Services? </h2>

                        <ol className=" ml-15 list-decimal list-outs text-lg">
                            <li className="text-xl font-bold "> Browse Services
                                <p className="text-gray-300 text-sm mb-5 mt-2 pr-3"> Explore available services from tutoring to food delivery, all provided by fellow students.</p>
                            </li>

                            <li className="text-xl font-bold "> Choose a Provider
                                <p className="text-gray-300 text-sm my-3 pr-3"> Read reviews, check availability, and select the provider that best fits your needs. </p>
                            </li>

                            <li className="text-xl font-bold "> Book & Connect
                                <p className="text-gray-300 text-sm mb-5 mt-2 pr-3">Contact the provider directly to schedule your service and get the help you need. </p>
                            </li>
                        </ol>
                    </div>


                    <div className="bg-white/8 backdrop-blur-md py-8 shadow-md text-white rounded-2xl w-full m:w-1/2">
                        <h2 className="flex justify-center text-2xl mb-7 font-bold">Want to Offer Services
                        </h2>

                        <ol className=" ml-15 list-decimal list-outs text-lg">
                            <li className="text-xl font-bold "> Create Account
                                <p className="text-gray-300 text-sm mb-5 mt-2 pr-3"> Sign up with your student email to join our community of service providers.</p>
                            </li>

                            <li className="text-xl font-bold "> Set Up Profile
                                <p className="text-gray-300 text-sm mb-5 mt-2 pr-3"> Create your provider profile with services offered, pricing, and availability. </p>
                            </li>

                            <li className="text-xl font-bold "> Start Earning
                                <p className="text-gray-300 text-sm mb-5 mt-2 pr-3">Connect with students who need your services and start building your reputation.
                                </p>
                            </li>
                        </ol>
                    </div>
                </div>

                <div className="mt-12 flex justify-center text-center ">
                    <button className="bg-gradient-to-r from-pink-500 to-purple-500 w-l py-4 px-7 text-center rounded-lg shadow text-lg hover:opacity-90">
                        Get Started Now
                    </button>
                </div>
            </section>
        </div>

    )
}

export default HowItWorks; 