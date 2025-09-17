"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import * as SamplePics from "../Images/Pictures";



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
            {/*<section className="relative bg-center bg-contain text-yellow-100 p-10 flex flex-col items-center justify-center"
                    style={{ backgroundImage: `url(${profileImg})` }} >
                */}


            <section className="py-30 z-60 bg-gradient-to-bl from-purple-800 via-purple-800 to-indigo-800">

                <div className="text-center text-purple-100 font-sans ">
                    <h1 className="text-5xl md:text-7xl font-bold ">
                        Chinomso Augustine
                    </h1>
                </div>

            </section>

            <section className="bg-gradient-to-b from-purple-200 via-yellow-100 to-purple-100 py-12">


                <div className="flex justify-center ">
                    <h2 className="text-center font-bold text-5xl mb-4 text-purple-900 bg-purple-950/7 backdrop-blur-md py-6 shadow-md rounded-2xl w-sm md:w-50">
                        My work
                    </h2>
                </div>
                <div>
                    <p className="text-lg text-center text-gray-700 mb-12 max-w-2xl mx-auto">
                        A glimpse of memorable moments captured in time.

                    </p>

                </div>
                <div className="flex flex-wrap justify-center gap-7 mt-5 ">
                    {Images.map((pics, index) => (
                        <img src={pics.img}
                            className="w-sm sm:w-1/2 lg:w-1/4 object-contain rounded-2xl transition duration-500 ease-in-out hover:translate-y-2 "
                        />
                    ))}
                </div>

            </section>


            {/* Photography */}
            <section className="bg-gradient-to-b from-purple-200 to-white py-16 flex flex-col justify-center items-center overflow-auto border border-amber-500">


                <div className="flex justify-center w-full px-4">
                    <Carousel plugins={[autoplayPlugin.current]} className="w-full max-w-5xl h-full max-h-5xl border m-12 border-amber-300">
                        <CarouselContent>
                            {Images.map((image, index) => (
                                <CarouselItem key={index} className="basis-1/2 md:basis-1/2 lg:basis-1/3 p-2 ">
                                    <Card className="h-auto flex flex-col justify-between">

                                        <CardContent className="flex items-center justify-center flex-grow">
                                            <img
                                                src={image.img}
                                                className="w-full sm:w-xl sm:h-auto object-cover rounded-md text-center"
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



            {/* Footer */}

            <footer className="bg-gradient-to-r from-purple-800 to-indigo-800 h-auto" >
                <div className="text-center font-bold text-4xl p-6 text-white">
                    <h1>Connect on social</h1>
                </div>

                <div className="text-center flex justify-center gap-4 text-purple-900 p-4">
                    <a href="https://www.instagram.com/chino_clickss/" className=" rounded-sm bg-yellow-100 h-7 text-center font-semibold w-[150px]">Instagram</a>
                    <a href="https://www.linkedin.com/in/chinomso-agwamba-augustine-ba9a29258/" className=" rounded-sm bg-yellow-100 h-7 text-center font-semibold w-[150px]">LinkedIn</a>
                </div>

                <div className="text-center w-full flex justify-center">
                    <p className=" bg-yellow-100 text-center font-semibold my-2 text-purple-900 rounded-2xl"> Created by Chinomso Augustine</p>

                </div>
            </footer >
        </div >
    );
}

export default Home;
