import { MockProviders } from "../Mock Data/MockUserData";


function Servives() {
   return (
      <div>
         <section className="bg-linear-to-b from-purple-700 via-indigo-800  to-purple-800 h-auto py-12 p-13 mt-20">
            <h1 className="text-3xl text-white md:text-5xl text-center font-bold ">Current Available Services </h1>
            <p className="text-2xl text-gray-100 text-center mt-9 mb-9">Discover the wide range of services offered by our student community</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
               {MockProviders.map((provider, index) => (
                  <div
                     key={provider.id}
                     index={provider.index}
                     className="bg-white/14 backdrop-blur-sm shadow-md text-white rounded-2xl p-3 duration-300 ease-in hover:shadow-lg hover:-translate-y-2"
                  >
                     <h2 className="text-xl font-bold flex justify-center m-4 text-white"> {provider.service_title} </h2>
                     <p className="text-white text-sm "> {provider.description} </p>
                     <div className="flex justify-center py-4"> <button className="bg-white/8 backdrop-blur-md text-center shadow-md text-white p-3 md:w-auto rounded-lg hover:bg-purple-800"
                     > View Providers </button></div>
                  </div>
               ))}

            </div>
         </section>

         <section>
            <h1>View All Services </h1>

         </section>
      </div>

   )
}

export default Servives; 