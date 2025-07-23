import { Star, User, Clock, Mars } from "lucide-react";
import Soccer from "../Images/Soccer.jpg";
import HighSchool from "../Images/8thgrade.jpg"
import Research from "../Images/Research.JPG";
import NSBE from "../Images/NSBE.JPG";
import ENG from "../Images/ENG.png";
import ColorStack from "../Images/ColorStack.JPG";
import News from "../Images/News.png";
import Marathon from "../Images/LAMarathon.jpg";

import * as React from "react"; //Using * allows to import everything into React instead of just one thing
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

function Home() {
    // info for stat section
    const stats = [
        { value: "Home", label: "" },
        { value: "About", label: "" },
        { value: "Projects", label: "" },
        { value: "Photography", label: "" },
        { value: "Skills", label: "" },
        { value: "Contact", label: "" }
    ];

    const aboutMe = [
        { value: "Research", img: Research },
        { value: "NSBE", img: NSBE },
        { value: "ENG", img: ENG},
        { value: "ColorStack", img: ColorStack },
        { value: "News", img: News },
        { value: "Marathon", img: Marathon}
    ];
    return (
        <div>
            {/* Header section */}
            <section className="bg-gradient-to-br from-purple-700 via-indigo-800  to-purple-700 text-white h-auto py-12 p-13 mt-20">
                <h1 className="text-3xl  md:text-6xl text-center font-bold ">Hi, I'm  <span className="text-purple-300">Chinomso Augustine</span>
                </h1>
                <p className="text-2xl text-center mt-9 mb-9">An aspiring Full Stack Developer with the intension in creating appealing <br /> website allowing people to easily navigate the web</p>
                <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                    <a href="../../../public/myResume.pdf" download="myResume" className="bg-gradient-to-r from bg-purple-500 via-pink-400px to-pink-500 text-center px-6 py-3 m-5 rounded-2xl text-lg font-semibold shadow-lg hover:scale-105 transition-transform">
                        Download Resume
                    </a>
                </div>
            </section>



            {/*About Me  and slids from stadnc } */}
            <section className="bg-gradient-to-b from-purple-200 to-white py-16 flex flex-col justify-center items-center overflow-auto border border-amber-500" >
                <h3 className="text-3xl font-bold text-center mb-4 text-purple-900 bg-purple-950/7  backdrop-blur-md py-6 shadow-md rounded-2xl w-sm md:w-50 transition duration-500 ease-in-out hover:translate-y-2">About Me</h3>
                <p className="text-lg text-center text-gray-600 mb-12 max-w-2xl mx-auto">We make it easy to find trusted services from fellow students on your campus </p>

                <div className="flex justify-center">
                    <Carousel className="w-full max-w-lg max-h-lg text-center">
                        <CarouselContent className="-ml-1">
                            {aboutMe.map((events, index) => (
                                <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                                    <div className="p-1">
                                        <Card>
                                            <CardContent className="flex aspect-square items-center justify-center">
                                                <img src={events.img} className="w-2xl rounded-md object-fill" />
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>


                </div>
            </section >



            {/* Pages */}
            <section className="bg-gradient-to-r from-purple-800 to-indigo-800 py-12 flex flex-col items-center md:flex-row justify-center gap-6 flex-wrap" >
                {
                    stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white/8 backdrop-blur-md rounded-1xl py-6 text-center shadow-md text-white w-lg md:w-56 rounded-2xl"
                        >
                            <div className="text-3xl font-bold">
                                {stat.value}
                            </div>
                        </div>
                    ))
                }
            </section >

            <footer className="bg-gradient-to-r from-purple-800 to-indigo-800 py-12">
                <h2 className="text-3xl font-bold text-center mb-4 text-white">Ready to Connect?</h2>
                <p className="text-gray-300 text-lg font-semibold flex text-center justify-center m-4 ">Join our community of students helping students. Find the services you need or offer your skills to others.</p>
                <div className="flex flex-col md:flex-row justify-center gap-6 flex-wrap font-bold mt-9 mb-7">
                    <button className="bg-white text-purple-800 text-lg rounded-lg p-4  cursor-pointer">
                        Find Services
                    </button>
                    <button className="border text-white text-lg rounded-lg p-4 hover:bg-white hover:text-purple-800 cursor-pointer">
                        Browse Providers
                    </button>
                </div>
            </footer>
        </div >
    );
}

export default Home;