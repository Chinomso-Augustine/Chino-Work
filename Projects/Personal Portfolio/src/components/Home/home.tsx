"use client";

import * as React from "react";
import Research from "../Images/Research.JPG";
import NSBE from "../Images/NSBE.JPG";
import ENG from "../Images/ENG.png";
import ColorStack from "../Images/ColorStack.JPG";
import News from "../Images/News.png";
import Marathon from "../Images/LAMarathon.jpg";

import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay"; //For auto play


function Home() {
    const stats = [
        { value: "Home", label: "" },
        { value: "About", label: "" },
        { value: "Projects", label: "" },
        { value: "Photography", label: "" },
        { value: "Skills", label: "" },
        { value: "Contact", label: "" },
    ];

    const aboutMe = [
        { value: "UC Davis 26th Undergraduate Research Conference", img: Research },
        { value: "National Society of Black Engineers", img: NSBE },
        { value: "Class Project", img: ENG },
        { value: "ColorStack Project Manager", img: ColorStack },
        { value: "Athlete of The Month Featured On Spectrum News", img: News },
        { value: "2022 LA Marathon", img: Marathon },
    ];

    const autoplayPlugin = React.useRef(
        Autoplay({ delay: 4000, stopOnInteraction: false })
    );

    return (
        <div>
            {/* Header section */}
            <section className="bg-gradient-to-br from-purple-700 via-indigo-800 to-purple-700 text-white h-auto py-12 px-6 mt-20">
                <h1 className="text-3xl md:text-6xl text-center font-bold">
                    Hi, I'm <span className="text-purple-300">Chinomso Augustine</span>
                </h1>
                <p className="text-2xl text-center mt-9 mb-9">
                    An aspiring Full Stack Developer with the intention of creating
                    appealing <br /> websites allowing people to easily navigate the web
                </p>
                <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                    <a
                        href="/myResume.pdf"
                        download="myResume"
                        className="bg-gradient-to-r from-purple-500 via-pink-400 to-pink-500 text-center px-6 py-3 m-5 rounded-2xl text-lg font-semibold shadow-lg hover:scale-105 transition-transform"
                    >
                        Download Resume
                    </a>
                </div>
            </section>

            {/**About me */}
            <section className="bg-gradient-to-b from-purple-200 to-white py-16 flex flex-col justify-center items-center overflow-auto border border-amber-500">
                <h3 className="text-3xl font-bold text-center mb-4 text-purple-900 bg-purple-950/7 backdrop-blur-md py-6 shadow-md rounded-2xl w-sm md:w-50 transition duration-500 ease-in-out hover:translate-y-2">
                    About Me
                </h3>
                <p className="text-lg text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                    We make it easy to find trusted services from fellow students on your
                    campus.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                    {aboutMe.map((events, index) => (
                        <div
                            key={index}
                            className="bg-purple-900/10 backdrop-blur-sm shadow-md rounded-2xl p-3 duration-300 ease-in hover:shadow-lg hover:-translate-y-2"
                        >
                            <h3 className="font-semibold text-purple-900 text-lg text-center mt-2">
                                {events.value}
                            </h3>
                            <img src={events.img} 
                            className={`w-full ${events.value.includes("Marathon")? "h-100": "h-md"} text-xl font-bold flex justify-center py-7 rounded-t-full`}/>

                        </div>
                    ))}

                </div>
            </section>


            {/* Pages Section */}
            <section className="bg-gradient-to-r from-purple-800 to-indigo-800 py-12 flex flex-col items-center md:flex-row justify-center gap-6 flex-wrap">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-white/10 backdrop-blur-md py-6 px-8 text-center shadow-md text-white w-full md:w-56 rounded-2xl"
                    >
                        <div className="text-2xl font-bold">{stat.value}</div>
                    </div>
                ))}
            </section>


            {/* About Me section with carousel */}
            <section className="bg-gradient-to-b from-purple-200 to-white py-16 flex flex-col justify-center items-center overflow-auto border border-amber-500">
                <h3 className="text-3xl font-bold text-center mb-4 text-purple-900 bg-purple-950/7 backdrop-blur-md py-6 shadow-md rounded-2xl w-sm md:w-50 transition duration-500 ease-in-out hover:translate-y-2">
                    Photography
                </h3>
                <p className="text-lg text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                    We make it easy to find trusted services from fellow students on your
                    campus.
                </p>

                <div className="flex justify-center w-full px-4">
                    <Carousel plugins={[autoplayPlugin.current]} className="w-full max-w-5xl">
                        <CarouselContent>
                            {aboutMe.map((events, index) => (
                                <CarouselItem
                                    key={index}
                                    className="md:basis-1/2 lg:basis-1/3 p-2"
                                >
                                    <Card className="h-[300px] flex flex-col justify-between">
                                        <h3 className="font-semibold text-purple-900 text-lg text-center mt-2">
                                            {events.value}
                                        </h3>
                                        <CardContent className="flex items-center justify-center flex-grow">
                                            <img
                                                src={events.img}
                                                className="w-full h-full object-cover rounded-md"
                                            />
                                        </CardContent>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </section>







            {/* Footer */}
            <footer className="bg-gradient-to-r from-purple-800 to-indigo-800 py-12">
                <h2 className="text-3xl font-bold text-center mb-4 text-white">
                    Ready to Connect?
                </h2>
                <p className="text-gray-300 text-lg font-semibold text-center max-w-2xl mx-auto mb-6">
                    Join our community of students helping students. Find the services you
                    need or offer your skills to others.
                </p>
                <div className="flex flex-col md:flex-row justify-center gap-6 font-bold mt-9 mb-7">
                    <button className="bg-white text-purple-800 text-lg rounded-lg px-6 py-3 hover:scale-105 transition">
                        Find Services
                    </button>
                    <button className="border border-white text-white text-lg rounded-lg px-6 py-3 hover:bg-white hover:text-purple-800 transition">
                        Browse Providers
                    </button>
                </div>
            </footer>
        </div>
    );
}

export default Home;
