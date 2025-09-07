"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import * as SamplePics from "../Images/Pictures";
import ContactForm from './contactForm';
import profileImg from "../Images/ProfilePic.JPG"


function Home() {
    // Turn image object into usable array of { value, img }
    {/**Declaring type of img object first  */ }

    type ImageItem = {
        value: string;
        img: string;
    };

    {/**Tells image to use imageitem format  */ }
    const Images: ImageItem[] = Object.entries(SamplePics).map(([name, img]) => ({
        value: name,
        img: img as string, /**typescript expect image to be unknown so specified it explicitly as string cuz that's what I want */
    }));

    const autoplayPlugin = React.useRef(
        Autoplay({ delay: 4000, stopOnInteraction: false })
    );


    return (
        <div>
            <section className="relative bg-gradient-to-br from-purple-700 via-indigo-800 to-purple-700 text-white h-[50vh] p-10 px-6 flex-col items-center justify-center ">
                <div
                    className="absolute inset-0 bg-center filter blur-xsm opacity-85"
                    style={{
                        backgroundImage: `url(${profileImg})`,
                    }}>

                </div>
                <div className="relative z-10 text-center">
                    <h1 className="text-3xl md:text-6xl font-bold">
                        Glad you made it! <br />
                        I&apos;m <span className="text-purple-300">Chinomso Augustine</span>
                    </h1>
                    <p className="text-2xl text-center mt-9 mb-9">
                        Your photographer
                    </p>
                </div>

            </section>
           


            {/* Photography */}
            <section className="bg-gradient-to-b from-purple-200 to-white py-16 flex flex-col justify-center items-center overflow-auto border border-amber-500">
                <h3 className="text-3xl font-bold text-center mb-4 text-purple-900 bg-purple-950/7 backdrop-blur-md py-6 shadow-md rounded-2xl w-sm md:w-50 transition duration-500 ease-in-out hover:translate-y-2">
                    Photography
                </h3>
                <p className="text-lg text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                    A glimpse of memorable moments captured in time.
                </p>

                <div className="flex justify-center w-full px-4">
                    <Carousel plugins={[autoplayPlugin.current]} className="w-full max-w-5xl h-full max-h-5xl border m-12 border-amber-300">
                        <CarouselContent>
                            {Images.map((image, index) => (
                                <CarouselItem key={index} className="basis-1/2 md:basis-1/2 lg:basis-1/3 p-2 ">
                                    <Card className="h-[530px] flex flex-col justify-between">

                                        <CardContent className="flex items-center justify-center flex-grow">
                                            <img
                                                src={image.img}
                                                className="w-full h-full object-cover rounded-md text-center"
                                                alt={image.value}
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


            {/* Contact */}
            <section className="flex flex-col items-center md:flex-row justify-center gap-6 flex-wrap bg-gradient-to-r from-purple-700 to-indigo-200 py-12">

                <h3 className="text-3xl font-bold text-center mb-4 text-white bg-purple-950/7 py-6 shadow-md rounded-2xl w-sm md:w-50 transition duration-500 ease-in-out hover:translate-y-2">
                    Contact
                </h3>

                <ContactForm />
            </section >



            {/* Footer */}

            <footer className="bg-gradient-to-r from-purple-800 to-indigo-800 py-12" >
                <h2 className="text-3xl font-bold text-center mb-4 text-white">
                    Ready to Connect?
                </h2>
                <p className="text-gray-300 text-lg font-semibold text-center max-w-2xl mx-auto mb-6">
                    Join our community of students helping students. Find the services
                    you need or offer your skills to others.
                </p>
                <div className="flex flex-col md:flex-row justify-center gap-6 font-bold mt-9 mb-7">
                    <button className="bg-white text-purple-800 text-lg rounded-lg px-6 py-3 hover:scale-105 transition">
                        Find Services
                    </button>
                    <button className="border border-white text-white text-lg rounded-lg px-6 py-3 hover:bg-white hover:text-purple-800 transition">
                        Browse Providers
                    </button>
                </div>
            </footer >
        </div >
    );
}

export default Home;
