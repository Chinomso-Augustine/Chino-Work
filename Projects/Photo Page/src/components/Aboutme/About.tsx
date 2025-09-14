import * as react from 'react';
import BgPic from "../Images/Pictures/Me.JPG";

function About() {
    return (
        <div>

            <section className='border py-20'>

                {/**background images  */}
                <div className='bg-amber-600 w-full h-full bg-contain bg-no-repeat py-40'
                style={{backgroundImage: `url(${BgPic})`}}>

                </div>

                <div>
                    <h1> About Chinomso </h1>

                </div>


            </section>



        </div>
    )
}

export default About; 